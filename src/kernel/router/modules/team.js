import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/team/home',
        name: 'team-home',
        meta: {
            title: '团队中心',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/team/team-home.vue')
    },
    {
        path: '/team/manager',
        children: [{
            path: 'info',
            name: 'team-info',
            meta: {
                title: '基本信息',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/team/manager/team-info.vue')
            }
        }, {
            path: 'members',
            name: 'team-members',
            meta: {
                title: '成员管理',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/team/manager/team-members.vue')
            }
        }, {
            path: 'settings',
            name: 'team-settings',
            meta: {
                title: '相关设置',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/team/manager/team-settings.vue')
            }
        }],
        component: () => import('@/pages/team/team-manager.vue')
    }
];