<template>
    <el-dialog class="c-team-member-invite-modal" :visible.sync="visibleModal" :title="title" width="550px" center append-to-body>
        <el-autocomplete class="search-input" v-model="searchKey" :fetch-suggestions="fetchMembers" :popper-append-to-body="false"
            prefix-icon="el-icon-search" placeholder="请输入用户名" @select="onUseMember" clearable>
            <template v-slot="{ item:member }">
                <el-avatar :size="25" icon="el-icon-user-solid" :src="member.avatar"></el-avatar>
                <span class="search-result-username">{{ member | memberState}} {{ member.account }}</span>
            </template>
        </el-autocomplete>

        <el-divider content-position="left">已选用户</el-divider>

        <div class="use-member">
            <el-tag class="use-member-item" v-for="member in useMembers" :key="member.id" @close="onCancelMember(member)"
                type="info" size="medium" closable>
                <el-avatar :size="23" icon="el-icon-user-solid" :src="member.avatar"></el-avatar>
                {{ member.account }}
            </el-tag>
        </div>

        <template v-slot:footer>
            <el-button type="primary" icon="el-icon-s-check" :loading="inviteMemberLoading" @click="onInviteMemberBefore" plain>
                确认邀请
            </el-button>
        </template>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    export default {
        name: 'c-team-member-invite-modal',
        mixins: [BaseModal],
        props: {
            teamId: {
                type: Number,
                required: true
            },
            teamMembers: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                title: '邀请用户加入团队',
                searchKey: '',
                useMembers: [],
                inviteMemberLoading: false
            };
        },
        methods: {
            // 按条件获取用户列表
            async fetchMembers(searchKey, cb) {
                let members = [];
                if (searchKey) {
                    await this.$api.v1.ToolsMemberCollection({ search_key: searchKey }).then(({ resData }) => {
                        members = resData;
                    });
                }

                members.forEach((member) => {
                    member.is_exists = this.teamMembers.findIndex((teamMember) => teamMember.uid === member.id) >= 0;
                    member.is_use = this.useMembers.findIndex((useMember) => useMember.id === member.id) >= 0;
                });
                return cb(members);
            },
            // 邀请用户
            async inviteMembers() {
                const useMembers = this.useMembers;
                if (useMembers.length === 0) {
                    this.$tip.error('请选择要邀请的用户');
                    return false;
                }
                const memberIds = useMembers.map(member => member.id);

                let isSuccess = false;
                await this.$api.v1.TeamInviteMembers({ team_id: this.teamId, member_ids: memberIds }, {
                    loading: (state) => { this.inviteMemberLoading = state; }
                }).then(() => {
                    isSuccess = true;
                    this.$tip.success('邀请成功');
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                });

                if (isSuccess) {
                    this.$emit('invite-success');
                    this.visible = false;
                }
            },
            // 事件：modal open
            onModalOpen() {
                this.useMembers = [];
            },
            // 事件：选择用户
            onUseMember(member) {
                if (!(member.is_exists || member.is_use)) {
                    this.useMembers.push(this.$utils.CloneDeep(member));
                }

                this.search = '';
            },
            // 事件：取消用户
            onCancelMember(member) {
                const memberIndex = this.useMembers.findIndex((useMember) => useMember.id === member.id);
                this.useMembers.splice(memberIndex, 1);
            },
            // 事件：确认邀请用户前
            onInviteMemberBefore() {
                this.inviteMembers();
            }
        },
        filters: {
            memberState(member) {
                let stateMsg = '';
                stateMsg = member.is_exists ? '(已存在)' : stateMsg;
                stateMsg = member.is_use ? '(已选择)' : stateMsg;
                return stateMsg;
            }
        }
    };
</script>

<style lang="scss">
    .c-team-member-invite-modal {
        .el-avatar {
            display: inline-table !important;
        }
        .el-autocomplete-suggestion li {
            padding: 5px 20px !important;
        }
    }
</style>

<style lang="scss" scoped>
    .search-result-username {
        margin-left: 5px;
        font-size: 13px;
        color: #a2a2a2;
    }
    .use-member-item {
        margin: 3px;
    }
    .search-input {
        width: 100%;
    }
</style>