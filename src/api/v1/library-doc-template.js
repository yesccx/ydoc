import axios from '@/kernel/axios';

// 获取文档模板模板集合
export const axiosLibraryDocTemplateCollection = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/doc-template/collection', param, conf);

// 创建文档模板
export const axiosLibraryDocTemplateCreate = (param = {
    name: 0, content: '', introduction: ''
}, conf = {}) => axios.post('/v1/library/doc-template/create', param, conf);

// 编辑文档模板
export const axiosLibraryDocTemplateModify = (param = {
    library_doc_template_id: 0, name: 0, content: '', introduction: ''
}, conf = {}) => axios.post('/v1/library/doc-template/modify', param, conf);

// 删除文档模板
export const axiosLibraryDocTemplateRemove = (param = {
    library_doc_template_id: 0
}, conf = {}) => axios.post('/v1/library/doc-template/remove', param, conf);

// 获取文档模板信息
export const axiosLibraryDocTemplateInfo = (param = {
    library_doc_template_id: 0
}, conf = {}) => axios.post('/v1/library/doc-template/info', param, conf);
