<template>
    <div class="c-library-editor-text">
        <el-input type="textarea" :rows="2" placeholder="输入内容..." v-model="content" resize="none"
            :autosize="{ minRows: 2, maxRows: 100000}">
        </el-input>
    </div>
</template>

<script>

    export default {
        name: 'c-library-editor-text',
        props: {
            // 初始化值
            initContent: {
                type: String,
                default: ''
            }
        },
        watch: {
            content() {
                this.$emit('input');
            }
        },
        data() {
            return {
                content: this.initContent
            };
        },
        created() {
            this.onInited();
        },
        methods: {
            // 暴露给外部调用，返回正在编辑的内容
            fetchContent() {
                return this.content;
            },
            // 暴露给外部调用，设置正在编辑的内容
            setContent(content) {
                this.content = content;
            },
            // 事件：初始化完毕
            onInited() {
                this.$emit('inited');
            }
        }
    };
</script>

<style lang="scss">
    .c-library-editor-text {
        @import "~@/assets/scss/editor/text/editor-custom";
    }
    @import "~@/assets/scss/editor/text/editor-layout";
</style>