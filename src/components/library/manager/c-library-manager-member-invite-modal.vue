<!-- 邀请用户加入文档库Modal -->
<template>
    <el-dialog class="c-library-manager-member-invite-modal" :visible.sync="visibleModal" :title="title" width="550px" center
        append-to-body>
        <el-autocomplete class="search-input" v-model="searchMemberKey" :fetch-suggestions="fetchMembers"
            :popper-append-to-body="false" prefix-icon="el-icon-search" popper-class="library-manager-member-invite-search"
            placeholder="请输入用户名" @select="onUseMember" clearable>
            <template v-slot="{ item: member }">
                <el-avatar :size="22" icon="el-icon-user-solid" :src="member.avatar_url"></el-avatar>
                <span class="search-result-name">{{ member.account }}</span>
                <span class="search-result-name-status">{{ member | memberSelectState}}</span>
            </template>
        </el-autocomplete>

        <el-divider content-position="left">已选用户</el-divider>

        <div class="use-member">
            <el-tag class="use-member-item" v-for="member in useMembers" :key="member.id" @close="onUnuseMember(member)"
                type="info" size="medium" closable>
                <el-avatar class="user-member-item-avatar" :size="17" icon="el-icon-user-solid" :src="member.avatar_url">
                </el-avatar>
                <span class="user-member-item-name">{{ member.account }}</span>
            </el-tag>
        </div>

        <template v-slot:footer>
            <el-button type="primary" icon="el-icon-s-check" :loading="inviteMemberLoading" @click="onInviteMember" plain>
                确认邀请
            </el-button>
        </template>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    export default {
        name: 'c-library-manager-member-invite-modal',
        mixins: [BaseModal],
        props: {
            libraryId: {
                type: Number,
                required: true
            },
            libraryMembers: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                title: '邀请用户加入文档库',
                searchMemberKey: '',
                useMembers: [],
                inviteMemberLoading: false
            };
        },
        methods: {
            // 按条件获取用户列表
            async fetchMembers(searchMemberKey, cb) {
                let members = [];

                // 搜索用户列表
                if (searchMemberKey) {
                    await this.$api.v1.ToolsMemberCollection({ search_key: searchMemberKey }).then(({ resData }) => {
                        members = resData;
                    });
                }

                // 标记用户状态
                members.forEach((member) => {
                    member.is_exists = this.libraryMembers.findIndex((libraryMember) => libraryMember.uid === member.id) >= 0;
                    member.is_use = this.useMembers.findIndex((useMember) => useMember.id === member.id) >= 0;
                });

                return cb(members);
            },
            // 邀请用户
            async inviteMembers() {
                const memberIds = this.useMembers.map(member => member.id);
                if (memberIds.length === 0) {
                    this.$tip.error('请选择要邀请的用户');
                    return false;
                }

                let isSuccess = false;
                await this.$api.v1.LibraryMemberInvite({ library_id: this.libraryId, member_ids: memberIds }, {
                    loading: (state) => { this.inviteMemberLoading = state; }
                }).then(() => {
                    isSuccess = true;
                    this.$tip.success('邀请成功');
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                });

                // 触发邀请成功事件
                if (isSuccess) {
                    this.$emit('invite-success');
                    this.visibleModal = false;
                }
            },
            // 事件：modal open
            onModalOpen() {
                this.useMembers = [];
                this.inviteMemberLoading = false;
            },
            // 事件：选定用户
            onUseMember(member) {
                if (!(member.is_exists || member.is_use)) {
                    this.useMembers.push(this.$utils.CloneDeep(member));
                }
            },
            // 事件：移除已选定的用户
            onUnuseMember(member) {
                const memberIndex = this.useMembers.findIndex((useMember) => useMember.id === member.id);
                this.useMembers.splice(memberIndex, 1);
            },
            // 事件：确认邀请用户
            onInviteMember() {
                this.inviteMembers();
            }
        },
        filters: {
            // 用户选择/使用状态
            memberSelectState(member) {
                let stateMsg = '';
                stateMsg = member.is_exists ? '(已存在)' : stateMsg;
                stateMsg = member.is_use ? '(已选择)' : stateMsg;
                return stateMsg;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-manager-member-invite-modal {
        .el-autocomplete-suggestion li {
            display: flex;
            padding: 7px 20px !important;
        }
        .el-icon-close {
            top: 1px;
        }
        .el-autocomplete-suggestion__list .el-icon-loading {
            width: 20px;
            height: 20px;
            margin: 0 auto;
        }
    }
</style>

<style lang="scss" scoped>
    .search-result-name {
        height: 22px;
        line-height: 22px;
        margin-left: 10px;
        font-size: 13px;
        color: #a2a2a2;
    }
    .search-result-name-status {
        height: 22px;
        line-height: 24px;
        margin-left: 10px;
        font-size: 10px;
        color: $--color-warning;
    }
    .use-member-item {
        margin: 3px;
    }
    .search-input {
        width: 100%;
    }
    .user-member-item-name {
        height: 17px;
        line-height: 17px;
        margin: 0 5px;
    }
    .user-member-item-avatar {
        top: 4px;
        position: relative;
    }
</style>