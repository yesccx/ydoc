<template>
    <div class="page-user-password">
        <el-card>
            <div slot="header">
                <div style="text-align:center;">修改登录密码</div>
            </div>
            <el-form ref="user" style="width: 600px;margin: 0 auto;" :rules="passwordRules" :model="user" size="mini">
                <el-alert title="修改密码后需要重新登录" show-icon :closable="false"></el-alert>
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input prefix-icon="el-icon-lock" v-model="user.oldPassword" placeholder="请输入原密码" type="password"
                        show-password clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input prefix-icon="el-icon-lock" v-model="user.newPassword" placeholder="请输入新密码" type="password"
                        show-password clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmNewPassword">
                    <el-input prefix-icon="el-icon-lock" v-model="user.confirmNewPassword" placeholder="请输入确认密码" type="password"
                        show-password clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-circle-check" :loading="modifyLoading" @click="onModifyPassword"
                        plain>确认修改</el-button>
                    <el-button icon="el-icon-back" @click="onBack" plain>返 回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-password',
        mixins: [BasePage],
        data() {
            return {
                user: {
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                },
                passwordRules: {
                    'oldPassword': [
                        { required: true, message: '原密码不能为空', trigger: 'blur' }
                    ],
                    'newPassword': [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    'confirmNewPassword': [
                        { required: true, message: '确认密码不能为空', trigger: 'blur' },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== this.user.newPassword) {
                                    callback(new Error('两次输入密码不一致'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ]
                },
                modifyLoading: false
            };
        },
        methods: {
            // 验证密码
            validatePassword() {
            },
            // 事件：修改密码
            async onModifyPassword() {
                await this.checkValidate('user');

                await this.$api.v1.UserPasswordModify({ old_password: this.user.oldPassword, new_password: this.user.newPassword }, {
                    loading: (status) => { this.modifyLoading = status; }
                }).then(({ resData }) => {
                    this.$notify.success({ title: '修改密码', message: '修改密码成功，请重新登录' });
                    this.$store.dispatch('userSession/clearSession');
                    this.$link.login();
                });
            },
            // 事件：返回上一页
            onBack() {
                this.$link.back();
            }
        }
    };
</script>

<style lang="scss">
    .page-user-password {
    }
</style>

<style lang="scss" scoped>
</style>