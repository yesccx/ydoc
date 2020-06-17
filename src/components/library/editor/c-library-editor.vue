<template>
    <div class="c-library-edtior">
        <div ref="editor" class="layout-editor" :is="layout" :init-content="content"></div>
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
            content: {
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .layout-editor {
        height: calc(100vh - 80px);
    }
</style>