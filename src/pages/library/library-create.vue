<template>
    <div class="page-library-create" v-loading="pageLoading">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span class="title">创建文档库</span>
            </div>
            <div class="form-body">
                <!-- 文档库基本信息 -->
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

                <!-- 文档库封面 -->
                <div class="library-cover">
                    <el-upload class="library-cover__upload" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :http-request="handlerLibraryCoverUpload">
                        <img v-if="library.cover" :src="library.cover" class="avatar">
                        <i v-else class="el-icon-plus library-cover__upload-icon"></i>
                    </el-upload>
                    <div class="library-cover__operate">
                        <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onRandomImage"
                            :loading="libraryCoverLoading" plain>随机生成封面
                        </el-button>
                    </div>
                </div>
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
                    desc: '',
                    cover: ''
                },
                libraryGroups: [],
                submitLoading: false,
                groupModal: {
                    visible: false,
                    groupId: 0
                },
                libraryCoverLoading: false
            };
        },
        async created() {
            this.pageLoading = true;
            await this.initLibraryGroups();
            this.onRandomImage();
            this.pageLoading = false;
        },
        methods: {
            // 初始化文档库分组
            async initLibraryGroups() {
                let libraryGroups = [];
                await this.$api.v1.LibraryGroupCollection().then(({ resData }) => {
                    libraryGroups = resData;
                });
                this.libraryGroups = libraryGroups;
            },
            // 提交创建文档库
            async submitCreateLibrary() {
                await this.checkValidate('library');

                await this.$api.v1.LibraryCreate(this.library, {
                    loading: status => { this.submitLoading = status; }
                }).then(({ resMsg }) => {
                    this.$notify.success({ title: '创建文档库', message: this.library.name });
                    this.$link.home();
                });
            },
            // 处理文档库封面上传
            handlerLibraryCoverUpload({ file }) {
                const params = new FormData();
                params.append('file', file);
                this.$api.v1.ToolsImageUpload(params, {
                    loading: (status) => { this.libraryCoverLoading = status; },
                    report: true
                }).then(({ resData }) => {
                    this.library.cover = resData.url;
                }).catch(({ resMsg }) => {
                    this.$utils.tip('上传失败：' + resMsg);
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
            },
            // 事件：随机生成图片
            onRandomImage() {
                this.$api.v1.ToolsImageRandomTmp({ key: this.library.name }, {
                    loading: (status) => { this.libraryCoverLoading = status; }
                }).then(({ resData }) => {
                    this.library.cover = resData.url;
                });
            }
        }
    };
</script>

<style lang="scss">
    .page-library-create {
        .library-cover {
            width: 250px;
            margin-right: 20px;
            text-align: right;

            &__upload .el-upload {
                border: 1px solid $--color-primary-light-8;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            &__upload .el-upload:hover {
                border-color: $--color-primary-light-5;
            }
            &__upload-icon {
                font-size: 28px;
                color: #8c939d;
                width: 160px;
                height: 160px;
                line-height: 140px;
                text-align: center;
            }

            .avatar {
                width: 140px;
                height: 140px;
                display: block;
                padding: 10px;
            }

            &__operate {
                text-align: right;
                margin-top: 10px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .title {
        margin-left: 10px;
    }

    .form-body {
        display: flex;
        justify-content: space-between;
        .el-form {
            width: 870px;
        }
    }

    .create-library-group {
        margin-left: 5px;
    }
</style>
