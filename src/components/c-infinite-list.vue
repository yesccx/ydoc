<template>
    <div class="c-infinite-list" v-infinite-scroll="getList" :infinite-scroll-delay="infiniteScrollDelay"
        :infinite-scroll-immediate="infiniteScrollImmediate" :infinite-scroll-distance="infiniteScrollDistance">
        <slot> </slot>
        <p v-show="!isEmpty && loading" class="loading-tip"><i class="el-icon-loading"></i>{{ loadingTip }}</p>
        <p v-show="!isEmpty && pageFinal" class="final-tip">{{ finalTip }}</p>

        <p v-show="isEmpty" class="final-tip">
            <slot name="empty-tip">{{ emptyTip }}</slot>
        </p>
    </div>
</template>

<script>
    import ResponseCode from '@/common/constants/response-code';

    export default {
        name: 'c-infinite-list',
        props: {
            request: {
                type: Function,
                required: true
            },
            loadingTip: {
                type: String,
                default: '加载中'
            },
            emptyTip: {
                type: String,
                default: '暂无数据'
            },
            finalTip: {
                type: String,
                default: '已经没有更多了'
            },

            /** 以下是 element infinite-list 组件的原生属性 */
            infiniteScrollDelay: {
                type: Number,
                default: 50
            },
            infiniteScrollDistance: {
                type: Number,
                default: 0
            },
            infiniteScrollImmediate: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            isEmpty() {
                return this.page.num === 1 && this.page.total === 0 && !this.loading && this.pageFinal;
            }
        },
        data() {
            return {
                page: {
                    num: 0,
                    size: 10,
                    total: 0
                },
                pageFinal: false,
                loading: false
            };
        },
        methods: {
            // 获取列表
            async getList(params) {
                if (this.pageFinal || this.loading) {
                    return false;
                }

                this.loading = true;
                this.page.num++;
                const reqData = { page_num: this.page.num, page_size: this.page.size, ...params };
                try {
                    await this.request(reqData, this.responseHandler);
                } catch (e) { }
                this.loading = false;
            },
            // 响应结果处理
            responseHandler(res) {
                if (!(res.data.code === ResponseCode.RESPONSE_SUCCESS && res.data.data)) {
                    return false;
                }

                const resData = res.data.data;
                this.page.total = resData.total;
                this.pageFinal = resData.list.length < this.page.size;
            },
            // 初始化列表
            async initList(params = {}) {
                this.page = { num: 0, size: 10, total: 0 };
                this.pageFinal = false;
                await this.getList(params);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .loading-tip,
    .final-tip {
        text-align: center;
        font-size: 15px;
        padding: 8px 0px;
        cursor: pointer;
        border-radius: 4px;
        color: $--color-primary-light-6;
    }

    .el-icon-loading {
        margin-right: 5px;
    }

    .final-tip {
        color: $--color-primary-light-7;
    }

    .c-infinite-list {
        margin-bottom: 70px;
    }
</style>
