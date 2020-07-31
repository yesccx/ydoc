// Drawer组件的基本属性
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        visible: {
            handler(val) {
                this.visibleDrawer = val;
            },
            immediate: true
        },
        visibleDrawer: {
            handler(val) {
                this.$emit('update:visible', val);
                if (!val) {
                    this.$emit('close', this.$data);
                } else {
                    this.onDrawerOpen && this.onDrawerOpen();
                }
            },
            immediate: true
        }
    },
    data() {
        return {
            visibleDrawer: this.visible,
            loadingDrawer: false
        };
    }
};