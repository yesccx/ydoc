import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 遍历store模块列表，导入store（支持多级目录）
let storeModuels = {};
const moduleFiles = require.context('@/kernel/store/modules', true, /\.js$/);
moduleFiles.keys().forEach(key => {
    // 默认取文件名做为模块名
    let moduleName = moduleFiles(key).default.moduleName;
    if (!moduleName) {
        let matchName = key.match(/([\w|-]+?)\.js$/);
        moduleName = (Array.isArray(matchName) && matchName[1]) ? matchName[1] : false;
    }
    if (moduleName) {
        storeModuels[moduleName] = moduleFiles(key).default;
    }
});

export default new Vuex.Store({
    modules: storeModuels
});