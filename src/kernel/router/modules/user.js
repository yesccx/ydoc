import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/user/center',
        name: 'user-center',
        meta: {
            title: '用户中心',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/user/user-center.vue')
    },
    {
        path: '/user/password',
        name: 'user-password',
        meta: {
            title: '用户修改密码',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/user/user-password.vue')
    },
    {
        path: '/user/message',
        name: 'user-message',
        meta: {
            title: '用户消息',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/user/user-message.vue')
    }
];