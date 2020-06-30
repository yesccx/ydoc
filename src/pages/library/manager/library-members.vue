<template>
    <div class="page-library-members" v-loading="pageLoading" element-loading-text="处理中">
        <div class="member-actions">
            <el-tag class="member-invite" size="medium" @click="onMemberInviteBefore">
                <i class="el-icon-s-custom"></i>
                <span>邀请用户</span>
            </el-tag>
            <el-tag size="medium">已有成员：{{ libraryMemberCount }}人 </el-tag>
        </div>

        <el-table :data="libraryMemberCollection" style="width: 100%" empty-text="暂无成员" stripe>
            <el-table-column label="成员" width="180">
                <template v-slot="{ row: member }">
                    <el-avatar size="small" icon="el-icon-user-solid" :src="member.user_info.avatar_url"></el-avatar>
                    <span style="position: absolute; left: 39px; top: 9px;">{{ member.user_info.nickname }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="角色" :filters="memberRoleFilterCollection"
                :filter-method="handleMemberRoleFilter">
                <template v-slot="{ row: member }">
                    <el-dropdown @command="onModifyRole" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                            <el-tag size="mini" :type="member.urole|parseMemberRoleStyle" effect="plain">
                                {{ member.urole|parseMemberRole }}
                                <i v-if="member.allowManager" class="el-icon-arrow-down el-icon--right"></i>
                            </el-tag>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div v-if="member.allowManager">
                                <el-dropdown-item v-for="role in libraryMemberRoleCollection" :key="role.name" :divided="true"
                                    :command="{ roleId: role.id, uid: member.uid }">
                                    <span style="font-size: 12px;">{{ role.name }}</span><br />
                                    <span style="font-size: 12px;color: #a8a8a8;">{{ role.desc }}</span>
                                </el-dropdown-item>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template v-slot="{ row: member }">
                    <el-switch size="small" :value="member.status === 1" @change="onMemberStatusChange(member)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="加入时间" width="180" :sort-method="handleMemberSort" sortable>
                <template v-slot="{ row: member }">
                    <span>{{ member.create_time|dateFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template v-slot:header="{ row: member }">
                    <el-input v-model="searchMembersKey" size="mini" prefix-icon="el-icon-search" placeholder="输入成员名称搜索"
                        :title="member" clearable />
                </template>
                <template v-slot="{ row: member }">
                    <el-popconfirm @onConfirm="onUninviteMemberBefore(member)" icon="el-icon-warning" title="是否确认移除该成员">
                        <el-button slot="reference" type="text" icon="el-icon-delete"> 移除成员
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 邀请用户Modal -->
        <c-library-manager-member-invite-modal :visible.sync="memberInviteModal.visible" :library-id="libraryId"
            :library-members="libraryMembers" @invite-success="onInviteMemberSuccess" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import libraryManager from '@/extends/mixins/library-manager';
    import { MemberRoleMap, MemberRoleKey } from '@/extends/utils/library-member';

    export default {
        name: 'page-library-members',
        mixins: [BasePage, libraryManager],
        components: {
            'c-library-manager-member-invite-modal': () => import('@/components/library/manager/c-library-manager-member-invite-modal')
        },
        computed: {
            memberRoleFilterCollection() {
                const collection = [];
                this.$utils.ForEach(MemberRoleMap, (role, key) => {
                    collection.push({ text: role.name, value: key });
                });

                return collection;
            },
            // 成员数
            libraryMemberCount() {
                return this.libraryMembers.length;
            },
            // 成员集合
            libraryMemberCollection() {
                return this.libraryMembers.filter(member =>
                    !this.searchMembersKey.trim() ||
                    member.user_info.nickname.toLowerCase().includes(this.searchMembersKey.trim().toLowerCase())
                ).map((member) => {
                    // 标识当前成员是否能管理该成员
                    member.allowManager = this.libraryMember.urole < member.urole;
                    return member;
                });
            },
            // 文档库管理角色信息集
            libraryMemberRoleCollection() {
                const roleCollection = [];
                this.$utils.ForEach(this.$utils.CloneDeep(MemberRoleMap), (role) => {
                    if (role.id !== MemberRoleKey.CREATOR && this.libraryMember.urole < role.id) {
                        roleCollection.push(role);
                    }
                });
                return roleCollection;
            }
        },
        filters: {
            // 解析成员角色名称
            parseMemberRole(role) {
                return MemberRoleMap[role] ? MemberRoleMap[role].name : '未知';
            },
            // 解析成员角色展示风格
            parseMemberRoleStyle(role) {
                return MemberRoleMap[role] ? MemberRoleMap[role].style : 'info';
            }
        },
        data() {
            return {
                libraryMembers: [],
                searchMembersKey: '',
                memberInviteModal: {
                    visible: false
                }
            };
        },
        methods: {
            // 模块初始化
            async moduleInitialize() {
                await this.initLibraryMembers();
            },
            // 初始化文档库成员列表
            async initLibraryMembers() {
                let members = [];
                await this.$api.v1.LibraryMemberCollection({ library_id: this.libraryId }).then(({ resData }) => {
                    members = resData;
                });
                this.libraryMembers = members;
            },
            // 移除用户
            async uninviteMember(uid) {
                await this.$api.v1.LibraryMemberUninvite({ library_id: this.libraryId, member_id: uid }, {
                    loading: (status) => { this.pageLoading = status; }
                }).then(() => {
                    this.$tip.success('移除成功');
                    this.initLibraryMembers();
                });
            },
            // 调整用户角色
            async memberModifyRole(memberId, roleId) {
                await this.$api.v1.LibraryMemberRoleModify({ library_id: this.libraryId, member_id: memberId, library_role_id: roleId }, {
                    loading: (status) => { this.pageLoading = status; }
                }).then(() => {
                    this.$tip.success('调整成功');
                    this.initLibraryMembers();
                });
            },
            // 调整用户状态（启用/禁用）
            async memberModifyStatus(memberId, status) {
                await this.$api.v1.LibraryMemberStatusModify({ library_id: this.libraryId, member_id: memberId, status }, {
                    loading: (status) => { this.pageLoading = status; }
                }).then(() => {
                    this.$tip.success('调整成功');
                    this.initLibraryMembers();
                });
            },
            // 处理成员列表按角色过滤
            handleMemberRoleFilter(roleId, memberInfo) {
                return parseInt(memberInfo.urole) === parseInt(roleId);
            },
            // 处理成员列表排序
            handleMemberSort(a, b) {
                return a.create_time - b.create_time;
            },
            // 事件：调整用户角色
            onModifyRole({ roleId, uid }) {
                this.memberModifyRole(uid, roleId);
            },
            // 事件：用户状态变更
            onMemberStatusChange(member) {
                this.memberModifyStatus(member.uid, member.status === 1 ? 2 : 1);
            },
            // 事件：用户邀请-准备
            onMemberInviteBefore() {
                this.memberInviteModal.visible = true;
            },
            // 事件：用户邀请成功
            onInviteMemberSuccess() {
                this.initLibraryMembers();
            },
            // 事件：移除用户-准备
            onUninviteMemberBefore(member) {
                this.uninviteMember(member.uid);
            }
        }
    };
</script>

<style lang="scss">
    .page-library-members {
        .el-dropdown-link {
            cursor: pointer;
            color: #808080;
            font-size: 12px;
        }
        .el-icon-arrow-down {
            font-size: 12px;
            margin-left: 0;
        }
        .el-avatar--small {
            height: 23px;
            width: 23px;
        }
    }
</style>

<style lang="scss" scoped>
    .member-actions {
        display: flex;
        margin-bottom: 5px;

        .member-invite {
            cursor: pointer;
            transition: all 0.2s;
        }
        .member-invite:hover {
            background-color: $--color-primary-light-2;
            border-color: $--color-primary-light-2;
            color: white;
        }

        .el-tag + .el-tag {
            margin-left: 10px;
        }

        .el-icon-s-custom {
            margin-right: 5px;
        }
    }
</style>
