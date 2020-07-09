/*
 * 应用常量
 *
 * @Created: 2020-07-09 11:32:28
 * @Author: yesc (yes.ccx@gmail.com)
 */

// 应用当前模式
export const APP_ENV_IS_DEV = process.env.NODE_ENV === 'development';

// 应用根级url
export const APP_ROOT_URL = window.location.origin + (APP_ENV_IS_DEV ? '/#' : '');