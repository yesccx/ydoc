/*
 * 团队管理（团队信息）
 *
 * @Created: 2020-01-16 15:30:23
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    teamId: 0,
    teamInfo: {}
};

const getters = {};

const mutations = {
    // 初始化团队信息
    initTeamInfo(state, teamInfo) {
        state.teamInfo = teamInfo;
        state.teamId = teamInfo.id;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'teamManager',
    namespaced: true
};