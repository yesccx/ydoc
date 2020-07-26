<!-- 设置文档默认编辑器Modal -->
<template>
    <el-dialog class="c-config-doc-editor-modal" v-loading="loadingModal" :visible.sync="visibleModal" title="设置文档默认编辑器"
        width="400px">
        <el-select class="editor-select" v-model="selectEditor" placeholder="请选择编辑器" clearable>
            <el-option v-for="editor in editorCollection" :key="editor.key" :label="editor.name" :value="editor.key">
                <span class="editor-label">{{ editor.name }}</span>
            </el-option>
        </el-select>

        <span slot="footer">
            <el-button type="primary" :loading="confirmLoading" @click="onConfirm" size="mini">确认修改</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    import EditorCode from '@/common/constants/editor-code';

    export default {
        name: 'c-config-doc-editor-modal',
        mixins: [BaseModal],
        props: {
            defaultEditor: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                selectEditor: '',
                editorCollection: [
                    { key: EditorCode.EDITOR_HTML, name: '富文本编辑器' },
                    { key: EditorCode.EDITOR_MARKDOWN, name: 'Markdown编辑器' },
                    { key: EditorCode.EDITOR_TEXT, name: '纯文本编辑器' }
                ],
                confirmLoading: false
            };
        },
        methods: {
            // 事件：modal被打开（做初始化）
            onModalOpen() {
                this.selectEditor = this.defaultEditor;
            },
            // 事件：确认修改默认编辑器
            onConfirm() {
                this.$emit('editor-modify', {
                    selectEditor: this.selectEditor,
                    handleLoading: (status) => {
                        this.confirmLoading = status;
                    },
                    done: () => {
                        this.visibleModal = false;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .editor {
        &-select {
            width: 100%;
        }

        &-label {
            float: left;
        }
    }
</style>
