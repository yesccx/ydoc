import axios from '@/kernel/axios';

// 获取所有文档库分组
export const axiosLibraryGroupAll = (param = {
    library_id: 0
}, conf = {}) => axios.post('/library-group/all', param, conf);

// 获取文档库分组信息
export const axiosLibraryGroupInfo = (param = {
    group_id: 0
}, conf = {}) => axios.post('/library-group/info', param, conf);

// 创建文档库分组
export const axiosLibraryGroupCreate = (param = {
    name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/library-group/create', param, conf);

// 删除文档库分组
export const axiosLibraryGroupRemove = (param = {
    group_id: 0
}, conf = {}) => axios.post('/library-group/remove', param, conf);

// 修改文档库分组
export const axiosLibraryGroupModify = (param = {
    group_id: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/library-group/modify', param, conf);

// 排序文档库分组
export const axiosLibraryGroupSort = (param = {
    group_id: 0, name: '', desc: '', sort: 0
}, conf = {}) => axios.post('/library-group/sort', param, conf);