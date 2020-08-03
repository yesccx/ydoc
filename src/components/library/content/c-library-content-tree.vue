<template>
    <div class="c-library-content-tree" v-loading="groupTreeLoading">
        <!-- TODO: 目前只支持搜索项名称，后期做成搜索项内容（需要后端支持） -->
        <el-input v-model="searchKey" size="small" class="directory-tree-search" placeholder="输入关键字，检索目录与文档（仅标题）" clearable>
        </el-input>

        <!-- 目录树 -->
        <el-scrollbar class="tree">
            <div @contextmenu.prevent="onNodeContextMenu">
                <el-tree ref="tree" element-loading-spinner="el-icon-loading" :data="dataTree" :props="defaultProps"
                    node-key="key" @node-click="onNodeClick" @node-drop="onNodeDrop" :filter-node-method="handleFilterTree"
                    :allow-drop="handleAllowDrop" :empty-text="emptyText" draggable default-expand-all>
                    <div slot-scope="{ node,data }" class="directory-tree-item">

                        <!-- 项图标 -->
                        <i v-if="data.nodeType === 'group'" class="tree-node-group-icon icon y-icon-folder-close"></i>
                        <i v-else class="tree-node-doc-icon el-icon-document"></i>

                        <!-- Tip -->
                        <el-tooltip :content="data.name" :open-delay="800" effect="dark" placement="top-end">
                            <span class="tree-node-label" :level="node.level">{{ data.name }}</span>
                        </el-tooltip>

                        <!-- 操作项 -->
                        <el-dropdown class="item-actions" trigger="click" @command="onItemAction">
                            <span class="el-dropdown-link" @click.stop=" () => { false; } ">
                                <i class="el-icon-more item-more-action"></i>
                            </span>

                            <!-- 分组操作项 -->
                            <el-dropdown-menu ref="libraryGroupMneu" v-if="data.nodeType === 'group'" slot="dropdown">
                                <el-dropdown-item :command="'modifyGroup|' + data.id">
                                    <i class="el-icon-edit"></i>编辑分组
                                </el-dropdown-item>
                                <el-dropdown-item :command="'createGroup|' + data.id">
                                    <i class="el-icon-folder-add"></i>新增子分组
                                </el-dropdown-item>
                                <el-dropdown-item :command="'createDoc|' + data.id">
                                    <i class="el-icon-document-add"></i>新增文档
                                </el-dropdown-item>
                                <el-dropdown-item :command="'removeGroup|' + data.id">
                                    <i class="el-icon-delete"></i>删除
                                </el-dropdown-item>
                            </el-dropdown-menu>

                            <!-- 文档操作项 -->
                            <el-dropdown-menu v-else slot="dropdown">
                                <!-- <el-dropdown-item :command="'renameDoc|' + data.id">
                                    <i class="el-icon-edit"></i>重命名
                                </el-dropdown-item> -->
                                <el-dropdown-item :command="'removeDoc|' + data.id">
                                    <i class="el-icon-delete"></i>删除
                                </el-dropdown-item>
                                <el-dropdown-item :command="'shareDoc|' + data.id">
                                    <i class="el-icon-share"></i>分享
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-tree>
            </div>
        </el-scrollbar>

        <el-dropdown trigger="click" :show-timeout="1" placement="bottom" :hide-timeout="1" ref="rightClick">
            <span class="el-dropdown-link" @click.stop=" () => { false; } ">
            </span>
            <el-dropdown-menu slot="dropdown" :visible-arrow="false">
                <el-dropdown-item>
                    <i class="el-icon-edit-outline"></i>编辑文档
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-edit"></i>编辑分组
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-document-add"></i>新增文档
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-folder-add"></i>新增分组
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-edit"></i>重命名
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="el-icon-delete"></i>删除
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <c-library-content-doc-group-modal :visible.sync="groupModal.visible" :library-id="libraryId"
            :parent-id="groupModal.parentId" :group-id="groupModal.groupId" @close="onGroupModalClose">
        </c-library-content-doc-group-modal>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-content-tree',
        components: {
            'c-library-content-doc-group-modal': () => import('@/components/library/content/c-library-content-doc-group-modal')
        },
        mixins: [LibraryContent],
        computed: {
            showGroupTree() {
                return !this.groupTreeLoading;
            },
            // 内容树
            dataTree() {
                const docGroup = {};
                let groupTree = this.$utils.CloneDeep(this.groupTree);
                const docList = this.$utils.CloneDeep(this.docList);

                // 文档划分
                docList.forEach(doc => {
                    doc.nodeType = 'doc';
                    doc.name = doc.title;
                    doc.key = 'doc-' + doc.id;
                    if (!docGroup[doc.group_id]) {
                        docGroup[doc.group_id] = [];
                    }
                    docGroup[doc.group_id].push(doc);
                });

                // 文档所在位置为顶级组
                if (docGroup[0]) {
                    groupTree = groupTree.concat(docGroup[0]);
                }

                // 深度结合文档与文档分组
                return this.deepBuildDataTree(groupTree, docGroup);
            },
            emptyText() {
                return this.groupTreeLoading ? '' : '暂无数据';
            }
        },
        watch: {
            searchKey(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                searchKey: '',
                groupTree: [],
                docList: [],
                groupTreeLoading: true,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                groupModal: {
                    groupId: 0,
                    parentId: 0,
                    visible: false
                }
            };
        },
        methods: {
            async initComponent() {
                await this.getDocGroupTree();
                await this.getDocList();
            },
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档分组将创建
                bus.$on('doc-group-will-create', () => {
                    this.openGroupModal(0, 0);
                });

                // 事件：文档分组将修改
                bus.$on('doc-group-will-modify', (groupId) => {
                    this.openGroupModal(groupId);
                });

                // 事件：文档库保存成功（更新列表）
                bus.$on('doc-saved', (docId) => {
                    this.initComponent();
                });

                // 事件：文档内容树刷新
                bus.$on('library-content-tree-flush', () => {
                    this.initComponent();
                });

                // 文档删除
                bus.$on('doc-remove', ({ docId }) => {
                    this.onDocRemove(docId);
                });
            },
            // 获取分组树
            async getDocGroupTree() {
                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryDocGroupTree(reqData, {
                    loading: status => {
                        this.groupTreeLoading = status;
                    }
                }).then(({ resData }) => {
                    this.groupTree = resData;
                });
            },
            // 获取文档列表
            async getDocList() {
                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryDocList(reqData, {
                    loading: status => {
                        this.groupTreeLoading = status;
                    }
                }).then(({ resData }) => {
                    this.docList = resData;
                });
            },
            // 删除文档分组
            async removeDocGroup(groupId, isDeep) {
                const reqData = { library_doc_group_id: groupId, is_deep: isDeep, library_id: this.libraryId };
                let removeRes = false;
                await this.$api.v1.LibraryDocGroupRemove(reqData, { report: true }).then(({ resMsg, resData }) => {
                    this.$tip.success('删除成功');
                    removeRes = true;
                    resData.forEach((docId) => {
                        this.libraryContentEventBus.$emit('doc-removed', { docId });
                    });
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                });
                return removeRes;
            },
            onVisibleChagne(status) { },
            onNodeClick(node) {
                if (node.nodeType === 'doc') {
                    this.libraryContentEventBus.$emit('doc-will-modify', node.id);
                }
            },
            onNodeContextMenu(event) {
            },
            // 打开分组模态框
            openGroupModal(groupId = 0, parentId = 0) {
                this.groupModal.groupId = Number(groupId);
                this.groupModal.parentId = Number(parentId);
                this.groupModal.visible = true;
            },
            // 事件：文档项操作
            onItemAction(command) {
                const args = command.split('|');
                const action = args[0];
                const param = args[1];

                switch (action) {
                    case 'modifyGroup':
                        this.openGroupModal(param);
                        break;
                    case 'createGroup':
                        this.openGroupModal(0, param);
                        break;
                    case 'removeGroup':
                        this.onRemoveGroup(param);
                        break;
                    case 'createDoc':
                        this.libraryContentEventBus.$emit('doc-will-create', param);
                        break;
                    case 'removeDoc':
                        this.onDocRemove(param);
                        break;
                    case 'shareDoc':
                        this.onDocShare(param);
                        break;

                    default:
                        break;
                }
            },
            // 事件：删除分组
            onRemoveGroup(groupId) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '删除分组',
                    message: h('div', { key: Date.now() }, [
                        h('p', null, '此操作将永久删除该分组, 是否继续?'),
                        h('br'),
                        h('el-checkbox', null, '同时删除该分组下所有内容（包含分组、文档）')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: async (action, instance, done) => {
                        const isDeep = instance.$el.querySelector('.el-checkbox__original').checked ? 1 : 0;
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            const removeRes = await this.removeDocGroup(groupId, isDeep);
                            instance.confirmButtonText = '确定';
                            if (removeRes) {
                                done();
                            }
                            instance.confirmButtonLoading = false;
                            await this.getDocGroupTree();
                            await this.getDocList();
                        } else {
                            done();
                        }
                    }
                });
            },
            // 事件：文档分享
            onDocShare(docId) {
                this.libraryContentEventBus.$emit('doc-will-share', { docId });
            },
            // 事件：文档删除
            onDocRemove(docId) {
                this.$msgbox({
                    title: '删除文档',
                    message: '此操作将永久删除该文档, 是否继续?',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: async (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            const removeRes = await this.docRemove(docId);
                            instance.confirmButtonText = '确定';
                            if (removeRes) {
                                done();
                            }
                            instance.confirmButtonLoading = false;
                        } else {
                            done();
                        }
                    }
                });
            },
            // 文档删除
            async docRemove(docId) {
                const reqData = { library_doc_id: docId, library_id: this.libraryId };
                let removeRes = false;
                await this.$api.v1.LibraryDocRemove(reqData, {
                    loading: (status) => { this.libraryManagerLoading = status; }
                }).then(({ resMsg }) => {
                    this.$tip.success(resMsg);
                    removeRes = true;
                    this.libraryContentEventBus.$emit('library-content-tree-flush');
                    this.libraryContentEventBus.$emit('doc-removed', { docId });
                });
                return removeRes;
            },
            // 事件：分组模态框关闭
            onGroupModalClose(data) {
                if (data.isUpdated) {
                    this.getDocGroupTree();
                }
            },
            // 事件：拖拽结束
            onNodeDrop(draggingNode, dropNode, dropType, ev) {
                const position = this.computedNodePosition(this.dataTree, dropType, dropNode.data);

                this.modifyParentGroup(draggingNode.data.nodeType, draggingNode.data.id, position.pid, position.sort);
            },
            // 深度结合文档与文档分组
            deepBuildDataTree(groupTree, docGroup) {
                if (!groupTree || groupTree.length === 0) {
                    return [];
                }
                groupTree = this.$utils.CloneDeep(groupTree);

                groupTree.forEach(group => {
                    group.nodeType = group.nodeType ? group.nodeType : 'group';
                    group.key = group.nodeType + group.id;
                    group.children = this.deepBuildDataTree(group.children, docGroup) || [];
                    if (docGroup[group.id] && group.nodeType === 'group') {
                        group.children = group.children.concat(docGroup[group.id]);
                    }

                    if (group.children) {
                        group.children.sort((a, b) => {
                            return a.sort - b.sort;
                        });
                    }
                });

                // 排序
                groupTree.sort((a, b) => {
                    return a.sort - b.sort;
                });

                return groupTree;
            },
            // 处理过滤内容树
            handleFilterTree(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // 处理拖拽时能否被放置(放置范围判定)
            handleAllowDrop(draggingNode, dropNode, type) {
                const targetNode = dropNode.data.nodeType; // 目标结点类型
                const currentNode = draggingNode.data.nodeType; // 当前拖拽节点类型

                // 文档到文档（仅前后位置）
                const wa = targetNode === currentNode && targetNode === 'doc' && type === 'inner';
                // 分组到文档（仅前后位置）
                const wb = currentNode === 'group' && targetNode === 'doc' && type === 'inner';

                return !(wa || wb);
            },
            // 修改文档/文档分组的所属上级分组
            async modifyParentGroup(type, id, parentId, sort = -1) {
                const axiosModifyGroup = type === 'group' ? this.$api.v1.LibraryDocGroupSort : this.$api.v1.LibraryDocSort;
                const reqData = { library_id: this.libraryId, parent_group_id: parentId, sort };
                reqData[type === 'group' ? 'library_doc_group_id' : 'library_doc_id'] = id;

                await axiosModifyGroup(reqData, {
                    loading: status => {
                        this.groupTreeLoading = status;
                    }
                });
                if (type === 'group') {
                    await this.getDocGroupTree();
                } else {
                    this.libraryContentEventBus.$emit('doc-modifyed', { docId: id });
                    await this.getDocList();
                }
            },
            // 计算拖拽后的结点排序值
            computedNodePosition(dataTree, dropType, dropNode) {
                let nodeGroupId = 0;
                let nodeSort = 0;
                if (dropType === 'inner') {
                    nodeGroupId = dropNode.id;
                } else {
                    nodeGroupId = dropNode.nodeType === 'group' ? dropNode.pid : dropNode.group_id;
                }

                // 找到结点排序后的目标分组
                let targetGroup = this.searchNodeTargetGroup(dataTree, nodeGroupId);
                if (targetGroup === null) {
                    throw new Error('排序值计算失败');
                }

                switch (dropType) {
                    case 'inner': // 项内
                        nodeSort = targetGroup.children.length > 1 ? targetGroup.children.slice(-2, -1)[0].sort + 10000 : 10000;
                        break;
                    case 'before': // 项前
                        targetGroup.children.forEach((node, key, data) => {
                            if (node.id === dropNode.id) {
                                let adjoinSort = key <= 1 ? 0 : data[key - 2].sort;
                                nodeSort = (node.sort + adjoinSort) / 2;
                            }
                        });
                        break;
                    case 'after': // 项后
                        targetGroup.children.forEach((node, key, data) => {
                            if (node.id === dropNode.id) {
                                let adjoinSort = key === data.length - 2 ? node.sort + 20000 : data[key + 2].sort;
                                nodeSort = (node.sort + adjoinSort) / 2;
                            }
                        });
                        break;
                }
                return {
                    sort: nodeSort,
                    pid: nodeGroupId
                };
            },
            searchNodeTargetGroup(dataTree, id) {
                if (id === 0) {
                    return { children: dataTree };
                }

                let targetGroup = null;
                dataTree.forEach(node => {
                    if (node.nodeType === 'group' && node.id === id) {
                        targetGroup = node;
                    }

                    if (!targetGroup && Array.isArray(node.children) && node.children.length > 0) {
                        targetGroup = this.searchNodeTargetGroup(node.children, id);
                    }
                });

                return targetGroup;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-content-tree {
        .el-loading-mask {
            background: #f5f7fab0;
        }
        .el-tree-node {
            &__content {
                color: #a1a1a1;
                padding: 6px 0;
                .tree-node-group-icon {
                    margin-right: 3px;
                }
                .tree-node-doc-icon {
                    font-size: 15px;
                    margin-right: 3px;
                }
                .tree-node-label {
                    font-size: 14px;
                    color: #2d2d2d;
                    width: 195px;
                    overflow: hidden;
                    display: inline-block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    line-height: 14px;
                    position: relative;
                    top: 2px;
                }
                > .el-tree-node__expand-icon {
                    margin-left: -12px;
                    color: transparent;
                    padding: 0;
                }
                > div {
                    padding: 0 10px;
                }
                &:hover .item-actions {
                    opacity: 1;
                }
                &:hover {
                    background-color: #ebf0f4;
                }
            }
            &:focus {
                & > .el-tree-node__content {
                    background-color: #e8eaed;
                }
            }
            & .el-tree__empty-text {
                font-size: 14px;
            }
            &.is-current > div:first-child {
                background-color: #e8eaed;
            }
            &.is-current > div:first-child .item-actions {
                opacity: 1;
            }
        }

        .tree-node-group {
            padding: 0 6px;
            margin-left: -20px;
            &.tree-node-type-doc {
                color: transparent;
            }
        }
        .is-expanded > div:first-child .tree-node-group {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }

        .directory-tree-search {
            position: sticky;
            padding: 0 6px;
            width: 96%;
            top: 0;
            background: #fff;
            z-index: 100;
            // border: 1px solid #f2f2f2;
            margin-bottom: 10px;

            // 重写element-input（搜索框）
            .el-input__clear {
                margin-right: -5px;
            }
            .el-input__inner {
                border: 0;
                border-radius: 0;
                padding: 0;
                padding-left: 3px;
                padding-right: 15px;
            }
        }
        .el-tree__drop-indicator {
            height: 2px !important;
        }
        .el-tree-node.is-drop-inner > div:first-child {
            .directory-tree-item {
                border: 2px solid $--color-primary-light-2;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .tree {
        height: calc(100vh - 170px);
    }
    .tree-node-group-icon {
        font-size: 15px;
    }

    .item-actions {
        opacity: 0;
        transition: opacity 0.2s;
        float: right;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-right: 3px;
        cursor: pointer;
    }

    .directory-tree-item {
        border: 2px solid #40a0ff00;
        text-overflow: ellipsis;
        width: 100%;
        display: inline-flex;
        overflow: hidden;
        align-items: center;
    }

    .is-drop-inner > div:first-child .item-more-action {
        color: rgb(132, 132, 132);
        font-size: 15px;
        line-height: 23px;
        height: 23px;
    }

    .group-list-loading {
        color: #a1a1a1;
        font-size: 14px;
        text-align: center;
        margin: 10px 0;
    }
</style>