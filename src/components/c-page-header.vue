<template>
    <div class="c-page-header">
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-menu @select="onSelect" :default-active="defaultActive" mode="horizontal">
                        <el-menu-item index="home"><i class="el-icon-setting"></i>工作台</el-menu-item>
                        <el-menu-item index="team-home" disabled>我的团队</el-menu-item>
                        <el-menu-item index="3" disabled>模板管理</el-menu-item>
                        <el-menu-item index="4" disabled>分享管理</el-menu-item>
                        <el-menu-item index="6" disabled>开发者中心</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <div class="user">
                        <div class="user-actions">
                            <i class="el-icon-bell user-actions-notices" @click="onNotice"></i>

                            <el-dropdown @command="onCreateCommand" trigger="click">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-plus user-actions-create-library"></i>
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="createLibrary">创建文档库</el-dropdown-item>
                                    <el-dropdown-item command="importLibrary">导入文档库</el-dropdown-item>
                                    <el-dropdown-item command="createTeam">创建团队</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="user-info">
                            <el-dropdown @command="onUserCommand" trigger="click">
                                <span class="el-dropdown-link">
                                    <img class="user-info-avatar" :src="userInfo.avatar_url" align="default">
                                    <span class="user-info-nickname text-overflow"
                                        :title="userInfo.nickname">{{ userInfo.nickname }}</span>
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="user">个人信息</el-dropdown-item>
                                    <el-dropdown-item>关于我们</el-dropdown-item>
                                    <el-dropdown-item command="userLogout" divided>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'c-page-header',
        computed: {
            ...mapGetters('userSession', ['userInfo'])
        },
        watch: {
            $route(route) {
                this.defaultActive = route.name || 'home';
            }
        },
        data() {
            return {
                defaultActive: '',
                logoutLoading: false
            };
        },
        methods: {
            // 用户信息
            user() {
                this.$link.userInfo();
            },
            // 用户退出登录
            async userLogout() {
                this.$fullLoading.status = true;
                const res = await this.$store.dispatch('userSession/logout');
                this.$fullLoading.status = false;
                if (res) {
                    this.$link.login();
                } else {
                    this.$tip.error('退出登录失败，请重试');
                }
            },
            // 创建文档库
            createLibrary() {
                this.$link.libraryCreate();
            },
            // 导入文档库
            importLibrary() {
                this.$link.libraryCreate();
            },
            // 创建团队
            createTeam() {
                this.$link.teamHome();
            },
            // 事件：
            onSelect(index) {
                switch (index) {
                    case 'home':
                        this.$link.home();
                        break;
                    case 'team-home':
                        this.$link.teamHome();
                        break;
                }
            },
            // 事件：用户操作项分发
            onUserCommand(command) {
                const allowCommands = ['userLogout', 'user'];
                if (allowCommands.indexOf(command) >= 0) {
                    this[command] && this[command]();
                }
            },
            // 事件：创建操作项分发
            onCreateCommand(command) {
                const allowCommands = ['createLibrary', 'importLibrary', 'createTeam'];
                if (allowCommands.indexOf(command) >= 0) {
                    this[command] && this[command]();
                }
            },
            // 事件：消息中心
            onNotice() {
            }
        }
    };
</script>

<style lang="scss">
    .c-page-header {
        .el-menu--horizontal > .el-menu-item {
            height: 45px !important;
            line-height: 45px !important;
        }

        .el-menu.el-menu--horizontal {
            border-bottom: initial !important;
        }

        .el-menu-item [class^="el-icon-"] {
            font-size: 16px !important;
        }
    }
</style>
<style lang="scss" scoped>
    .c-page-header {
        z-index: 900;
        left: 0;
        background-color: white;
        border-bottom: 1px solid #dddddd;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.04);
        position: sticky;
        top: 0;
    }

    .user {
        text-align: right;
        margin-right: 20px;
        &-actions {
            display: inline-block;
            margin-right: 30px;
            &-create-library {
                cursor: pointer;
            }
            &-notices {
                margin-right: 15px;
            }
        }
        &-info {
            display: inline-block;
            height: 45px;
            line-height: 45px;
            cursor: pointer;
            text-align: right;

            &-avatar {
                border-radius: 18px;
                width: 28px;
                height: 28px;
                top: 8px;
                position: relative;
                left: -8px;
            }

            &-nickname {
                max-width: 120px;
                display: table-cell;
            }
        }
    }

    .container {
        padding: 7px 0;
        max-width: 1250px;
        margin: 0 auto;
    }
</style>