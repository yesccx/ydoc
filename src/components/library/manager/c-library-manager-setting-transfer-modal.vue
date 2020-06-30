<template>
    <el-dialog class="c-library-manager-setting-transfer-modal" title="转让文档库" :visible.sync="visibleModal" width="500px"
        append-to-body>
        <div v-loading="loadingModal">
            <p class="tip">
                此操作会将文档库转让给某一成员（该成员必须是非禁用状态），同时自己将成员普通成员。
            </p>
            <el-divider content-position="center">操作不可逆，请谨慎操作</el-divider>
            <div class="actions">
                <el-select class="actions__use-member" v-model="useMember" placeholder="请选择一个成员" clearable filterable>
                    <el-option v-for="member in libraryMembers" :key="member.uid" :label="member.user_info.nickname"
                        :value="member.uid">
                    </el-option>
                </el-select>
                <el-input class="actions__confirm-password" v-model="confirmPassword" type="password" placeholder="输入登录密码确认"
                    prefix-icon="el-icon-lock" clearable show-password></el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onConfirmTransfer" :loading="transferLoading">
                {{ transferMessage }}
                </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    export default {
        name: 'c-library-manager-setting-transfer-modal',
        mixins: [BaseModal],
        props: {
            // 文档库id
            libraryId: {
                type: Number,
                require: true
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.init();
                }
            }
        },
        computed: {
            // 转让时的loading message
            transferMessage() {
                return this.transferLoading ? '转让中..' : '确认转让';
            }
        },
        data() {
            return {
                libraryMembers: [],
                useMember: '',
                confirmPassword: '',
                transferLoading: false
            };
        },
        methods: {
            // 初始化
            init() {
                this.loadingModal = true;
                this.useMember = '';
                this.confirmPassword = '';
                this.initLibraryMembers();
            },
            // 初始化文档库成员列表
            async initLibraryMembers() {
                let members = [];
                await this.$api.v1.LibraryMemberCollection({ library_id: this.libraryId }, {
                    loading: status => { this.loadingModal = status; }
                }).then(({ resData }) => {
                    members = resData;
                });
                this.libraryMembers = members;
            },
            // 事件：确认转让
            async onConfirmTransfer() {
                if (!this.useMember) {
                    this.$tip.error('请指定一个成员');
                    return false;
                } else if (!this.confirmPassword) {
                    this.$tip.error('请输入登录密码确认');
                    return false;
                }
                await this.transferLibrary(this.confirmPassword);
            },
            // 转让文档库
            async transferLibrary(password) {
                let transferRes = true;
                await this.$api.v1.LibraryTransfer({ library_id: this.libraryId, member_id: this.useMember, password }, {
                    report: true,
                    loading: status => { this.transferLoading = status; }
                }).then(() => {
                    this.$notify({ title: '转让文档库', message: '转让成功', type: 'success' });
                    this.$link.home();
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                    transferRes = false;
                });
                return transferRes;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-manager-setting-transfer-modal {
        .el-dialog__body {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
</style>

<style lang="scss" scoped>
    .tip {
        margin: 0;
        line-height: 24px;
    }

    .actions {
        display: flex;
        justify-content: space-between;

        &__use-member {
            width: 70%;
            margin-right: 5px;
            margin-bottom: 10px;
        }

        &__confirm-password {
            margin-left: 10px;
        }
    }
</style>
