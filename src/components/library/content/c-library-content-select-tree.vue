<template>
    <div class="c-library-content-select-tree">
        <div class="tools-bar">
            <el-button :loading="groupTreeLoading" type="text" icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
            <el-button type="text" icon="el-icon-refresh-right" @click="onReset">重置</el-button>
            <el-button type="text" icon="el-icon-set-up" @click="onSelect">全选 / 反选</el-button>
            <el-input v-model="filterTreeText" class="search" prefix-icon="el-icon-search" size="mini" clearable></el-input>
        </div>

        <el-tree :data="dataTree" node-key="key" ref="tree" v-loading="groupTreeLoading" :default-checked-keys="initCheckedData"
            :props="defaultProps" :filter-node-method="handleFilterTree" show-checkbox highlight-current default-expand-all>
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
    </div>
</template>

<script>
    export default {
        name: 'c-library-content-select-tree',
        props: {
            libraryId: {
                type: Number,
                required: true
            },
            initCheckedData: {
                type: Array,
                default: () => ([])
            }
        },
        computed: {
            // 内容树
            dataTree() {
                const docGroup = {};
                let groupTree = this.$utils.CloneDeep(this.groupTree);
                const docList = this.$utils.CloneDeep(this.docList);

                // 文档划分
                docList.forEach(doc => {
                    doc.nodeType = 'doc';
                    doc.name = doc.title;
                    doc.key = 'doc' + doc.id;
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
            // 内容树键集
            dataTreeKeys() {
                let keys = [];
                const groupTree = this.$utils.CloneDeep(this.groupTree);
                const docList = this.$utils.CloneDeep(this.docList);

                keys = keys.concat(docList.map((doc) => (`doc${doc.id}`)));
                keys = keys.concat(groupTree.map((group) => (`group${group.id}`)));

                return keys;
            }
        },
        watch: {
            libraryId: {
                handler(val) {
                    if (val > 0) {
                        this.init();
                    }
                },
                immediate: true
            },
            filterTreeText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                groupTreeLoading: false,
                groupTree: [],
                docList: [],
                filterTreeText: ''
            };
        },
        methods: {
            // 初始化
            async init() {
                this.groupTreeLoading = true;
                await this.getDocGroupTree();
                await this.getDocList();
                this.groupTreeLoading = false;
            },
            // 获取分组树
            async getDocGroupTree() {
                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryDocGroupTree(reqData).then(({ resData }) => {
                    this.groupTree = resData;
                });
            },
            // 获取文档列表
            async getDocList() {
                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryDocList(reqData).then(({ resData }) => {
                    this.docList = resData;
                });
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
            // 获取选中的键
            getCheckedData() {
                let keys = this.$refs.tree.getCheckedKeys();

                // 需要保存半选中状态的分组key集
                keys = keys.concat(this.$refs.tree.getHalfCheckedKeys().map((item) => (item.replace('group', 'vgroup'))));

                return keys;
            },
            // 事件：内容树列表刷新
            onRefresh() {
                this.init();
            },
            // 事件：内容树列表重置
            onReset() {
                this.$refs.tree.setCheckedKeys(this.initCheckedData);
            },
            // 事件：内容树列表全选/反选
            onSelect() {
                let resultKeys = [];
                if (this.getCheckedData().length === 0) {
                    resultKeys = this.dataTreeKeys || [];
                }
                this.$refs.tree.setCheckedKeys(resultKeys);
            }
        }
    };
</script>

<style lang="scss">
    .c-library-content-select-tree {
        .el-tree {
            background: white !important;
            margin: 10px 0;
        }

        .el-tree-node {
            &__content {
                color: $--color-primary-light-5;
                .tree-node-group-icon {
                    margin-right: 3px;
                    font-size: 15px;
                }
                .tree-node-doc-icon {
                    font-size: 15px;
                    margin-right: 3px;
                }
                .tree-node-label {
                    font-size: 14px;
                    color: $--color-primary-light-2;
                    overflow: hidden;
                    display: inline-block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    line-height: 14px;
                    position: relative;
                    top: 2px;
                }
                > div {
                    padding: 0 3px;
                }
            }
            & .el-tree__empty-text {
                font-size: 14px;
            }
        }

        .el-loading-mask {
            background: #f5f7fab0;
        }

        .directory-tree-item {
            white-space: nowrap;
            text-overflow: ellipsis;
            width: auto;
            display: inline-flex;
            overflow: hidden;
        }

        .tools-bar {
            top: 0px;
            position: sticky;
            z-index: 2;
            background: #fff;

            button {
                color: $--color-primary-light-4;
                &:hover {
                    color: $--color-primary-light-1;
                }
            }

            .search {
                width: 340px;
            }
        }
    }
</style>