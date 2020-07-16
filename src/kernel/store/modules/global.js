/*
 * 全局状态
 *
 * @Created: 2019-11-06 10:22:56
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    pageError: false, // 页面错误状态
    userMessageUnreadCount: 0 // 用户消息未读数
};

const getters = {};

const mutations = {
    // 设置页面错误状态
    setPageError(state, pageError = false) {
        state.pageError = pageError;
    },
    // 设置用户消息未读数
    setUserMessageUnreadCount(state, count) {
        state.userMessageUnreadCount = count;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'global',
    namespaced: true
};