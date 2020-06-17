import axios from '@/kernel/axios';

// 创建文档
export const axiosLibraryDocCreate = (param = {
    library_id: 0, group_id: 0, title: '', content: ''
}, conf = {}) => axios.post('/library/doc/create', param, conf);

// 编辑文档
export const axiosLibraryDocModify = (param = {
    id: 0, library_id: 0, group_id: 0, title: '', content: ''
}, conf = {}) => axios.post('/library/doc/modify', param, conf);

// 删除文档
export const axiosLibraryDocRemove = (param = {
    doc_id: 0
}, conf = {}) => axios.post('/library/doc/remove', param, conf);

// 获取文档信息
export const axiosLibraryDocInfo = (param = {
    library_id: 0, doc_id: 0
}, conf = {}) => axios.post('/library/doc/info', param, conf);

// 获取文档列表
export const axiosLibraryDocList = (param = {
    library_id: 0
}, conf = {}) => axios.post('/library/doc/list', param, conf);

// 修改文档所属上级分组
export const axiosLibraryDocModifyGroup = (param = {
    library_id: 0, doc_id: 0, parent_group_id: 0
}, conf = {}) => axios.post('/library/doc/modifyGroup', param, conf);