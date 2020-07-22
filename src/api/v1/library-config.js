import axios from '@/kernel/axios';

// 获取文档库配置值
export const axiosLibraryConfigValue = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/config/value', param, conf);

// 获取文档库配置项值
export const axiosLibraryConfigFieldValue = (param = {
    library_id: 0, field: ''
}, conf = {}) => axios.post('/v1/library/config/field-value', param, conf);

// 修改文档库配置值
export const axiosLibraryConfigModify = (param = {
    library_id: 0, config: []
}, conf = {}) => axios.post('/v1/library/config/modify', param, conf);

// 获取文档库配置项值
export const axiosLibraryConfigFieldModify = (param = {
    library_id: 0, field: '', value: ''
}, conf = {}) => axios.post('/v1/library/config/field-modify', param, conf);

// 获取文档库成员配置值
export const axiosLibraryConfigMemberValue = (param = {
    library_id: 0
}, conf = {}) => axios.post('/v1/library/config/member-value', param, conf);

// 获取文档库成员配置项值
export const axiosLibraryConfigMemberFieldValue = (param = {
    library_id: 0, field: ''
}, conf = {}) => axios.post('/v1/library/config/member-field-value', param, conf);

// 修改文档库成员配置值
export const axiosLibraryConfigMemberModify = (param = {
    library_id: 0, config: []
}, conf = {}) => axios.post('/v1/library/config/member-modify', param, conf);

// 获取文档库成员配置项值
export const axiosLibraryConfigMemberFieldModify = (param = {
    library_id: 0, field: '', value: ''
}, conf = {}) => axios.post('/v1/library/config/member-field-modify', param, conf);