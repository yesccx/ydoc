<template>
    <div class="page-library-doc-modify">
        <el-card class="library-doc-menu-header">
            <el-form :inline="true" :model="doc">
                <el-form-item label="标题">
                    <el-input v-model="doc.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="分组">
                    <el-cascader v-model="doc.group_id" :options="groupTree" :show-all-levels="false" :props=" groupTreeProps"
                        placeholder="搜索分类" clearable>
                    </el-cascader>
                </el-form-item>

                <!-- 文档编辑的功能操作区 -->
                <el-form-item class="fr">
                    <el-button-group>
                        <el-button type="success" icon="el-icon-time" plain>
                            <span>历史</span>
                        </el-button>
                        <el-button type="success" icon="el-icon-document" plain>
                            <span>模板</span>
                        </el-button>
                    </el-button-group>

                    <el-button-group>
                        <el-button type="primary" icon="el-icon-document" plain>另存为模板</el-button>
                        <el-button type="primary" icon="el-icon-circle-check" plain @click="onSaveDoc">保存</el-button>
                    </el-button-group>

                    <el-button type="danger" icon="el-icon-back" @click="onBack" plain>返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="library-doc-menu-body">
        </el-card>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import { RouterLinkBack } from '@/common/router-links';

    export default {
        name: 'page-library-doc-modify',
        mixins: [BasePage],
        components: {
        },
        data() {
            return {
                initFinal: false,
                doc: {
                    id: 0,
                    library_id: 0,
                    title: '',
                    content: '',
                    group_id: 0
                },
                groupTree: [],
                groupTreeProps: { value: 'id', label: 'name', checkStrictly: true, multiple: false, emitPath: false }
            };
        },
        async created() {
            const libraryId = this.$utils.Input('library_id/d', 0);
            const docId = this.$utils.Input('doc_id/d', 0);
            const groupId = this.$utils.Input('group_id/d', 0);
            if (libraryId <= 0) {
                await this.$utils.Error('参数错误，缺少必需参数');
            }

            await this.docInit(libraryId, docId, groupId);
        },
        methods: {
            // 初始化文档
            async docInit(libraryId, docId, groupId) {
                this.doc.id = docId;
                this.doc.library_id = libraryId;
                this.doc.group_id = groupId;

                if (this.doc.id > 0) {
                    await this.getDocInfo();
                }
                await this.getDocGroupTree();
                this.initFinal = true;
            },
            // 事件：保存文档
            onSaveDoc() {
                this.saveDoc();
            },
            async saveDoc() {
                const reqData = this.doc;
                const axiosLibraryDocUpsert = reqData.id > 0 ? this.$api.LibraryDocModify : this.$api.LibraryDocCreate;
                reqData.doc_id = reqData.id;
                await axiosLibraryDocUpsert(reqData).then(({ resMsg }) => {
                    this.$tip.success(resMsg);
                });
            },
            // 获取文档分组树
            async getDocGroupTree() {
                const reqData = { library_id: this.doc.library_id };
                await this.$api.LibraryDocGroupTree(reqData).then(({ resData }) => {
                    this.groupTree = resData;
                });
            },
            // 获取文档信息
            async getDocInfo() {
                const reqData = { library_id: this.doc.library_id, doc_id: this.doc.id };
                await this.$api.LibraryDocInfo(reqData).then(({ resData }) => {
                    this.doc = { ...this.doc, ...resData };
                });
            },
            // 事件： 返回上一页
            onBack() {
                RouterLinkBack();
            }
        }
    };
</script>

<style lang="scss">
    .page-library-doc-modify {
        max-width: 100%;
        .library-doc-menu-header {
            .el-form-item {
                margin-bottom: 0;
            }

            .el-button-group {
                margin-right: 5px;
            }
        }
    }
</style>

<style lang="scss">
    .library-doc-menu-body {
        margin-top: 15px;
        height: calc(100vh - 121px);
    }
</style>