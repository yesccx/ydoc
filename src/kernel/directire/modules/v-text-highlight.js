/*
 * 文本关键字高亮
 *
 * @Created: 2020-07-28 22:04:30
 * @Author: yesc (yes.ccx@gmail.com)
 */

import TextHighlight from '@/common/utils/text-highlight';

const bindHook = function (el, params) {
    const content = el.innerHTML;
    const value = params.value;

    el.innerHTML = TextHighlight(content, value.trim());
};

const unBindHook = function (el) {
};

const updateHook = function (el, params) {
};

export default {
    bind: bindHook,
    update: updateHook,
    unbind: unBindHook
};