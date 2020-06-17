<!-- 工作台首页 -->
<template>
    <div class="page-home">
        <el-row :gutter="10">
            <el-col :span="8">
                <c-home-library-list></c-home-library-list>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        文档库动态
                        <span v-show="dynamicLastUpdateTime" class="refresh-last-time">
                            (上一次更新时间: {{ dynamicLastUpdateTime | dateFormat('H:i:s') }})
                        </span>
                        <div class="refresh-dynamic" :class="dynamicLoading ? 'loading' : ''" @click="onRefreshLibraryDynamic">
                            <i class="el-icon-refresh"></i>
                        </div>
                    </div>
                    <c-home-library-dynamic ref="libraryDynamic"></c-home-library-dynamic>
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
            'c-home-library-dynamic': () => import('@/components/home/c-home-library-dynamic')
        },
        data() {
            return {
                dynamicLoading: false,
                dynamicLastUpdateTime: ''
            };
        },
        methods: {
            // 事件：刷新文档库动态
            onRefreshLibraryDynamic() {
                this.loadaction(async () => {
                    await this.$refs.libraryDynamic.initActionDynamicList();
                    this.dynamicLastUpdateTime = parseInt(Date.now() / 1000);
                }, 'dynamicLoading');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .refresh-dynamic {
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