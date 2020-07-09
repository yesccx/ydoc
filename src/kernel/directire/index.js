import Vue from 'vue';
import { ForEach } from '@/common/utils/global-utils';

// 遍历收集自定义指令集
let directireCollection = {};
const moduleFiles = require.context('@/kernel/directire/modules', true, /\.js$/);
moduleFiles.keys().forEach(key => {
    // 默认取文件名做为指令名
    let directireName = moduleFiles(key).default.directireName;
    if (!directireName) {
        let matchName = key.match(/([\w|-]+?)\.js$/);
        directireName = (Array.isArray(matchName) && matchName[1]) ? matchName[1] : '';
    }
    directireName = directireName.replace(/^v-/, '');
    if (directireName) {
        directireCollection[directireName] = moduleFiles(key).default;
    }
});

ForEach(directireCollection, (directire, key) => {
    Vue.directive(key, directire);
});
