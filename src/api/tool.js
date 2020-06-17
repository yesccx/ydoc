import axios from '@/kernel/axios';

// 查找用户
export const axiosToolMemberSearch = (param = { search_key: '' }, conf = {}) => axios.post('/tool/member/search', param, conf);