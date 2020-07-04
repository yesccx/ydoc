<template>
    <div class="c-library-doc-view" v-loading="docLoading" element-loading-text="内容加载中，稍等片刻～">
        <div class="main">
            <h1 class="title">{{ doc.title }}</h1>
            <div class="content" v-html="doc.content"> </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c-library-doc-view',
        data() {
            return {
                libraryId: 0,
                docId: 0,
                doc: {
                    title: '',
                    content: ''
                },
                docLoading: false
            };
        },
        methods: {
            // 查看文档库详情
            view(libraryId, docId) {
                this.libraryId = libraryId;
                this.docId = docId;
                this.getDocInfo();
            },
            // 取消查看文档库详情
            unView() {
                this.libraryId = 0;
                this.docId = 0;
                this.doc = {};
            },
            // 获取文档信息
            async getDocInfo() {
                const reqData = { library_id: this.libraryId, library_doc_id: this.docId };
                await this.$api.v1.LibraryDocInfo(reqData, {
                    loading: status => {
                        this.docLoading = status;
                    }
                }).then(({ resData }) => {
                    this.doc = { ...this.doc, ...resData };
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .main {
        margin: 0 auto;
        padding: 10px;
        word-break: break-all;
    }
    .title {
        margin-top: 0;
    }
</style>