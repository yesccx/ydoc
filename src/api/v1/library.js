import axios from '@/kernel/axios';

// 获取文档库信息
export const axiosLibraryInfo = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/center/info', param, conf);

// 文档库创建
export const axiosLibraryCreate = (param = {
    name: '', desc: '', library_group_id: 0
}, conf = {}) => axios.post('/v1/library/center/create', param, conf);

// 文档库修改
export const axiosLibraryModify = (param = {
    library_id: 0, name: '', desc: ''
}, conf = {}) => axios.post('/v1/library/center/modify', param, conf);

// 文档库删除
export const axiosLibraryRemove = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/center/remove', param, conf);

// 文档库转让
export const axiosLibraryTransfer = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/center/transfer', param, conf);

// 获取文档库列表
export const axiosLibraryList = (param = {}, conf = {}) => axios.post('/v1/library/center/list', param, conf);

// 获取所有文档库集合
export const axiosLibraryCollection = (param = {}, conf = {}) => axios.post('/v1/library/center/collection', param, conf);

// 归档文档库
export const axiosLibraryPermanent = (param = {}, conf = {}) => axios.post('/v1/library/permanent', param, conf);