/*
 * 文档库preview（分享信息）
 *
 * @Created: 2020-07-07 12:37:40
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    libraryShareInfo: {
        id: 0,
        share_name: '',
        library_id: 0,
        doc_id: 0,
        share_desc: '',
        share_code: '',
        expire_date: 0,
        create_time: 0,
        is_protected: 0,
        user_info: {
            id: 0,
            avatar_url: '',
            nick_name: ''
        }
    },
    libraryInfo: {
        name: '',
        desc: ''
    },
    isAccessed: false,
    accessPassword: '',
    isShareSimplify: false
};

const getters = {
    libraryId: state => state.libraryShareInfo.library_id,
    shareAccessToken: state => ({
        share_code: state.libraryShareInfo.share_code,
        share_access_password: state.accessPassword
    })
};

const mutations = {
    // 设置文档库分享信息
    setLibraryShareInfo(state, { libraryShareInfo, isAccessed = false, accessPassword = '', libraryInfo = {} }) {
        state.libraryShareInfo = libraryShareInfo;
        state.libraryInfo = libraryInfo;
        state.isAccessed = isAccessed;
        state.accessPassword = accessPassword;
        state.isShareSimplify = libraryShareInfo.doc_id >> 0 !== 0;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'libraryPreview',
    namespaced: true
};