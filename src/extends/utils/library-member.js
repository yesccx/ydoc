
// 文档库用户角色key映射
export const MemberRoleKey = {
    'CREATOR': 1,
    'MANAGER': 2,
    'MEMBER': 3,
    'GUEST': 4
};

// 文档库用户状态key映射
export const MemberStatusKey = {
    'NORMAL': 0,
    'MEMBER': 1,
    'DISABLED': 2
};

// 文档库用户角色信息映射
export const MemberRoleMap = {
    [MemberRoleKey.CREATOR]: {
        name: '创建人',
        desc: '佣有所有权限（仅一个）',
        id: MemberRoleKey.CREATOR,
        style: 'danger'
    },
    [MemberRoleKey.MANAGER]: {
        name: '管理员',
        desc: '佣有成员、文档、文档库管理权限',
        id: MemberRoleKey.MANAGER,
        style: 'warning'
    },
    [MemberRoleKey.MEMBER]: {
        name: '普通成员',
        desc: '佣有文档的基本操作权限',
        id: MemberRoleKey.MEMBER,
        style: 'success'
    },
    [MemberRoleKey.GUEST]: {
        name: '只读成员',
        desc: '仅查看文档的权限',
        id: MemberRoleKey.GUEST,
        style: 'info'
    }
};

// 文档库用户状态信息映射
export const MemberStatusMap = {
    [MemberStatusKey.NORMAL]: {
        name: '审核中',
        desc: '',
        id: MemberStatusKey.NORMAL
    },
    [MemberStatusKey.MEMBER]: {
        name: '正式成员',
        desc: '',
        id: MemberStatusKey.MEMBER
    },
    [MemberStatusKey.DISABLED]: {
        name: '已禁用',
        desc: '',
        id: MemberStatusKey.DISABLED
    }
};