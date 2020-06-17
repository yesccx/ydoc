<template>
    <el-dialog class="c-library-doc-content-group-modal" :title="title" :visible.sync="visibleModal" :before-close="handleClose"
        width="450px" append-to-body>
        <div v-loading="loadingModal">
            <el-form :model="group" label-width="40px" size="mini">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="group.name" maxlength="32" placeholder="分组名称，1～32个字符之间" autocomplete="off"
                        @keydown.enter.native="onSaveGroup" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="desc">
                    <el-input v-model="group.desc" maxlength="255" placeholder="简介，1～255个字符之间" type="textarea" rows="4"
                        resize="none" @keydown.enter.native="onSaveGroup" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div class="actions">
                <el-button icon="el-icon-close" @click="onClose">取 消</el-button>
                <el-button icon="el-icon-check" type="primary" :loading="saveLoading" @click="onSaveGroup">保 存</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import BaseModal from '@/common/mixins/base-modal';

    export default {
        name: 'c-library-doc-content-group-modal',
        mixins: [BaseModal],
        props: {
            // 文档库id
            libraryId: {
                type: Number,
                require: true
            },
            // 文档分组id
            groupId: {
                type: Number,
                require: true
            },
            // 文档分组上级id
            parentId: {
                type: Number,
                require: true
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.initGroupInfo();
                }
            }
        },
        computed: {
            // 模态框标题
            title() {
                return this.group.id > 0 ? '修改文档分组' : '新增文档分组';
            }
        },
        data() {
            return {
                group: {
                    id: 0,
                    library_id: 0,
                    name: '',
                    desc: '',
                    pid: 0
                },
                isUpdated: false,
                saveLoading: false
            };
        },
        methods: {
            // 初始化分组信息
            initGroupInfo() {
                this.group.id = this.groupId;
                this.group.pid = this.parentId;
                this.group.library_id = this.libraryId;
                this.isUpdated = false; // 标识没有内容更新
                this.resetGroupInfo();

                if (this.group.id > 0) {
                    this.loadingModal = true;
                    this.getGroupInfo();
                }
            },
            // 获取分组信息
            async getGroupInfo() {
                const reqData = { doc_group_id: this.group.id, library_id: this.group.library_id };
                await this.$api.LibraryDocGroupInfo(reqData, {
                    loading: status => {
                        this.loadingModal = status;
                    }
                }).then(({ resData }) => {
                    this.group = { ...this.group, ...resData };
                }).catch(() => {
                    this.onClose();
                });
            },
            // 重置分组信息
            resetGroupInfo() {
                this.group = {
                    ...this.group,
                    name: '',
                    desc: ''
                };
            },
            // 保存分组
            async saveGroup() {
                const axiosLibraryDocGroupUpSert = this.group.id > 0 ? this.$api.LibraryDocGroupModify : this.$api.LibraryDocGroupCreate;
                const reqData = { ...this.group, doc_group_id: this.group.id };
                await axiosLibraryDocGroupUpSert(reqData, {
                    loading: status => {
                        this.saveLoading = status;
                    }
                }).then(({ resData }) => {
                    this.isUpdated = true;
                    this.onClose();
                });
            },
            // 事件：保存分组
            onSaveGroup() {
                this.saveGroup();
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
