<template>
    <div class="c-library-drawer-doc">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="400px"
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
                                size="medium" @click="onGroupTreeFlush"></el-button>
                        </span>
                        <el-cascader class="doc-group-tree" v-model="docInfo.groupId"
                            :props="{ value: 'id', label: 'name', checkStrictly: true, multiple: false, emitPath: false }"
                            popper-class="c-library-drawer-doc__cascader" :options="groupTree" placeholder="搜索文档分组" filterable
                            clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item>
                        <span slot="label">
                            文档编辑器 <span class="doc-editor-tip">更换编辑器后会清空原编辑内容，但不保存实际不影响！</span>
                        </span>
                        <div class="doc-editor">
                            <el-select class="doc-editor__select" v-model="docUseEditor" placeholder="请选择编辑器">
                                <el-option v-for="editor in editorCollection" :key="editor.value" :label="editor.name"
                                    :value="editor.value">
                                </el-option>
                            </el-select>
                            <el-popconfirm @onConfirm="onDocEditorModify" icon="el-icon-warning" title="是否确认更换该文档的编辑器？！">
                                <el-button slot="reference" icon="el-icon-c-scale-to-original" type="primary" plain>
                                    更换编辑器</el-button>
                            </el-popconfirm>
                        </div>
                    </el-form-item>
                </el-form>
            </div>

            <el-alert title="该操作同时会保存正在编辑的文档内容！" type="info" :closable="false" show-icon> </el-alert>
            <div class="content-drawer__footer">
                <el-popconfirm @onConfirm="onReset" icon="el-icon-warning" title="是否确认重置？">
                    <el-button slot="reference" type="danger">重 置</el-button>
                </el-popconfirm>
                <el-button type="primary" :loading="saveLoading" @click="onDocSave">保 存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryContent from '@/extends/mixins/library-content';
    import EditorCode from '@/common/constants/editor-code';

    export default {
        name: 'c-library-drawer-doc',
        mixins: [BaseDrawer, LibraryContent],
        computed: {
            title() {
                return this.isSaveAsMode ? '另存为文档' : '文档信息';
            }
        },
        data() {
            return {
                isSaveAsMode: false,
                docInfo: {
                    id: 0,
                    title: '',
                    groupId: 0,
                    editor: '',
                    libraryId: 0
                },
                editorCollection: [
                    { name: 'Markdown', value: EditorCode.EDITOR_MARKDOWN },
                    { name: '富文本', value: EditorCode.EDITOR_HTML },
                    { name: '纯文本', value: EditorCode.EDITOR_TEXT }
                ],
                docInfoBackup: {},
                groupTree: [],
                saveLoading: false,
                groupTreeLoading: false,
                docUseEditor: ''
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('editor-doc-info', ({ docInfo, isSaveAsMode = false }) => {
                    // 编辑模式
                    this.isSaveAsMode = isSaveAsMode;

                    // 准备文档信息
                    this.docInfo = isSaveAsMode ? this.$utils.CloneDeep(docInfo) : docInfo;
                    this.docUseEditor = this.docInfo.editor;
                    this.docInfoBackup = this.$utils.CloneDeep(docInfo);

                    // 初始化
                    this.visibleDrawer = true;
                    this.initDocGroupTree();
                });
            },
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
            // 事件：文档保存
            onDocSave() {
                if (this.isSaveAsMode) {
                    this.onDocSaveAs();
                    return true;
                }

                this.saveLoading = true;
                this.libraryContentEventBus.$emit('doc-save', {
                    docId: this.docInfo.id,
                    done: () => {
                        this.saveLoading = false;
                    }
                });
            },
            // 事件：文档另存为
            onDocSaveAs() {
                this.saveLoading = true;
                const docInfo = this.$utils.CloneDeep(this.docInfo);
                this.libraryContentEventBus.$emit('doc-save-as', {
                    docInfo,
                    done: ({ resData }) => {
                        this.saveLoading = false;
                        if (resData.id > 0) {
                            this.$tip.success('另存为成功');
                            this.visibleDrawer = false;
                        }
                    }
                });
            },
            // 事件：刷新文档分组树
            onGroupTreeFlush() {
                this.initDocGroupTree(true);
            },
            // 事件：重置编辑内容
            onReset() {
                const docInfoBackup = this.$utils.CloneDeep(this.docInfoBackup);
                this.docInfo.groupId = docInfoBackup.groupId;
                this.docInfo.title = docInfoBackup.title;
            },
            // 事件：文档使用的编辑器切换
            onDocEditorModify() {
                if (this.docInfo.editor !== this.docUseEditor) {
                    this.docInfo.editor = this.docUseEditor;
                    this.docInfo.content = '';
                }
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

    .c-library-drawer-doc {
        .el-drawer {
            &__header {
                font-weight: bold;
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
                    color: $--color-primary-light-4;
                }
            }
            &__footer {
                display: flex;
                justify-content: space-between;
                > button,
                > span {
                    width: 49%;
                    button {
                        width: 100%;
                    }
                }
            }
        }

        .doc-group-tree {
            width: 100%;
            display: inline-block;
            margin-right: 5px;
        }

        .doc-editor {
            display: flex;
            justify-content: space-between;

            &__select {
                width: 100%;
                margin-right: 5px;
            }

            &-tip {
                font-size: 10px;
                font-weight: normal;
                color: $--color-warning;
            }
        }

        .doc-group-operation {
            margin-left: 5px;
            i {
                font-weight: bold;
            }
        }
    }
</style>