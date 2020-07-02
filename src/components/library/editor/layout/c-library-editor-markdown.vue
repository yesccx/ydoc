<template>
    <div class="c-library-editor-markdown">
        <c-md-editor ref="editor" :content.sync="content" />
    </div>
</template>

<script>
    export default {
        name: 'c-library-edtior-markdown',
        components: {
            'c-md-editor': () => import('@/components/extends/c-md-editor')
        },
        props: {
            // 初始化值
            initContent: {
                type: String,
                default: ''
            }
        },
        watch: {
            initContent(val) {
                this.setContent(val);
            },
            content(val) {
                this.$emit('input');
            }
        },
        data() {
            return {
                content: this.initContent
            };
        },
        methods: {
            // 暴露给外部调用，返回正在编辑的内容
            fetchContent() {
                return this.getEditor().getHTML();
            },
            // 暴露给外部调用，设置正在编辑的内容
            setContent(content) {
                this.getEditor().setContent(content);
            },
            getEditor() {
                return (this.$refs.editor && this.$refs.editor.editor) ? this.$refs.editor.editor : {
                    setContent() { },
                    getHTML() { }
                };
            }
        }
    };
</script>
