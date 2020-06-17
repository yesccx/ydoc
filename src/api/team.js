import axios from '@/kernel/axios';

// 创建团队
export const axiosTeamCreate = (param = {
    name: '', desc: ''
}, conf = {}) => axios.post('/team/create', param, conf);

// 修改团队
export const axiosTeamModify = (param = {
    team_id: 0, name: '', desc: ''
}, conf = {}) => axios.post('/team/modify', param, conf);

// 获取团队信息
export const axiosTeamInfo = (param = { team_id: 0 }, conf = {}) => axios.post('/team/info', param, conf);

// 删除团队
export const axiosTeamRemove = (param = {}, conf = {}) => axios.post('/team/remove', param, conf);

// 获取团队列表
export const axiosTeamList = (param = {}, conf = {}) => axios.post('/team/list', param, conf);

// 获取团队成员
export const axiosTeamMembers = (param = { team_id: 0 }, conf = {}) => axios.post('/team/members', param, conf);

// 邀请用户成为团队成员
export const axiosTeamInviteMembers = (param = { team_id: 0, member_ids: [] }, conf = {}) => axios.post('/team/inviteMembers', param, conf);

// 将用户移出团队
export const axiosTeamUninviteMember = (param = { team_id: 0, member_id: 0 }, conf = {}) => axios.post('/team/uninviteMember', param, conf);