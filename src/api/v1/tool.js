import axios from '@/kernel/axios';

// 获取用户集合
export const axiosToolsMemberCollection = (param = {
    limit: 0, search_key: ''
}, conf = {}) => axios.post('/v1/tools/member/collection', param, conf);