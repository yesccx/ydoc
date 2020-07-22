<!-- 设置文档默认模板Modal -->
<template>
    <el-dialog class="c-config-doc-template-modal" v-loading="loadingModal" :visible.sync="visibleModal" title="设置文档默认模板"
        width="400px">
        <el-select class="template-select" v-model="selectTemplate" placeholder="请选择模板" clearable>
            <el-option v-for="template in templateCollection" :key="template.id" :label="template.name" :value="template.id">
                <span class="template-label">{{ template.name }}</span>
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
        name: 'c-config-doc-template-modal',
        mixins: [BaseModal],
        props: {
            defaultTemplate: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                selectTemplate: '',
                templateCollection: [],
                confirmLoading: false
            };
        },
        methods: {
            // 初始化文档模板集合
            async initDocTemplateCollection(force = false) {
                if (this.templateCollection.length !== 0 && !force) {
                    return true;
                }

                await this.$api.v1.LibraryDocTemplateCollection({}, {
                    loading: (status) => { this.loadingModal = status; }
                }).then(({ resData }) => {
                    this.templateCollection = resData;
                });
            },
            // 事件：modal被打开（做初始化）
            onModalOpen() {
                const defaultTemplate = this.defaultTemplate;
                this.selectTemplate = defaultTemplate >> 0 === 0 ? '' : defaultTemplate;
                this.initDocTemplateCollection(true);
            },
            // 事件：确认修改默认模板
            onConfirm() {
                this.$emit('template-modify', {
                    selectTemplate: this.selectTemplate,
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
    .template {
        &-select {
            width: 100%;
        }

        &-label {
            float: left;
        }
    }
</style>
