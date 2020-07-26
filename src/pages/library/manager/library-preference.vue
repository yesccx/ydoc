<template>
    <div class="page-library-preference">
        <el-divider></el-divider>
        <el-alert title="成员可设置自己的偏好风格，如果文档库及成员偏好都未开启时，将使用用户的偏好设置" type="warning" :closable="false" show-icon> </el-alert>
        <div class="library-preference">
            <ul>
                <li class="library-preference__item">
                    <div class="library-preference__item-content">
                        <el-tooltip effect="dark" :open-delay="500" content="" placement="top-start">
                            <span class="field">
                                <i class="el-icon-set-up"></i> <span>启用文档库偏好设置</span>
                                <span class="field-tip">启用后，文档库的所有成员将使用该偏好设置</span>
                            </span>
                        </el-tooltip>
                    </div>
                    <span class="library-preference__item-operate">
                        <el-switch v-show="!usePreferenceLoading" v-model="usePreferenceStatus"
                            @change="onPreferenceStatusChange"></el-switch>
                        <i class="el-icon-loading" v-show="usePreferenceLoading"></i>
                    </span>
                </li>
                <li class="library-preference__item">
                    <div class="library-preference__item-content">
                        <span class="field">
                            <i class="el-icon-monitor"></i> <span>文档视图风格</span>
                            <span class="field-tip">影响文档库中的文档视图风格（已分享的也会被影响）</span>
                        </span>
                    </div>
                    <span class="library-preference__item-operate" @click="onWillDocDefaultStyleModify">
                        {{ libraryConfigParse['library_default_style'] || '默认超宽风格' }} <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
                <!-- <li class="library-preference__item">
                    <div class="library-preference__item-content">
                        <el-tooltip effect="dark" :open-delay="500" content="影响之后新创建的文档默认内容（内容取自模板）" placement="top-start">
                            <span class="field">文档默认模板 <i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <span class="value">{{ libraryConfigParse['library_doc_default_template'] || '暂无' }}</span>
                    </div>
                    <span class="library-preference__item-operate" @click="onWillDocDefaultTemplateModify">
                        从模板列表选择 <i class="el-icon-arrow-right"></i>
                    </span>
                </li> -->
            </ul>
            <el-divider>以下是您对该文档库的自定义偏好，不会影响文档库其他成员</el-divider>
            <ul>
                <li class="library-preference__item">
                    <div class="library-preference__item-content">
                        <span class="field">
                            <i class="el-icon-set-up"></i> <span>启用自定义偏好设置</span>
                            <span class="field-tip">启用后，会覆盖文档库的偏好设置（仅覆盖有相同配置项）</span>
                        </span>
                    </div>
                    <span class="library-preference__item-operate">
                        <el-switch v-show="!memberUsePreferenceLoading" v-model="memberUsePreferenceStatus"
                            @change="onMemberPreferenceStatusChange"></el-switch>
                        <i class="el-icon-loading" v-show="memberUsePreferenceLoading"></i>
                    </span>
                </li>
                <li class="library-preference__item">
                    <div class="library-preference__item-content">
                        <span class="field">
                            <i class="el-icon-document"></i> <span>文档默认模板</span>
                            <span class="field-tip">影响之后新创建的文档默认内容（内容取自模板）</span>
                        </span>
                    </div>
                    <span class="library-preference__item-operate" @click="onWillMemberDocDefaultTemplateModify">
                        {{ memberLibraryConfigParse['library_doc_default_template'] || '暂无' }} <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
            </ul>
        </div>

        <!-- 文档库默认风格设置Modal -->
        <c-config-library-style-modal :default-style="libraryDefaultStyleModal.default"
            :visible.sync="libraryDefaultStyleModal.visible" @style-modify="onLibraryDefaultStyleModify" />

        <!-- 文档默认模板设置Modal -->
        <c-config-doc-template-modal :default-template="memberDocDefaultTemplateModal.default"
            :visible.sync="memberDocDefaultTemplateModal.visible" @template-modify="onMemberDocDefaultTemplateModify" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import LibraryManager from '@/extends/mixins/library-manager';

    export default {
        name: 'page-library-settings',
        mixins: [BasePage, LibraryManager],
        components: {
            'c-config-library-style-modal': () => import('@/components/config/c-config-library-style-modal'),
            'c-config-doc-template-modal': () => import('@/components/config/c-config-doc-template-modal')
        },
        watch: {
            libraryConfig: {
                handler(data) {
                    this.usePreferenceStatus = data.use_preference_settings >> 0 === 1;
                    this.libraryDefaultStyleModal.default = data.library_default_style || '';
                },
                immediate: true
            },
            memberLibraryConfig: {
                handler(data) {
                    this.memberUsePreferenceStatus = data.use_preference_settings >> 0 === 1;
                    this.memberDocDefaultTemplateModal.default = (data.library_doc_default_template || 0) >> 0;
                },
                immediate: true
            }
        },
        data() {
            return {
                libraryConfig: {},
                libraryConfigParse: {},
                usePreferenceLoading: false,
                usePreferenceStatus: false,
                memberLibraryConfig: {},
                memberLibraryConfigParse: {},
                memberUsePreferenceLoading: false,
                memberUsePreferenceStatus: false,
                libraryDefaultStyleModal: {
                    visible: false,
                    default: ''
                },
                memberDocDefaultTemplateModal: {
                    visible: false,
                    default: 0
                }
            };
        },
        methods: {
            // 模块初始化
            async moduleInitialize() {
                await this.initLibraryConfig();
                await this.initMemebrLibraryConfig();
            },
            // 初始化文档库配置
            async initLibraryConfig() {
                await this.$api.v1.LibraryConfigValue({ library_id: this.libraryId }, {
                    loading: status => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.libraryConfig = resData.config;
                    this.libraryConfigParse = resData.parse;
                });
            },
            // 初始化成员的文档库配置
            async initMemebrLibraryConfig() {
                await this.$api.v1.LibraryConfigMemberValue({ library_id: this.libraryId }, {
                    loading: status => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.memberLibraryConfig = resData.config;
                    this.memberLibraryConfigParse = resData.parse;
                });
            },
            // 事件：文档库偏好设置变更成功
            onLibraryPreferenceModifyed() {
                this.initLibraryConfig();
            },
            // 事件：成员的文档库默认模板变更成功
            onMemberLibraryPreferenceModifyed() {
                this.initMemebrLibraryConfig();
            },
            // 事件：文档库偏好设置状态变更
            onPreferenceStatusChange(status) {
                this.usePreferenceStatus = !status;
                const reqData = { library_id: this.libraryId, field: 'use_preference_settings', value: status ? 1 : 0 };
                this.$api.v1.LibraryConfigFieldModify(reqData, {
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
            // 事件：成员偏好设置状态变更
            onMemberPreferenceStatusChange(status) {
                this.memberUsePreferenceStatus = !status;
                const reqData = { library_id: this.libraryId, field: 'use_preference_settings', value: status ? 1 : 0 };
                this.$api.v1.LibraryConfigMemberFieldModify(reqData, {
                    loading: (status) => { this.memberUsePreferenceLoading = status; }
                }).then(() => {
                    this.memberUsePreferenceStatus = status;
                    if (status) {
                        this.$tip.success('已开启');
                    } else {
                        this.$tip.success('已关闭');
                    }
                });
            },
            // 事件：将要文档库默认视图风格修改
            onWillDocDefaultStyleModify() {
                this.libraryDefaultStyleModal.visible = true;
            },
            // 事件：确认文档库默认视图风格修改
            onLibraryDefaultStyleModify({ selectStyle, handleLoading, done }) {
                const reqData = { library_id: this.libraryId, field: 'library_default_style', value: selectStyle };
                this.$api.v1.LibraryConfigFieldModify(reqData, {
                    loading: (status) => { handleLoading(status); }
                }).then(() => {
                    this.$tip.success('修改成功');
                    this.onLibraryPreferenceModifyed();
                    done();
                });
            },
            // 事件：将要成员的文档默认模板修改
            onWillMemberDocDefaultTemplateModify() {
                this.memberDocDefaultTemplateModal.visible = true;
            },
            // 事件：确认成员的文档默认模板修改
            onMemberDocDefaultTemplateModify({ selectTemplate, handleLoading, done }) {
                const reqData = { library_id: this.libraryId, field: 'library_doc_default_template', value: selectTemplate };
                this.$api.v1.LibraryConfigMemberFieldModify(reqData, {
                    loading: (status) => { handleLoading(status); }
                }).then(() => {
                    this.$tip.success('修改成功');
                    this.onMemberLibraryPreferenceModifyed();
                    done();
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .el-card {
        margin-top: 20px;
    }

    .library-preference ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 16px;

        .library-preference__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 5px;
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
