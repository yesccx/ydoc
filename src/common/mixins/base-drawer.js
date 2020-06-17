// Drawer组件的基本属性
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        visible(val) {
            this.visibleDrawer = val;
        },
        visibleDrawer(val) {
            this.$emit('update:visible', val);
            if (!val) {
                this.$emit('close', this.$data);
            } else {
                this.onDrawerOpen && this.onDrawerOpen();
            }
        }
    },
    data() {
        return {
            visibleDrawer: this.visible,
            loadingDrawer: false
        };
    }
};