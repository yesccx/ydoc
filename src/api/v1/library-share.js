import axios from '@/kernel/axios';

// 获取用户文档库文档分享信息
export const axiosLibraryMemberDocShareInfo = (param = {
    libray_id: 0, library_doc_id: 0
}, conf = {}) => axios.post('/v1/library/member-share/doc-share-info', param, conf);

// 用户文档库文档分享
export const axiosLibraryMemberDocShare = (param = {
    libray_id: 0, library_doc_id: 0, share_code: '', share_name: '', share_desc: '', access_password: '', expire_time: 0
}, conf = {}) => axios.post('/v1/library/member-share/doc-share', param, conf);

// 用户文档库文档取消分享
export const axiosLibraryMemberDocShareCancel = (param = {
    libray_id: 0, library_doc_id: 0
}, conf = {}) => axios.post('/v1/library/member-share/doc-share-cancel', param, conf);

// 获取用户文档库文档分享信息
export const axiosLibraryMemberLibraryShareInfo = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/member-share/library-share-info', param, conf);

// 用户文档库文档分享
export const axiosLibraryMemberLibraryShare = (param = {
    libray_id: 0, share_code: '', share_name: '', share_desc: '', access_password: '', expire_time: 0
}, conf = {}) => axios.post('/v1/library/member-share/library-share', param, conf);

// 用户文档库文档取消分享
export const axiosLibraryMemberLibraryShareCancel = (param = {
    libray_id: 0
}, conf = {}) => axios.post('/v1/library/member-share/library-share-cancel', param, conf);