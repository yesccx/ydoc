<template>
    <div class="c-library-editor-html">
        <c-html-tinymce v-model="content" @inited="onInited" @save="onSave" />
    </div>
</template>

<script>
    export default {
        name: 'c-library-editor-html',
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
        components: {
            'c-html-tinymce': () => import('@/components/extends/c-html-tinymce')
        },
        data() {
            return {
                content: this.initContent
            };
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
            },
            // 事件：触发保存
            onSave() {
                this.$emit('save');
            }
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/editor/html/editor-layout";
</style>