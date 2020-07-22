<template>
    <div class="c-library-content-editor">
        <!-- 编辑器 -->
        <el-tabs v-model="activeDocEditor" v-show="isEditorMode" type="card" @tab-remove="onRemoveDocEditor" closable>
            <el-tab-pane v-for="docEditor in docEditorCollection" :key="docEditor.id" :label="docEditor.title"
                :name="docEditor.id">
                <span slot="label" :class="docEditorSaveStatusCollection.indexOf(docEditor.id) >= 0 ? 'not-save' : ''">
                    {{ docEditor.title }}
                </span>
                <!-- 操作区 -->
                <c-library-editor-meta :loading="saveLoading" :meta="docEditor" @input="onEditorInput(docEditor)" />

                <!-- 编辑区 -->
                <el-scrollbar style="height: calc(100vh - 125px);">
                    <c-library-editor class="little-view" ref="docEditor" :init-content="docEditor.content"
                        @input="onEditorInput(docEditor)" />
                </el-scrollbar>
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
            activeDoc() {
                return this.docEditorCollection[this.docEditorMap[this.activeDocEditor]];
            },
            isEditorMode() {
                return this.activeDocEditor !== '' && this.activeDocEditor !== '0';
            }
        },
        data() {
            return {
                activeDocEditor: '',
                docEditorCollection: [],
                docEditorSaveStatusCollection: [],
                creatorCounter: 0,
                saveLoading: false,
                docDefaultTemplate: {
                    inited: false,
                    data: {
                        title: '',
                        content: '',
                        groupId: 0
                    }
                }
            };
        },
        created() {
            this.globalDocSaveShortcutKeyHandler(true);
        },
        destroyed() {
            this.globalDocSaveShortcutKeyHandler(false);
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

                // 事件：文档保存
                bus.$on('doc-save', async ({ docId, done }) => {
                    await this.docSaveById(docId);
                    typeof done === 'function' && done();
                });

                // 事件：文档另存为
                bus.$on('doc-save-as', async ({ docInfo, done }) => {
                    // 复制源文档的当前编辑内容
                    const sourceDocInfo = this.fetchEditorDocInfo(docInfo.id);

                    // 处理另存为
                    await this.docSave({
                        library_doc_id: 0,
                        library_id: docInfo.libraryId,
                        title: docInfo.title,
                        content: sourceDocInfo.content,
                        group_id: docInfo.groupId
                    }, done);
                });

                // 事件：文档内容获取（更新）
                bus.$on('doc-fetch-content', ({ docId }) => {
                    return this.fetchEditorDocInfo(docId);
                });

                // 事件：文档使用模板
                bus.$on('doc-template-use', (template) => {
                    let activeDocContent = this.fetchEditorDocContent(this.activeDoc.id);
                    const editorIndex = this.docEditorMap[this.activeDoc.id];
                    if (!(activeDocContent.trim())) {
                        this.activeDoc.content = template.content;
                        this.$refs.docEditor[editorIndex].setContent(template.content);
                    } else {
                        this.$utils.Confirm('是否使用该模板，该操作将会替换正在编辑的内容！').then(() => {
                            this.activeDoc.content = template.content;
                            this.tagDocNotSave(this.activeDoc.id);
                            this.$refs.docEditor[editorIndex].setContent(template.content);
                        });
                    }
                });

                // 事件：文档被删除
                bus.$on('doc-removed', ({ docId, groupId = -1 }) => {
                    docId = String(docId);
                    const docInfo = this.fetchEditorDocInfo(docId);
                    if (docInfo) {
                        docInfo.id = 't' + this.creatorCounter++;
                        if (groupId >= 0) {
                            docInfo.groupId = groupId;
                        }
                        if (this.activeDocEditor === docId) {
                            this.handleActiveDocEditor(docInfo.id);
                        }
                        this.tagDocNotSave(docInfo.id);
                    }
                });

                // 事件：文档被修改
                bus.$on('doc-modifyed', ({ docId }) => {
                    if (this.docEditorMap[docId] !== undefined || String(docId).indexOf('t') === 0) {
                        this.tagDocNotSave(String(docId));
                    }
                });

                // 事件：文档历史恢复
                bus.$on('doc-history-recovery', (docHistory) => {
                    const editorIndex = this.docEditorMap[docHistory.doc_id];
                    const docInfo = this.docEditorCollection[editorIndex];
                    docInfo.groupId = docHistory.group_id;
                    docInfo.title = docHistory.title;
                    docInfo.content = docHistory.content;
                    this.$refs.docEditor[editorIndex].setContent(docInfo.content);

                    this.tagDocNotSave(docHistory.doc_id);
                });
            },
            // 获取文档默认模板
            async fetchDocDefaultTemplate() {
                if (this.docDefaultTemplate.inited) {
                    return this.docDefaultTemplate.data;
                }

                // 获取成员偏好设置中指定的模板id
                const docDefaultTemplateId = this.libraryMemberPreference.config.library_doc_default_template;
                if (!docDefaultTemplateId) {
                    this.docDefaultTemplate.inited = true;
                    return this.docDefaultTemplate.data;
                }

                // 获取模板信息
                await this.$api.v1.LibraryDocTemplateInfo({ library_doc_template_id: docDefaultTemplateId }).then(({ resData }) => {
                    this.docDefaultTemplate.data = resData;
                });

                return this.docDefaultTemplate.data;
            },
            // 根据文档id保存文档（根据编辑器选项卡）
            async docSaveById(docId) {
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

                await this.docSave(docInfo, ({ resData, $resError }) => {
                    if ($resError) {
                        return false;
                    }

                    if (docInfo.library_doc_id === 0) {
                        this.docEditorCollection[initialDocInfo.editorIndex].id = resData.id;
                        this.handleActiveDocEditor(resData.id);
                    } else {
                        this.docEditorCollection[initialDocInfo.editorIndex].updateTime = resData.update_time;
                    }
                });
            },
            // 文档保存
            async docSave(docInfo, done) {
                let resData = false;
                const axiosLibraryDocUpsert = docInfo.library_doc_id > 0 ? this.$api.v1.LibraryDocModify : this.$api.v1.LibraryDocCreate;
                await axiosLibraryDocUpsert(docInfo, {
                    loading: status => { this.saveLoading = status; },
                    report: true
                }).then((res) => {
                    resData = res;
                    this.libraryContentEventBus.$emit('doc-saved', res.resData.id);
                }).catch((res) => {
                    resData = res;
                    this.$tip.error(res.resMsg);
                });

                this.untagDocNotSave(docInfo.library_doc_id);

                typeof done === 'function' && done(resData);

                return resData;
            },
            // 标记某个选项卡未保存
            tagDocNotSave(docId) {
                docId = docId + '';
                this.docEditorSaveStatusCollection.push(docId);
            },
            // 取消标记某个选项卡未保存
            untagDocNotSave(realDocId) {
                this.docEditorSaveStatusCollection = this.docEditorSaveStatusCollection.filter((docId) => {
                    return docId >> 0 !== realDocId >> 0;
                });
            },
            // 使用创建文档型的编辑器选择卡
            async useCreateDocEditor(groupId = 0, docTitle = '') {
                this.creatorCounter++;
                docTitle = docTitle || '无标题-' + (this.creatorCounter);
                const docVirtualId = 't' + this.creatorCounter;

                // 获取默认文档模板
                const docDefaultTempalte = await this.fetchDocDefaultTemplate();

                this.useDocEditor({
                    id: docVirtualId,
                    libraryId: this.libraryId,
                    title: docTitle,
                    content: docDefaultTempalte.content || '',
                    groupId: groupId || docDefaultTempalte.groupId,
                    updateTime: 0
                });
                this.tagDocNotSave(docVirtualId);
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
                if (editorIndex === undefined || !this.$refs.docEditor[editorIndex]) {
                    return false;
                }

                // 获取编辑内容
                let docInfo = this.docEditorCollection[editorIndex];
                const content = this.$refs.docEditor[editorIndex].fetchContent();
                docInfo.content = content;
                docInfo.editorIndex = editorIndex;

                return docInfo;
            },
            // 根据文档id获取正在编辑中的文档内容
            fetchEditorDocContent(docId) {
                const editorIndex = this.docEditorMap[docId];
                if (editorIndex === undefined || !this.$refs.docEditor[editorIndex]) {
                    return '';
                }
                return this.$refs.docEditor[editorIndex].fetchContent();
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
                this.untagDocNotSave(activeDocEditor);
            },
            // 事件：编辑器输入
            onEditorInput(docEditor) {
                this.tagDocNotSave(docEditor.id);
            },
            // Ctrl+S 保存（需要在生命周期即将结束时销毁）
            globalDocSaveShortcutKeyHandler(stat = true) {
                const eventName = 'keydown';
                if (stat) {
                    this.$saveEventAction = (e) => {
                        if (!(e.which === 83 && e.ctrlKey)) {
                            return true;
                        } else if (this.activeDocEditor && this.activeDocEditor !== '0') {
                            this.docSaveById(this.activeDocEditor);
                        }
                        e.preventDefault();
                        return false;
                    };
                    window.addEventListener(eventName, this.$saveEventAction);
                } else {
                    window.removeEventListener(eventName, this.$saveEventAction);
                }
            }
        }
    };
</script>

<style lang="scss">
    .c-library-content-editor {
        .el-tabs__header {
            margin-bottom: 7px;
        }
        .not-save {
            font-style: italic;
            font-weight: bold;
        }
    }
</style>