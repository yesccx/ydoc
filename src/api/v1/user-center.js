import axios from '@/kernel/axios';

// 用户信息
export const axiosUserInfo = (param = {}, conf = {}) => axios.post('/v1/user/center/user-info', param, conf);

// 用户退出登录
export const axiosUserLogout = (param = {}, conf = {}) => axios.post('/v1/user/center/user-logout', param, conf);

// 用户昵称修改
export const axiosUserNicknameModify = (param = {
    nickname: ''
}, conf = {}) => axios.post('/v1/user/center/user-nickname-modify', param, conf);

// 用户密码修改
export const axiosUserPasswordModify = (param = {
    old_password: '', new_password: ''
}, conf = {}) => axios.post('/v1/user/center/user-password-modify', param, conf);