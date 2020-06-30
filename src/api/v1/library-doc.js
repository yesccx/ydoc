import axios from '@/kernel/axios';

// 创建文档
export const axiosLibraryDocCreate = (param = {
    library_id: 0, group_id: 0, title: '', content: ''
}, conf = {}) => axios.post('/v1/library/doc/create', param, conf);

// 编辑文档
export const axiosLibraryDocModify = (param = {
    library_id: 0, id: 0, group_id: 0, title: '', content: ''
}, conf = {}) => axios.post('/v1/library/doc/modify', param, conf);

// 编辑文档基础信息
export const axiosLibraryDocBaseModify = (param = {
    library_id: 0, id: 0, group_id: 0, title: ''
}, conf = {}) => axios.post('/v1/library/doc/base-modify', param, conf);

// 删除文档
export const axiosLibraryDocRemove = (param = {
    library_id: 0, library_doc_id: 0
}, conf = {}) => axios.post('/v1/library/doc/remove', param, conf);

// 获取文档信息
export const axiosLibraryDocInfo = (param = {
    library_id: 0, library_doc_id: 0
}, conf = {}) => axios.post('/v1/library/doc/info', param, conf);

// 获取文档列表
export const axiosLibraryDocList = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/doc/collection', param, conf);

// 修改文档所属上级分组
export const axiosLibraryDocSort = (param = {
    library_id: 0, library_doc_id: 0, parent_group_id: 0
}, conf = {}) => axios.post('/v1/library/doc/sort', param, conf);