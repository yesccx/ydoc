<!-- 用户中心-用户信息 -->
<template>
    <div class="c-user-center-info">
        <!-- 全部信息  -->
        <el-card class="user-info">
            <div slot="header">
                <p>个人信息</p>
            </div>
            <ul>
                <li class="user-info__item">
                    <div class="user-info__item-content">
                        <span class="field">用户名 / 登录账号</span>
                        <span class="value">{{ userInfo.account || '-' }}</span>
                    </div>
                </li>
                <li class="user-info__item">
                    <div class="user-info__item-content">
                        <span class="field">用户昵称</span>
                        <span class="value">{{ userInfo.nickname || '-' }}</span>
                    </div>
                    <span class="user-info__item-operate" @click="onUserNicknameModify">
                        修改<i class="el-icon-arrow-right"></i>
                    </span>
                </li>
            </ul>
        </el-card>

        <!-- <el-card disabled>
            <div slot="header">
                <p>联系方式</p>
            </div>
            <ul>
                <li>
                    <div>
                        <span class="field">手机号</span>
                        <span class="value">{{ userInfo.phone || '-' }}</span>
                    </div>
                    <span class="operate">
                        立即绑定
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
                <li>
                    <div>
                        <span class="field">QQ号</span>
                        <span class="value">{{ userInfo.qq || '-' }}</span>
                    </div>
                    <span class="operate">
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
                <li>
                    <div>
                        <span class="field">邮箱</span>
                        <span class="value">{{ userInfo.email || '-' }}</span>
                    </div>
                    <span class="operate">
                        立即绑定
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </li>
            </ul>
        </el-card> -->
    </div>
</template>

<script>
    export default {
        name: 'c-user-center-info',
        props: {
            userInfo: {
                type: Object,
                required: true
            }
        },
        methods: {
            // 事件：修改用户昵称
            onUserNicknameModify() {
                this.$prompt('请输入新昵称', '修改昵称', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    inputValue: this.userInfo.nickname,
                    beforeClose: async (action, instance, done) => {
                        if (action !== 'confirm') {
                            done();
                            return true;
                        }
                        await this.$api.v1.UserNicknameModify({ nickname: instance.inputValue }, {
                            loading: (status) => {
                                instance.confirmButtonLoading = status;
                                instance.confirmButtonText = status ? '修改中...' : '确认';
                            },
                            report: true
                        }).then(({ resData }) => {
                            done();
                        }).catch(({ resMsg }) => {
                            this.$tip.error(resMsg);
                        });
                    }
                }).then(({ value: nickname }) => {
                    this.userInfo.nickname = nickname;
                    this.$store.commit('userSession/updateNickname', nickname);
                    this.$tip.success('修改成功');
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .user-info ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 16px;

        .user-info__item {
            display: flex;
            justify-content: space-between;
            align-content: center;
            padding: 18px 5px;
            line-height: 22px;

            &:not(:last-of-type) {
                border-bottom: 1px solid #dcdfe6;
            }

            &-content {
                display: flex;
                .field {
                    font-size: 13px;
                    line-height: 24px;
                    width: 160px;
                    color: $--color-primary-light-6;
                }
                .value {
                    max-width: 500px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: block;
                    font-size: 16px;
                    color: $--color-primary-light-1;
                }
            }

            &-operate {
                cursor: pointer;
                font-size: 13px;
                line-height: 24px;
                color: $--color-primary-light-1;
            }
        }
    }
</style>