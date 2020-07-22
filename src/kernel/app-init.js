/*
 * 应用初始化
 *
 * @Created: 2019-03-22 10:12:15
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Vue from 'vue';
import Axios from '@/kernel/axios';
import Store from '@/kernel/store';
import '@/kernel/directire';
import Utils from '@/common/utils/global-utils';
import Tip from '@/common/utils/tip';
import ApiCollection from '@/common/collector/api-collection';
import LinkCollection from '@/common/collector/link-collection';
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
    Vue.prototype.$api = ApiCollection;
    Vue.prototype.$link = LinkCollection;
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

    // 初始化用户会话期间的配置参数
    Store.dispatch('global/initUseSessionConfig');
};
init();