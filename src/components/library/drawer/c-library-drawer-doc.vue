<template>
    <div class="c-library-content-drawer-doc">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="390px"
            :modal-append-to-body="false">
            <div class="content-drawer__content">

                <el-form :model="docInfo" label-position="top">
                    <el-form-item label="文档标题">
                        <el-input v-model="docInfo.title" placeholder="请输入文档标题" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            文档分组
                            <el-button class="doc-group-operation" type="text" icon="el-icon-refresh" :loading="groupTreeLoading"
                                size="medium" @click="onFlushGroupTree"></el-button>
                        </span>
                        <el-cascader class="doc-group-tree" v-model="docInfo.groupId"
                            popper-class="c-library-drawer-doc__cascader" :options="groupTree" :show-all-levels="false"
                            :props="groupTreeProps" placeholder="搜索文档分组" filterable clearable>
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </div>

            <el-alert title="该操作同时会保存正在编辑的文档内容！" type="info" :closable="false" show-icon> </el-alert>
            <div class="content-drawer__footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" :loading="saveLoading" @click="onSaveDoc">保 存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';

    export default {
        name: 'c-library-content-drawer-doc',
        mixins: [BaseDrawer],
        props: {
            docInfo: {
                type: Object,
                required: true
            }
        },
        watch: {
            docInfo: {
                handler(val) {
                    if (this.docInfo.libraryId > 0) {
                        this.initDocGroupTree();
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                title: '文档信息',
                saveLoading: false,
                groupTree: [],
                groupTreeProps: {
                    value: 'id',
                    label: 'name',
                    checkStrictly: true,
                    multiple: false,
                    emitPath: false
                },
                groupTreeLoading: false
            };
        },
        methods: {
            // 初始化文档分组树
            async initDocGroupTree(force = false) {
                if (this.groupTree.length !== 0 && !force) {
                    return this.groupTree;
                }
                const reqData = { library_id: this.docInfo.libraryId };
                await this.$api.v1.LibraryDocGroupTree(reqData, {
                    loading: (status) => { this.groupTreeLoading = status; }
                }).then(({ resData }) => {
                    this.groupTree = resData;
                });
            },
            // 事件：保存文档
            async onSaveDoc() {
            },
            // 事件：刷新文档分组树
            onFlushGroupTree() {
                this.initDocGroupTree(true);
            },
            // 事件：关闭drawer
            onClose() {
                this.visibleDrawer = false;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-doc__cascader {
        .el-cascader-panel {
            max-width: 80vw;
            overflow-x: auto;
            overflow-y: hidden;
        }

        .el-cascader-menu {
            width: 220px;
        }
    }

    .c-library-content-drawer-doc {
        .el-drawer {
            &__header {
                font-weight: bold;
                font-size: 20px;
            }

            &__body {
                padding: 20px;
                display: flex;
                flex-direction: column;
                font-weight: bold;
            }
        }

        .el-drawer .content-drawer {
            &__content {
                height: 100%;
                & form {
                    flex: 1;
                }
                label {
                    color: $--color-primary-light-3;
                }
            }
            &__footer {
                display: flex;
                & button {
                    flex: 1;
                }
            }
        }

        .doc-group-tree {
            width: 100%;
            display: inline-block;
        }

        .doc-group-operation {
            margin-left: 5px;
            i {
                font-weight: bold;
            }
        }
    }
</style>