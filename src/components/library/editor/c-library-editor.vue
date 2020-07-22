<template>
    <div class="c-library-edtior">
        <div ref="editor" class="layout-editor" :is="layout" :init-content="initContent" @input="onInput"></div>
    </div>
</template>

<script>
    export default {
        name: 'c-library-edtior',
        components: {
            'c-library-editor-markdown': () => import('@/components/library/editor/layout/c-library-editor-markdown')
        },
        props: {
            // 初始化值
            initContent: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                layout: 'c-library-editor-markdown'
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
            }
        }
    };
</script>