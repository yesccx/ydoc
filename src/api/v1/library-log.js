import axios from '@/kernel/axios';

// 获取用户参与的文档库日志列表
export const axiosLibraryLogMemberLibraryLogList = (param = {

}, conf = {}) => axios.post('/v1/library/log/member-library-log-list', param, conf);