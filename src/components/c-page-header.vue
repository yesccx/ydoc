<template>
    <div class="c-page-header">
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-menu @select="onMenuSelect" :default-active="defaultActive" mode="horizontal">
                        <el-menu-item index="home"><i class="el-icon-setting"></i>工作台</el-menu-item>
                        <el-menu-item index="team-home" disabled>我的团队</el-menu-item>
                        <el-menu-item index="3" disabled>模板管理</el-menu-item>
                        <el-menu-item index="4" disabled>分享管理</el-menu-item>
                        <el-menu-item index="6" disabled>开发者中心</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <div class="header-tools">
                        <div class="operate">
                            <el-badge :is-dot="userMessageUnreadCount > 0">
                                <i class="el-icon-message operate__user-message" title="消息通知" @click="onUserMessage"></i>
                            </el-badge>
                            <el-dropdown @command="onCreateCommand" trigger="click">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-circle-plus operate__create-library" title="创建文档库"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="createLibrary">创建文档库</el-dropdown-item>
                                    <el-dropdown-item command="importLibrary" disabled>导入文档库</el-dropdown-item>
                                    <el-dropdown-item command="createTeam" disabled>创建团队</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="user">
                            <el-dropdown @command="onUserCommand" trigger="click">
                                <span class="el-dropdown-link">
                                    <div class="user-info">
                                        <img class="user-info__avatar" :src="userInfo.avatar_url" align="default">
                                        <span class="user-info__nickname text-overflow" :title="userInfo.nickname">
                                            {{ userInfo.nickname }}
                                        </span>
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </div>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="userCenter">个人信息</el-dropdown-item>
                                    <el-dropdown-item command="aboutMe">关于我们</el-dropdown-item>
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
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'c-page-header',
        computed: {
            ...mapGetters('userSession', ['userInfo']),
            ...mapState('global', ['userMessageUnreadCount'])
        },
        watch: {
            $route(route) {
                this.defaultActive = route.name || 'home';
                this.fetchUserMessageUnreadCount();
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
            userCenter() {
                this.$link.userInfo();
            },
            aboutMe() {
                this.$notify({
                    title: '关于我们',
                    duration: 0,
                    dangerouslyUseHTMLString: true,
                    message: `
                    <br />
                    GitHub: <a href="https://github.com/yesccx/ydoc" target="_blank">https://github.com/yesccx/ydoc</a>
                    <br />
                    <br />
                    欢迎提出意见和建议
                `
                });
            },
            // 获取用户消息未读数
            async fetchUserMessageUnreadCount() {
                if (!this.userInfo.uid) {
                    return false;
                }

                await this.$api.v1.UserMessageCount({ status: 0 }).then(({ resData }) => {
                    this.$store.commit('global/setUserMessageUnreadCount', resData.count);
                });
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
            // 事件：菜单选择
            onMenuSelect(index) {
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
                const allowCommands = ['userCenter', 'userLogout', 'aboutMe'];
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
            onUserMessage() {
                this.$link.userMessage();
            }
        }
    };
</script>

<style lang="scss">
    .c-page-header {
        .el-menu--horizontal > .el-menu-item {
            height: 45px !important;
            line-height: 45px !important;
            color: $--color-primary-light-1;
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

        .container {
            padding: 7px 0;
            max-width: 1200px;
            margin: 0 auto;
        }
    }

    .header-tools {
        display: flex;
        align-items: center;
        height: 45px;
        float: right;
    }

    .operate {
        margin-right: 20px;
        display: flex;
        align-items: center;
        margin-bottom: 2px;

        &__user-message {
            cursor: pointer;
            font-size: 19px;
            color: $--color-primary-light-3;
            &:hover {
                color: $--color-primary-light-1;
            }
        }

        &__create-library {
            cursor: pointer;
            font-size: 19px;
            color: $--color-primary-light-3;
            margin-left: 20px;
            &:hover {
                color: $--color-primary-light-2;
            }
        }
    }

    .user-info {
        display: inline-flex;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;

        &__avatar {
            border-radius: 18px;
            width: 21px;
            height: 21px;
            margin-right: 5px;
        }

        &__nickname {
            color: $--color-primary-light-2;
            font-size: 13px;
            max-width: 80px;
        }
    }
</style>