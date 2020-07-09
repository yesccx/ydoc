import Axios from 'axios';
import Store from '@/kernel/store';
import Tip from '@/common/utils/tip';
import ResponseCode from '@/common/constants/response-code';
import { RouterLinkLogin } from '@/common/router-links';

// 定义axios全局默认值
Axios.defaults.timeout = 30000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.withCredentials = true;

// 定义axios请求上下文
process.env.VUE_APP_API_BASE_URL && (Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL);

// 定义axios响应码
Axios.RESPONSE_SUCCESS = ResponseCode.RESPONSE_SUCCESS;
Axios.RESPONSE_ERROR = ResponseCode.RESPONSE_ERROR;
Axios.RESPONSE_LOGIN = ResponseCode.RESPONSE_LOGIN;

// 请求拦截器
Axios.interceptors.request.use(config => {
    handlerAxiosLoading(config, true);

    // 添加 auth请求头
    config.headers.token = Store.state.userSession.token || 'ydoc';

    return config;
}, err => Promise.reject(err));

// 响应拦截器
Axios.interceptors.response.use(
    res => {
        handlerAxiosLoading(res.config, false);

        if (!res.data) {
            Tip.error('内部错误或网络异常');
            return Promise.reject(res);
        }

        // 提示未登录时，需要做特殊处理
        if (!res.config.ignore_auth && res.data && res.data.code === Axios.RESPONSE_LOGIN) {
            RouterLinkLogin();
        }

        return buildResposne(res);
    },
    err => {
        handlerAxiosLoading(err.config, false);

        // TODO: 这里可选是直接跳转到error页
        // FIXME: 待做成参数配置项，可选提示方式
        Tip.error('内部错误或网络异常');
        return Promise.reject(err);
    }
);

// 处理请求中时的loading行为
const handlerAxiosLoading = function (config, stat = true) {
    if (!config || !config.loading) {
        return false;
    } else if (stat) {
        setTimeout(() => {
            config.loading && config.loading(true);
        }, 200);
    } else {
        config.loading(false);
        config.loading = false;
    }
};

// 处理响应内容并预判结果
const handlerAxiosAnticipation = function (resData) {
    const ResponseCodeMap = {
        [Axios.RESPONSE_SUCCESS]: 'resSuccess',
        [Axios.RESPONSE_ERROR]: 'resError',
        [Axios.RESPONSE_LOGIN]: 'resLogin'
    };
    const res = {
        $resSuccess: false,
        $resError: false,
        $resLogin: false
    };

    try {
        const resCode = resData.code;
        res['$' + ResponseCodeMap[resCode]] = true;
    } catch (err) {
        // value invalid
    }

    return res;
};

// 构建响应内容
const buildResposne = function (res) {
    const response = {
        res,
        ...handlerAxiosAnticipation(res.data),
        resData: res.data.data,
        resCode: res.data.code,
        resMsg: res.data.msg
    };
    if (!response.$resSuccess) {
        // 发生错误时是否上报
        if (!res.config.report) {
            Tip.error(response.resMsg);
            return new Promise(() => { });
        } else {
            return Promise.reject(response);
        }
    }
    return response;
};

export default Axios;