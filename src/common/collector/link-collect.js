/*
 * Router Link Collect
 *
 * @Created: 2020-03-23 22:39:25
 * @Author: yesc (yes.ccx@gmail.com)
 */

import * as RouterLinks from '@/common/router-links';

const RouterLinkCollect = {};

// 遍历api文件，收集apiCall
RouterLinks && Object.keys(RouterLinks).forEach(key => {
    // 提取link名称
    const linkInfo = key.match(/^RouterLink(.+)$/);
    if (!linkInfo) {
        return true;
    }

    // key名格式化
    let linkName = linkInfo[1];
    linkName = linkName.replace(/^([A-Z])/, (v) => (v.toLowerCase()));

    RouterLinkCollect[linkName] = RouterLinks[key];
});

export default RouterLinkCollect;