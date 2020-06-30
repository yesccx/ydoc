import axios from '@/kernel/axios';

// 获取所有文档库集合
export const axiosLibraryGroupCollection = (param = {}, conf = {}) => axios.post('/v1/library/group/collection', param, conf);

// 获取文档库分组信息
export const axiosLibraryGroupInfo = (param = {
    library_group_id: 0
}, conf = {}) => axios.post('/v1/library/group/info', param, conf);

// 创建文档库分组
export const axiosLibraryGroupCreate = (param = {
    name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/v1/library/group/create', param, conf);

// 删除文档库分组
export const axiosLibraryGroupRemove = (param = {
    library_group_id: 0
}, conf = {}) => axios.post('/v1/library/group/remove', param, conf);

// 修改文档库分组
export const axiosLibraryGroupModify = (param = {
    library_group_id: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/v1/library/group/modify', param, conf);

// 排序文档库分组
export const axiosLibraryGroupSort = (param = {
    library_group_id: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/v1/library/group/sort', param, conf);