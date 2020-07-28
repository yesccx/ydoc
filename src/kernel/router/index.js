import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/kernel/store';
import { SetDocummentTitle } from '@/common/utils/global-utils';
import { PAGE_AUTH_IS_GUEST, PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';
import NProgress from 'nprogress';
import { APP_ENV_IS_DEV } from '@/common/constants/app-code';

Vue.use(Router);

// 遍历路由模块列表，初始化路由
let routerModuels = [];
const moduleFiles = require.context('@/kernel/router/modules', false, /\.js$/);
moduleFiles.keys().forEach(key => {
    routerModuels = routerModuels.concat(moduleFiles(key).default);
});
const RouterInstance = new Router({ mode: APP_ENV_IS_DEV ? '' : 'history', routes: [...routerModuels] });

// 路由守卫-前置
RouterInstance.beforeEach(async (to, from, next) => {
    if (to && from && to.name !== from.name) {
        NProgress.start();
        Store.commit('global/setPageLoading', true);
    }

    // 自动设置页面标题
    if (to.meta && to.meta.title) {
        SetDocummentTitle(to.meta.title);
    }

    // 初始化用户信息，基于该信息鉴权
    let userInfo = await Store.dispatch('userSession/init');
    if (to.meta.auth === PAGE_AUTH_IS_USER.auth && (!userInfo || userInfo.uid <= 0)) {
        NProgress.done();
        Store.commit('global/setPageLoading', false);
        next({ name: 'user-login', query: { r: to.fullPath } });
    } else if (to.meta.auth === PAGE_AUTH_IS_GUEST.auth && userInfo.uid > 0) {
        NProgress.done();
        Store.commit('global/setPageLoading', false);
        next('/');
    } else {
        next();
    }
});

// 路由守卫-后置
RouterInstance.afterEach(() => {
    Store.commit('global/setPageError', false);
    NProgress.done();
    Store.commit('global/setPageLoading', false);
});

export default RouterInstance;