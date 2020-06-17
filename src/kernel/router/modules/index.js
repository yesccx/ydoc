import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '工作台',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/home.vue')
    },
    {
        path: '/error',
        name: 'error',
        meta: {
            title: '404',
            header: false
        },
        component: () => import('@/pages/404.vue')
    },
    {
        path: '*',
        redirect: { name: 'error' }
    }
];