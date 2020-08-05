<template>
    <div class="c-library-editor-html-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <c-html-tinymce v-model="docInfo.content" :is-view-mode="true" @inited="onInited" />

        <el-backtop :bottom="90" :right="45" target=".c-library-preview-view .el-scrollbar__wrap">
            <i class="el-icon-arrow-up"></i>
        </el-backtop>
    </div>
</template>

<script>

    export default {
        name: 'c-library-editor-html-view',
        props: {
            // 初始化值
            docInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        components: {
            'c-html-tinymce': () => import('@/components/extends/c-html-tinymce')
        },
        methods: {
            // 事件：初始化成功
            onInited() {
                this.$emit('inited');
            }
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/editor/html/preview-layout";
</style>