import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/user/info',
        name: 'user-info',
        meta: {
            title: '用户信息',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/user/user-info.vue')
    }
];