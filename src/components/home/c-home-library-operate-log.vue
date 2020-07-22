<!-- home 文档库操作动态 -->
<template>
    <div class="c-home-library-operate-log">
        <el-scrollbar class="scrollbar">
            <c-infinite-list ref="list" :request="getOperateLogList" empty-tip="暂无动态">
                <el-timeline class="main">
                    <el-timeline-item v-for="operateLog in operateLogList" :key="operateLog.id"
                        :timestamp="operateLog.create_time | dateFormat" placement="top">
                        <div class="operate-item">
                            <span class="operate-item__user">
                                <el-avatar :size="18" :src="operateLog.user_info.avatar_url"></el-avatar>
                                <span>{{ operateLog.user_info.nickname }}</span>
                            </span>
                            <span class="operate-item__operate">{{ operateLog.operate_message }}</span>
                            <span class="operate-item__library">{{ operateLog.library_info.name }}</span>
                        </div>
                        <div class="operate-item-remark" v-show="operateLog.remark"> # {{ operateLog.remark }}</div>
                    </el-timeline-item>
                </el-timeline>
            </c-infinite-list>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        name: 'c-home-library-operate-log',
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        },
        data() {
            return {
                operateLogList: []
            };
        },
        methods: {
            // 获取 操作动态列表
            async getOperateLogList(page, handler) {
                let hres = {};
                await this.$api.v1.LibraryLogMemberLibraryLogList(page).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.operateLogList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 初始化 操作动态列表
            async initOperateLogList() {
                this.operateLogList = [];
                await this.$refs.list.initList();
            }
        }
    };
</script>

<style lang="scss">
    .c-home-library-operate-log {
        .el-timeline-item__node--normal {
            left: 0px;
        }

        .el-timeline-item__tail {
            left: 5px;
        }
    }
</style>

<style lang="scss" scoped>
    .operate-item {
        display: inline-flex;
        margin: 5px 0 8px 0;
        align-items: center;
        word-break: keep-all;

        &__user {
            display: flex;
            align-items: center;
            color: $--color-primary-light-2;
            cursor: pointer;
            .el-avatar {
                margin-right: 5px;
            }
        }

        &__operate {
            margin-left: 5px;
            color: $--color-primary-light-5;
        }

        &__library {
            margin-left: 5px;
            color: $--color-primary-light-2;
            cursor: pointer;
        }
    }

    .operate-item-remark {
        display: block;
        margin-left: 5px;
        color: $--color-primary-light-6;
        font-size: 12px;
    }
    .main {
        padding-left: 0;
    }
    .scrollbar {
        height: 300px;
    }
</style>