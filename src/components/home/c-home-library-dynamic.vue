<!-- home 文档库操作动态 -->
<template>
    <div class="c-home-library-dynamic">
        <el-scrollbar class="scrollbar">
            <c-infinite-list ref="list" :request="getActionDynamicList" empty-tip="暂无动态">
                <el-timeline class="main">
                    <el-timeline-item v-for="actionLog in actionDynamicList" :key="actionLog.id"
                        :timestamp="actionLog.create_time | dateFormat" placement="top">
                        <p>{{ actionLog.member_info.nickname }} 创建了 {{ actionLog.library_info.name }}</p>
                    </el-timeline-item>
                </el-timeline>
            </c-infinite-list>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        name: 'c-home-library-dynamic',
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        },
        data() {
            return {
                actionDynamicList: []
            };
        },
        methods: {
            // 获取 操作动态列表
            async getActionDynamicList(page, handler) {
                let hres = {};
                await this.$api.LibraryActionDynamicList(page).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.actionDynamicList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 初始化 操作动态列表
            async initActionDynamicList() {
                this.actionDynamicList = [];
                await this.$refs.list.initList();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .main {
        padding-left: 0;
    }
    .scrollbar {
        height: 300px;
    }
</style>