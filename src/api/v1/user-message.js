import axios from '@/kernel/axios';

// 用户消息列表
export const axiosUserMessageList = (param = {
    search_key: '', search_status: -1
}, conf = {}) => axios.post('/v1/user/message/list', param, conf);

// 用户消息信息
export const axiosUserMessageInfo = (param = {
    message_id: 0
}, conf = {}) => axios.post('/v1/user/message/info', param, conf);

// 用户消息标记已读
export const axiosUserMessageRead = (param = {
    message_id: 0
}, conf = {}) => axios.post('/v1/user/message/read', param, conf);

// 用户消息标记未读
export const axiosUserMessageUnread = (param = {
    message_id: 0
}, conf = {}) => axios.post('/v1/user/message/unread', param, conf);

// 所有用户消息标记已读
export const axiosUserMessageReadAll = (param = {}, conf = {}) => axios.post('/v1/user/message/read-all', param, conf);

// 用户消息删除
export const axiosUserMessageRemove = (param = {
    message_id: 0
}, conf = {}) => axios.post('/v1/user/message/remove', param, conf);

// 获取用户消息数统计
export const UserMessageCount = (param = { status: -1 }, conf = {}) => axios.post('/v1/user/message/count', param, conf);

// 获取用户消息数统计
export const UserMessageCountAll = (param = {}, conf = {}) => axios.post('/v1/user/message/count-all', param, conf);
