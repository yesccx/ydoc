<!-- 文档库分组-文档库实体信息 -->
<template>
    <div class="c-library-group-entity-library-info" v-loading="loading">
        <el-card shadow="hover">
            <div slot="header">
                基本信息
            </div>
            <div class="entity-info">
                <p>
                    <span class="entity-info__key">名称：</span>
                    <span class="entity-info__value">{{ info.name || '-' }}</span>
                </p>
                <p>
                    <span class="entity-info__key">简介：</span>
                    <span class="entity-info__value">{{ info.desc || '-' }}</span>
                </p>
                <p>
                    <span class="entity-info__key">创建时间：</span>
                    <span class="entity-info__value">{{ info.create_time | dateFormat }}</span>
                </p>
                <p>
                    <span class="entity-info__key">上次更改时间：</span>
                    <span class="entity-info__value">{{ info.update_time | dateFormat }}</span>
                </p>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'c-library-group-entity-library-info',
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        watch: {
            id: {
                handler() {
                    this.initInfo();
                },
                immediate: true
            }
        },
        data() {
            return {
                loading: false,
                lock: 0,
                info: {
                    name: '',
                    desc: '',
                    create_time: 0,
                    update_time: 0
                }
            };
        },
        methods: {
            // 初始化信息
            async initInfo() {
                if (this.id <= 0) {
                    this.info = { name: '', desc: '', create_time: 0, update_time: 0 };
                    return true;
                }
                await this.$api.v1.LibraryInfo({ library_id: this.id }, {
                    loading: (status) => { this.loading = status; }
                }).then(({ resData }) => {
                    this.info = resData;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .entity-info {
        font-size: 14px;
        & p {
            padding-bottom: 10px;
        }
        &__key {
            color: $--color-primary-light-1;
        }
        &__value {
            color: $--color-primary-light-3;
        }
    }
</style>