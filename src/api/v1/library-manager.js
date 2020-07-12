import axios from '@/kernel/axios';

// 获取文档库管理信息
export const axiosLibraryManagerInfo = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/manager/info', param, conf);

// 文档库成员的文档库排序
export const axiosLibraryMemberLibrarySort = (param = {
    library_id: 0, library_group_id: 0, sort: 0
}, conf = {}) => axios.post('/v1/library/manager/library-member/library-sort', param, conf);

// 获取文档库成员集合
export const axiosLibraryMemberCollection = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/manager/library-member/collection', param, conf);

// 邀请用户成为文档库成员
export const axiosLibraryMemberInvite = (param = {
    library_id: 0, member_ids: []
}, conf = {}) => axios.post('/v1/library/manager/library-member/invite', param, conf);

// 修改文档库成员状态
export const axiosLibraryMemberStatusModify = (param = {
    library_id: 0, member_id: 0, status: 0
}, conf = {}) => axios.post('/v1/library/manager/library-member/status-modify', param, conf);

// 修改文档库成员角色
export const axiosLibraryMemberRoleModify = (param = {
    library_id: 0, member_id: 0, library_role_id: 0
}, conf = {}) => axios.post('/v1/library/manager/library-member/role-modify', param, conf);

// 移除文档库成员
export const axiosLibraryMemberUninvite = (param = {
    library_id: 0, member_id: 0
}, conf = {}) => axios.post('/v1/library/manager/library-member/uninvite', param, conf);

// 获取文档库成员分享列表
export const axiosLibraryShareList = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/manager/share-list', param, conf);

// 删除文档库成员分享
export const axiosLibraryShareRemove = (param = {
    library_id: 0, library_share_id: 0
}, conf = {}) => axios.post('/v1/library/manager/share-remove', param, conf);

// 修改文档库成员分享状态
export const axiosLibraryShareStatusModify = (param = {
    library_id: 0, library_share_id: 0
}, conf = {}) => axios.post('/v1/library/manager/share-status-modify', param, conf);