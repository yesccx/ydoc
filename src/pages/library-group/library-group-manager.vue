<!-- 文档库分组管理 -->
<template>
    <div class="page-library-group-manager">
        <el-row :gutter="10">
            <el-col :span="16">
                <el-card shadow="hover" v-loading="libraryGroupListLoading">
                    <!-- tree 操作区 -->
                    <div slot="header">
                        <span>文档库分组树</span>
                        <el-input class="entity-tree-search" placeholder="输入关键字过滤" v-model="filterEntity.key">
                            <i @click="onSwitchFilterEntityMode" slot="prefix" class="el-input__icon"
                                :class="filterEntityModeIcon" title="点击切换模式"></i>
                        </el-input>
                        <div class="fr entity-actions">
                            <el-button @click="onLibraryGroupListRefresh" icon="el-icon-refresh" type="primary" plain>刷新
                            </el-button>
                            <el-button @click="onLibraryGroupCreateReady" icon="el-icon-folder-add" type="primary">新增分组
                            </el-button>
                        </div>
                    </div>
                    <!-- tree body -->
                    <c-library-entity-tree class="entity-tree" :libraryGroups="libraryGroups" :librarys="librarys"
                        :filter-entity-key="filterEntity.key" :filter-entity-mode="filterEntity.mode"
                        @group-modify-ready="onLibraryGroupModifyReady" @group-remove-success="onLibraryGroupRemoveSuccess"
                        @entity-sort-success="onEntitySortSuccess" @entity-click="onEntityClick" />
                </el-card>
            </el-col>

            <!-- entity（文档库、文档） 信息 -->
            <el-col :span="8">
                <div :is="entityInfoTpl" :id="entityInfo.id"></div>
            </el-col>
        </el-row>

        <!-- 文档库信息编辑 Modal -->
        <c-library-group-modal :visible.sync="groupModal.visible" :group-id="groupModal.groupId"
            @group-save-success="onLibraryGroupSaveSuccess" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import { LIBRARY_GROUP_KEY, LIBRARY_KEY } from '@/extends/utils/library-group-manager';

    export default {
        name: 'page-library-group-manager',
        mixins: [BasePage],
        components: {
            'c-library-group-modal': () => import('@/components/library-group/c-library-group-modal'),
            'c-library-entity-tree': () => import('@/components/library-group/c-library-entity-tree'),
            'c-library-group-entity-group-info': () => import('@/components/library-group/c-library-group-entity-group-info'),
            'c-library-group-entity-library-info': () => import('@/components/library-group/c-library-group-entity-library-info')
        },
        computed: {
            // 根据实体（文档库、文档库分组）决定展示信息的tpl
            entityInfoTpl() {
                const tplMap = {
                    [LIBRARY_KEY]: 'c-library-group-entity-library-info',
                    [LIBRARY_GROUP_KEY]: 'c-library-group-entity-group-info'
                };
                return tplMap[this.entityInfo.type] || tplMap[LIBRARY_GROUP_KEY];
            },
            // 过滤entity模式icon(search <-> stick)
            filterEntityModeIcon() {
                return this.filterEntity.mode === 'search' ? 'el-icon-search' : 'el-icon-magic-stick';
            }
        },
        data() {
            return {
                librarys: [],
                libraryGroups: [],
                libraryGroupListLoading: false,
                groupModal: {
                    visible: false,
                    groupId: 0
                },
                entityInfo: {
                    type: '',
                    id: 0
                },
                filterEntity: {
                    key: '',
                    mode: 'search'
                }
            };
        },
        async created() {
            await this.initialize();
        },
        methods: {
            // 初始化
            async initialize() {
                await this.loadaction(async () => {
                    const libraryGroups = await this.getLibraryGroups();
                    const librarys = await this.getLibrarys();

                    // 待文档库、文档的数据都取到后再做渲染
                    this.libraryGroups = libraryGroups;
                    this.librarys = librarys;
                }, 'libraryGroupListLoading');
            },
            // 初始化获取所有文档库分组
            async getLibraryGroups() {
                let libraryGroups = [];
                await this.$api.v1.LibraryGroupCollection().then(({ resData }) => {
                    libraryGroups = resData;
                });

                return libraryGroups;
            },
            // 初始化获取所有文档库集合
            async getLibrarys() {
                let librarys = [];
                await this.$api.v1.LibraryCollection().then(({ resData }) => {
                    librarys = resData;
                });

                return librarys;
            },
            // 打开文档库分组Modal
            openGroupModal(groupId = 0) {
                this.groupModal.groupId = parseInt(groupId);
                this.groupModal.visible = true;
            },
            // 事件：结构树节点（文档、分组）被点击
            onEntityClick(type, info) {
                switch (type) {
                    case LIBRARY_KEY:
                        this.onViewLibraryInfo(info);
                        break;
                    case LIBRARY_GROUP_KEY:
                        this.onViewLibraryGroupInfo(info);
                        break;
                }
            },
            // 事件：查看文档库信息
            onViewLibraryInfo(info) {
                this.entityInfo.id = info.id;
                this.entityInfo.type = LIBRARY_KEY;
            },
            // 事件：查看文档库分组信息
            onViewLibraryGroupInfo(info) {
                this.entityInfo.id = info.id;
                this.entityInfo.type = LIBRARY_GROUP_KEY;
            },
            // 事件：文档库分组刷新
            onLibraryGroupListRefresh() {
                this.initialize();
            },
            // 事件：文档库分组创建准备
            onLibraryGroupCreateReady() {
                this.openGroupModal(0);
            },
            // 事件：文档库分组修改准备
            onLibraryGroupModifyReady(groupId) {
                this.openGroupModal(groupId);
            },
            // 事件：文档库分组删除成功
            onLibraryGroupRemoveSuccess(groupId) {
                this.initialize();
            },
            // 事件：文档库、文档分组排序成功
            onEntitySortSuccess() {
                this.initialize();
            },
            // 事件：文档库分组新增、保存成功
            onLibraryGroupSaveSuccess() {
                this.initialize();
            },
            // 事件：切换entity过滤模式
            onSwitchFilterEntityMode() {
                this.filterEntity.mode = this.filterEntity.mode === 'search' ? 'stick' : 'search';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .entity-actions {
        margin-top: -7px;
    }

    .entity-tree {
        height: calc(100vh - 195px);
    }

    .entity-tree-search {
        width: 150px;
        margin-right: 10px;
        height: 0px;
    }
</style>

<style lang="scss">
    .page-library-group-manager {
        .entity-tree-search {
            input {
                border: 0;
                padding-left: 34px;
            }
            i {
                cursor: pointer;
            }
        }
    }
</style>