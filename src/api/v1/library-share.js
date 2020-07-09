import axios from '@/kernel/axios';

// 获取文档库分享信息
export const axiosLibraryShareInfo = (param = {
    share_code: '', share_access_password: ''
}, conf = {}) => axios.post('/v1/library/share/info', param, conf);

// 获取文档库分享的文档集合
export const axiosLibraryShareDocCollection = (param = {
    share_code: '', share_access_password: ''
}, conf = {}) => axios.post('/v1/library/share/doc-collection', param, conf);

// 获取文档库分享的文档树
export const axiosLibraryShareDocGroupTree = (param = {
    share_code: '', share_access_password: ''
}, conf = {}) => axios.post('/v1/library/share/doc-group-tree', param, conf);

// 获取文档库分享的文档信息
export const axiosLibraryShareDocInfo = (param = {
    share_code: '', share_access_password: '', doc_id: 0
}, conf = {}) => axios.post('/v1/library/share/doc-info', param, conf);