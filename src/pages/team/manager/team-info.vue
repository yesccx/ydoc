<template>
    <div class="page-team-info">
        <div class="form-body">
            <el-form ref="team" label-position="top" :model="team" label-width="80px">
                <el-form-item label="团队名称" prop="name">
                    <el-input v-model="team.name" placeholder="请输入团队名称，3~32个字符" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="团队分组" prop="group">
                        <el-select v-model="team.group" placeholder="请选择团队分组" clearable>
                            <el-option v-for="(item, key) in teamGroups" :key="key" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                <el-form-item label="团队简介" prop="desc">
                    <el-input type="textarea" resize="none" rows="4" placeholder="团队简介，用于介绍团队的基本信息，字数在255个字符之内"
                        v-model="team.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onModifyTeam" @loading="submitLoading">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import teamManager from '@/extends/mixins/team-manager';
    import { mapState } from 'vuex';

    export default {
        name: 'page-team-info',
        mixins: [BasePage, teamManager],
        computed: {
            ...mapState('teamManager', ['teamInfo'])
        },
        watch: {
            teamInfo() {
                this.team = this.$utils.CloneDeep(this.teamInfo);
            }
        },
        data() {
            return {
                team: {},
                submitLoading: false
            };
        },
        methods: {
            // 事件：修改团队
            async onModifyTeam() {
                const reqData = { team_id: this.team.id, name: this.team.name, desc: this.team.desc };
                await this.$api.TeamModify(reqData).then(() => {
                    this.$tip.success('修改成功');
                });
            },
            // 提交创建团队
            async submitCreateTeam() {
                await this.checkValidate('team');
                await this.$api.TeamCreate(this.team, {
                    loading: status => {
                        this.submitLoading = status;
                    }
                }).then(({ resMsg }) => {
                    this.$tip.success(resMsg);
                });
            }
        }
    };
</script>

<style lang="scss">
    .page-team-info {
    }
</style>

<style lang="scss" scoped>
    .title {
        margin-left: 10px;
    }
    .form-body {
        max-width: 700px;
    }
</style>
