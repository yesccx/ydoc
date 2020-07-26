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
                <el-button :disabled="meta.id >> 0 === 0" size="mini" @click="onDocHistory">历史记录</el-button>
                <el-dropdown trigger="click" type="primary" size="mini" icon="el-icon-circle-check" @command="onHandleCommand"
                    @click="onSaveDoc" split-button>
                    保存文档
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="doc-info">文档信息</el-dropdown-item>
                        <el-dropdown-item command="doc-remove">删除文档</el-dropdown-item>
                        <el-dropdown-item command="doc-switch-style">切换编辑器</el-dropdown-item>
                        <el-dropdown-item command="doc-save-as" divided>另存为文档</el-dropdown-item>
                        <el-dropdown-item command="doc-save-to-template" divided>另存为模板</el-dropdown-item>
                        <el-dropdown-item command="doc-use-template">使用模板</el-dropdown-item>
                        <el-dropdown-item command="doc-share" divided>分享</el-dropdown-item>
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
            },
            'meta.editor'(val) {
                this.$emit('input');
            }
        },
        methods: {
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
                    case 'doc-switch-style':
                        this.libraryContentEventBus.$emit('editor-doc-info', { docInfo });
                        break;
                    case 'doc-use-template':
                        this.libraryContentEventBus.$emit('doc-template-will-use');
                        break;
                    case 'doc-remove':
                        this.onDocRemove(this.meta.id);
                        break;
                    case 'doc-save-to-template':
                        this.libraryContentEventBus.$emit('editor-doc-template-info', {
                            id: 0,
                            introduction: '',
                            editor: docInfo.editor,
                            name: '模板' + this.$utils.DateFormat(Date.now() / 1000),
                            content: docInfo.content
                        });
                        break;
                    case 'doc-save-as':
                        this.libraryContentEventBus.$emit('editor-doc-info', { docInfo, isSaveAsMode: true });
                        break;
                    case 'doc-share':
                        this.libraryContentEventBus.$emit('doc-will-share', { docId: this.meta.id });
                        break;
                    default:
                        this.$utils.Abuilding();
                        break;
                }
            },
            // 事件：文档删除
            onDocRemove(docId) {
                this.libraryContentEventBus.$emit('doc-remove', { docId });
            },
            // 事件：文档历史记录
            onDocHistory() {
                const docId = this.meta.id;
                this.libraryContentEventBus.$emit('doc-history', { docId });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .c-library-editor-meta {
        margin: 10px 2px;
        border-bottom: 1px solid $--color-primary-light-8;
        padding-bottom: 10px;
        margin-bottom: 0;
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