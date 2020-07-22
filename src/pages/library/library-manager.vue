<!-- 文档库管理 -->
<template>
    <div class="page-library-manager">
        <el-card class="box-card" v-loading="pageLoading" shadow="hover" style="height:calc(100vh - 95px)">
            <el-row class="tac">
                <el-col :span="4">
                    <el-menu class="manager-menu" @select="onSelect" :default-active="defaultActiveMenu">
                        <el-menu-item-group>
                            <span slot="title">文档库</span>
                            <el-menu-item index="library-info">
                                <span slot="title">基本信息</span>
                            </el-menu-item>
                            <el-menu-item index="library-preference">
                                <span slot="title">偏好设置</span>
                            </el-menu-item>
                            <el-menu-item index="library-settings">
                                <span slot="title">其他设置</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <span slot="title">成员与权限</span>
                            <el-menu-item index="library-members">
                                <span slot="title">成员管理</span>
                            </el-menu-item>
                            <el-menu-item index="library-groups" disabled>
                                <span slot="title">用户组管理</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <span slot="title">其它</span>
                            <el-menu-item index="library-shares" disabled>
                                <span slot="title">分享管理</span>
                            </el-menu-item>
                            <el-menu-item index="library-logs" disabled>
                                <span slot="title">操作日志</span>
                            </el-menu-item>
                            <el-menu-item index="library-open" disabled>
                                <span slot="title">开放API</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <div style="padding: 0 20px;">
                        <p style="font-size: 20px; text-align: left; font-weight:bold; margin-bottom: 25px;margin-top: 10px;">
                            {{ title }}</p>
                        <router-view v-if="libraryInited" name="manager"></router-view>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-library-manager',
        mixins: [BasePage],
        computed: {
            title() {
                return this.$route.meta.title;
            }
        },
        data() {
            return {
                libraryId: 0,
                libraryInited: false,
                defaultActiveMenu: ''
            };
        },
        async created() {
            this.pageLoading = true;

            // 获取文档库id
            const libraryId = this.$utils.Input('library_id/d', 0);
            if (libraryId <= 0) {
                this.$utils.Error('缺少必要参数');
            }
            this.libraryId = libraryId;

            // 初始化
            await this.initLibraryManagerInfo();
            this.defaultActiveMenu = this.$route.name || '';
            this.libraryInited = true;

            this.pageLoading = false;
        },
        methods: {
            // 初始化文档库管理信息（当前用户对该文档库的管理信息）
            async initLibraryManagerInfo() {
                let libraryManagerInfo = false;
                await this.$api.v1.LibraryManagerInfo({ library_id: this.libraryId }, { report: true }).then(({ resData }) => {
                    libraryManagerInfo = resData;
                }).catch(async ({ resMsg = '未知错误' }) => {
                    await this.$utils.Error(resMsg);
                });

                this.$store.commit('libraryManager/setLibraryManagerInfo', libraryManagerInfo);

                return libraryManagerInfo;
            },
            // 事件：
            onSelect(index) {
                switch (index) {
                    case 'library-info':
                        this.$link.libraryInfo({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-members':
                        this.$link.libraryMembers({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-preference':
                        this.$link.libraryPreference({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-settings':
                        this.$link.librarySettings({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-open':
                        this.$link.libraryOpen({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-shares':
                        this.$link.libraryShares({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-groups':
                        this.$link.libraryGroups({ library_id: this.libraryId }, { is_replace: true });
                        break;
                    case 'library-logs':
                        this.$link.libraryLogs({ library_id: this.libraryId }, { is_replace: true });
                        break;

                    default:
                        break;
                }
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.pageLoading = false;
            next();
        }
    };
</script>

<style lang="scss">
    .page-library-manager {
        .manager-menu .el-menu-item {
            height: 40px;
            line-height: 40px;
        }

        .el-menu-item-group {
            margin-bottom: 15px;
        }
        .el-menu-item-group:not(:last-of-type)::after {
            content: "";
            display: block;
            width: 148px;
            margin-top: 10px;
            height: 0.1px;
            position: relative;
            left: 10px;
            bottom: 0;
            background: $--color-primary-light-95;
        }
        .el-menu-item-group__title {
            margin-bottom: 5px;
        }
        .el-menu-item:hover {
            background: $--color-primary-light-95;
        }
        .el-menu-item.is-active {
            border-right: 2px solid $--color-primary-light-1;
            color: $--color-primary-light-1;
            background: $--color-primary-light-95;
            font-weight: bold;
        }

        // 表单
        .el-form--label-top .el-form-item__label {
            padding: 0 0 5px 2px;
            font-weight: bold;
        }
        .el-form-item.is-required:not(.is-no-asterisk)
            > .el-form-item__label:after {
            content: " (必填)";
            color: #f56c6c;
            margin-right: 4px;
        }
        .el-form-item.is-required:not(.is-no-asterisk)
            > .el-form-item__label:before {
            content: "";
            margin-right: 0;
        }
    }
</style>

<style lang="scss" scoped>
    .manager-menu {
        height: calc(100vh - 135px);
    }
</style>