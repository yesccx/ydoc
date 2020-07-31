<template>
    <div class="c-library-drawer-fulltext">
        <el-drawer title="文档库全文检索" :visible.sync="visibleDrawer" size="450px" :modal-append-to-body="false">
            <!-- search -->
            <el-input v-model="searchKey" placeholder="请输入检索关键字，不能为空" @keydown.enter.native="onSearch" v-loading="loadingDrawer"
                size="mini" clearable>
                <el-select class="search-select" v-model="searchLibraryId" slot="prepend" placeholder="请选择">
                    <el-option v-for="library in libraryCollection" :key="library.library_id" :label="library.library_name"
                        :value="library.library_id">
                    </el-option>
                </el-select>
                <el-button slot="append" :loading="listLoading" @click="onSearch" icon="el-icon-search"></el-button>
            </el-input>

            <!-- list -->
            <el-scrollbar class="scrollbar" v-loading="listLoading" element-loading-text="检索中...">
                <c-infinite-list ref="list" :request="getLibraryFulltextList" empty-tip="暂无相关内容，输入关键字进行全文检索">
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
                                <span class="library-doc-item__source text-overflow" :title="libraryDoc.library_info.name">
                                    来源文档库 <em>{{ libraryDoc.library_info.name }}</em>
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

    export default {
        name: 'c-library-drawer-fulltext',
        mixins: [BaseDrawer],
        data() {
            return {
                searchKey: '',
                searchLibraryId: '',
                libraryDocList: [],
                libraryCollection: [],
                libraryDocTotal: 0,
                listLoading: false,
                activeLibraryDoc: ''
            };
        },
        methods: {
            // 获取 文档库内容全文搜索列表
            async getLibraryFulltextList(page, handler) {
                if (!this.searchKey) {
                    return handler(false);
                }
                let hres = {};
                await this.$api.v1.LibraryFulltextSearch({
                    ...page, search_key: this.searchKey, library_id: this.searchLibraryId
                }, { loading: (status) => { this.listLoading = status; } }).then(({ resData, res }) => {
                    this.libraryDocTotal = resData.total;
                    this.$utils.ArrayConcat(this.libraryDocList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 初始化文档库集合
            async initLibraryCollection(force = false) {
                if (this.libraryCollection.length !== 0 && !force) {
                    return true;
                }

                let collection = [];
                await this.$api.v1.LibraryCollection({}, {
                    loading: (status) => { this.loadingDrawer = status; }
                }).then(({ resData }) => {
                    collection = resData;
                });

                this.libraryCollection = [{ library_id: '', library_name: '全部' }, ...collection];
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
                this.$link.libraryContent({ library_id: libraryDoc.library_id, doc_id: libraryDoc.id });
            },
            // 事件：drawer被打开
            onDrawerOpen() {
                this.initLibraryCollection();
            }
        },
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-fulltext {
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

        .search-select {
            width: 100px;
            input {
                padding: 10px;
                width: 80px;
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

            > div {
                width: 100%;
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

            &__source {
                color: $--color-primary-light-7;
                text-align: right;
                font-size: 12px;
                padding: 7px 0;
                margin-bottom: -10px;
                margin-top: 10px;
                width: 200px;
                float: right;

                em {
                    color: $--color-primary-light-5;
                    font-weight: bold;
                    width: 200px;
                }
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