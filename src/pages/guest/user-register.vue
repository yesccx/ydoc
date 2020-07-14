<!-- 用户注册页 -->
<template>
    <div class="page-user-register">
        <el-form ref="user" :model="user" :rules="userRules">
            <h2 class="title">注册账号</h2>
            <el-form-item prop="account">
                <el-input v-model="user.account" @keydown.enter.native="onRegister" prefix-icon="el-icon-user"
                    placeholder="用户名，可由字母数字下划线组成" auto-complete="off" clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="user.password" @keydown.enter.native="onRegister" prefix-icon="el-icon-lock"
                    placeholder="6～20位密码" type="password" show-password clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="user.email" @keydown.enter.native="onRegister" placeholder="可选邮箱，用于登录、找回密码"
                    prefix-icon="el-icon-message" clearable>
                </el-input>
            </el-form-item>
            <el-button :loading="submitLoading" class="inline-block" type="primary" @click="onRegister">注册</el-button>
            <div class="user-more-actions">
                <el-button type="text" @click="onLogin">立即登录?</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-register',
        mixins: [BasePage],
        data() {
            return {
                userRules: {
                    account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
                },
                user: {
                    account: '',
                    password: '',
                    email: ''
                },
                submitLoading: false
            };
        },
        created() {
        },
        methods: {
            // 事件：用户登录
            onRegister() {
                this.submitRegister();
            },
            // 提交注册
            async submitRegister() {
                await this.checkValidate('user');
                await this.$api.v1.GuestUserAccountRegister(this.user, {
                    loading: (status) => { this.submitLoading = status; }
                }).then(({ resData }) => {
                    this.$notify.success({ title: '注册成功', message: '欢迎使用Y-DOC' });
                    this.$link.login();
                });
            },
            // 事件：用户登录
            onLogin() {
                this.$link.login();
            }
        }
    };
</script>

<style lang="scss">
    .page-user-register {
        .user-more-actions .el-button--text {
            color: $--color-primary-light-3;
        }
    }
</style>

<style lang="scss" scoped>
    .page-user-register {
        width: 350px;
        margin: 0 auto;
        background: #ffffff;
        padding: 25px;
        border-radius: 10px;
        margin-top: 25vh;
        box-shadow: 0 2px 12px 0 rgba(122, 122, 122, 0.19);
    }

    .user-more-actions {
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }

    .title {
        text-align: center;
        margin-top: 0;

        .el-tag {
            position: relative;
            bottom: 3px;
            left: 5px;
        }
    }

    .inline-block {
        display: inline-block;
        width: 100%;
    }
</style>
