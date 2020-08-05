<template>
    <div class="c-library-editor-text-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <div class="doc-content">{{ docInfo.content }}</div>

        <el-backtop :bottom="90" :right="45" target=".c-library-preview-view .el-scrollbar__wrap">
            <i class="el-icon-arrow-up"></i>
        </el-backtop>
    </div>
</template>

<script>
    export default {
        name: 'c-library-editor-text-view',
        props: {
            // 初始化值
            docInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        created() {
            this.$emit('inited');
        }
    };
</script>

<style lang="scss">
    .c-library-editor-text-view {
        @import "~@/assets/scss/editor/text/preview-custom";
    }

    @import "~@/assets/scss/editor/text/preview-layout";
</style>