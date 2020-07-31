<template>
    <div class="c-library-preview-drawer-fulltext">
        <el-drawer title="文档全文检索" :visible.sync="visibleDrawer" size="450px" :modal-append-to-body="false">
            <!-- search -->
            <el-input v-model="searchKey" placeholder="请输入检索关键字，不能为空" prefix-icon="el-icon-search" size="mini" clearable>
                <el-button :loading="listLoading" @click="onSearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>

            <!-- list -->
            <el-scrollbar class="scrollbar" v-loading="listLoading" element-loading-text="检索中...">
                <c-infinite-list ref="list" :request="getLibraryFulltextList" empty-tip="暂无相关内容">
                    <ul class="library-doc-list">
                        <li v-for="libraryDoc in libraryDocList" :key="libraryDoc.id" class="library-doc-item"
                            :class="activeLibraryDoc === libraryDoc.id ? 'active' : ''" @click="onConfirm(libraryDoc)">
                            <div>
                                <span class="library-doc-item__title" v-text-highlight="searchKey">
                                    {{ libraryDoc.title }}
                                </span>
                                <span class="library-doc-item__content" v-text-highlight="searchKey">
                                    {{ libraryDoc.content }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </c-infinite-list>
            </el-scrollbar>

            <!-- footer-tip -->
            <p class="library-doc-total">
                当前有 <em>{{libraryDocTotal}}</em> 条搜索结果
                <el-tooltip content="考虑到索引效率，部分生僻单字符可能无法正常检索，请尽量按词组检索" placement="top-start" :open-delay="500">
                    <i class="el-icon-info pointer"></i>
                </el-tooltip>
            </p>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';

    export default {
        name: 'c-library-preview-drawer-fulltext',
        mixins: [BaseDrawer, LibraryPreviewBase],
        data() {
            return {
                searchKey: '',
                libraryDocList: [],
                libraryDocTotal: 0,
                listLoading: false,
                activeLibraryDoc: ''
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('doc-fulltext-search', (initSearchKey = undefined) => {
                    if (initSearchKey !== undefined) {
                        this.searchKey = initSearchKey;
                    }

                    this.visibleDrawer = true;
                });
            },
            // 获取 文档库内容全文搜索列表
            async getLibraryFulltextList(page, handler) {
                if (!this.searchKey) {
                    return handler(false);
                }
                let hres = {};
                await this.$api.v1.LibraryShareFulltextSearch({
                    ...this.shareAccessToken, ...page, library_id: this.libraryId, search_key: this.searchKey
                }, { loading: (status) => { this.listLoading = status; } }).then(({ resData, res }) => {
                    this.libraryDocTotal = resData.total;
                    this.$utils.ArrayConcat(this.libraryDocList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 事件：检索
            onSearch() {
                this.libraryDocList = [];
                this.libraryDocTotal = 0;
                this.$nextTick(() => {
                    this.$refs.list.initList();
                });
            },
            // 事件：确认
            onConfirm(libraryDoc) {
                this.activeLibraryDoc = libraryDoc.id;
                this.libraryPreviewEventBus.$emit('doc-view', libraryDoc.id);
                this.visibleDrawer = false;
            }
        },
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        }
    };
</script>

<style lang="scss">
    .c-library-preview-drawer-fulltext {
        .el-drawer {
            &__header {
                font-weight: bold;
                font-size: 20px;
            }

            &__body {
                padding: 20px;
            }
        }

        .library-doc-item {
            em {
                font-style: inherit;
                color: $--color-warning;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .scrollbar {
        height: calc(100vh - 170px);
    }

    .library-doc {
        &-list {
            list-style-type: none;
            margin: 0;
            padding: 10px 7px 0 0;
            font-size: 14px;
            color: $--color-primary-light-3;
        }

        &-item {
            padding: 15px 10px;
            border-bottom: 1px solid $--color-primary-light-9;
            display: flex;
            justify-content: space-between;
            transition: background 0.3s;
            cursor: pointer;

            &.active {
                background: whitesmoke;
                border-bottom-color: $--color-warning;
            }

            &:hover {
                background: whitesmoke;
            }

            &__title {
                display: block;
                width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 16px;
                color: $--color-primary-light-2;
                padding: 5px 0;
                margin-bottom: 5px;
            }

            &__content {
                color: $--color-primary-light-5;
                font-size: 12px;
                padding: 7px 0;
            }
        }

        &-total {
            color: $--color-primary-light-4;
            font-size: 13px;
            text-align: center;

            em {
                font-weight: bold;
                font-style: inherit;
            }
        }
    }
</style>