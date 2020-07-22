<!-- 设置文档库默认视图风格Modal -->
<template>
    <el-dialog class="c-config-library-style-modal" :visible.sync="visibleModal" title="设置文档默认视图风格" width="400px">
        <el-select class="style-select" v-model="selectStyle" placeholder="请选择风格" clearable>
            <el-option v-for="style in styleCollection" :key="style.value" :label="style.label" :value="style.value">
                <span class="style-label">{{ style.label }}</span>
                <span class="style-desc">{{ style.desc }}</span>
            </el-option>
        </el-select>

        <span slot="footer">
            <el-button type="primary" :loading="confirmLoading" @click="onConfirm" size="mini">确认修改</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';

    export default {
        name: 'c-config-library-style-modal',
        mixins: [BaseModal],
        props: {
            defaultStyle: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                selectStyle: this.defaultStyle,
                styleCollection: [{
                    value: 'medium',
                    desc: '页面宽度：700px',
                    label: '标宽视图'
                }, {
                    value: 'full',
                    desc: '页面宽度：铺满',
                    label: '超宽视图'
                }],
                confirmLoading: false
            };
        },
        methods: {
            // 事件：modal被打开（做初始化）
            onModalOpen() {
                this.selectStyle = this.defaultStyle;
            },
            // 事件：确认修改默认风格
            onConfirm() {
                this.$emit('style-modify', {
                    selectStyle: this.selectStyle,
                    handleLoading: (status) => {
                        this.confirmLoading = status;
                    },
                    done: () => {
                        this.visibleModal = false;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .style {
        &-select {
            width: 100%;
        }

        &-label {
            float: left;
        }

        &-desc {
            float: right;
            color: $--color-primary-light-6;
            font-size: 13px;
        }
    }
</style>
