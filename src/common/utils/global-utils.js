/*
 * 全局工具函数
 * PS: 会在app-init时，挂载到ap.$utils上
 *
 * @Created: 2019-03-21 15:56:01
 * @Author: yesc (yes.ccx@gmail.com)
 */

import { Loading, MessageBox, Notification } from 'element-ui';
import Router from '@/kernel/router';
import Store from '@/kernel/store';
import { RouterLinkHome, RouterLinkBack } from '@/common/router-links';

// 全屏Loading
export const FullLoading = class FullLoading {
    constructor(message = '', option = {}) {
        this.$status = false;
        this.instance = {};
        this.message = message || '';
        this.option = {
            ...{ lock: true },
            ...option
        };
    }
    // 状态更新
    set status(status) {
        this.$status = status;
        if (status) {
            this.instance = Loading.service({ ...this.option, text: this.message });
        } else {
            this.instance.close && this.instance.close();
        }
    };
    get status() {
        return this.$status;
    };
};

// 深Copy对象
export const CloneDeep = (object) => {
    try {
        return JSON.parse(JSON.stringify(object));
    } catch (err) {
        return {};
    }
};

// 向数组追加数据
export const ArrayConcat = (source, newSource) => {
    if (!Array.isArray(source) || !Array.isArray(newSource)) {
        return source;
    }
    return source.splice(source.length, 0, ...newSource);
};

