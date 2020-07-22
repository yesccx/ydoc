<!-- 工作台首页 -->
<template>
    <div class="page-home">
        <el-row :gutter="10">
            <el-col :span="viewStyleOpions.spanList">
                <c-home-library-list :class="viewStyleOpions.theme" />
            </el-col>
            <el-col :span="viewStyleOpions.spanOther">
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
    import { mapGetters } from 'vuex';

    export default {
        name: 'home',
        mixins: [BasePage],
        components: {
            'c-home-library-list': () => import('@/components/home/c-home-library-list'),
            'c-home-library-operate-log': () => import('@/components/home/c-home-library-operate-log')
        },
        computed: {
            ...mapGetters('global', ['homeViewStyle']),
            // 根据视图风格约定的相关配置
            viewStyleOpions() {
                const viewStyle = this.homeViewStyle;

                const optionsMap = {
                    simple: { theme: 'library-list--simple', spanList: 9, spanOther: 15 },
                    many: { theme: 'library-list--many', spanList: 16, spanOther: 8 }
                };

                return optionsMap[viewStyle] || optionsMap.simple;
            }
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