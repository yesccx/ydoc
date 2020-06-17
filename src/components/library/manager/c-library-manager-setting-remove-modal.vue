<template>
    <el-dialog class="c-library-manager-setting-remove-modal" title="删除文档库" :visible.sync="visibleModal" width="500px"
        append-to-body>
        <div v-loading="loadingModal">
            <p class="tip">
                此操作会将会完全删除文档库，包括文档库的分享等信息。
            </p>
            <el-divider content-position="center">操作不可逆，请谨慎操作</el-divider>
            <div class="actions">
                <el-input class="actions__confirm-password" v-model="confirmPassword" type="password" placeholder="输入登录密码确认"
                    prefix-icon="el-icon-lock" clearable show-password></el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onConfirmRemove" :loading="removeLoading">
                {{ removeMessage }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import BaseModal from '@/common/mixins/base-modal';
    export default {
        name: 'c-library-manager-setting-remove-modal',
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
            // 移除时的loading message
            removeMessage() {
                return this.removeLoading ? '删除中..' : '确认删除';
            }
        },
        data() {
            return {
                confirmPassword: '',
                removeLoading: false
            };
        },
        methods: {
            // 初始化
            init() {
                this.confirmPassword = '';
            },
            // 事件：确认删除
            async onConfirmRemove() {
                if (!this.confirmPassword) {
                    this.$tip.error('请输入登录密码确认');
                    return false;
                }
                await this.removeLibrary(this.confirmPassword);
            },
            // 删除文档库
            async removeLibrary(password) {
                let removeRes = true;
                await this.$api.LibraryRemove({ library_id: this.libraryId, password }, {
                    report: true,
                    loading: status => { this.removeLoading = status; }
                }).then(() => {
                    this.$notify({ title: '删除文档库', message: '删除成功', type: 'success' });
                    this.$link.home();
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                    removeRes = false;
                });
                return removeRes;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-manager-setting-remove-modal {
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
