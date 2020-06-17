<template>
    <div class="page-team-settings">
        <div>
            <el-button type="danger" icon="el-icon-delete" @click="onTeamRemoveReady">删除团队</el-button>
            <el-alert style="margin-top: 5px;" title="将永久删除该团队，相关的分享内容、模板等都会失效，请谨慎操作" type="warning" :closable="false" show-icon>
            </el-alert>
        </div>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import teamManager from '@/extends/mixins/team-manager';

    export default {
        name: 'page-team-settings',
        mixins: [BasePage, teamManager],
        methods: {
            // 事件：删除团队准备
            onTeamRemoveReady() {
                this.$prompt('将永久删除该团队，相关的分享内容、模板等都会失效，请谨慎操作', '删除团队', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder: '请输入登录密码确认',
                    inputType: 'password',
                    beforeClose: async (action, instance, done) => {
                        if (action === 'confirm') {
                            const password = instance.inputValue;
                            if (!password) {
                                return false;
                            }
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '删除中...';
                            const removeRes = await this.removeTeam(password);
                            instance.confirmButtonText = '确定';
                            if (removeRes) {
                                this.removeTeamSuccess();
                                done();
                            }
                            instance.confirmButtonLoading = false;
                        } else {
                            done();
                        }
                    }
                });
            },
            // 删除团队
            async removeTeam(password) {
                let removeRes = false;
                await this.$api.TeamRemove({ id: this.teamId, password }).then(() => {
                    removeRes = true;
                });
                return removeRes;
            },
            // 删除团队成功
            removeTeamSuccess() {
                this.$link.home();
                this.$notify({
                    title: '删除团队',
                    message: '删除成功',
                    type: 'success'
                });
            }
        }
    };
</script>

<style lang="scss">
    .page-team-settings {
    }
</style>
