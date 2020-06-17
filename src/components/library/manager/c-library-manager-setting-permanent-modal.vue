<template>
    <el-dialog class="c-library-manager-setting-permanent-modal" title="归档文档库" :visible.sync="visibleModal" width="500px"
        append-to-body>
        <div v-loading="loadingModal">
            <p class="tip">
                此操作会将文档库归档，之后会限制对文档库的编辑相关操作。
            </p>
            <el-divider content-position="center">操作不可逆，请谨慎操作</el-divider>
            <div class="actions">
                <el-input class="actions__confirm-password" v-model="confirmPassword" type="password" placeholder="输入登录密码确认"
                    prefix-icon="el-icon-lock" clearable show-password></el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onConfirmPermanent" :loading="permanentLoading">
                {{ permanentMessage }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    export default {
        name: 'c-library-manager-setting-permanent-modal',
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
            // 归档时的loading message
            permanentMessage() {
                return this.permanentLoading ? '归档中..' : '确认归档';
            }
        },
        data() {
            return {
                confirmPassword: '',
                permanentLoading: false
            };
        },
        methods: {
            // 初始化
            init() {
                this.confirmPassword = '';
            },
            // 事件：确认归档
            async onConfirmPermanent() {
                 if (!this.confirmPassword) {
                    this.$tip.error('请输入登录密码确认');
                    return false;
                }
                await this.permanentLibrary(this.confirmPassword);
            },
            // 归档文档库
            async permanentLibrary(password) {
                let permanentRes = true;
                await this.$api.LibraryPermanent({ library_id: this.libraryId, password }, {
                    report: true,
                    loading: status => { this.permanentLoading = status; }
                }).then(() => {
                    this.$notify({ title: '归档文档库', message: '归档成功', type: 'success' });
                    this.$link.home();
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                    permanentRes = false;
                });
                return permanentRes;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-manager-setting-permanent-modal {
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
    }
</style>
