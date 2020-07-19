<template>
    <div class="c-library-preview-tree" v-loading="treeLoading">
        <!-- TODO: 目前只支持搜索项名称，后期做成搜索项内容（需要后端支持） -->
        <el-input v-model="searchKey" size="small" class="directory-tree-search" placeholder="输入关键字，检索目录与文档" clearable>
        </el-input>

        <!-- 目录树 -->
        <el-scrollbar class="tree">
            <el-tree element-loading-spinner="el-icon-loading" :data="dataTree" :props="{ children: 'children', label: 'name' }"
                node-key="key" @node-click="onNodeClick" :empty-text="treeEmptyText" default-expand-all>
                <div slot-scope="{ node,data }" class="directory-tree-item">

                    <!-- 项图标 -->
                    <i v-if="data.nodeType === 'group'" class="tree-node-group-icon icon y-icon-folder-close"></i>
                    <i v-else class="tree-node-doc-icon el-icon-document"></i>

                    <!-- Tip -->
                    <el-tooltip :content="data.name" :open-delay="800" effect="dark" placement="top-end">
                        <span class="tree-node-label" :level="node.level">{{ data.name }}</span>
                    </el-tooltip>
                </div>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script>
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';

    export default {
        name: 'c-library-preview-tree',
        mixins: [LibraryPreviewBase],
        computed: {
            showDocGroupTree() {
                return !this.treeLoading;
            },
            // 内容树
            dataTree() {
                const docGroup = {};
                let docDocGroupTree = this.$utils.CloneDeep(this.docDocGroupTree);
                const docCollection = this.$utils.CloneDeep(this.docCollection);

                // 文档划分
                docCollection.filter((doc) => {
                    return doc.title.indexOf(this.searchKey) >= 0;
                }).forEach(doc => {
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
                    docDocGroupTree = docDocGroupTree.concat(docGroup[0]);
                }

                // 深度结合文档与文档分组
                return this.deepBuildDataTree(docDocGroupTree, docGroup);
            },
            treeEmptyText() {
                return this.treeLoading ? '' : '暂无数据';
            }
        },
        data() {
            return {
                searchKey: '',
                docDocGroupTree: [],
                docCollection: [],
                treeLoading: true
            };
        },
        methods: {
            async initComponent() {
                if (this.isShareSimplify) {
                    return true;
                }
                await this.initDocGroupTree();
                await this.initDocCollection();
            },
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档树刷新
                bus.$on('doc-tree-flush', () => {
                    this.initComponent();
                });
            },
            // 初始化分组树
            async initDocGroupTree() {
                const reqData = this.shareAccessToken;
                await this.$api.v1.LibraryShareDocGroupTree(reqData, {
                    loading: status => { this.treeLoading = status; }
                }).then(({ resData }) => {
                    this.docDocGroupTree = resData;
                });
            },
            // 初始化文档列表
            async initDocCollection() {
                const reqData = this.shareAccessToken;
                await this.$api.v1.LibraryShareDocCollection(reqData, {
                    loading: status => { this.treeLoading = status; }
                }).then(({ resData }) => {
                    this.docCollection = resData;
                });
            },
            onNodeClick(node) {
                const hash = `#${node.nodeType}-${node.id}`;
                hash !== this.$route.hash && this.$router.replace({ ...this.$route, hash });

                if (node.nodeType === 'doc') {
                    this.libraryPreviewEventBus.$emit('doc-view', node.id);
                }
            },
            // 深度结合文档与文档分组
            deepBuildDataTree(docDocGroupTree, docGroup) {
                if (!docDocGroupTree || docDocGroupTree.length === 0) {
                    return [];
                }
                docDocGroupTree = this.$utils.CloneDeep(docDocGroupTree);

                docDocGroupTree.forEach(group => {
                    group.nodeType = group.nodeType ? group.nodeType : 'group';
                    group.key = group.nodeType + group.id;
                    group.children = this.deepBuildDataTree(group.children, docGroup) || [];
                    if (docGroup[group.id]) {
                        group.children = group.children.concat(docGroup[group.id]);
                    }

                    if (group.children) {
                        group.children.sort((a, b) => {
                            return a.sort - b.sort;
                        });
                    }
                });

                // 排序
                docDocGroupTree.sort((a, b) => {
                    return a.sort - b.sort;
                });

                return docDocGroupTree;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-preview-tree {
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
                @for $i from 1 through 10 {
                    .tree-node-label[level="#{$i}"] {
                        width: (195px - ($i - 1) * 17);
                    }
                }
                > .el-tree-node__expand-icon {
                    margin-left: -12px;
                    color: transparent;
                    padding: 0;
                }
                > div {
                    padding: 0 10px;
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
    }
</style>

<style lang="scss" scoped>
    .tree {
        height: calc(100vh - 170px);
    }
    .tree-node-group-icon {
        font-size: 15px;
    }

    .directory-tree-item {
        width: 100%;
        border: 2px solid #40a0ff00;
    }
</style>