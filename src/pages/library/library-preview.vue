<template>
    <el-card class="page-library-preview layout-wrapper" :class="bodyClass" v-loading.body="libraryPreviewEventBus.loading">
        <div class="layout-body" v-show="pageFirstInited">
            <div v-if="isAccessed" class="layout-body-inner">
                <!-- left：目录、菜单栏 -->
                <div class="layout-side">
                    <!-- left-header：文档库信息、目录搜索区 -->
                    <div class="layout-side__header">
                        <div class="library-info">
                            <span class="library-info__name" :title="libraryInfoTip" @click="onShareInfoView"> 123 </span>
                        </div>
                    </div>

                    <!-- left-body：目录区 -->
                    <div class="layout-side__body">
                        <c-library-preview-tree />
                    </div>

                    <!-- left-footer：目录功能操作区 -->
                    <div class="layout-side__footer">
                        <c-library-preview-tree-tools />
                    </div>
                </div>

                <!-- mid：面板收缩操作区 -->
                <div class="layout-side-action">
                    <i class="el-icon-d-arrow-right" @click="onChangeSide"></i>
                </div>

                <!-- right：视图区 -->
                <div class="layout-main">
                    <c-library-preview-view />
                </div>

                <!-- 侧边面板 -->
                <div class="layout-drawer">
                    <c-library-preview-drawer />
                </div>
            </div>
            <div v-else>
                <c-library-preview-protected />
            </div>
        </div>
    </el-card>
</template>

<script>
    import { mapState } from 'vuex';
    import BasePage from '@/common/mixins/base-page';
    import libraryPreviewEventBus from '@/extends/utils/library-preview-event-bus';
    import ResponseCode from '@/common/constants/response-code';
    import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';

    export default {
        name: 'page-library-preview',
        mixins: [BasePage],
        components: {
            'c-library-preview-protected': () => import('@/components/library/preview/c-library-preview-protected'),
            'c-library-preview-view': () => import('@/components/library/preview/c-library-preview-view'),
            'c-library-preview-tree': () => import('@/components/library/preview/c-library-preview-tree'),
            'c-library-preview-tree-tools': () => import('@/components/library/preview/c-library-preview-tree-tools'),
            'c-library-preview-drawer': () => import('@/components/library/preview/c-library-preview-drawer')
        },
        provide() {
            return { libraryPreviewEventBus: this.libraryPreviewEventBus };
        },
        computed: {
            ...mapState('libraryPreview', ['libraryShareInfo', 'isAccessed', 'isShareSimplify']),
            libraryInfoTip() {
                return '';
            },
            bodyClass() {
                return {
                    'side-open': this.sideStatus,
                    'side-close': !this.sideStatus,
                    'simplify': this.isShareSimplify
                };
            }
        },
        watch: {
            isShareSimplify(val) {
                if (val) {
                    this.sideStatus = false;
                }
            },
            isAccessed: {
                async handler(val) {
                    if (val) {
                        this.$utils.SetDocummentTitle(this.libraryShareInfo.share_name);
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                libraryPreviewEventBus,
                sideStatus: true
            };
        },
        async created() {
            this.libraryPreviewEventBus.loading = true;

            const shareCode = this.$utils.Input('code/s', '');
            if (!shareCode) {
                await this.$utils.Error('参数错误，缺少必需参数');
            }

            // 从本地缓存中获取历史密码
            const accessPasswordCollection = DataStore.getItem(STORE_KEYS.SHARE_ACCESS_PASSWORD, {});
            const accessPassword = accessPasswordCollection[shareCode] || '';

            // 初始化文档库分享信息
            await this.initLibraryShareInfo(shareCode, accessPassword);

            this.libraryPreviewEventBus.loading = false;
            this.pageFirstInited = true;
        },
        beforeDestroy() {
            this.libraryPreviewEventBus.destroy();
        },
        methods: {
            // 初始化文档库分享信息
            async initLibraryShareInfo(shareCode, accessPassword = '') {
                const reqData = { share_code: shareCode, share_access_password: accessPassword };

                await this.$api.v1.LibraryShareInfo(reqData, { report: true }).then(({ resData }) => {
                    this.$store.commit('libraryPreview/setLibraryShareInfo', { libraryShareInfo: resData, isAccessed: true, accessPassword });
                }).catch(async ({ resMsg = '未知错误', resCode, resData }) => {
                    // 密码错误时，询问输入密码
                    if (resCode === ResponseCode.LIRARY_SHARE_PROTECTED) {
                        this.$store.commit('libraryPreview/setLibraryShareInfo', { libraryShareInfo: resData, isAccessed: false });
                    } else {
                        await this.$utils.Error(resMsg);
                    }
                });
            },
            // 事件：改变侧边栏状态
            onChangeSide() {
                this.sideStatus = !this.sideStatus;
            },
            // 事件：查看当前分享源信息
            onShareInfoView() {
                this.libraryPreviewEventBus.$emit('share-info-view');
            }
        }
    };
</script>

<style lang="scss">
    .page-library-preview {
        & {
            box-shadow: initial !important;
            border: 0 !important;
            background-color: $--color-background !important;
            position: absolute;
            top: 0;
            left: 0;
        }
        & > .el-card__body {
            padding: 0;
            height: calc(100vh - 30px);
        }

        &.side-close {
            .layout-side-action i {
                transform: rotateY(0deg);
                margin-left: -46px;
            }
            .layout-body-inner {
                padding-left: 40px !important;
            }
            .layout-main {
                width: calc(100vw - 90px) !important;
            }
            .library-info,
            .c-library-preview-tree {
                opacity: 0;
            }
            .layout-side {
                width: 40px !important;
            }
            .layout-side__footer {
                width: 0 !important;
                padding: 0 8px;
                margin-left: -8px;
                i {
                    margin-top: 9px;
                    margin-bottom: 0px;
                }
            }
        }
        .el-tree {
            background: $--color-background;
        }
    }
</style>

<style lang="scss" scoped>
    .simplify {
        .layout-side__body,
        .layout-side-action {
            display: none;
        }
    }
    .page-library-preview {
        overflow: hidden;
        max-width: none !important;
    }

    .layout-wrapper {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: relative;
        z-index: 0;
    }

    .layout-body {
        height: 100%;

        .layout-body-inner {
            position: relative;
            padding: 0 0 0 290px;
            height: 100%;
            transition: padding 0.2s;
        }

        .layout-side {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 270px;
            transition: width 0.1s;
        }

        .layout-side__footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 290px;
        }

        .layout-main {
            height: calc(100vh - 20px);
            min-height: calc(100vh - 20px);
            padding: 10px 15px;
            background: #fff;
            position: fixed;
            right: 0;
            top: 0;
            width: calc(100vw - 335px);
            transition: width 0.1s;
        }
    }

    .layout-side-action i {
        position: absolute;
        top: 40vh;
        margin-left: -35px;
        color: $--color-primary-light-1;
        transition: all 0.2s;
        font-size: 17px;
        opacity: 0.4;
        cursor: pointer;
        padding: 10px;
        transform: rotateY(180deg);

        &:hover {
            opacity: 1;
        }
    }

    .library-info {
        transition: margin 0.2s;
        margin: 5px 5px 20px 5px;
        color: $--color-primary-light-2;
        cursor: pointer;

        &__name {
            transition: width 0.5s;
            width: auto;
            max-width: 260px;
            font-size: 24px;
            line-height: 32px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            margin-right: 5px;
        }
    }
</style>