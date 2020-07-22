<!-- 用户中心 -->
<template>
    <div class="page-user-center" v-loading="pageLoading">
        <el-row :gutter="20">
            <!-- 基本信息  -->
            <el-col :span="6">
                <el-card class="user-base-info">
                    <el-avatar class="user-base-info__avatar" :size="190" fit="fill" :src="userInfo.avatar_url">^ v ^</el-avatar>
                    <el-divider></el-divider>
                    <ul>
                        <li class="user-base-info__item">
                            用户账号：<span>{{ userInfo.account || '-' }}</span>
                        </li>
                        <li class="user-base-info__item">
                            注册时间：<span>{{ userInfo.reg_time | dateFormat }}</span>
                        </li>
                    </ul>
                </el-card>
                <el-card class="user-base-operate">
                    <el-button type="primary" icon="el-icon-lock" @click="onModifyPassword" plain>修改密码</el-button>
                    <el-button type="danger" icon="el-icon-back" @click="onLogout" plain>退出登录</el-button>
                </el-card>
            </el-col>

            <el-col :span="18">
                <!-- 用户信息  -->
                <c-user-center-info :user-info="userInfo" />

                <!-- 用户偏好  -->
                <c-user-center-preference :user-config="userConfig" :user-config-parse="userConfigParse"
                    @preference-modifyed="onPreferenceModifyed" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-center',
        mixins: [BasePage],
        components: {
            'c-user-center-info': () => import('@/components/user/center/c-user-center-info'),
            'c-user-center-preference': () => import('@/components/user/center/c-user-center-preference')
        },
        data() {
            return {
                userInfo: {
                    id: 0,
                    account: '',
                    email: '',
                    nickname: '',
                    reg_time: 0,
                    avatar_url: '',
                    qq: ''
                },
                userConfig: {},
                userConfigParse: {}
            };
        },
        created() {
            this.initUserInfo();
            this.initUserConfig();
        },
        methods: {
            // 初始化用户信息
            async initUserInfo() {
                this.$api.v1.UserInfo({}, {
                    loading: status => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.userInfo = resData;
                });
            },
            // 初始化用户配置
            async initUserConfig() {
                await this.$api.v1.UserConfigValue({}, {
                    loading: status => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.userConfig = resData.config;
                    this.userConfigParse = resData.parse;
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
            },
            // 事件：前往修改密码
            onModifyPassword() {
                this.$link.userPassword();
            },
            // 事件：用户偏好设置被重置
            async onPreferenceModifyed() {
                this.pageLoading = true;
                await this.initUserConfig();
                this.pageLoading = false;
            }
        }
    };
</script>

<style lang="scss">
    .page-user-center {
        height: calc(100vh - 87px);

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

    .user-base {
        &-info {
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

        &-operate {
            margin-top: 20px;

            .el-button {
                width: 100%;
                &:last-of-type {
                    margin: 10px 0 0 0;
                }
            }
        }
    }
</style>