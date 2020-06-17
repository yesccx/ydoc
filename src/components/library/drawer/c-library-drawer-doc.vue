<template>
    <div class="c-library-content-drawer-doc">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="390px" :modal-append-to-body="false">
            <div class="content-drawer__content">
                <el-form :model="docInfo" label-position="top">
                    <el-form-item label="文档标题">
                        <el-input v-model="docInfo.title" placeholder="请输入文档标题" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="文档分组">
                        <el-cascader class="doc-group-tree" v-model="docInfo.groupId" :options="groupTree"
                            :show-all-levels="false" :props="groupTreeProps" placeholder="搜索文档分组" clearable>
                        </el-cascader>
                        <el-button class="doc-group-operation" type="text" icon="el-icon-refresh" :loading="groupTreeLoading"
                            size="medium" @click="onFlushGroupTree"></el-button>
                    </el-form-item>
                </el-form>

                <el-alert title="仅保存所见的文档标题与分组（不含内容）！" type="info" :closable="false" show-icon> </el-alert>

                <div class="content-drawer__footer">
                    <el-button @click="onClose">取 消</el-button>
                    <el-button type="primary" :loading="saveLoading" @click="onSaveDoc">保 存</el-button>
                </div>
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
                await this.$api.LibraryDocGroupTree(reqData, {
                    loading: (status) => { this.groupTreeLoading = status; }
                }).then(({ resData }) => {
                    this.groupTree = resData;
                });
            },
            // 事件：保存文档
            async onSaveDoc() {
                // const initialDocInfo = this.fetchEditorDocInfo(docId);
                // if (!initialDocInfo) {
                //     this.$tip.error('文档内容错误，请重试编辑');
                //     return false;
                // }
                // const docInfo = {
                //     doc_id: docId >> 0,
                //     library_id: initialDocInfo.libraryId,
                //     title: initialDocInfo.title,
                //     content: initialDocInfo.content,
                //     group_id: initialDocInfo.groupId
                // };

                // const axiosLibraryDocUpsert = docInfo.doc_id > 0 ? this.$api.LibraryDocModify : this.$api.LibraryDocCreate;
                // await axiosLibraryDocUpsert(docInfo, {
                //     loading: status => { this.saveLoading = status; }
                // }).then(({ resMsg, resData }) => {
                //     if (docInfo.doc_id === 0) {
                //         this.docEditorCollect[initialDocInfo.editorIndex].id = resData.id;
                //         this.handleActiveDocEditor(resData.id);
                //     } else {
                //         this.docEditorCollect[initialDocInfo.editorIndex].updateTime = resData.update_time;
                //     }
                //     this.libraryContentEventBus.$emit('doc-saved', resData.id);
                // });
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
    .c-library-content-drawer-doc {
        .el-drawer__body {
            padding: 20px;
        }
        .content-drawer {
            &__body {
                padding: 20px;
            }
            &__content {
                display: flex;
                flex-direction: column;
                height: 100%;
                & form {
                    flex: 1;
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
            width: 320px;
        }
        .doc-group-operation {
            margin-left: 5px;
        }
    }
</style>