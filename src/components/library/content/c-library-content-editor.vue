<template>
    <div class="c-library-content-editor">
        <!-- 编辑器 -->
        <el-tabs v-model="activeDocEditor" v-show="isEditorMode" type="card" @tab-remove="onRemoveDocEditor" closable>
            <el-tab-pane v-for="docEditor in docEditorCollection" :key="docEditor.id" :label="docEditor.title"
                :name="docEditor.id">
                <!-- 操作区 -->
                <c-library-editor-meta :loading="saveLoading" :meta="docEditor" />

                <!-- 编辑区 -->
                <c-library-editor ref="docEditor" :content="docEditor.content" />
            </el-tab-pane>
        </el-tabs>

        <!-- 欢迎页 -->
        <c-library-editorwelcome v-show="!isEditorMode" />
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-content-editor',
        components: {
            'c-library-editor': () => import('@/components/library/editor/c-library-editor'),
            'c-library-editor-meta': () => import('@/components/library/editor/c-library-editor-meta'),
            'c-library-editorwelcome': () => import('@/components/library/editor/c-library-editorwelcome')
        },
        mixins: [LibraryContent],
        computed: {
            docEditorMap() {
                const map = {};
                this.$utils.ForEach(this.docEditorCollection, (docEditor, key) => {
                    map[docEditor.id] = key;
                });
                return map;
            },
            isEditorMode() {
                return this.activeDocEditor !== '' && this.activeDocEditor !== '0';
            }
        },
        data() {
            return {
                activeDocEditor: '',
                docEditorCollection: [],
                creatorCounter: 0,
                saveLoading: false
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档将要创建
                bus.$on('doc-will-create', (docGroupId = 0, docTitle = '') => {
                    this.useCreateDocEditor(docGroupId, docTitle);
                });
                // 事件：文档将要修改
                bus.$on('doc-will-modify', (docId) => {
                    this.useModifyDocEditor(docId);
                });
                // 事件：文档库保存
                bus.$on('doc-save', async (docId) => {
                    this.saveDoc(docId);
                });
            },
            // 保存文档
            async saveDoc(docId) {
                const initialDocInfo = this.fetchEditorDocInfo(docId);
                if (!initialDocInfo) {
                    this.$tip.error('文档内容错误，请重试编辑');
                    return false;
                }
                const docInfo = {
                    library_doc_id: docId >> 0,
                    library_id: initialDocInfo.libraryId,
                    title: initialDocInfo.title,
                    content: initialDocInfo.content,
                    group_id: initialDocInfo.groupId
                };

                const axiosLibraryDocUpsert = docInfo.library_doc_id > 0 ? this.$api.v1.LibraryDocModify : this.$api.v1.LibraryDocCreate;
                await axiosLibraryDocUpsert(docInfo, {
                    loading: status => { this.saveLoading = status; }
                }).then(({ resMsg, resData }) => {
                    if (docInfo.library_doc_id === 0) {
                        this.docEditorCollection[initialDocInfo.editorIndex].id = resData.id;
                        this.handleActiveDocEditor(resData.id);
                    } else {
                        this.docEditorCollection[initialDocInfo.editorIndex].updateTime = resData.update_time;
                    }
                    this.libraryContentEventBus.$emit('doc-saved', resData.id);
                });
            },
            // 使用创建文档型的编辑器选择卡
            useCreateDocEditor(groupId = 0, docTitle = '') {
                this.creatorCounter++;
                docTitle = docTitle || '无标题-' + (this.creatorCounter);
                this.useDocEditor({
                    id: 't' + this.creatorCounter,
                    libraryId: this.libraryId,
                    title: docTitle,
                    content: '',
                    groupId: groupId,
                    updateTime: 0
                });
            },
            // 使用修改文档型的编辑器选择卡
            async useModifyDocEditor(docId) {
                const { resData: docInfo } = await this.$api.v1.LibraryDocInfo({ library_id: this.libraryId, library_doc_id: docId });
                this.useDocEditor({
                    id: String(docId),
                    libraryId: docInfo.library_id,
                    title: docInfo.title,
                    content: docInfo.content,
                    groupId: docInfo.group_id,
                    updateTime: docInfo.update_time
                });
            },
            // 使用编辑器选项卡（如果已存在将不重复创建）
            useDocEditor(docInfo) {
                if (!this.checkExistDocEditor(docInfo.id)) {
                    this.docEditorCollection.push(docInfo);
                }
                this.handleActiveDocEditor(docInfo.id);
            },
            // 根据文档id获取正在编辑中的文档信息
            fetchEditorDocInfo(docId) {
                const editorIndex = this.docEditorMap[docId];
                if (editorIndex === undefined) {
                    return false;
                }

                // 获取编辑内容
                let docInfo = this.docEditorCollection[editorIndex];
                const content = this.$refs.docEditor[editorIndex].fetchContent();
                docInfo.content = content;
                docInfo.editorIndex = editorIndex;

                return this.$utils.CloneDeep(docInfo);
            },
            // 处理某个文档编辑器获得焦点
            handleActiveDocEditor(docId) {
                docId = String(docId);
                this.activeDocEditor = docId;
            },
            // 判断某个文档库id的编辑器是否已存在
            checkExistDocEditor(docId) {
                return this.docEditorMap[docId] !== undefined;
            },
            // 事件：移除某个文档编辑器
            onRemoveDocEditor(removeDocEditor) {
                let docEditorCollection = this.docEditorCollection;
                let activeDocEditor = this.activeDocEditor;

                // 如果activeTab被移除，则寻找相邻tab做为下一个activeTab
                if (activeDocEditor === removeDocEditor) {
                    const removeDocEditorIndex = this.docEditorMap[removeDocEditor];
                    const nextDocEditor = docEditorCollection[removeDocEditorIndex + 1] || docEditorCollection[removeDocEditorIndex - 1];
                    this.activeDocEditor = nextDocEditor ? nextDocEditor.id : '';
                }

                this.docEditorCollection = docEditorCollection.filter(docEditor => docEditor.id !== removeDocEditor);
            }
        }
    };
</script>

<style lang="scss">
    .c-library-content-editor {
        .el-tabs__header {
            margin-bottom: 7px;
        }
    }
</style>