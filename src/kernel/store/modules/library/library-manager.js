/*
 * 文档库管理（文档库信息）
 *
 * @Created: 2020-01-14 10:19:23
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    libraryId: 0,
    libraryInfo: {},
    libraryMember: {}
};

const getters = {};

const mutations = {
    // 设置文档库管理信息
    setLibraryManagerInfo(state, { libraryInfo, libraryMember }) {
        state.libraryInfo = libraryInfo;
        state.libraryMember = libraryMember;
        state.libraryId = libraryInfo.id;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'libraryManager',
    namespaced: true
};