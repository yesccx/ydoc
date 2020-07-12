<template>
    <div class="page-library-shares" v-loading="pageLoading" element-loading-text="处理中">

        <el-form class="share-list__filter" :inline="true" size="mini">
            <el-form-item>
                <el-date-picker v-model="searchWhere.date" type="daterange" value-format="timestamp" align="right" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结止日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchWhere.key" placeholder="分享名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" :loading="tableLoading" @click="onShareListSearch">搜索</el-button>
                <el-button icon="el-icon-refresh" :loading="tableLoading" @click="onShareListSearch" plain>
                    刷新
                </el-button>
            </el-form-item>
        </el-form>

        <!-- 列表 -->
        <el-table class="share-list__table" height="calc(100vh - 290px)" :data="libraryShareCollectionProcessed" empty-text="暂无分享"
            v-loading="tableLoading" @sort-change="onShareListSort" stripe>
            <el-table-column label="分享名" width="300" fixed="left">
                <template v-slot="{ row: libraryShare }">
                    <span :title="'点击预览  ' + libraryShare.share_name" class="text-overflow" v-link.open="libraryShare.share_url">
                        <i v-if="libraryShare.is_protected" class="el-icon-lock share-protected"></i>
                        {{ libraryShare.share_name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="分享人" min-width="150">
                <template v-slot="{ row: libraryShare }">
                    <span class="share-user">
                        <el-avatar :size="19" icon="el-icon-user-solid" :src="libraryShare.user_info.avatar_url"></el-avatar>
                        <span :title="libraryShare.user_info.nickname"
                            class="share-user__name text-overflow">{{ libraryShare.user_info.nickname }}
                        </span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="访问数量" width="100" prop="access_count" sortable="custom">
            </el-table-column>
            <el-table-column prop="status" label="使用状态">
                <template v-slot="{ row: libraryShare }">
                    <el-switch size="small" :value="libraryShare.status === 1" @change="onShareStatusChange(libraryShare)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="分享时间" width="160" sortable="custom">
                <template v-slot="{ row: libraryShare }">
                    <span>{{ libraryShare.create_time|dateFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template v-slot=" { row: libraryShare }">
                    <el-button type="text" icon="el-icon-link" v-clipboard="libraryShare.share_url">复制链接
                    </el-button>
                    <el-popconfirm @onConfirm="onShareRemove(libraryShare)" icon="el-icon-warning" title="是否确认删除该分享">
                        <el-button class="share-remove" slot="reference" type="text" icon="el-icon-delete">删除分享
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination class="share-list__page" @size-change="onShareListPageSizeChange"
            @current-change="onShareListCurrentChange" :current-page.sync="pagination.page_num" :page-size="pagination.page_size"
            layout="total, prev, pager, next" :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import libraryManager from '@/extends/mixins/library-manager';
    import { buildLibraryShareLink } from '@/extends/utils/library-share-utils';

    export default {
        name: 'page-library-shares',
        mixins: [BasePage, libraryManager],
        computed: {
            libraryShareCollectionProcessed() {
                const shareCollection = this.$utils.CloneDeep(this.libraryShareCollection);
                shareCollection.map((share) => {
                    share.share_url = buildLibraryShareLink(share.share_code);
                });
                return shareCollection;
            }
        },
        data() {
            return {
                libraryShareCollection: [],
                pagination: {
                    page_num: 1,
                    page_size: 30,
                    total: 0,
                    page_order: '',
                    page_order_field: ''
                },
                searchWhere: {
                    key: '',
                    date: []
                },
                tableLoading: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        methods: {
            // 模块初始化
            async moduleInitialize() {
                await this.getibraryShareList();
            },
            // 获取文档库分享列表
            async getibraryShareList() {
                // 查询条件
                const reqData = { ...this.pagination, library_id: this.libraryId, search_key: this.searchWhere.key };
                if (this.searchWhere.date && this.searchWhere.date.length > 0) {
                    reqData.search_create_start = (this.searchWhere.date[0] / 1000) >> 0;
                    reqData.search_create_end = (this.searchWhere.date[1] / 1000) >> 0;
                }

                await this.$api.v1.LibraryShareList(reqData, {
                    loading: (status) => { this.tableLoading = status; }
                }).then(({ resData }) => {
                    this.libraryShareCollection = resData.list;
                    this.pagination.total = resData.total;
                });
            },
            // 处理排序
            onShareListSort({ column, prop, order }) {
                this.pagination.page_order_field = prop;
                this.pagination.page_order = order === 'descending' ? -1 : 1;
                this.pagination.page_num = 1;
                this.getibraryShareList();
            },
            // 事件：分享状态变更
            onShareStatusChange(share) {
                const status = share.status === 1 ? 2 : 1;
                const reqData = { library_share_id: share.id, library_id: this.libraryId, status };
                this.$api.v1.LibraryShareStatusModify(reqData).then(({ resData }) => {
                    this.$tip.success('修改成功');
                    this.getibraryShareList();
                });
            },
            // 事件：删除分享
            onShareRemove(share) {
                const reqData = { library_share_id: share.id, library_id: this.libraryId };
                this.$api.v1.LibraryShareRemove(reqData).then(({ resData }) => {
                    this.$tip.success('删除成功');
                    this.getibraryShareList();
                });
            },
            // 事件：分享列表刷新
            onShareListRefresh() {
                this.pagination.page_num = 1;
                this.getibraryShareList();
            },
            // 事件：分享列表搜索
            onShareListSearch() {
                this.pagination.page_num = 1;
                this.getibraryShareList();
            },
            // 事件：分享列表分页数改变
            onShareListPageSizeChange(val) {
                this.pagination.page_size = val;
                this.pagination.page_num = 1;
                this.getibraryShareList();
            },
            // 事件：分享列表页码改变
            onShareListCurrentChange(val) {
                this.pagination.page_num = val;
                this.getibraryShareList();
            }
        }
    };
</script>

<style lang="scss">
    .page-library-shares {
        .el-pager li {
            color: $--color-primary-light-3;
            &.active {
                color: #409eff;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .share-list {
        &__filter {
            .el-form-item {
                margin-bottom: 0;
            }
            padding: 0;
            margin: 20px 0;
        }

        &__table {
            color: $--color-primary-light-3;
            font-size: 13px;
        }

        &__page {
            margin-top: 15px;
        }
    }

    .share-protected {
        font-weight: bold;
        color: $--color-warning;
    }

    .share-user {
        display: flex;
        align-items: center;
        &__name {
            width: 110px;
        }
        .el-avatar {
            margin-right: 5px;
        }
    }

    .share-remove {
        color: $--color-danger;
        margin-left: 10px;
    }
</style>
