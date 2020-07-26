<template>
    <div class="c-library-editor-markdown-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <div ref="markdown"></div>
    </div>
</template>

<script>
    import VditorMethod from 'vditor/dist/method.min';

    export default {
        name: 'c-library-editor-markdown-view',
        props: {
            // 初始化值
            docInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        watch: {
            'docInfo.content': {
                async handler(value) {
                    this.render(value);
                }
            }
        },
        mounted() {
            this.render(this.docInfo.content);
        },
        methods: {
            async render(value) {
                await VditorMethod.preview(this.$refs.markdown, value, {
                    hljs: {
                        lineNumber: true
                    }
                });
                this.onInited();
            },
            // 事件：初始化成功
            onInited() {
                this.$emit('inited');
            }
        }
    };
</script>

<style lang="scss">
    @import "~vditor/src/assets/scss/index";

    .c-library-editor-markdown-view {
        @import "~@/assets/scss/editor/markdown/preview-custom";
    }

    @import "~@/assets/scss/editor/markdown/preview-layout";
</style>
