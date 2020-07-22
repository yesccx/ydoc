<template>
    <div class="c-library-editor-markdown">
        <c-md-vditor ref="editor" :init-content.sync="initContent" :handler-input="onInput" />
    </div>
</template>

<script>

    export default {
        name: 'c-library-editor-markdown',
        components: {
            'c-md-vditor': () => import('@/components/extends/c-md-vditor')
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
                lastValueHash: ''
            };
        },
        methods: {
            // 事件：input（正在输入）
            onInput(value) {
                const vHash = this.$utils.Md5(value);
                if (this.lastValueHash === vHash) {
                    return true;
                }
                this.$emit('input');
            },
            // 暴露给外部调用，返回正在编辑的内容
            fetchContent() {
                const value = this.getEditor().getValue();
                this.lastValueHash = this.$utils.Md5(value);
                return value;
            },
            // 暴露给外部调用，设置正在编辑的内容
            setContent(content) {
                this.getEditor().setValue(content);
            },
            // 获取编辑器对象
            getEditor() {
                return (this.$refs.editor && this.$refs.editor.editor) ? this.$refs.editor.editor : {
                    setValue() { },
                    getValue() { }
                };
            }
        }
    };
</script>

<style lang="scss">
    .c-library-editor-markdown {
        @import "~@/assets/scss/vditor/editor-custom";
    }
    @import "~@/assets/scss/vditor/editor-layout";
</style>