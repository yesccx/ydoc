/*
 * 数据持久化store工具类
 *
 * @Created: 2019-09-16 15:47:29
 * @Author: yesc (yes.ccx@gmail.com)
 */

export const keys = {
    USER_SESSION: 'user_session',
    SHARE_ACCESS_PASSWORD: 'share_access_password',
    USER_SESSION_CONFIG: 'user_session_config'
};

const DataStore = {
    driver: window.localStorage, // 存储驱动对象，需要实现（getItem、setItem、removeItem）方法
    prefix: '',
    // 存储
    setItem(key, value, expire = 0) {
        if (typeof value === 'function') {
            value = value(this.getItem(key));
        }

        // 过期时间
        const expireTime = expire > 0 ? parseInt(Date.now() / 1000) + expire : 0;

        key = this._key(key);
        try {
            value = btoa(JSON.stringify({ expire_time: expireTime, data: value }));
        } catch (error) {
            return false;
        }
        this.driver.setItem(key, value);
        return true;
    },
    // 获取
    getItem(key, def = '') {
        key = this._key(key);
        let value = this.driver.getItem(key);
        if (value === null) {
            return def;
        }

        try {
            value = JSON.parse(atob(value));
            if (value.expire_time >> 0 !== 0 && value.expire_time < parseInt(Date.now() / 1000)) {
                throw new Error('已过期');
            }
            value = value.data;
        } catch (error) {
            return def;
        }

        return value;
    },
    // 移除
    removeItem(key) {
        key = this._key(key);
        this.driver.removeItem(key);
        return true;
    },
    // 清空
    clear() {
        this.driver.clear();
    },
    // 判断是否存在
    hasItem(key) {
        return this.getItem(key, '__IS_NULL__') !== '__IS_NULL__';
    },
    // 构建key名
    _key(originKey) {
        return this.prefix + originKey;
    },
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    },
    // 设置储存驱动对象
    setDriver(driver) {
        this.driver = driver;
        return this;
    }
};

// 设置默认的存储驱动对象为localStorage
DataStore.setDriver(window.localStorage).setPrefix('__ydoc__');

export default DataStore;