/*
 * Request API Collect
 *
 * @Created: 2020-01-10 13:41:04
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Utils from '@/common/utils/global-utils';

const ApiCollect = {};
const apiFiles = require.context('@/api', false, /\.js$/);

// apiCall 处理器
// PS: 可以修改该函数 做api request/repsonse hook
const apiCallHandler = (apiCall) => (param = {}, conf = {}) => {
    return apiCall(param, conf);
};

// 遍历api文件，收集apiCall
apiFiles && apiFiles.keys().forEach(key => {
    // 提取api模块名
    const apiFileInfo = key.match(/^\.\/(.+)\.js$/);
    if (!apiFileInfo) {
        return true;
    }
    let moduleKey = apiFileInfo[1];
    moduleKey = moduleKey.replace(/(-[a-z])/g, (v) => (v.replace('-', '').toUpperCase())).replace(/([a-z])/, (v) => (v.toUpperCase()));

    // 收集当前模块下的apiCall
    const moduleApis = {};
    Utils.ForEach(apiFiles(key), function (apiCall, name) {
        if (!name) {
            return true;
        }

        const apiName = name.replace(/^axios/, '');
        moduleApis[apiName] = apiCallHandler(apiCall);
    });
    ApiCollect[moduleKey] = moduleApis;
});

// 兼容不加模块名的情况下直接调整（api名与module名冲突时，需要按module.api的方式调用）
Utils.ForEach(ApiCollect, function (apiModule) {
    Utils.ForEach(apiModule, function (api, apiName) {
        if (ApiCollect[apiName]) {
            return true;
        }
        ApiCollect[apiName] = api;
    });
});

export default ApiCollect;