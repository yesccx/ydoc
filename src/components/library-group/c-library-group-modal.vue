<!-- 文档库分组编辑 Modal -->
<template>
    <el-dialog class="c-library-doc-modal" :title="title" :visible.sync="visibleModal" :before-close="handleClose" width="450px"
        append-to-body>
        <div v-loading="loadingModal">
            <el-form :model="group" label-width="40px" size="mini">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="group.name" maxlength="32" placeholder="分组名称，1～32个字符之间" autocomplete="off" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="简介" prop="desc">
                    <el-input v-model="group.desc" maxlength="255" placeholder="简介，1～255个字符之间" type="textarea" rows="4"
                        resize="none" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="group.sort" :step="1000"></el-input-number>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button icon="el-icon-close" @click="onClose">取 消</el-button>
                <el-button icon="el-icon-check" type="primary" :loading="saveLoading" @click="onSaveGroup">保 存</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import BaseModal from '@/common/mixins/base-modal';

    export default {
        name: 'c-library-doc-modal',
        mixins: [BaseModal],
        props: {
            // 分组id
            groupId: { type: Number, require: true }
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
                return this.group.id > 0 ? '修改分组' : '新增分组';
            }
        },
        data() {
            return {
                group: {
                    id: 0,
                    name: '',
                    desc: '',
                    sort: -1
                },
                isUpdated: false,
                saveLoading: false
            };
        },
        methods: {
            // 初始化分组信息
            async initGroupInfo() {
                this.resetGroupInfo();
                this.group.id = this.groupId;
                this.isUpdated = false; // 默认标识没有内容更新

                if (this.group.id > 0) {
                    this.loadingModal = true;
                    this.group = await this.getGroupInfo();
                }
            },
            // 获取分组信息
            async getGroupInfo() {
                let groupInfo = this.$utils.CloneDeep(this.groupInfo);
                await this.$api.v1.LibraryGroupInfo({ library_group_id: this.groupId }, {
                    loading: status => { this.loadingModal = status; },
                    report: true
                }).then(({ resData }) => {
                    groupInfo = { ...groupInfo, ...resData };
                }).catch(({ resMsg }) => {
                    this.$tip.error(resMsg);
                    this.onClose();
                });

                return groupInfo;
            },
            // 重置分组信息
            resetGroupInfo() {
                this.group = { id: 0, name: '', desc: '', sort: -1 };
            },
            // 保存分组
            async saveGroup() {
                const axiosLibraryDocGroupUpsert = this.group.id > 0 ? this.$api.v1.LibraryGroupModify : this.$api.v1.LibraryGroupCreate;
                const groupInfo = { library_group_id: this.group.id, name: this.group.name, desc: this.group.desc, sort: this.group.sort };
                await axiosLibraryDocGroupUpsert(groupInfo, {
                    loading(status) { this.saveLoading = status; }
                }).then(({ resData }) => {
                    this.$tip.success('保存成功');
                    this.isUpdated = true;
                    this.$emit('group-save-success');
                    this.onClose();
                });
            },
            // 处理是否允许关闭
            handleClose(done) {
                if (this.saveLoading) {
                    this.$notify.warning({ title: '无法关闭', message: '正在保存中，请稍后' });
                } else {
                    done();
                }
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .footer {
        text-align: right;
    }
</style>
