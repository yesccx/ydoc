/*
 * 应用初始化
 *
 * @Created: 2019-03-22 10:12:15
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Vue from 'vue';
import Axios from '@/kernel/axios';
import Utils from '@/common/utils/global-utils';
import Tip from '@/common/utils/tip';
import ApiCollect from '@/common/collector/api-collect';
import LinkCollect from '@/common/collector/link-collect';
import NProgress from 'nprogress';
import '@/plugins/element/element.js';
import 'normalize.css';
import 'nprogress/nprogress.css';

// 初始化配置
Vue.config.productionTip = false;

NProgress.configure({ showSpinner: false });

// 初始化挂载
const _initMount = () => {
    Vue.prototype.$ajax = Axios;
    Vue.prototype.$utils = Utils;
    Vue.prototype.$api = ApiCollect;
    Vue.prototype.$link = LinkCollect;
    Vue.prototype.$tip = Tip;
    Vue.prototype.$fullLoading = new Utils.FullLoading();
};

// 初始化全局过滤器
const _initGlobalFilters = () => {
    Vue.filter('dateFormat', (val, format = '') => {
        return Utils.DateFormat(val, format);
    });
};

const init = () => {
    // 初始化挂载
    _initMount();

    // 初始化全局过滤器
    _initGlobalFilters();
};
init();