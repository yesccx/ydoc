<!-- home 文档库列表 -->
<template>
    <div class="c-home-library-list">
        <!-- 文档库检索 -->
        <el-card class="box-card" shadow="hover">
            <c-home-library-list-bar @search="onLibraryGroupSearch" />
        </el-card>

        <!-- 文档库列表 -->
        <el-scrollbar class="scrollbar">
            <c-infinite-list ref="libraryList" :request="getLibraryList" :empty-tip="'暂无文档库'">
                <el-card v-for="library in libraryList" :key="library.id" class="box-card" shadow="hover">
                    <div class="library-item">
                        <el-image class="library-item__image"> </el-image>
                        <div class="library-item__main">
                            <!-- 文档库基本信息 -->
                            <div class="library-item__name text-overflow" :title="library.library_info.name"
                                @click="onLibraryDocList(library)">
                                {{ library.library_info.name }}
                            </div>
                            <div class="library-item__desc" :title="library.library_info.desc" @click="onLibraryDocList(library)">
                                {{ library.library_info.desc }}
                            </div>

                            <!-- 文档库操作 -->
                            <div class="library-item__actions">
                                <span class="library-item__actions-item" title="相关分享" @click="onLibraryShare(library)">
                                    <i class="el-icon-share"></i>
                                </span>
                                <span class="library-item__actions-item" title="文档库管理" @click="onLibraryManager(library)">
                                    <i class="el-icon-s-tools"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </c-infinite-list>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        name: 'c-home-library-list',
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list'),
            'c-home-library-list-bar': () => import('@/components/home/c-home-library-list-bar')
        },
        data() {
            return {
                libraryList: []
            };
        },
        methods: {
            // 获取文档库列表
            async getLibraryList(page, handler) {
                let hres = {};
                await this.$api.LibraryList(page).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.libraryList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 事件：查看文档库文档列表
            onLibraryDocList(library) {
                this.$link.libraryContent({ library_id: library.library_id });
            },
            // 事件：文档库分组查询
            onLibraryGroupSearch({ search_key, group_id }) {
                this.libraryList = [];
                this.$refs.libraryList.initList({ search_key, group_id });
            },
            // 事件：管理文档库
            onLibraryManager(library) {
                this.$link.libraryInfo({ library_id: library.library_id });
            },
            // 事件：文档库相关分享
            onLibraryShare(library) {
                this.$link.libraryInfo({ library_id: library.library_id });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .library-item {
        display: flex;

        &__image {
            width: 90px;
            height: 90px;
        }

        &__main {
            margin-left: 10px;
            flex-grow: 1;
            width: 250px;
            position: relative;
            cursor: pointer;
            padding: 5px 0px;
        }

        &__name {
            font-size: 16px;
        }

        &__desc {
            line-height: 18px;
            margin: 7px 0 10px 0;
            color: $--color-primary-light-7;
            font-size: 12px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
        }

        &__actions {
            margin-top: 10px;
            position: absolute;
            right: 0;
            bottom: 0;
            opacity: 0.5;
            transition: opacity 0.3s;
            display: flex;

            &-item {
                font-size: 13px;
                background: #f2f2f2;
                padding: 4px 6px;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 7px;
            }
        }

        &:hover .library-item__actions {
            opacity: 1;
        }
    }

    .scrollbar {
        height: calc(100vh - 190px);
    }
</style>