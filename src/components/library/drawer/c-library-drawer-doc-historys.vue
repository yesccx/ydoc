<template>
    <div class="c-library-drawer-doc-historys bold-normal">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="400px"
            :modal-append-to-body="false">
            <div class="content-drawer__content">
                <el-scrollbar style="height: calc(100vh - 110px);">
                    <c-infinite-list ref="list" :request="getLibraryDocHistoryList" empty-tip="暂无历史">
                        <ul>
                            <li v-for="docHistory in docHistoryList" :key="docHistory.id" class="version-item">
                                <div>
                                    <span class="version-item__name">{{ docHistory.create_time | dateFormat('m-d H:i:s') }}</span>
                                    <span class="version-item__user">{{ docHistory.user_info.nickname }}</span>
                                </div>
                                <el-button type="text" @click="onDocHistoryRecovery(docHistory)">恢复</el-button>
                            </li>
                        </ul>
                    </c-infinite-list>
                </el-scrollbar>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-drawer-doc-historys',
        mixins: [BaseDrawer, LibraryContent],
        computed: {
            title() {
                return '文档内容历史';
            }
        },
        data() {
            return {
                docId: 0,
                searchKey: '',
                docHistoryList: []
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('doc-history', ({ docId }) => {
                    this.visibleDrawer = true;
                    this.docId = docId;
                });
            },
            // 获取 文档历史记录列表
            async getLibraryDocHistoryList(page, handler) {
                let hres = {};
                await this.$api.v1.LibraryDocHistoryList({
                    ...page, library_id: this.libraryId, library_doc_id: this.docId
                }).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.docHistoryList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 获取文档历史信息
            async getDocHistoryInfo(docHistoryId) {
                let docHistoryInfo = false;
                await this.$api.v1.LibraryDocHistoryInfo({
                    library_id: this.libraryId, doc_history_id: docHistoryId
                }, { loading: (status) => { this.libraryManagerLoading = status; } }).then(({ resData }) => {
                    docHistoryInfo = resData;
                });

                return docHistoryInfo;
            },
            // 事件：drawer被展开
            onDrawerOpen() {
                this.onDocHistoryListFlush();
            },
            // 事件：文档历史列表刷新
            onDocHistoryListFlush() {
                this.docHistoryList = [];
                this.$nextTick(() => {
                    this.$refs.list.initList();
                });
            },
            // 事件：文档历史恢复
            async onDocHistoryRecovery(docHistory) {
                this.visibleDrawer = false;
                const docHistoryInfo = await this.getDocHistoryInfo(docHistory.id);
                if (!docHistoryInfo) {
                    this.$tip.error('文档历史不存在');
                    return false;
                }

                this.libraryContentEventBus.$emit('doc-history-recovery', docHistoryInfo);
            }
        },
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-doc-historys {
        .el-drawer {
            &__header {
                font-weight: bold;
                font-size: 20px;
            }

            &__body {
                padding: 20px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .version-item {
        margin: 5px 0;
        padding: 10px 4px;
        border-bottom: 1px solid $--color-primary-light-9;
        display: flex;
        justify-content: space-between;
        &__name {
            display: block;
            width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 15px;
            color: $--color-primary-light-2;
            padding: 5px 0;
        }
        &__user {
            color: $--color-primary-light-5;
            font-size: 12px;
            padding: 5px 0;
        }
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0 7px 0 0;
        font-size: 14px;
        color: $--color-primary-light-3;
    }
</style>