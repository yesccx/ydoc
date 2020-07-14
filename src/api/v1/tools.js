import axios from '@/kernel/axios';

// 获取用户集合
export const axiosToolsMemberCollection = (param = {
    limit: 0, search_key: ''
}, conf = {}) => axios.post('/v1/tools/member/collection', param, conf);

// 图片上传（单个图片）
export const axiosToolsImageUpload = (param = {}, conf = {}) => axios.post('/v1/tools/image/upload', param, conf);

// 临时图片随机生成
export const axiosToolsImageRandomTmp = (param = {
    key: ''
}, conf = {}) => axios.post('/v1/tools/image/random-tmp', param, conf);