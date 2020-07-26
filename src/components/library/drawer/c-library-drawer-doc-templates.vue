<template>
    <div class="c-library-drawer-doc-templates bold-normal">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="600px"
            :modal-append-to-body="false">
            <div class="content-drawer__content">
                <el-alert type="info" title="文档模板的管理操作，请前往模板中心" show-icon></el-alert>
                <div class="operate-container">
                    <el-tag class="operate-container__total">当前共计 <b>{{tmeplateCount}}</b> 个模板</el-tag>
                    <el-button class="button-bold operate-container__item" :loading="templateLoading" size="small"
                        icon="el-icon-refresh" type="text" @click="onDocTemplateListFlush">刷新列表</el-button>
                    <!-- <el-button class="button-bold operate-container__item" size="small" icon="el-icon-plus" type="text"
                        @click="onDocTemplateListFlush">
                        新建模板
                    </el-button> -->
                    <el-input class="operate-container__search-input" prefix-icon="el-icon-search" size="mini" v-model="searchKey"
                        placeholder="搜索关键字（模板名称、简介、创建人）" clearable></el-input>
                </div>
                <el-scrollbar class="template-collection-container">
                    <el-table v-loading="templateLoading" :data="templateCollectionProcessed" type="expand"
                        :empty-text="templateEmptyText" stripe>
                        <el-table-column type="expand">
                            <template v-slot="{ row: template }">
                                <el-form class="template-info-expanded" label-position="left" label-width="85px" inline>
                                    <el-form-item label="模板名">
                                        <span>{{ template.name }}</span>
                                    </el-form-item>
                                    <el-form-item label="模板编辑器">
                                        <el-tag>{{ template.editor || EditorCode.EDITOR_DEFAULT }}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="模板简介">
                                        <span>{{ template.introduction }}</span>
                                    </el-form-item>
                                    <el-form-item label="更新时间">
                                        <span>{{ template.update_time | dateFormat }}</span>
                                    </el-form-item>
                                    <el-form-item label="创建时间">
                                        <span>{{ template.create_time | dateFormat }}</span>
                                    </el-form-item>
                                    <el-form-item label="创建者">
                                        <span>{{ template.user_info.nickname }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="模板名">
                        </el-table-column>
                        <el-table-column prop="user_info.nickname" label="创建者" width="100">
                        </el-table-column>
                        <el-table-column label="操作" width="70">
                            <template v-slot="{ $index: index, row: template }">
                                <el-button icon="el-icon-thumb" class="use-template-btn" type="text" size="small"
                                    @click="onDocTemplateUse(template)">使用
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryContent from '@/extends/mixins/library-content';
    import EditorCode from '@/common/constants/editor-code';

    export default {
        name: 'c-library-drawer-doc-templates',
        mixins: [BaseDrawer, LibraryContent],
        computed: {
            title() {
                return '模板列表';
            },
            templateEmptyText() {
                return this.templateLoading ? '加载中' : '暂无模板';
            },
            templateCollectionProcessed() {
                const searchKey = this.searchKey;
                return this.templateCollection.filter((template) => {
                    return [template.name, template.introduction, template.user_info.nickname].some(v => v.indexOf(searchKey) >= 0);
                });
            },
            tmeplateCount() {
                return this.templateCollectionProcessed.length;
            }
        },
        data() {
            return {
                EditorCode,
                searchKey: '',
                templateLoading: true,
                templateCollection: []
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('doc-template-will-use', () => {
                    this.visibleDrawer = true;
                });
            },
            // 初始化文档模板集合
            async initDocTemplateCollection(force = false) {
                if (this.templateCollection.length !== 0 && !force) {
                    return true;
                }

                await this.$api.v1.LibraryDocTemplateCollection({}, {
                    loading: (status) => { this.templateLoading = status; }
                }).then(({ resData }) => {
                    this.templateCollection = resData;
                });
            },
            // 事件：drawer被展开
            onDrawerOpen() {
                this.initDocTemplateCollection();
            },
            // 事件：文档模板列表刷新
            async onDocTemplateListFlush() {
                this.initDocTemplateCollection(true);
            },
            // 事件：文档模板使用
            async onDocTemplateUse(template) {
                this.visibleDrawer = false;
                this.libraryContentEventBus.$emit('doc-template-use', template);
            }
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-doc-templates {
        .el-table .cell {
            white-space: nowrap;
        }
        .el-drawer {
            &__header {
                font-weight: bold;
                font-size: 20px;
            }

            &__body {
                padding: 20px;
            }
        }

        .template-info-expanded {
            padding: 5px 6px;
            .el-form-item {
                width: 100%;
                &__label {
                    font-weight: bold;
                    font-size: 12px;
                    color: $--color-primary-light-5;
                }
                &__content {
                    display: block;
                    color: $--color-primary-light-1;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
    .template-collection-container {
        height: calc(100vh - 225px);
    }
    .operate-container {
        margin-bottom: 10px;
        &__item {
            float: right;
            padding: 5px;
            color: $--color-primary-light-3;
        }
        &__total {
            margin-right: 10px;
        }
        &__search-input {
            margin-top: 8px;
        }
    }
    .edit-template-btn {
        margin-right: 10px;
    }
    .delete-template-btn {
        margin-right: 10px;
        color: $--color-danger;
    }
</style>