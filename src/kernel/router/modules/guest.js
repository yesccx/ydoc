import { PAGE_AUTH_IS_GUEST } from '@/common/constants/page-auth';

export default [
    {
        path: '/login',
        name: 'user-login',
        meta: {
            title: '登录',
            ...PAGE_AUTH_IS_GUEST,
            header: false
        },
        component: () => import('@/pages/guest/user-login.vue')
    },
    {
        path: '/register',
        name: 'user-register',
        meta: {
            title: '注册',
            ...PAGE_AUTH_IS_GUEST,
            header: false
        },
        component: () => import('@/pages/guest/user-register.vue')
    }
];