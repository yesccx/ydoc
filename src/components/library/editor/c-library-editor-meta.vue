<template>
    <div class="c-library-editor-meta">
        <el-form :inline="true" class="meta-operation">
            <el-input class="meta-operation__title" v-model="meta.title" size="mini" placeholder="请输入标题" clearable>
            </el-input>
            <span v-show="meta.updateTime > 0 || loading" class="meta-operation__last-time">
                <span v-show="!loading">
                    保存于 {{ meta.updateTime | dateFormat("m-d H:i:s") }}
                </span>
                <span v-show="loading">
                    <i class="el-icon-loading "></i> 保存中
                </span>
            </span>
            <el-button-group class="fr">
                <el-button size="mini">历史记录</el-button>
                <el-dropdown trigger="click" type="primary" size="mini" icon="el-icon-circle-check" @command="onHandleCommand"
                    @click="onSaveDoc" split-button>
                    保存文档
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="doc-info">文档信息</el-dropdown-item>
                        <el-dropdown-item command="doc-remove">删除文档</el-dropdown-item>
                        <el-dropdown-item command="switch-style">切换风格</el-dropdown-item>
                        <el-dropdown-item command="save-as-doc" divided>另存为文档</el-dropdown-item>
                        <el-dropdown-item command="save-to-template" divided>另存为模板</el-dropdown-item>
                        <el-dropdown-item command="use-template">使用模板</el-dropdown-item>
                        <el-dropdown-item command="share-doc" divided>分享</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-button-group>
        </el-form>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-editor-meta',
        mixins: [LibraryContent],
        props: {
            meta: {
                type: Object,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            'meta.title'(val) {
                this.$emit('input');
            },
            'meta.groupId'(val) {
                this.$emit('input');
            }
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 文档删除
                bus.$on('doc-remove', ({ docId }) => {
                    this.onDocRemove(docId);
                });
            },
            // 事件：保存文档
            onSaveDoc() {
                this.libraryContentEventBus.$emit('doc-save', { docId: this.meta.id });
            },
            // 事件：处理操作指令
            onHandleCommand(command) {
                this.libraryContentEventBus.$emit('doc-fetch-content', { docId: this.meta.id });
                const docInfo = this.meta;
                switch (command) {
                    case 'doc-info':
                        this.libraryContentEventBus.$emit('editor-doc-info', { docInfo });
                        break;
                    case 'use-template':
                        this.libraryContentEventBus.$emit('doc-template-will-use');
                        break;
                    case 'doc-remove':
                        this.onDocRemove(this.meta.id);
                        break;
                    case 'save-to-template':
                        this.libraryContentEventBus.$emit('editor-doc-template-info', {
                            id: 0,
                            introduction: '',
                            name: '模板' + this.$utils.DateFormat(Date.now() / 1000),
                            content: docInfo.content
                        });
                        break;
                    case 'save-as-doc':
                        this.libraryContentEventBus.$emit('editor-doc-info', { docInfo, isSaveAsMode: true });
                        break;
                    default:
                        this.$utils.Abuilding();
                        break;
                }
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .c-library-editor-meta {
        margin: 10px 2px;
    }
    .meta-operation {
        &__title {
            width: 250px;
            margin-right: 5px;
        }

        &__last-time {
            font-size: 12px;
            color: $--color-primary-light-6;
        }
    }
</style>