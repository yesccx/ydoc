<!-- 用户中心-用户偏好 -->
<template>
    <div class="c-user-center-preference">
        <el-card class="user-preference">
            <div slot="header">
                <p>
                    <span>相关偏好</span>
                    <el-popconfirm title="是否确认重置偏好设置？" @onConfirm="onResetPreference">
                        <el-button class="reset-preference" slot="reference" type="text" icon="el-icon-refresh"
                            :loading="resetPreferenceLoading">重置设置
                        </el-button>
                    </el-popconfirm>
                </p>
            </div>
            <ul>
                <li class="user-preference__item">
                    <div class="user-preference__item-content">
                        <span class="field">
                            <i class="el-icon-set-up"></i> <span>是否启用偏好设置</span>
                            <span class="field-tip">启用后，当您在文档库中未开启自定义偏好设置时，将使用该预设偏好设置</span>
                        </span>
                    </div>
                    <span class="user-preference__item-operate">
                        <el-switch v-show="!usePreferenceLoading" v-model="usePreferenceStatus"
                            @change="onPreferenceStatusChange"></el-switch>
                        <i class="el-icon-loading" v-show="usePreferenceLoading"></i>
                    </span>
                </li>
                <!-- <li class="user-preference__item">
                    <div class="user-preference__item-content">
                        <el-tooltip effect="dark" :open-delay="500" content="影响所有文档（包括已创建的）视图风格" placement="top-start">
                            <span class="field">文档默认视图风格 <i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <span class="value">{{ userConfigParse['library_default_style'] || '默认超宽风格' }}</span>
                    </div>
                    <span class="user-preference__item-operate" @click="onWillDocDefaultStyleModify">
                        修改 <i class="el-icon-arrow-right"></i>
                    </span>
                </li> -->
                <li class="user-preference__item">
                    <div class="user-preference__item-content">
                        <span class="field">
                            <i class="el-icon-document"></i> <span>文档默认模板</span>
                            <span class="field-tip">影响所有文档默认内容（内容取自模板）</span>
                        </span>
                    </div>
                    <span class="user-preference__item-operate" @click="onWillDocDefaultTemplateModify">
                        {{ userConfigParse['library_doc_default_template'] || '无' }} <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
                <li class="user-preference__item">
                    <div class="user-preference__item-content">
                        <span class="field">
                            <i class="el-icon-edit-outline"></i> <span>文档默认编辑器</span>
                            <span class="field-tip">新建文档时默认使用的编辑器（当未使用模板时才有效，否则依据模板的编辑器）</span>
                        </span>
                    </div>
                    <span class="user-preference__item-operate" @click="onWillDocDefaultEditorModify">
                        {{ userConfigParse['library_doc_default_editor'] || '无' }} <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
            </ul>
        </el-card>

        <!-- 文档库默认风格设置Modal -->
        <c-config-library-style-modal :default-style="docDefaultStyleModal.default" :visible.sync="docDefaultStyleModal.visible"
            @style-modify="onLibraryDefaultStyleModify" />

        <!-- 文档默认模板设置Modal -->
        <c-config-doc-template-modal :default-template="docDefaultTemplateModal.default"
            :visible.sync="docDefaultTemplateModal.visible" @template-modify="onDocDefaultTemplateModify" />

        <!-- 文档默认编辑器设置Modal -->
        <c-config-doc-editor-modal :default-editor="docDefaultEditorModal.default" :visible.sync="docDefaultEditorModal.visible"
            @editor-modify="onDocDefaultEditorModify" />
    </div>
</template>

