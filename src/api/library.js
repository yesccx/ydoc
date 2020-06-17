import axios from '@/kernel/axios';

// 创建文档库
export const axiosLibraryCreate = (param = { name: '', desc: '', group_id: 0 }, conf = {}) => axios.post('/library/create', param, conf);

// 修改文档库
export const axiosLibraryModify = (param = { library_id: 0, name: '', desc: '' }, conf = {}) => axios.post('/library/modify', param, conf);

// 修改文档库分组
export const axiosLibraryModifyGroup = (param = { library_id: 0, group_id: 0 }, conf = {}) => axios.post('/library/modifyGroup', param, conf);

// 获取文档库列表
export const axiosLibraryList = (param = {}, conf = {}) => axios.post('/library/list', param, conf);

// 获取所有文档库
export const axiosLibraryAll = (param = {}, conf = {}) => axios.post('/library/all', param, conf);

// 获取文档库信息
export const axiosLibraryInfo = (param = { libray_id: 0 }, conf = {}) => axios.post('/library/info', param, conf);

// 获取文档库管理信息
export const axiosLibraryManagerInfo = (param = { libray_id: 0 }, conf = {}) => axios.post('/library/managerInfo', param, conf);

// 排序文档库
export const axiosLibrarySort = (param = {}, conf = {}) => axios.post('/library/sort', param, conf);

// 删除文档库
export const axiosLibraryRemove = (param = {}, conf = {}) => axios.post('/library/remove', param, conf);

// 转让文档库
export const axiosLibraryTransfer = (param = {}, conf = {}) => axios.post('/library/transfer', param, conf);

// 归档文档库
export const axiosLibraryPermanent = (param = {}, conf = {}) => axios.post('/library/permanent', param, conf);

// 获取文档库所有成员
export const axiosLibraryMembers = (param = { library_id: 0 }, conf = {}) => axios.post('/library/members', param, conf);

// 邀请用户成为文档库成员
export const LibraryMemberInvite = (param = { library_id: 0, member_ids: [] }, conf = {}) => axios.post('/library/memberInvite', param, conf);

// 将用户移出文档库
export const axiosLibraryMemberUninvite = (param = { team_id: 0, member_id: 0 }, conf = {}) => axios.post('/library/memberUninvite', param, conf);

// 调整用户文档库成员角色
export const axiosLibraryMemberModifyRole = (param = {
    team_id: 0, member_id: 0, role_id: 0
}, conf = {}) => axios.post('/library/memberModifyRole', param, conf);

// 调整用户文档库成员状态
export const axiosLibraryMemberModifyStatus = (param = {
    team_id: 0, member_id: 0, status: 0
}, conf = {}) => axios.post('/library/memberModifyStatus', param, conf);

// 获取文档库操作动态列表
export const axiosLibraryActionDynamicList = (param = { library_id: 0 }, conf = {}) => axios.post('/library/actionDynamicList', param, conf);