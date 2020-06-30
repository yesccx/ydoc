/*
 * Request API Collect
 *
 * @Created: 2020-01-10 13:41:04
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Utils from '@/common/utils/global-utils';

const ApiCollection = {};
const apiFiles = require.context('@/api', true, /\.js$/);

// apiCall 处理器
// PS: 可以修改该函数 做api request/repsonse hook
const apiCallHandler = (apiCall) => (param = {}, conf = {}) => {
    return apiCall(param, conf);
};

// 遍历api文件，收集apiCall
apiFiles && apiFiles.keys().forEach(key => {
    // 提取api文件信息
    const apiFileInfo = key.match(/^\.\/(v\d)\/(.+)\.js$/);
    if (!apiFileInfo) {
        return true;
    }

    // 处理版本号、模块名
    const apiVersion = apiFileInfo[1];
    let moduleKey = apiFileInfo[2];
    moduleKey = moduleKey.replace(/(-[a-z])/g, (v) => (v.replace('-', '').toUpperCase())).replace(/([a-z])/, (v) => (v.toUpperCase()));

    // 收集当前模块下的apiCall，按版本号->模块名 分组
    ApiCollection[apiVersion] = ApiCollection[apiVersion] || {};
    const moduleApiCollection = {};
    Utils.ForEach(apiFiles(key), function (apiCall, name) {
        if (!name) {
            return true;
        }

        const apiName = name.replace(/^axios/, '');
        moduleApiCollection[apiName] = apiCallHandler(apiCall);
    });
    ApiCollection[apiVersion][moduleKey] = moduleApiCollection;
});

// 兼容不加模块名的情况下直接调整（api名与module名冲突时，需要按module.api.v(x)的方式调用）
Utils.ForEach(ApiCollection, function (collection, apiVersion) {
    Utils.ForEach(collection, function (moduleApiCollection, moduleKey) {
        Utils.ForEach(moduleApiCollection, function (api, apiName) {
            if (ApiCollection[apiVersion][apiName]) {
                return true;
            }
            ApiCollection[apiVersion][apiName] = api;
        });
    });
});

export default ApiCollection;