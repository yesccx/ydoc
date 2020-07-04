import axios from '@/kernel/axios';

// 获取文档库文档历史记录列表
export const axiosLibraryDocHistoryList = (param = {
    library_id: 0, library_doc_id: 0
}, conf = {}) => axios.post('/v1/library/doc-history/list', param, conf);

// 获取文档库文档历史记录信息
export const axiosLibraryDocHistoryInfo = (param = {
    library_id: 0, doc_history_id: 0
}, conf = {}) => axios.post('/v1/library/doc-history/info', param, conf);