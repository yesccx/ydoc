import axios from '@/kernel/axios';

// 用户账号登录
export const axiosGuestUserAccountLogin = (param = {
    account: '', password: ''
}, conf = {}) => axios.post('/guest/user/account-login', param, conf);

// 用户账号注册
export const axiosGuestUserAccountRegister = (param = {
    account: '', password: '', email: ''
}, conf = {}) => axios.post('/guest/user/account-register', param, conf);