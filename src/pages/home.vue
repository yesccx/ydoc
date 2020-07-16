<!-- 工作台首页 -->
<template>
    <div class="page-home">
        <el-row :gutter="10">
            <el-col :span="8">
                <c-home-library-list />
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>文档库动态</span>
                        <span v-show="operateLogLastUpdateTime" class="refresh-last-time">
                            (上一次更新时间: {{ operateLogLastUpdateTime | dateFormat('H:i:s') }})
                        </span>
                        <div class="refresh-operate-log" :class="operateLogLoading ? 'loading' : ''"
                            @click="onRefreshLibraryOperateLog">
                            <i class="el-icon-refresh"></i>
                        </div>
                    </div>
                    <c-home-library-operate-log ref="libraryOperateLog" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'home',
        mixins: [BasePage],
        components: {
            'c-home-library-list': () => import('@/components/home/c-home-library-list'),
            'c-home-library-operate-log': () => import('@/components/home/c-home-library-operate-log')
        },
        data() {
            return {
                operateLogLoading: false,
                operateLogLastUpdateTime: ''
            };
        },
        methods: {
            // 事件：刷新文档库动态
            onRefreshLibraryOperateLog() {
                this.loadaction(async () => {
                    await this.$refs.libraryOperateLog.initOperateLogList();
                    this.operateLogLastUpdateTime = parseInt(Date.now() / 1000);
                }, 'operateLogLoading');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .refresh-operate-log {
        float: right;
        cursor: pointer;

        &.loading {
            animation: rotating 0.5s linear infinite;
            opacity: 0.5;
        }
    }
    .refresh-last-time {
        font-size: 12px;
        color: #3c3d3f8a;
        margin-left: 5px;
    }
</style>

<style lang="scss">
    .page-home {
        .el-card {
            margin-bottom: 10px;
        }
    }
</style>