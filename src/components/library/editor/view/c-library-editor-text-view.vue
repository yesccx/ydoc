<template>
    <div class="c-library-editor-text-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <div v-html="docInfo.content"></div>
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