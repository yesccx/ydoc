import { PAGE_AUTH_IS_USER } from '@/common/constants/page-auth';

export default [
    {
        path: '/library/create',
        name: 'library-create',
        meta: {
            title: '创建文档库',
            ...PAGE_AUTH_IS_USER,
            header: true
        },
        component: () => import('@/pages/library/library-create.vue')
    },
    {
        path: '/library/manager',
        children: [{
            path: 'info',
            name: 'library-info',
            meta: {
                title: '基本信息',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-info.vue')
            }
        }, {
            path: 'preference',
            name: 'library-preference',
            meta: {
                title: '偏好设置',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-preference.vue')
            }
        }, {
            path: 'settings',
            name: 'library-settings',
            meta: {
                title: '其他设置',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-settings.vue')
            }
        }, {
            path: 'members',
            name: 'library-members',
            meta: {
                title: '成员管理',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-members.vue')
            }
        }, {
            path: 'groups',
            name: 'library-groups',
            meta: {
                title: '用户组管理',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-groups.vue')
            }
        }, {
            path: 'shares',
            name: 'library-shares',
            meta: {
                title: '分享管理',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-shares.vue')
            }
        }, {
            path: 'logs',
            name: 'library-logs',
            meta: {
                title: '操作日志',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-logs.vue')
            }
        }, {
            path: 'open',
            name: 'library-open',
            meta: {
                title: '开放API',
                ...PAGE_AUTH_IS_USER,
                header: true
            },
            components: {
                manager: () => import('@/pages/library/manager/library-open.vue')
            }
        }],
        component: () => import('@/pages/library/library-manager.vue')
    },
    {
        path: '/library/content',
        name: 'library-content',
        meta: {
            title: '文档库内容',
            ...PAGE_AUTH_IS_USER
        },
        component: () => import('@/pages/library/library-content.vue')
    },
    {
        path: '/library/preview',
        name: 'library-preview',
        meta: {
            title: '文档库预览内容'
        },
        component: () => import('@/pages/library/library-preview.vue')
    }
];