<script>
    export default {
        name: 'c-user-center-preference',
        props: {
            userConfig: {
                type: Object,
                required: true
            },
            userConfigParse: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {
            userConfig: {
                handler(data) {
                    this.usePreferenceStatus = data.use_preference_settings >> 0 === 1;
                    this.docDefaultStyleModal.default = data.library_default_style || '';
                    this.docDefaultTemplateModal.default = (data.library_doc_default_template || 0) >> 0;
                    this.docDefaultEditorModal.default = data.library_doc_default_editor || '';
                },
                immediate: true
            }
        },
        components: {
            'c-config-library-style-modal': () => import('@/components/config/c-config-library-style-modal'),
            'c-config-doc-template-modal': () => import('@/components/config/c-config-doc-template-modal'),
            'c-config-doc-editor-modal': () => import('@/components/config/c-config-doc-editor-modal')
        },
        data() {
            return {
                usePreferenceLoading: false,
                resetPreferenceLoading: false,
                usePreferenceStatus: false,
                docDefaultStyleModal: {
                    visible: false,
                    default: ''
                },
                docDefaultTemplateModal: {
                    visible: false,
                    default: 0
                },
                docDefaultEditorModal: {
                    visible: false,
                    default: ''
                }
            };
        },
        methods: {
            // 事件：偏好设置状态变更
            onPreferenceStatusChange(status) {
                this.usePreferenceStatus = !status;
                const reqData = { field: 'use_preference_settings', value: status ? 1 : 0 };
                this.$api.v1.UserConfigFieldModify(reqData, {
                    loading: (status) => { this.usePreferenceLoading = status; }
                }).then(() => {
                    this.usePreferenceStatus = status;
                    if (status) {
                        this.$tip.success('已开启');
                    } else {
                        this.$tip.success('已关闭');
                    }
                });
            },
            // 事件：重置偏好设置
            onResetPreference() {
                this.$api.v1.UserConfigReset({}, {
                    loading: (status) => { this.resetPreferenceLoading = status; }
                }).then(() => {
                    this.$tip.success('重置成功');
                    this.$emit('preference-modifyed');
                });
            },
            // 事件：将要文档库默认视图风格修改
            onWillDocDefaultStyleModify() {
                this.docDefaultStyleModal.visible = true;
            },
            // 事件：确认文档库默认视图风格修改
            onLibraryDefaultStyleModify({ selectStyle, handleLoading, done }) {
                const reqData = { field: 'library_default_style', value: selectStyle };
                this.$api.v1.UserConfigFieldModify(reqData, {
                    loading: (status) => { handleLoading(status); }
                }).then(() => {
                    this.$tip.success('修改成功');
                    this.$emit('preference-modifyed');
                    done();
                });
            },
            // 事件：将要文档默认模板修改
            onWillDocDefaultTemplateModify() {
                this.docDefaultTemplateModal.visible = true;
            },
            // 事件：将要文档默认编辑器修改
            onWillDocDefaultEditorModify() {
                this.docDefaultEditorModal.visible = true;
            },
            // 事件：确认文档默认模板修改
            onDocDefaultTemplateModify({ selectTemplate, handleLoading, done }) {
                const reqData = { field: 'library_doc_default_template', value: selectTemplate };
                this.$api.v1.UserConfigFieldModify(reqData, {
                    loading: (status) => { handleLoading(status); }
                }).then(() => {
                    this.$tip.success('修改成功');
                    this.$emit('preference-modifyed');
                    done();
                });
            },
            // 事件：确认文档默认编辑器修改
            onDocDefaultEditorModify({ selectEditor, handleLoading, done }) {
                const reqData = { field: 'library_doc_default_editor', value: selectEditor };
                this.$api.v1.UserConfigFieldModify(reqData, {
                    loading: (status) => { handleLoading(status); }
                }).then(() => {
                    this.$tip.success('修改成功');
                    this.$emit('preference-modifyed');
                    done();
                });
            }
        }
    };
</script>

<style lang="scss">
    .c-user-center-preference {
        .reset-preference {
            float: right;
            span,
            i {
                color: $--color-primary-light-4;
                font-weight: normal;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .el-card {
        margin-top: 20px;
    }

    .user-preference ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 16px;

        .user-preference__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            line-height: 22px;

            &:not(:last-of-type) {
                border-bottom: 1px solid #dcdfe6;
            }

            &-content {
                display: flex;

                .field {
                    font-size: 15px;
                    line-height: 24px;
                    color: $--color-primary-light-3;
                }

                .field-tip {
                    font-size: 11px;
                    line-height: 24px;
                    color: $--color-primary-light-6;
                    display: block;
                }
            }

            &-operate {
                cursor: pointer;
                font-size: 13px;
                line-height: 24px;
                color: $--color-primary-light-1;
            }
        }
    }
</style>