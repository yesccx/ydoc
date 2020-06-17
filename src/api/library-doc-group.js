import axios from '@/kernel/axios';

// 创建文档分组
export const axiosLibraryDocGroupCreate = (param = {
    library_id: 0, pid: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/library/docGroup/create', param, conf);

// 修改文档分组
export const axiosLibraryDocGroupModify = (param = {
    doc_group_id: 0, pid: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/library/docGroup/modify', param, conf);

// 修改文档分组所属上级分组
export const axiosLibraryDocGroupModifyGroup = (param = {
    library_id: 0, doc_group_id: 0, parent_group_id: 0
}, conf = {}) => axios.post('/library/docGroup/modifyGroup', param, conf);

// 删除文档分组
export const axiosLibraryDocGroupRemove = (param = {
    library_id: 0, doc_group_id: 0, deep: 0
}, conf = {}) => axios.post('/library/docGroup/remove', param, conf);

// 获取文档分组列表
export const axiosLibraryDocGroupList = (param = {
    library_id: 0
}, conf = {}) => axios.post('/library/docGroup/list', param, conf);

// 获取文档分组树
export const axiosLibraryDocGroupTree = (param = {
    library_id: 0
}, conf = {}) => axios.post('/library/docGroup/tree', param, conf);

// 获取文档分组信息
export const axiosLibraryDocGroupInfo = (param = {
    library_id: 0, doc_group_id: 0
}, conf = {}) => axios.post('/library/docGroup/info', param, conf);