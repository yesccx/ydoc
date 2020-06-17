<template>
    <div class="page-team-manager">
        <el-card class="box-card" v-loading="pageLoading" shadow="hover" style="height:calc(100vh - 95px)">
            <el-row class="tac">
                <el-col :span="4">
                    <el-menu @select="onSelect" :default-active="defaultActive" style="height:calc(100vh - 135px)">
                        <el-menu-item index="team-info">
                            <i class="el-icon-document"></i>
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="team-members">
                            <i class="el-icon-user"></i>
                            <span slot="title">成员管理</span>
                        </el-menu-item>
                        <el-menu-item index="team-shares">
                            <i class="el-icon-share"></i>
                            <span slot="title">分享管理</span>
                        </el-menu-item>
                        <el-menu-item index="team-settings">
                            <i class="el-icon-setting"></i>
                            <span slot="title">相关设置</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <div style="padding: 0 20px;">
                        <p style="font-size: 20px;text-align: center;">{{ title }}</p>
                        <el-divider content-position="left"></el-divider>
                        <router-view name="manager"></router-view>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import teamManager from '@/extends/mixins/team-manager';

    export default {
        name: 'page-team-manager',
        mixins: [BasePage, teamManager],
        computed: {
            title() {
                return this.$route.meta.title;
            }
        },
        data() {
            return {
                defaultActive: ''
            };
        },
        async created() {
            this.pageLoading = true;

            this.defaultActive = this.$route.name;
            await this.initialize();

            this.pageLoading = false;
        },
        methods: {
            // 初始化
            async initialize() {
                await this.initTeamInfo();
            },
            // 初始化团队信息
            async initTeamInfo() {
                let teamInfo = false;
                await this.$api.TeamInfo({ team_id: this.teamId }, { report: true }).then(({ resData }) => {
                    teamInfo = resData;
                }).catch(async ({ resMsg = '未知错误' }) => {
                    await this.$utils.Error(resMsg);
                });

                this.$store.commit('teamManager/initTeamInfo', teamInfo);

                return teamInfo;
            },
            // 事件：
            onSelect(index) {
                switch (index) {
                    case 'team-info':
                        this.$link.teamInfo({ team_id: this.teamId }, { is_replace: true });
                        break;
                    case 'team-members':
                        this.$link.teamMembers({ team_id: this.teamId }, { is_replace: true });
                        break;
                    case 'team-settings':
                        this.$link.teamSettings({ team_id: this.teamId }, { is_replace: true });
                        break;

                    default:
                        break;
                }
            }
        }
    };
</script>

<style lang="scss">
    .page-team-manager {
    }
</style>