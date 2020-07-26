<template>
    <div class="c-library-drawer-doc-template-info">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="400px"
            :modal-append-to-body="false">
            <div class="content-drawer__content">
                <el-form :model="templateInfo" label-position="top">
                    <el-form-item label="模板名称">
                        <el-input v-model="templateInfo.name" placeholder="请输入模板名称" autocomplete="off" maxlength="32"
                            show-word-limit clearable></el-input>
                    </el-form-item>
                    <el-form-item label="模板简介">
                        <el-input v-model="templateInfo.introduction" type="textarea" rows="4" maxlength="255"
                            placeholder="请输入模板简介" resize="none" show-word-limit></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <el-alert v-show="templateInfo.id > 0" title="该操作同时会保存正在编辑的模板内容！" type="info" :closable="false" show-icon>
            </el-alert>
            <div class="content-drawer__footer">
                <el-popconfirm @onConfirm="onReset" icon="el-icon-warning" title="是否确认重置？">
                    <el-button slot="reference" type="danger">重 置</el-button>
                </el-popconfirm>
                <el-button type="primary" :loading="saveLoading" @click="onDocTemplateSave">保 存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-drawer-doc-template-info',
        mixins: [BaseDrawer, LibraryContent],
        computed: {
            title() {
                return this.templateInfo.id ? '模板信息' : '另存为模板';
            }
        },
        data() {
            return {
                templateInfo: {
                    id: 0,
                    name: '',
                    content: '',
                    editor: '',
                    introduction: ''
                },
                templateInfoBackup: {},
                saveLoading: false
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('editor-doc-template-info', (templateInfo) => {
                    // 准备模板信息
                    this.templateInfo = templateInfo;
                    this.templateInfoBackup = this.$utils.CloneDeep(templateInfo);

                    // 初始化
                    this.visibleDrawer = true;
                });
            },
            // 事件：模板保存
            onDocTemplateSave() {
                this.$api.v1.LibraryDocTemplateCreate(this.templateInfo, {
                    loading: (status) => { this.saveLoading = status; }
                }).then(({ resData }) => {
                    this.$tip.success('保存成功');
                    this.visibleDrawer = false;
                });
            },
            // 事件：重置编辑内容
            onReset() {
                const templateInfoBackup = this.$utils.CloneDeep(this.templateInfoBackup);
                this.templateInfo.name = templateInfoBackup.name;
                this.templateInfo.introduction = templateInfoBackup.introduction;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-doc-template-info {
        .el-drawer {
            &__header {
                font-weight: bold;
                font-size: 20px;
            }

            &__body {
                padding: 20px;
                display: flex;
                flex-direction: column;
                .el-form-item__label {
                    font-weight: bold;
                }
            }
        }

        .el-drawer .content-drawer {
            &__content {
                height: 100%;
                & form {
                    flex: 1;
                }
                label {
                    color: $--color-primary-light-4;
                }
            }
            &__footer {
                display: flex;
                justify-content: space-between;
                > button,
                > span {
                    width: 49%;
                    button {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>