/*
 * 链接跳转
 *
 * @Created: 2020-07-10 08:16:40
 * @Author: yesc (yes.ccx@gmail.com)
 */

const bindHooK = function (el, params) {
    updateHook(el, params);
    el.classList.add('pointer');
    el.addEventListener('click', clickHandler);
};

const unBindHooK = function (el) {
    el.removeEventListener('click', clickHandler);
    el.classList.remove('pointer');
};

const updateHook = function (el, params) {
    el.dataset.url = params.value || '';
    el.dataset.mopen = params.modifiers.open ? 1 : 0;
};

// 单击事件处理
const clickHandler = function ({ target }) {
    let url = target.dataset.url || '';
    if (!url) {
        return false;
    }

    if (target.dataset.mopen >> 0 === 1) {
        window.open(url);
    } else {
        window.location.href = url;
    }
};

export default {
    bind: bindHooK,
    update: updateHook,
    unbind: unBindHooK
};