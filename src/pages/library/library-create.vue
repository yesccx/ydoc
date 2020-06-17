<template>
    <div class="page-library-create" v-loading="pageLoading">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span class="title">创建文档库</span>
            </div>
            <div class="form-body">
                <el-form ref="library" :model="library" :rules="libraryRuels" label-position="right" label-width="80px"
                    @submit.native.prevent>
                    <el-form-item label="库名称" prop="name">
                        <el-input v-model="library.name" placeholder="请输入文档库名称，3~32个字符" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="库分组" prop="group">
                        <el-select v-model="library.group_id" placeholder="请选择文档库分组" clearable>
                            <el-option v-for="libraryGroup in libraryGroups" :key="libraryGroup.id" :label="libraryGroup.name"
                                :value="libraryGroup.id">
                            </el-option>
                        </el-select>
                        <el-button @click="onCreateLibraryGroup" class="create-library-group" icon="el-icon-plus" plain>
                            新增分组
                        </el-button>
                    </el-form-item>
                    <el-form-item label="库简介" prop="desc">
                        <el-input v-model="library.desc" type="textarea" resize="none" rows="4"
                            placeholder="文档库简介，用于介绍文档库的基本信息，字数在255个字符之内"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onCreateLibrary" :loading="submitLoading">立即创建</el-button>
                        <el-button type="danger" @click="onResetLibrary">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <!-- 文档库分组创建Modal -->
        <c-library-group-modal :visible.sync="groupModal.visible" :group-id="groupModal.groupId"
            @group-save-success="onLibraryGroupSaveSuccess" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-library-create',
        mixins: [BasePage],
        components: {
            'c-library-group-modal': () => import('@/components/library-group/c-library-group-modal')
        },
        data() {
            return {
                libraryRuels: {
                    name: [{ required: true, message: '请输入文档库名称', trigger: 'blur' }]
                },
                library: {
                    name: '',
                    group_id: '',
                    desc: ''
                },
                libraryGroups: [],
                submitLoading: false,
                groupModal: {
                    visible: false,
                    groupId: 0
                }
            };
        },
        async created() {
            this.pageLoading = true;
            await this.initLibraryGroups();
            this.pageLoading = false;
        },
        methods: {
            // 初始化文档库分组
            async initLibraryGroups() {
                let libraryGroups = [];
                await this.$api.LibraryGroupAll().then(({ resData }) => {
                    libraryGroups = resData;
                });
                this.libraryGroups = libraryGroups;
            },
            // 提交创建文档库
            async submitCreateLibrary() {
                await this.checkValidate('library');
                await this.$api.LibraryCreate(this.library, {
                    loading: status => { this.submitLoading = status; }
                }).then(({ resMsg }) => {
                    this.$tip.success(resMsg);
                    this.$link.home();
                });
            },
            // 事件：创建文档库分组
            onCreateLibraryGroup() {
                this.groupModal.visible = true;
            },
            // 事件：创建文档库
            onCreateLibrary() {
                this.submitCreateLibrary();
            },
            // 事件：重置文档库信息
            onResetLibrary() {
                this.resetValidate('library');
            },
            // 事件：文档库分组保存成功
            onLibraryGroupSaveSuccess() {
                this.initLibraryGroups();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .title {
        margin-left: 10px;
    }
    .form-body {
        max-width: 700px;
    }
    .create-library-group {
        margin-left: 5px;
    }
</style>
