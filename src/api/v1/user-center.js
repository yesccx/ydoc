import axios from '@/kernel/axios';

// 用户信息
export const axiosUserInfo = (param = {}, conf = {}) => axios.post('/v1/user/center/user-info', param, conf);

// 用户退出登录
export const axiosUserLogout = (param = {}, conf = {}) => axios.post('/v1/user/center/user-logout', param, conf);