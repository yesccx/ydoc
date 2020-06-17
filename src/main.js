import Vue from 'vue';
import App from '@/app.vue';
import router from '@/kernel/router';
import store from '@/kernel/store';
import '@/kernel/app-init.js';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');