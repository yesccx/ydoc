<!-- 文档库分组entity树 -->
<template>
    <div class="c-library-entity-tree">
        <el-scrollbar class="contains">
            <el-tree ref="tree" :data="entityCollect" node-key="key" @node-click="onEntityClick" @node-drop="onEntityDrop"
                :allow-drop="handleAllowDrop" :filter-node-method="handleFilterEntity" :empty-text="treeEmptyTips" draggable
                default-expand-all>
                <div slot-scope="{ node, data: entity }" class="directory-tree-item" :class="{stick: entity.isStick}">
                    <!-- entity:icon -->
                    <i v-if="entity.type === LIBRARY_GROUP_KEY" class="tree-node-group-icon icon y-icon-folder-close"></i>
                    <i v-else class="tree-node-library-icon el-icon-document"></i>

                    <!-- entity:label -->
                    <span class="tree-node-label">{{ entity.label }}</span>

                    <!-- entity:action（仅限文档库操作） -->
                    <el-dropdown v-if="entity.type === LIBRARY_GROUP_KEY" class="group-item-actions" trigger="click"
                        @command="onGroupAction">
                        <span class="el-dropdown-link" @click.stop="() => { false; }">
                            <i class="el-icon-more item-more-action"></i>
                        </span>

                        <!-- entity:action-item -->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="'modifyGroup|' + entity.id">
                                <i class="el-icon-edit"></i>编辑分组
                            </el-dropdown-item>
                            <el-dropdown-item :command="'removeGroup|' + entity.id">
                                <i class="el-icon-delete"></i>删除
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script>
    import { LIBRARY_GROUP_KEY, LIBRARY_KEY } from '@/extends/utils/library-group-manager';
    import * as EntityUtils from '@/extends/utils/library-entity-tree-utils';

    export default {
        name: 'c-library-entity-tree',
        props: {
            // 文档库分组数据
            libraryGroups: {
                type: Array,
                required: true,
                default: () => []
            },
            // 文档库数据
            librarys: {
                type: Array,
                required: true,
                default: () => []
            },
            // tree过滤key
            filterEntityKey: {
                type: String,
                default: ''
            },
            // tree过滤mode
            filterEntityMode: {
                type: String,
                default: 'search'
            }
        },
        watch: {
            // 数据源变动时，表示初始化成功
            libraryGroups() {
                this.inited = true;
            },
            // tree关键字过滤
            filterEntityKey(val) {
                if (this.filterEntityMode === 'search') {
                    this.$refs.tree.filter(val);
                }
            },
            // tree模式过滤
            filterEntityMode(val) {
                if (val === 'search') {
                    this.$refs.tree.filter(this.filterEntityKey);
                } else {
                    this.$refs.tree.filter('');
                }
            }
        },
        computed: {
            // 数据源变动时，表示有可用数据，tip不能按空判断
            treeEmptyTips() {
                return this.inited ? '暂无分组，赶快添加一个吧' : '加载中';
            },
            // entity集合
            entityCollect() {
                const collect = EntityUtils.buildEntityCollect(this.libraryGroups, this.librarys);

                // 根据entity过滤，追加相关标识class样式
                this.$utils.ForEach(collect, (entity) => {
                    entity.isStick = this.checkEntityStickStatus(entity);
                    if (entity.children && entity.children.length > 0) {
                        this.$utils.ForEach(entity.children, (subEntity) => {
                            subEntity.isStick = this.checkEntityStickStatus(subEntity);
                        });
                    }
                });

                return collect;
            }
        },
        data() {
            return {
                LIBRARY_GROUP_KEY,
                LIBRARY_KEY,
                filterText: '',
                inited: false
            };
        },
        async created() {
            await this.initialize();
        },
        methods: {
            // 初始化
            async initialize() { },
            // 删除文档库分组
            async libraryGroupRemove(groupId) {
                let res = false;
                await this.$api.LibraryGroupRemove({ group_id: groupId }, { report: true }).then(({ resMsg }) => {
                    res = true;
                    this.$tip.success(resMsg);
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                });

                return res;
            },
            // 排序文档库分组
            async libraryGroupSort(groupId, sort) {
                await this.$api.LibraryGroupSort({ group_id: groupId, sort });
            },
            // 排序文档库
            async librarySort(libraryId, sort, groupId = 0) {
                await this.$api.LibrarySort({ id: libraryId, sort, group_id: groupId });
            },
            // 处理：拖拽时能否被放置(放置范围判定)
            handleAllowDrop(draggingNode, dropNode, type) {
                const currentNode = draggingNode.data.type; // 当前拖拽entity类型
                const targetNode = dropNode.data.type; // 目标结点类型

                // （组到组、或项到项仅支持前后）
                const wa = currentNode === targetNode && type !== 'inner';
                // （项到组没有条件限制）
                const wb = currentNode === LIBRARY_KEY && targetNode === LIBRARY_GROUP_KEY &&
                    (type === 'inner' || (targetNode === LIBRARY_GROUP_KEY && type === 'prev'));

                return wa || wb;
            },
            // 处理：过滤entity的方式
            handleFilterEntity(value, data) {
                if (!value) { return true; }
                return data.label.indexOf(value) !== -1;
            },
            // 验证某个entity在stick模式下是否被命中
            checkEntityStickStatus(entity) {
                return this.filterEntityMode === 'stick' && this.filterEntityKey && entity.label.indexOf(this.filterEntityKey) >= 0;
            },
            // 事件：文档库分组/文档库 拖拽结束
            async onEntityDrop(draggingNode, dropNode, dropType, ev) {
                const position = EntityUtils.computedEntityPosition(this.entityCollect, dropType, draggingNode.data, dropNode.data);

                if (draggingNode.data.type === LIBRARY_GROUP_KEY) {
                    await this.libraryGroupSort(draggingNode.data.id, position.sort);
                } else {
                    await this.librarySort(draggingNode.data.id, position.sort, position.groupId);
                }
                this.$emit('entity-sort-success');
            },
            // 事件：entity点击
            onEntityClick(data) {
                this.$emit('entity-click', data.type, data);
            },
            // 事件：文档库分组操作
            onGroupAction(command) {
                const args = command.split('|');
                const action = args[0];
                const param = args[1];

                switch (action) {
                    case 'modifyGroup':
                        this.onLibraryGroupModifyReady(param);
                        break;
                    case 'removeGroup':
                        this.onLibraryGroupRemoveReady(param);
                        break;

                    default:
                        break;
                }
            },
            // 事件：修改文档库分组准备
            onLibraryGroupModifyReady(groupId) {
                this.$emit('group-modify-ready', groupId);
            },
            // 事件：删除文档库分组准备
            onLibraryGroupRemoveReady(groupId) {
                this.$msgbox({
                    title: '删除分组',
                    message: '此操作将永久删除该分组, 是否继续?',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: async (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            const removeRes = await this.libraryGroupRemove(groupId);
                            instance.confirmButtonText = '确定';
                            if (removeRes) {
                                this.$emit('group-remove-success', groupId);
                                done();
                            }
                            instance.confirmButtonLoading = false;
                        } else {
                            done();
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="scss">
    .c-library-entity-tree {
        .el-tree-node {
            &__content {
                color: #a1a1a1;
                padding: 6px 0;
                .tree-node-group-icon {
                    margin-right: 3px;
                }
                .tree-node-library-icon {
                    font-size: 15px;
                    margin-right: 3px;
                }
                .tree-node-label {
                    font-size: 15px;
                    color: #676767;
                }

                .stick .tree-node-label,
                .stick i {
                    color: $--color-warning !important;
                }

                > .el-tree-node__expand-icon {
                    margin-left: -12px;
                    color: transparent;
                    padding: 0;
                }
                > div {
                    padding: 0 15px 0 10px;
                }
                &:hover .group-item-actions {
                    opacity: 1;
                }
                &:hover {
                    background-color: #f2f2f2;
                }
            }
            &:focus {
                & > .el-tree-node__content {
                    background-color: #f2f2f2;
                }
            }
            & .el-tree__empty-text {
                font-size: 14px;
            }
            &.is-current > div:first-child {
                background-color: #f2f2f2;
            }
            &.is-current > div:first-child .group-item-actions {
                opacity: 1;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .contains {
        height: 100%;
    }

    .directory-tree-item {
        width: 100%;
        border: 2px solid #40a0ff00;
    }

    .group-item-actions {
        opacity: 0;
        transition: opacity 0.2s;
        float: right;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-right: 3px;
        cursor: pointer;
    }
</style>