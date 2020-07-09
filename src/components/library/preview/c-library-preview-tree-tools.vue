<template>
    <div class="c-library-preview-tree-tools">
        <el-tooltip class="item" effect="dark" content="文档库中心" placement="top-start">
            <i class="item el-icon-menu" @click="onGoLibraryCenter"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新数据" placement="top-start">
            <i class="item el-icon-refresh" @click="onDocTreeFlush"></i>
        </el-tooltip>
        <!-- <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
            <i class="item el-icon-share" @click="onLibraryShare"></i>
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" content="当前分享源信息" placement="top-start">
            <i class="item el-icon-info" @click="onLibraryShareInfo"></i>
        </el-tooltip>
    </div>
</template>

<script>
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';

    export default {
        name: 'c-library-preview-tree-tools',
        mixins: [LibraryPreviewBase],
        methods: {
            // 事件：前往文档库中心
            onGoLibraryCenter() {
                this.$link.home();
            },
            // 事件：刷新文档树
            onDocTreeFlush() {
                this.libraryPreviewEventBus.$emit('doc-tree-flush');
            },
            // 事件：文档库分享
            onLibraryShare() {
                this.libraryPreviewEventBus.$emit('library-share');
            },
            // 事件：查看当前分享源信息
            onLibraryShareInfo() {
                this.libraryPreviewEventBus.$emit('share-info-view');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .c-library-preview-tree-tools {
        font-size: 17px;
        padding: 0;
        transition: margin 0.2s;
        display: flex;
        flex-wrap: wrap-reverse;

        i.item {
            transition: background 0.2s;
            color: $--color-primary-light-3;
            margin-right: 9px;
            padding: 4px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                color: $--color-primary-light-1;
            }
        }
    }
</style>
