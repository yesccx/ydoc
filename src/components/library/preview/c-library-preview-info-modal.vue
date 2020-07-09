<template>
    <el-dialog class="c-library-preview-info-modal" :title="title" :visible.sync="visibleModal" width="600px" append-to-body>
        <div v-loading="loadingModal" class="share-info">
            <div class="share-info__header" slot="header">
                <el-tooltip effect="dark" content="分享时间" placement="top-end">
                    <span class="share-date">
                        <i class="el-icon-time"></i> {{ shareInfo.create_time|dateFormat('Y-m-d H:i') }}
                    </span>
                </el-tooltip>
            </div>
            <div class="share-info__content">
                {{ shareInfo.share_desc || '这个人很懒，什么都没留下～' }}
            </div>
            <div class="share-info__footer">
                <el-tooltip effect="dark" content="分享人" placement="top-start">
                    <span class="share-user">
                        <el-avatar :size="20" fit="fill" :src="shareInfo.user_info.avatar_url">
                            ^ v ^
                        </el-avatar>
                        <span class="text-overflow">{{ shareInfo.user_info.nickname }}</span>
                    </span>
                </el-tooltip>
                <el-tooltip effect="dark" content="分享有效期" placement="top-start">
                    <span class="share-expire">有效期：{{ expireInfo }}</span>
                </el-tooltip>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import BaseModal from '@/common/mixins/base-modal';

    export default {
        name: 'c-library-preview-info-modal',
        mixins: [BaseModal],
        props: {
            shareInfo: {
                type: Object,
                require: true
            }
        },
        computed: {
            title() {
                return this.shareInfo.share_name;
            },
            expireInfo() {
                if (this.shareInfo.expire_time >> 0 === 0) {
                    return '永久';
                } else {
                    return this.$utils.DateFormat(this.shareInfo.expire_time) + ' 前';
                };
            }
        }
    };
</script>

<style lang="scss">
    .c-library-preview-info-modal {
        .el-dialog__body {
            padding-top: 10px;
        }
    }
</style>

<style lang="scss" scoped>
    .share-info {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .share-name {
                margin-right: 20px;
                color: $--color-primary-light-4;
                font-size: 17px;
                font-weight: bold;
                cursor: pointer;
                width: 320px;
            }
            .share-date {
                font-size: 12px;
                color: $--color-primary-light-7;
                line-height: 19px;
                width: 130px;
            }
        }

        &__content {
            margin-top: 20px;
            color: $--color-primary-light-5;
            font-size: 15px;
            padding-bottom: 40px;
        }

        &__footer {
            margin-top: 20px;
            font-size: 13px;
            color: $--color-primary-light-7;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .share-user {
                display: flex;
                align-items: center;
                .el-avatar {
                    margin-right: 5px;
                }
            }
        }
    }
</style>
