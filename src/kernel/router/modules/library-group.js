import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/library-group/manager',
        name: 'library-group-manager',
        meta: {
            title: '文档库分组管理',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/library-group/library-group-manager.vue')
    }
];