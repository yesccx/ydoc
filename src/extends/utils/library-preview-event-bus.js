import Vue from 'vue';

export default new Vue({
    data() {
        return {
            loading: true
        };
    },
    methods: {
        // 销毁（取消所有监听的事件）
        destroy() {
            this.$off();
        }
    }
});