// promise sleep
export const Sleep = async (ms) => {
    ms = parseInt(ms, 10);
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

// 设置页面title
export const SetDocummentTitle = (title) => {
    document.title = `${title} | Y-DOC`;
};

// 获取URL参数（类似tp5的input）
export const Input = (field, def = '') => {
    let parm = ''; // 参数名
    let type = ''; // 参数类别 d(int) s(string)
    [parm, type = ''] = field.split('/');

    // 获取参数，不存在时取默认值
    let val = Router.app.$route.query[parm] || def;
    // 转换类型
    switch (type) {
        case 'd':
            val = parseInt(val, 10);
            break;
        case 's':
            val = String(val);
            break;
        default:
            break;
    }

    return val;
};

// 功能开发中 提示框
export const Abuilding = () => {
    return Notification({ title: 'ydoc', message: '功能开发中～', type: 'success' });
};

// 确认框
export const Confirm = async (message = '', title = '', options = {}) => {
    title = title || '提醒';
    return MessageBox.confirm(message, title, {
        confirmButtonText: '好的',
        type: 'warning',
        showClose: false,
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        center: true,
        cancelButtonText: '再看看',
        ...options
    });
};

// 显示全局错误
export const Error = async (message, title = '') => {
    await Sleep(1);

    title = title || '发生错误';
    message = message || '未知错误！';
    Store.commit('global/setPageError', true);
    MessageBox.confirm(message, title, {
        confirmButtonText: '好的',
        type: 'error',
        showClose: false,
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        center: true,
        cancelButtonText: '返回首页'
    }).then(() => {
        RouterLinkBack();
    }).catch((action) => {
        if (action === 'cancel') {
            RouterLinkHome();
        }
    });

    return new Promise(() => { });
};

// 遍历对象/数组
export const ForEach = (data, callback) => {
    if (Array.isArray(data)) {
        data.forEach(callback);
    } else if (typeof data === 'object') {
        Object.keys(data).forEach(function (currentValue, index, array) {
            callback(data[currentValue], currentValue, data);
        });
    }
};

/* eslint-disable no-extend-native */
/**
 * 格式化时间戳
 *
 * @param int imestamp 时间戳
 * @param string format 格式
 */
export const DateFormat = (timestamp, format, dft = '-') => {
    if (!timestamp) {
        return dft || '-';
    }
    // 初始化
    if (!Date.format) {
        Date.shortMonths = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        Date.longMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        Date.shortDays = ['日', '一', '二', '三', '四', '五', '六'];
        Date.longDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        // Defining patterns
        var replaceChars = {
            // Day
            d: function () { var d = this.getDate(); return (d < 10 ? '0' : '') + d; },
            D: function () { return Date.shortDays[this.getDay()]; },
            j: function () { return this.getDate(); },
            l: function () { return Date.longDays[this.getDay()]; },
            N: function () { var N = this.getDay(); return (N === 0 ? 7 : N); },
            S: function () {
                var S = this.getDate(); return (S % 10 === 1 && S !== 11
                    ? 'st' : (S % 10 === 2 && S !== 12 ? 'nd' : (S % 10 === 3 && S !== 13 ? 'rd' : 'th')));
            },
            w: function () { return this.getDay(); },
            z: function () { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((this - d) / 86400000); },
            // Week
            W: function () {
                var target = new Date(this.valueOf());
                var dayNr = (this.getDay() + 6) % 7;
                target.setDate(target.getDate() - dayNr + 3);
                var firstThursday = target.valueOf();
                target.setMonth(0, 1);
                if (target.getDay() !== 4) {
                    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
                }
                var retVal = 1 + Math.ceil((firstThursday - target) / 604800000);

                return (retVal < 10 ? '0' + retVal : retVal);
            },
            // Month
            F: function () { return Date.longMonths[this.getMonth()]; },
            m: function () { var m = this.getMonth(); return (m < 9 ? '0' : '') + (m + 1); },
            M: function () { return Date.shortMonths[this.getMonth()]; },
            n: function () { return this.getMonth() + 1; },
            t: function () {
                var year = this.getFullYear();
                var nextMonth = this.getMonth() + 1;
                if (nextMonth === 12) {
                    year = year++;
                    nextMonth = 0;
                }
                return new Date(year, nextMonth, 0).getDate();
            },
            // Year
            L: function () { var L = this.getFullYear(); return (L % 400 === 0 || (L % 100 !== 0 && L % 4 === 0)); },
            o: function () {
                var d = new Date(this.valueOf());
                d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
                return d.getFullYear();
            },
            Y: function () { return this.getFullYear(); },
            y: function () { return ('' + this.getFullYear()).substr(2); },
            // Time
            a: function () { return this.getHours() < 12 ? 'am' : 'pm'; },
            A: function () { return this.getHours() < 12 ? 'AM' : 'PM'; },
            B: function () {
                return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
            },
            g: function () { return this.getHours() % 12 || 12; },
            G: function () { return this.getHours(); },
            h: function () { var h = this.getHours(); return ((h % 12 || 12) < 10 ? '0' : '') + (h % 12 || 12); },
            H: function () { var H = this.getHours(); return (H < 10 ? '0' : '') + H; },
            i: function () { var i = this.getMinutes(); return (i < 10 ? '0' : '') + i; },
            s: function () { var s = this.getSeconds(); return (s < 10 ? '0' : '') + s; },
            v: function () { var v = this.getMilliseconds(); return (v < 10 ? '00' : (v < 100 ? '0' : '')) + v; },
            // Timezone
            e: function () { return Intl.DateTimeFormat().resolvedOptions().timeZone; },
            I: function () {
                var DST = null;
                for (var i = 0; i < 12; ++i) {
                    var d = new Date(this.getFullYear(), i, 1);
                    var offset = d.getTimezoneOffset();

                    if (DST === null) DST = offset;
                    else if (offset < DST) { DST = offset; break; } else if (offset > DST) break;
                }
                return (this.getTimezoneOffset() === DST) | 0;
            },
            O: function () {
                var O = this.getTimezoneOffset();
                return (-O < 0 ? '-' : '+') + (Math.abs(O / 60) < 10 ? '0' : '') + Math.floor(Math.abs(O / 60)) + (Math.abs(O % 60) === 0
                    ? '00' : ((Math.abs(O % 60) < 10 ? '0' : '')) + (Math.abs(O % 60)));
            },
            P: function () {
                var P = this.getTimezoneOffset();
                return (-P < 0 ? '-' : '+') + (Math.abs(P / 60) < 10 ? '0' : '') +
                    Math.floor(Math.abs(P / 60)) + ':' + (Math.abs(P % 60) === 0
                        ? '00' : ((Math.abs(P % 60) < 10 ? '0' : '')) + (Math.abs(P % 60)));
            },
            T: function () {
                var tz = this.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(' '); return tz[tz.length - 1];
            },
            Z: function () { return -this.getTimezoneOffset() * 60; },
            // Full Date/Time
            c: function () { return this.format('Y-m-d\\TH:i:sP'); },
            r: function () { return this.toString(); },
            U: function () { return Math.floor(this.getTime() / 1000); }
        };

        // Simulates PHP's date function
        Date.prototype.format = function (format) {
            var date = this;
            return format.replace(/(\\?)(.)/g, function (_, esc, chr) {
                return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
            });
        };
    }

    format = format || ('Y-m-d H:i:s');
    return new Date(timestamp * 1000).format(format);
};

export default { FullLoading, CloneDeep, Sleep, DateFormat, SetDocummentTitle, ArrayConcat, Input, Confirm, Error, ForEach, Abuilding };