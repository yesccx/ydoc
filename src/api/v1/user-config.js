import axios from '@/kernel/axios';

// 获取用户配置值
export const axiosUserConfigValue = (param = {}, conf = {}) => axios.post('/v1/user/config/value', param, conf);

// 获取用户配置项值
export const axiosUserConfigFieldValue = (param = {
    field: ''
}, conf = {}) => axios.post('/v1/user/config/field-value', param, conf);

// 修改用户配置值
export const axiosUserConfigModify = (param = {
    config: []
}, conf = {}) => axios.post('/v1/user/config/modify', param, conf);

// 获取用户配置项值
export const axiosUserConfigFieldModify = (param = {
    field: '', value: ''
}, conf = {}) => axios.post('/v1/user/config/field-modify', param, conf);

// 获取用户配置重置
export const axiosUserConfigReset = (param = {}, conf = {}) => axios.post('/v1/user/config/reset', param, conf);