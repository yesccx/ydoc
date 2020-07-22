<template>
    <div class="c-library-edtior-view">
        <div ref="editor" class="layout-editor-view" :is="layout" :init-content="content"></div>
    </div>
</template>

<script>
    export default {
        name: 'c-library-edtior-view',
        components: {
            'c-library-editor-markdown-view': () => import('@/components/library/editor/view/c-library-editor-markdown-view')
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
                layout: 'c-library-editor-markdown-view'
            };
        }
    };
</script>

<style lang="scss" scoped>
</style>