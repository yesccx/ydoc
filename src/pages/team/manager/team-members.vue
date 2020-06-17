<template>
    <div class="page-team-members">
        <el-button @click="onMemberInviteBefore">邀请用户</el-button>
        <el-table
            :data="teamMembers.filter(data => !search2 || data.user_info.nickname.toLowerCase().includes(search2.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="成员" width="180">
                <template slot-scope="scope">
                    <el-avatar size="small" icon="el-icon-user-solid" :src="scope.row.user_info.avatar"></el-avatar>
                    <span style="position: absolute; left: 45px; top: 8px;">{{ scope.row.user_info.nickname }}</span>
                </template>
            </el-table-column>
            <el-table-column label="加入时间" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time|dateFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="权限">
                <template>
                    <el-tag type="danger" size="small">团队创始人</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search2" size="mini" placeholder="输入成员名称搜索" :title="scope.row" clearable />
                </template>
                <template slot-scope="scope">
                    <el-button @click="onUninviteMemberBefore(scope.row)" type="text" icon="el-icon-delete" plain>移出团队</el-button>
                    <el-button type="text" icon="el-icon-edit" plain>分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 邀请用户Modal -->
        <c-team-member-invite-modal :visible.sync="memberInviteModal.visible" :team-id="teamId" :team-members="teamMembers"
            @invite-success="onInviteMemberSuccess" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import teamManager from '@/extends/mixins/team-manager';

    export default {
        name: 'page-team-members',
        mixins: [BasePage, teamManager],
        components: {
            'c-team-member-invite-modal': () => import('@/components/team/c-team-member-invite-modal')
        },
        data() {
            return {
                teamMembers: [],
                search2: '',
                memberInviteModal: {
                    visible: false
                }
            };
        },
        async created() {
            await this.initTeamMembers();
        },
        methods: {
            // 初始化团队成员
            async initTeamMembers() {
                await this.$api.TeamMembers({ team_id: this.teamId }).then(({ resData }) => {
                    this.teamMembers = resData;
                });
            },
            // 移除用户
            async uninviteMember(uid) {
                await this.$api.TeamUninviteMember({ team_id: this.teamId, member_id: uid }).then(() => {
                    this.$tip.success('移除成功');
                    this.initTeamMembers();
                });
            },
            // 事件：用户邀请-准备
            onMemberInviteBefore() {
                this.memberInviteModal.visible = true;
            },
            // 事件：用户邀请成功
            onInviteMemberSuccess() {
                this.initTeamMembers();
            },
            // 事件：移除用户-准备
            onUninviteMemberBefore(member) {
                this.uninviteMember(member.uid);
            }
        }
    };
</script>

<style lang="scss">
    .page-team-members {
    }
</style>
