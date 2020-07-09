/*
 * 剪贴板复制 指令
 *
 * @Created: 2020-07-09 11:50:10
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Clipboard from 'clipboard';
import Tip from '@/common/utils/tip';

let $buttonCollection = {};
let $clipboardCollection = {};
let $valueCollection = {};

// 虚拟剪贴板初始化
const virtualClipboardInit = function () {
    // 生成唯一id
    const virtualId = Date.now() + Math.random().toString().replace(/^0\./, '');

    // 创建虚拟button
    const $button = document.createElement('button');
    $button.classList.add('hidden');
    document.body.appendChild($button);

    // 初始化剪贴板功能
    const $clipboard = new Clipboard($button, {
        text: () => $valueCollection[virtualId]
    }).on('success', (e) => {
        Tip.success('复制成功！');
    }).on('error', (e) => {
        Tip.error('当前浏览器不支持，请手动复制！');
    });

    // 保存数据对象
    $buttonCollection[virtualId] = $button;
    $clipboardCollection[virtualId] = $clipboard;
    $valueCollection[virtualId] = '';

    return virtualId;
};

// 绑定时，初始化click事件
const bindHook = function (el) {
    const virtualId = virtualClipboardInit();
    el.classList.add('pointer');
    el.dataset.virtualId = virtualId;
    el.addEventListener('click', function () {
        $buttonCollection[virtualId].click();
    });
};

// 解绑时，回收处理
const unBindHook = function (el) {
    const virtualId = el.dataset.virtualId;
    $clipboardCollection[virtualId].destroy();
    $buttonCollection[virtualId].remove();
    el.classList.remove('pointer');
};

// 值内容更新
const updateHook = function (el, params) {
    const virtualId = el.dataset.virtualId;
    $valueCollection[virtualId] = params.value || '';
};

export default {
    bind: bindHook,
    update: updateHook,
    unbind: unBindHook
};