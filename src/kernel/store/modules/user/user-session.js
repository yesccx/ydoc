/*
 * 用户登录会话
 *
 * @Created: 2019-09-16 10:22:56
 * @Author: yesc (yes.ccx@gmail.com)
 */
import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';
import ApiCollection from '@/common/collector/api-collection';

const state = {
    uid: 0,
    token: '',
    nickname: '',
    reg_time: '',
    avatar_url: '',
    inited: false
};

const getters = {
    userInfo: state => ({
        uid: state.uid,
        nickname: state.nickname,
        reg_time: state.reg_time,
        avatar_url: state.avatar_url
    })
};

const mutations = {
    // 设置用户会话信息
    setSession(state, { token = '', uid = 0, nickname = '', reg_time = '', avatar_url = '' }) {
        state.uid = uid;
        state.token = token;
        state.avatar_url = avatar_url;
        state.nickname = nickname;
        state.reg_time = reg_time;

        // 缓存用户token等相关信息
        DataStore.setItem(STORE_KEYS.USER_SESSION, { token });
    },
    // 更新用户昵称
    updateNickname(state, nickname) {
        state.nickname = nickname;
    },
    // 设置初始化状态
    setInited(state, { status = true }) {
        state.inited = status;
    }
};

const actions = {
    // 初始化用户会话信息
    async init({ commit, dispatch, state, getters }) {
        if (state.inited) {
            return getters.userInfo;
        }

        // 从缓存中读取token
        const storeSession = DataStore.getItem(STORE_KEYS.USER_SESSION, false);
        if (storeSession && storeSession.token) {
            commit('setSession', { token: storeSession.token });
        }

        // 获取用户信息
        const userInfo = await dispatch('initUserInfo');
        if (userInfo) {
            commit('setInited', { status: true });
            commit('setSession', { ...storeSession, ...userInfo });
        }
        return userInfo;
    },
    // 初始化用户信息
    async initUserInfo() {
        let userInfo = false;
        await ApiCollection.v1.UserInfo({}, { ignore_auth: true, report: true }).then(({ resData }) => {
            resData.uid = resData.id || 0;
            userInfo = resData;
        }).catch(() => { });
        return userInfo;
    },
    // 退出登录
    async logout({ commit }) {
        let res = false;
        await ApiCollection.v1.UserLogout().then(() => {
            commit('setSession', {});
            commit('setInited', { status: false });
            res = true;
        });
        return res;
    },
    // 清除会话
    clearSession({ commit }) {
        commit('setSession', {});
        commit('setInited', { status: false });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'userSession',
    namespaced: true
};