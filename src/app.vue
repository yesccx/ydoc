<template>
    <div id="app">
        <el-scrollbar class="root-container vh-100" v-show="!pageError">
            <c-page-header v-show="$route.meta.header"></c-page-header>
            <div class="page-body">
                <router-view class="page-container" />
            </div>
        </el-scrollbar>
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
            ...mapState('global', ['pageError'])
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/overwrite-element.scss";
    @import "~@/assets/scss/faster.scss";
    @import "~@/assets/scss/common.scss";
    @import "https://at.alicdn.com/t/font_1067565_k086i0obmv.css";

    .root-container .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>