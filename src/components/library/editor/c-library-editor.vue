<template>
    <div class="c-library-edtior" v-loading="loading" element-loading-text="编辑器初始中...">
        <div ref="editor" class="layout-editor" :is="layout" :init-content="initContent" @input="onInput" @save="onSave"
            @inited="onInited">
        </div>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';
    import EditorCode from '@/common/constants/editor-code';

    export default {
        name: 'c-library-edtior',
        components: {
            'c-library-editor-markdown': () => import('@/components/library/editor/layout/c-library-editor-markdown'),
            'c-library-editor-html': () => import('@/components/library/editor/layout/c-library-editor-html'),
            'c-library-editor-text': () => import('@/components/library/editor/layout/c-library-editor-text')
        },
        mixins: [LibraryContent],
        props: {
            // 初始化值
            initContent: {
                type: String,
                default: ''
            },
            editor: {
                type: String,
                required: true
            }
        },
        watch: {
            layout() {
                this.loading = true;
            }
        },
        computed: {
            layout() {
                return 'c-library-editor-' + (this.editor || EditorCode.EDITOR_DEFAULT);
            }
        },
        data() {
            return {
                loading: true
            };
        },
        methods: {
            // 暴露给外部调用，返回正在编辑的内容
            fetchContent() {
                return this.$refs.editor.fetchContent();
            },
            // 暴露给外部调用，设置正在编辑的内容
            setContent(content) {
                this.$refs.editor.setContent(content);
            },
            // 事件：input
            onInput() {
                this.$emit('input');
            },
            // 事件：初始化完毕
            onInited() {
                this.loading = false;
                this.$emit('inited');
            },
            // 事件：触发保存
            onSave() {
                this.libraryContentEventBus.$emit('active-doc-save', {});
            }
        }
    };
</script>

<style lang="scss">
    .c-library-edtior {
        min-height: 30vh;

        .layout-editor {
            font-size: 15px;
        }
    }
</style>