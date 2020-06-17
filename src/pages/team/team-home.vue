<template>
    <div class="page-team-home">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                    <el-tag>团队个数：5个</el-tag>
                    <el-button @click="onTeamCreateReady" class="fr" type="primary" plain>创建团队</el-button>
                </el-card>
            </el-col>
            <el-col :span="24">
                <c-infinite-list ref="teamList" :request="getTeamList">
                    <el-card v-for="team in teamList" :key="team.id" class="box-card" shadow="hover">
                        <div @click="onLibraryDocList(team)" slot="header" class="clearfix">
                            <span>{{ team.team_info.name }}</span>
                        </div>
                        <div @click="onLibraryDocList(team)" class="text item">
                            {{ team.team_info.desc }}
                        </div>
                        <div class="item-footer" style="text-align: right;margin-top: 10px;">
                            <div class="team-action-bar">
                                <el-tooltip effect="dark" content="团队管理" placement="top">
                                    <span @click="onTeamManager(team)" class="team-action-item">
                                        <i class="el-icon-s-tools"></i>
                                    </span>
                                </el-tooltip>
                            </div>
                        </div>
                    </el-card>
                </c-infinite-list>
            </el-col>
        </el-row>
        <c-team-info-modal :visible.sync="teamModal.visible" :library-id="teamModal.teamId" />
    </div>
</template>

<script>

    export default {
        name: 'page-team-home',
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list'),
            'c-team-info-modal': () => import('@/components/team/c-team-info-modal')
        },
        data() {
            return {
                teamModal: {
                    visible: false,
                    teamId: 0
                },
                teamList: []
            };
        },
        created() {
        },
        methods: {
            // 获取用户团队列表
            async getTeamList(page, handler) {
                let hres = {};
                await this.$api.TeamList(page).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.teamList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 打开团队Modal
            openGroupModal(teamId = 0) {
                this.teamModal.teamId = parseInt(teamId);
                this.teamModal.visible = true;
            },
            // 事件：团队创建准备
            onTeamCreateReady() {
                this.openGroupModal(0);
            },
            // 事件：管理团队
            onTeamManager(team) {
                this.$link.teamInfo({ team_id: team.id });
            }
        }
    };
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
    .page-team-home {
        .el-card {
            margin-bottom: 10px;
        }
    }

    .team-action-item {
        font-size: 14px;
        background: #f2f2f2;
        padding: 4px;
        border-radius: 5px;
        cursor: pointer;
    }

    .team-action-bar {
        opacity: 0.3;
        transition: opacity 0.3s;
    }

    .box-card {
        &:hover .team-action-bar {
            opacity: 1;
        }
    }
</style>