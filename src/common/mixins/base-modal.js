// 模态框组件的基本属性
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        visible(val) {
            this.visibleModal = val;
        },
        visibleModal(val) {
            this.$emit('update:visible', val);
            if (!val) {
                this.$emit('close', this.$data);
            } else {
                this.onModalOpen && this.onModalOpen();
            }
        }
    },
    data() {
        return {
            visibleModal: this.visible,
            loadingModal: false
        };
    },
    methods: {
        // 事件：关闭Modal
        onClose() {
            this.visibleModal = false;
        }
    }
};