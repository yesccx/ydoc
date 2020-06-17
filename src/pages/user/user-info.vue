<!-- 用户信息页 -->
<template>
    <div class="page-user-info">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2 style="text-align:center;margin: 0;font-weight:400;">个人信息</h2>
            </div>
            <div>
                <span>头像</span>
                <el-divider></el-divider>
            </div>
            <div>
                <span>姓名</span>
                <el-divider></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-info',
        mixins: [BasePage]
    };
</script>

<style lang="scss">
    .page-user-info {
    }
</style>