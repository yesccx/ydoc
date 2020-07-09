<template>
    <div class="c-library-preview-protected">
        <el-card class="share-info">
            <div class="share-info__header" slot="header">
                <el-tooltip effect="dark" :content="libraryShareInfo.share_name" placement="top-start">
                    <span class="share-name text-overflow">{{ libraryShareInfo.share_name }}</span>
                </el-tooltip>
                <el-tooltip effect="dark" content="分享时间" placement="top-end">
                    <span class="share-date">
                        <i class="el-icon-time"></i> {{ libraryShareInfo.create_time|dateFormat('Y-m-d H:i') }}
                    </span>
                </el-tooltip>
            </div>
            <div class="share-info__content">
                {{ libraryShareInfo.share_desc || '这个人很懒，什么都没留下～' }}
            </div>
            <div class="share-info__footer">
                <el-tooltip effect="dark" content="分享人" placement="top-start">
                    <span class="share-user">
                        <el-avatar :size="20" fit="fill" :src="libraryShareInfo.user_info.avatar_url">
                            ^ v ^
                        </el-avatar>
                        <span class="text-overflow">{{ libraryShareInfo.user_info.nickname }}</span>
                    </span>
                </el-tooltip>
                <el-tooltip effect="dark" content="分享有效期" placement="top-start">
                    <span class="share-expire">有效期：{{ expireInfo }}</span>
                </el-tooltip>
            </div>
        </el-card>
        <el-card style="margin-top: 15px;">
            <el-input v-model="accessPassword" prefix-icon="el-icon-lock" placeholder="请输入访问密码" type="password" size="mini"
                show-password clearable>
                <el-button slot="append" icon="el-icon-circle-check" :loading="confirmLoading" @click="onConfirm">访问</el-button>
            </el-input>
        </el-card>
    </div>
</template>

<script>
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';
    import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';

    export default {
        name: 'c-library-preview-protected',
        mixins: [LibraryPreviewBase],
        computed: {
            expireInfo() {
                if (this.libraryShareInfo.expire_time >> 0 === 0) {
                    return '永久';
                } else {
                    return this.$utils.DateFormat(this.libraryShareInfo.expire_time) + ' 前';
                };
            }
        },
        data() {
            return {
                accessPassword: '',
                confirmLoading: false
            };
        },
        methods: {
            // 事件：确认访问密码
            onConfirm() {
                const reqData = { share_code: this.libraryShareInfo.share_code, share_access_password: this.accessPassword };

                this.$api.v1.LibraryShareInfo(reqData, {
                    loading: status => { this.confirmLoading = status; }
                }).then(({ resData }) => {
                    this.storeAccessPassword(reqData.share_code, reqData.share_access_password);
                    this.$store.commit('libraryPreview/setLibraryShareInfo', {
                        libraryShareInfo: resData, isAccessed: true, accessPassword: this.accessPassword
                    });
                });
            },
            // 本地缓存本次的分享访问密码
            storeAccessPassword(shareCode, accessPassword) {
                DataStore.setItem(STORE_KEYS.SHARE_ACCESS_PASSWORD, (data) => {
                    data = data || {};
                    data[shareCode] = accessPassword;
                    return data;
                }, 86400 * 7);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .c-library-preview-protected {
        width: 500px;
        margin: 0 auto;
        top: calc(50vh - 200px);
        position: absolute;
        left: calc(50vw - 270px);
        font-size: 14px;
    }

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