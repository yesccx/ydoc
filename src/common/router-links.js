import router from '@/kernel/router';

const routeLink = (name, query = {}, options = {}) => {
    const type = options.is_replace ? 'replace' : 'push';
    return router[type]({ name, query });
};

// 前往用户登录页
export const RouterLinkLogin = (query = {}, options = {}) => {
    routeLink('user-login', query, options);
};

// 前往用户信息页
export const RouterLinkUserInfo = (query = {}, options = {}) => {
    routeLink('user-info', query, options);
};

// 前往用户密码页
export const RouterLinkUserPassword = (query = {}, options = {}) => {
    routeLink('user-password', query, options);
};

// 前往用户注册页
export const RouterLinkRegister = (query = {}, options = {}) => {
    routeLink('user-register', query, options);
};

// 前往Home页
export const RouterLinkHome = (query = {}, options = {}) => {
    routeLink('home', query, options);
};

// 前往文档库创建页
export const RouterLinkLibraryCreate = (query = {}, options = {}) => {
    routeLink('library-create', query, options);
};

// 前往文档库管理-信息页
export const RouterLinkLibraryInfo = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-info', query, options);
};

// 前往文档库管理-成员管理页
export const RouterLinkLibraryMembers = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-members', query, options);
};

// 前往文档库管理-相关设置页
export const RouterLinkLibrarySettings = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-settings', query, options);
};

// 前往文档库管理-开放API页
export const RouterLinkLibraryOpen = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-open', query, options);
};

// 前往文档库管理-操作日志页
export const RouterLinkLibraryLogs = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-logs', query, options);
};

// 前往文档库管理-分享管理页
export const RouterLinkLibraryShares = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-shares', query, options);
};

// 前往文档库管理-用户组管理页
export const RouterLinkLibraryGroups = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-groups', query, options);
};

// 前往文档库分组管理页
export const RouterLinkLibraryGroupManager = (query = {}, options = {}) => {
    routeLink('library-group-manager', query, options);
};

// 前往文档库内容（文档列表页）
export const RouterLinkLibraryContent = (query = { library_id: 0 }, options = {}) => {
    routeLink('library-content', query, options);
};

// 前往文档库文档修改页
export const RouterLinkLibraryDocModify = (query = { library_id: 0, doc_id: 0 }, options = {}) => {
    routeLink('library-doc-modify', query, options);
};

// 前往文档库文档修改页
export const RouterLinkLibraryDocCreate = (query = { library_id: 0, group_id: 0 }, options = {}) => {
    routeLink('library-doc-modify', query, options);
};

// 前往团队主页
export const RouterLinkTeamHome = (query = {}, options = {}) => {
    routeLink('team-home', query, options);
};

// 前往团队管理-信息页
export const RouterLinkTeamInfo = (query = { team_id: 0 }, options = {}) => {
    routeLink('team-info', query, options);
};

// 前往团队管理-成员管理页
export const RouterLinkTeamMembers = (query = { team_id: 0 }, options = {}) => {
    routeLink('team-members', query, options);
};

// 前往团队管理-相关设置页
export const RouterLinkTeamSettings = (query = { team_id: 0 }, options = {}) => {
    routeLink('team-settings', query, options);
};

// 返回上一页
export const RouterLinkBack = () => {
    router.go(-1);
};