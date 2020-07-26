/*
 * 全局状态
 *
 * @Created: 2019-11-06 10:22:56
 * @Author: yesc (yes.ccx@gmail.com)
 */

import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';

const state = {
    pageError: false, // 页面错误状态
    userMessageUnreadCount: 0, // 用户消息未读数
    userSessionConfig: {
        home_view_style: ''
    } // 用户会话期间的配置参数
};

const getters = {
    // 工作台视图风格
    homeViewStyle(state) {
        return state.userSessionConfig.home_view_style || 'simple';
    }
};

const mutations = {
    // 设置页面错误状态
    setPageError(state, pageError = false) {
        state.pageError = pageError;
    },
    // 设置用户消息未读数
    setUserMessageUnreadCount(state, count) {
        state.userMessageUnreadCount = count;
    },
    // 设置会话参数-工作台视图风格
    setHomeViewStyle(state, style) {
        state.userSessionConfig = { ...state.userSessionConfig, ...{ home_view_style: style } };

        DataStore.setItem(STORE_KEYS.USER_SESSION_CONFIG, (data) => {
            data = data || {};
            data.home_view_style = style;
            return data;
        }, 0);
    },
    // 设置用户会话期间的配置参数
    setUserSessionConfig(state, config) {
        state.userSessionConfig = config;
    }
};

const actions = {
    // 初始化用户会话期间的配置参数
    initUseSessionConfig({ commit }) {
        commit('setUserSessionConfig', DataStore.getItem(STORE_KEYS.USER_SESSION_CONFIG, {}));
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'global',
    namespaced: true
};