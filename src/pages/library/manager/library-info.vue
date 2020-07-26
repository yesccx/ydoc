<!-- 文档库管理-文档库信息 -->
<template>
    <div class="page-library-info" v-loading="pageLoading">
        <div class="form-body">
            <el-form ref="library" label-position="top" :model="library" :show-message="false">
                <el-form-item label="文档库名称" prop="name" required>
                    <el-input v-model="library.name" placeholder="请输入文档库名称，3~32个字符" maxlength="32" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="文档库简介" prop="desc">
                    <el-input type="textarea" resize="none" rows="4" maxlength="255" placeholder="文档库简介，用于介绍文档库的基本信息，字数在255个字符之内"
                        v-model="library.desc" show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-circle-check" @click="onLibraryModify"
                        :loading="modifyLibraryLoading">保存信息
                    </el-button>
                </el-form-item>

                <!-- 封面 -->
                <div class="library-cover">
                    <span class="library-cover__lable">文档库封面</span>
                    <el-upload class="library-cover__upload" action="" :show-file-list="false"
                        :http-request="handlerLibraryCoverUpload">
                        <el-image :src="library.cover" class="avatar">
                            <div slot="error" class="image-slot__error">
                                ydoc
                            </div>
                        </el-image>
                    </el-upload>
                    <div class="library-cover__operate">
                        <el-button size="mini" type="primary" icon="el-icon-refresh" @click="onRandomImage"
                            :loading="libraryCoverLoading" plain>随机生成封面
                        </el-button>
                    </div>
                </div>
            </el-form>

            <el-divider></el-divider>

            <el-form ref="library" label-position="top">
                <el-form-item label="文档库分组" prop="group">
                    <span class="form-title-tip">该设置仅对自已有效，不会影响组内成员的设置</span>
                    <el-select v-model="libraryGroup" placeholder="请选择文档库分组" clearable>
                        <el-option v-for="group in libraryGroups" :key="group.id" :label="group.name" :value="group.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" type="primary" @click="onLibraryMemberLibrarySort"
                        :loading="modifyLibraryGroupLoading">更新分组
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import LibraryManager from '@/extends/mixins/library-manager';

    export default {
        name: 'page-library-info',
        mixins: [BasePage, LibraryManager],
        data() {
            return {
                library: {
                    name: '',
                    desc: '',
                    cover: ''
                },
                libraryGroup: 0,
                libraryGroups: [],
                modifyLibraryLoading: false,
                modifyLibraryGroupLoading: false,
                libraryCoverLoading: false
            };
        },
        watch: {
            libraryInfo: {
                handler(info) {
                    this.library = this.$utils.CloneDeep(info);
                },
                immediate: true,
                deep: true
            },
            libraryMember: {
                handler(info) {
                    this.libraryGroup = info.group_id || '';
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            // 模块初始化
            async moduleInitialize() {
                await this.initLibraryGroups();
            },
            // 初始化获取所有文档库分组
            async initLibraryGroups() {
                let libraryGroups = [];
                await this.$api.v1.LibraryGroupCollection().then(({ resData }) => {
                    libraryGroups = resData;
                });

                this.libraryGroups = libraryGroups;

                // 初始化文档库分组时，需要判断当前文档库的分组是否还存在
                const libraryGroupIds = libraryGroups.map((group) => group.id);
                if (!this.libraryGroup || libraryGroupIds.indexOf(this.libraryGroup) < 0) {
                    this.libraryGroup = '';
                }
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
            // 事件：文档库修改
            async onLibraryModify() {
                const reqData = { library_id: this.library.id, ...this.library };
                await this.$api.v1.LibraryModify(reqData, {
                    loading: (status) => { this.modifyLibraryLoading = status; }
                }).then(() => {
                    this.$tip.success('修改成功');
                });
            },
            // 事件：文档库成员的文档库排序
            async onLibraryMemberLibrarySort() {
                await this.$api.v1.LibraryMemberLibrarySort({ library_id: this.library.id, library_group_id: this.libraryGroup }, {
                    loading: (status) => { this.modifyLibraryGroupLoading = status; }
                }).then(() => {
                    this.$tip.success('更新成功');
                });
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
    .page-library-info {
        position: relative;
        .library-cover {
            width: 200px;
            text-align: right;
            position: absolute;
            right: 0;
            top: 0;

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
                width: 140px;
                height: 140px;
                line-height: 188px;
                text-align: center;
            }

            .avatar {
                width: 140px;
                height: 140px;
                display: block;
                padding: 10px;
            }

            &__lable {
                font-size: 14px;
                color: rgb(96, 98, 102);
                font-weight: bold;
                bottom: 20px;
                text-align: left;
                display: inline-block;
                width: 160px;
                margin-bottom: 16px;
            }

            &__operate {
                text-align: right;
                margin-top: 10px;
            }
        }

        .image-slot__error {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: #c0c4cc;
            vertical-align: middle;
            width: 100%;
            height: 100%;
            background: #f5f7fa;
        }
    }
</style>

<style lang="scss" scoped>
    .title {
        margin-left: 10px;
    }
    .form-body {
        max-width: 700px;
    }
    .form-title-tip {
        color: $--color-primary-light-7;
        display: block;
        font-size: 12px;
        margin-top: -5px;
        margin-bottom: 15px;
        margin-left: 2px;
        padding: 0px;
        line-height: 12px;
    }
</style>
