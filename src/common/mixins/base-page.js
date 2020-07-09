export default {
    data() {
        return {
            pageLoading: true,
            pageFirstInited: false
        };
    },
    methods: {
        // 验证表单
        async checkValidate(ref) {
            if (this.$refs && this.$refs[ref]) {
                const checkRes = await this.$refs[ref].validate();
                return checkRes;
            }
            return false;
        },
        // 重置表单
        resetValidate(ref) {
            if (this.$refs && this.$refs[ref]) {
                this.$refs[ref].resetFields();
            }
        },
        // loading callable
        async loadaction(callable, loadingFlag) {
            this[loadingFlag] = true;
            const res = await callable();
            this[loadingFlag] = false;
            return res;
        }
    }
};