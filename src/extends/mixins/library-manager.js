import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('libraryManager', ['libraryInfo', 'libraryMember', 'libraryId'])
    },
    async created() {
        // 子组件初始化
        if (typeof this.moduleInitialize === 'function') {
            this.pageLoading = true;
            await this.moduleInitialize();
            this.pageLoading = false;
        }
    }
};