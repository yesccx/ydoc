<template>
    <div class="c-library-preview-view" v-loading="viewLoading" element-loading-text="内容加载中...">
        <el-scrollbar v-if="isView" class="scrollbar">
            <div ref="view" class="layout-editor" :is="layout" :doc-info="docInfo" @inited="onInited"></div>

            <div class="view-operation">
                <el-button title="刷新" :loading="viewLoading" class="refresh-btn" type="text" icon="el-icon-refresh"
                    @click="onRefresh">
                </el-button>
            </div>

        </el-scrollbar>
        <!-- 欢迎页 -->
        <c-library-preview-welcome v-else />
    </div>
</template>

<script>
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';
    import EditorCode from '@/common/constants/editor-code';

    export default {
        name: 'c-library-preview-view',
        components: {
            'c-library-editor-markdown-view': () => import('@/components/library/editor/view/c-library-editor-markdown-view'),
            'c-library-editor-html-view': () => import('@/components/library/editor/view/c-library-editor-html-view'),
            'c-library-editor-text-view': () => import('@/components/library/editor/view/c-library-editor-text-view'),
            'c-library-preview-welcome': () => import('@/components/library/preview/c-library-preview-welcome')
        },
        mixins: [LibraryPreviewBase],
        watch: {
            layout() {
                this.viewLoading = true;
            }
        },
        computed: {
            docId() {
                return this.docInfo.id || 0;
            },
            isView() {
                return this.docId > 0;
            },
            layout() {
                return 'c-library-editor-' + (this.docInfo.editor || EditorCode.EDITOR_DEFAULT) + '-view';
            }
        },
        data() {
            return {
                docInfo: {
                    id: 0,
                    title: '',
                    content: '',
                    editor: ''
                },
                viewLoading: false
            };
        },
        created() {
            if (this.isShareSimplify) {
                this.fetchDocInfo(this.libraryShareInfo.doc_id);
            } else {
                const hash = this.$route.hash.slice(1);
                const hashParams = hash.match(/^(doc|group)-(\d+)$/);
                if (hashParams && hashParams[1] === 'doc') {
                    this.fetchDocInfo(hashParams[2]);
                }
            }
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档树刷新
                bus.$on('doc-view', (docId) => {
                    this.fetchDocInfo(docId);
                });
            },
            // 获取文档信息
            async fetchDocInfo(docId) {
                const reqData = { ...this.shareAccessToken, doc_id: docId };
                await this.$api.v1.LibraryShareDocInfo(reqData, {
                    loading: (status) => { this.viewLoading = status; }
                }).then(({ resData }) => {
                    this.docInfo = resData;
                });
            },
            // 事件：刷新视图
            onRefresh() {
                this.libraryPreviewEventBus.$emit('doc-view', this.docInfo.id);
            },
            // 事件：内容初始化成功
            onInited() {
                this.viewLoading = false;
            }
        }
    };
</script>

<style lang="scss">
    .c-library-preview-view {
        .refresh-btn {
            font-size: 35px;
            color: $--color-primary-light-4;
            i {
                font-weight: normal !important;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .view-operation {
        position: absolute;
        right: 10px;
        bottom: 10px;
        opacity: 0.4;
        transition: opacity 0.3s;
        &:hover {
            opacity: 1;
        }
    }

    .scrollbar {
        height: calc(100vh - 50px);
    }

    .c-library-preview-view {
        padding: 20px;
    }
</style>