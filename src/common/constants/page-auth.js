/*
 * 页面访问权限标识
 *
 * @Created: 2019-09-24 15:48:39
 * @Author: yesc (yes.ccx@gmail.com)
 */

// 游客标识（持有该标识时，必需在未登录状态）
export const PAGE_AUTH_IS_GUEST = { auth: 0 };

// 正常用户标识（持有该标识时，必需在登录状态）
export const PAGE_AUTH_IS_USER = { auth: 1 };

// 公开标识（持有该标识时，没有限制）
export const PAGE_AUTH_IS_PUBLIC = { auth: 2 };