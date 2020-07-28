<template>
    <div id="app" :class="pageLoading ? 'is-loading' : ''">
        <el-scrollbar class="root-container vh-100" v-show="!pageError">
            <c-page-header v-show="$route.meta.header"></c-page-header>
            <div class="page-body">
                <router-view class="page-container" />
            </div>
        </el-scrollbar>

        <!-- page-loading-mask -->
        <div class="page-loading-mask" v-show="pageLoading"></div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'app',
        components: {
            'c-page-header': () => import('@/components/c-page-header')
        },
        computed: {
            ...mapState('global', ['pageError', 'pageLoading'])
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/overwrite-element.scss";
    @import "~@/assets/scss/faster.scss";
    @import "~@/assets/scss/common.scss";
    @import "https://at.alicdn.com/t/font_1067565_q3g40tweeuo.css";

    .root-container .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>

<style lang="scss" scoped>
    #app.is-loading {
        filter: blur(1.5px);
    }

    .page-loading-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999999999;
        opacity: 0;
    }
</style>