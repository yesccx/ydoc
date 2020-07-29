<template>
    <div class="c-library-content-tree-tools">
        <el-tooltip class="item" effect="dark" content="文档库中心" placement="top-start" :open-delay="300">
            <i class="item el-icon-menu" @click="onGoLibraryCenter"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新数据" placement="top-start" :open-delay="300">
            <i class="item el-icon-refresh" @click="onLibraryContentTreeFlush"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="top-start" :open-delay="300">
            <i class="item el-icon-share" @click="onLibraryShare"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="新建文档" placement="top-start" :open-delay="300">
            <i class="item el-icon-document-add" @click="onDocWillCreate"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="新建分组" placement="top-start" :open-delay="300">
            <i class="item el-icon-folder-add" @click="onDocGroupWillCreate"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="文档全文搜索" placement="top-start" :open-delay="300">
            <i class="item item-right el-icon-search" @click="onDocFulltextSearch"></i>
        </el-tooltip>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-content-tree-tools',
        mixins: [LibraryContent],
        methods: {
            // 事件：新增文档分组
            onDocGroupWillCreate() {
                this.libraryContentEventBus.$emit('doc-group-will-create');
            },
            // 事件：新增文档
            onDocWillCreate() {
                this.libraryContentEventBus.$emit('doc-will-create');
            },
            // 事件：前往文档库中心
            onGoLibraryCenter() {
                this.$link.home();
            },
            // 事件：刷新文档树
            onLibraryContentTreeFlush() {
                this.libraryContentEventBus.$emit('library-content-tree-flush');
            },
            // 事件：文档库分享
            onLibraryShare() {
                this.libraryContentEventBus.$emit('library-share');
            },
            // 事件：文档库的文档全文检索
            onDocFulltextSearch() {
                this.libraryContentEventBus.$emit('doc-fulltext-search');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .c-library-content-tree-tools {
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

        i.item-right {
            margin-left: auto;
        }
    }
</style>
