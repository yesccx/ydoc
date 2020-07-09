<template>
    <div class="c-library-preview-welcome">
        <div class="normal-main">
            <p class="normal-main__title">^ ^ 欢迎使用YDOC~</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c-library-preview-welcome'
    };
</script>

<style lang="scss" scoped>
    .normal-main {
        text-align: center;
        margin-top: 40vh;
        &__title {
            color: $--color-primary-light-5;
            font-size: 22px;
        }
        &__content {
            color: $--color-primary-light-3;
            font-size: 16px;
        }
    }
</style>