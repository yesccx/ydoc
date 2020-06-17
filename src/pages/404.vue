<!-- 404错误页 -->
<template>
    <div>
        <p class="title">404</p>
        <p class="message">:（ {{ message }}</p>
        <div class="action">
            <el-button @click="onGoHome" icon="el-icon-s-home" type="primary">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'error',
        data() {
            return {
                message: '啥也没找到，弄啥咧'
            };
        },
        methods: {
            // 事件： 首往首页
            onGoHome() {
                this.$link.home();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .title {
        color: $--color-primary-light-6;
        text-align: center;
        font-size: 130px;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    .message {
        text-align: center;
        color: #717c8d;
        line-height: 30px;
        max-width: 500px;
        margin: 0 auto;
        margin-top: 10px;
        color: $--color-primary-light-3;
    }
    .action {
        text-align: center;
        padding-top: 50px;
        display: flex;
        justify-content: space-between;
        width: 250px;
        margin: 0 auto;
    }
</style>