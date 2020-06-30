<!-- 用户信息页 -->
<template>
    <div class="page-user-info" v-loading="pageLoading">
        <el-row :gutter="20">
            <!-- 基本信息  -->
            <el-col :span="6">
                <el-card class="user-base-info">
                    <el-avatar class="user-base-info__avatar" :size="190" fit="fill" :src="user.avatar_url">^ v ^</el-avatar>
                    <el-divider></el-divider>
                    <ul>
                        <li class="user-base-info__item">
                            用户账号：<span>{{ user.account || '-' }}</span>
                        </li>
                        <li class="user-base-info__item">
                            注册时间：<span>{{ user.reg_time | dateFormat }}</span>
                        </li>
                    </ul>
                </el-card>
                <el-card class="user-base-operate">
                    <el-button type="primary" plain>修改密码</el-button>
                    <el-button type="danger" @click="onLogout" plain>退出登录</el-button>
                </el-card>
            </el-col>

            <!-- 全部信息  -->
            <el-col class="user-info" :span="18">
                <el-card>
                    <div slot="header">
                        <p>个人信息</p>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <span class="field">用户名 / 登录账号</span>
                                <span class="value">{{ user.account || '-' }}</span>
                            </div>
                            <!-- <span class="operate">
                                <i class="el-icon-arrow-right"></i>
                            </span> -->
                        </li>
                        <li>
                            <div>
                                <span class="field">用户昵称</span>
                                <span class="value">{{ user.nickname || '-' }}</span>
                            </div>
                            <span class="operate">
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </el-card>
                <el-card>
                    <div slot="header">
                        <p>联系方式</p>
                    </div>
                    <ul class="user-info">
                        <li>
                            <div>
                                <span class="field">手机号</span>
                                <span class="value">{{ user.phone || '-' }}</span>
                            </div>
                            <span class="operate">
                                立即绑定
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <div>
                                <span class="field">QQ号</span>
                                <span class="value">{{ user.qq || '-' }}</span>
                            </div>
                            <span class="operate">
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                        <li>
                            <div>
                                <span class="field">邮箱</span>
                                <span class="value">{{ user.email || '-' }}</span>
                            </div>
                            <span class="operate">
                                立即绑定
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-info',
        mixins: [BasePage],
        data() {
            return {
                user: {
                    id: 0,
                    account: '',
                    email: '',
                    nickname: '',
                    reg_time: 0,
                    avatar_url: '',
                    qq: ''
                }
            };
        },
        created() {
            this.initUserInfo();
        },
        methods: {
            // 初始化用户信息
            async initUserInfo() {
                this.$api.v1.UserInfo({}, {
                    loading: status => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.user = resData;
                });
            },
            // 事件：退出登录
            async onLogout() {
                this.$fullLoading.status = true;
                const res = await this.$store.dispatch('userSession/logout');
                this.$fullLoading.status = false;
                if (res) {
                    this.$link.login();
                } else {
                    this.$tip.error('退出登录失败，请重试');
                }
            }
        }
    };
</script>

<style lang="scss">
    .page-user-info {
        .el-card__header {
            padding-bottom: 0;
            border-bottom: none;
            p {
                margin-bottom: 0;
                color: $--color-primary-light-1;
                font-size: 20px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .el-card + .el-card {
        margin-top: 20px;
    }

    .user-base-info {
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            font-size: 14px;
            color: $--color-primary-light-3;
        }

        &__item {
            padding: 8px 0;
            span {
                color: $--color-primary-light-1;
            }
        }

        &__avatar {
            margin-left: 25px;
        }
    }

    .user-base-operate {
        margin-top: 20px;
        .el-button {
            width: 100%;
            &:last-of-type {
                margin: 10px 0 0 0;
            }
        }
    }

    .user-info {
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            font-size: 16px;
            color: $--color-primary-light-3;
        }
        li {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            padding: 18px 5px;
            span {
                color: $--color-primary-light-1;
            }
            > div {
                font-size: 16px;
                display: flex;
                .field {
                    font-size: 13px;
                    line-height: 24px;
                    width: 150px;
                    color: $--color-primary-light-6;
                }
            }
            .operate {
                font-size: 13px;
                line-height: 24px;
            }
        }
        li:not(:last-of-type) {
            border-bottom: 1px solid #dcdfe6;
        }
    }
</style>