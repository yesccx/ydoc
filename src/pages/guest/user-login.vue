<!-- 用户登录页 -->
<template>
    <div class="page-user-login">
        <el-form ref="user" :model="user" :rules="userRules">
            <h2 class="user-title">
                Y-DOC <el-tag size="mini" type="danger">v1.0</el-tag>
            </h2>
            <el-form-item prop="user">
                <el-input v-model="user.account" placeholder="请输入用户名/邮箱账号" prefix-icon="el-icon-user" auto-complete="off"
                    @keydown.enter.native="onLogin" clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="user.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock" type="password"
                    @keydown.enter.native="onLogin" show-password clearable>
                </el-input>
            </el-form-item>
            <el-button :loading="submitLoading" class="inline-block" type="primary" @click="onLogin">登录</el-button>
            <div class="user-actions">
                <el-button type="text" @click="onWillRegister">立即注册?</el-button>
                <el-button type="text">忘记密码?</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-login',
        mixins: [BasePage],
        data() {
            return {
                userRules: {
                    account: [{ required: true, message: '请输入用户名/邮箱账号', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
                },
                user: {
                    account: '',
                    password: ''
                },
                submitLoading: false
            };
        },
        methods: {
            // 提交登录
            async submitLogin() {
                await this.checkValidate('user');
                await this.$api.v1.GuestUserAccountLogin(this.user, {
                    loading: status => { this.submitLoading = status; }
                }).then(({ resData }) => {
                    this.$notify.success({ title: '登录成功', message: '欢迎回来' });
                    this.userSession(resData.uid, resData.token);
                    this.goRedirect();
                });
            },
            // 跳转回登录前访问的页面
            goRedirect() {
                const redirect = this.$route.query.r;
                if (redirect) {
                    this.$router.push(redirect);
                } else {
                    this.$link.home();
                }
            },
            // 用户会话状态保存
            userSession(uid, token) {
                this.$store.commit('userSession/setSession', { uid, token });
            },
            // 事件：提交登录
            onLogin() {
                this.submitLogin();
            },
            // 事件：前往用户注册
            onWillRegister() {
                this.$link.register();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .page-user-login {
        width: 350px;
        margin: 0 auto;
        background: #ffffff;
        padding: 25px;
        border-radius: 10px;
        margin-top: 25vh;
        box-shadow: 0 2px 12px 0 rgba(122, 122, 122, 0.19);
    }

    .user-actions {
        width: 100%;
        text-align: center;
    }

    .user-title {
        text-align: center;
        margin-top: 0;

        .el-tag {
            position: relative;
            bottom: 3px;
            left: 5px;
        }
    }
</style>
