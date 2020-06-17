<template>
    <el-dialog class="c-team-info-modal" :title="title" :visible.sync="visibleModal" :before-close="handleClose" width="450px"
        append-to-body>
        <div v-loading="loadingModal">
            <el-form :model="team" label-width="40px" size="mini">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="team.name" maxlength="32" placeholder="团队名称，1～32个字符之间" autocomplete="off"
                        @keydown.enter.native="onSaveTeam" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="desc">
                    <el-input v-model="team.desc" maxlength="255" placeholder="团队简介，1～255个字符之间" type="textarea" rows="4"
                        resize="none" @keydown.enter.native="onSaveTeam" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div class="actions">
                <el-button icon="el-icon-close" @click="onClose">取 消</el-button>
                <el-button icon="el-icon-check" type="primary" :loading="saveLoading" @click="onSaveTeam">保 存</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import BaseModal from '@/common/mixins/base-modal';

    export default {
        name: 'c-team-info-modal',
        mixins: [BaseModal],
        props: {
            // 团队id
            teamId: {
                type: Number,
                require: true
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.initTeamInfo();
                }
            }
        },
        computed: {
            title() {
                return this.team.id > 0 ? '修改团队' : '新增团队';
            }
        },
        data() {
            return {
                team: {
                    id: 0,
                    name: '',
                    desc: ''
                },
                isUpdated: false,
                saveLoading: false
            };
        },
        methods: {
            // 初始化团队信息
            async initTeamInfo() {
                this.resetTeamInfo();
                this.team.id = this.teamId;
                this.isUpdated = false; // 标识没有内容更新

                if (this.team.id > 0) {
                    this.loadingModal = true;
                    this.team = await this.getTeamInfo();
                }
            },
            // 获取团队信息
            async getTeamInfo() {
                const reqData = { id: this.team.id };
                let teamInfo = this.$utils.CloneDeep(this.teamInfo);
                await this.$api.TeamInfo(reqData, {
                    loading: status => {
                        this.loadingModal = status;
                    }
                }).then(({ resData }) => {
                    teamInfo = { ...teamInfo, ...resData };
                }).catch(() => {
                    this.onClose();
                });

                return teamInfo;
            },
            // 重置团队信息
            resetTeamInfo() {
                this.team = { id: 0, name: '', desc: '' };
            },
            // 保存团队
            async saveTeam() {
                const axiosTeamUpSert = this.team.id > 0 ? this.$api.TeamModify : this.$api.TeamCreate;
                const reqData = { ...this.team };

                await axiosTeamUpSert(reqData, {
                    loading(state) {
                        this.saveLoading = state;
                    }
                }).then(({ resData }) => {
                    this.$tip.success('保存成功');
                    this.isUpdated = true;
                    this.$emit('team-save-success');
                    this.onClose();
                });
            },
            // 事件：保存团队
            onSaveTeam() {
                this.saveTeam();
            },
            // 事件：取消操作
            onClose() {
                this.handleClose(() => {
                    this.visibleModal = false;
                });
            },
            // 处理是否允许关闭
            handleClose(done) {
                if (this.saveLoading) {
                    this.$notify.warning({ title: '无法关闭', message: '正在保存中，请稍后' });
                } else {
                    done();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .actions {
        text-align: right;
    }
</style>
