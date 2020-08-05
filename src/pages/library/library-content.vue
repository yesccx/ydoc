<template>
    <el-card class="page-library-content layout-wrapper" :class="sideStatus ? 'side-open' : 'side-close'"
        v-loading.body="libraryManagerLoading">
        <div class="layout-body">
            <div class="layout-body-inner">
                <!-- left：目录、菜单栏 -->
                <div class="layout-side">
                    <!-- left-header：文档库信息、目录搜索区 -->
                    <div class="layout-side__header">
                        <div class="library-info">
                            <span class="library-info__name" :title="libraryInfoTip"> {{ libraryInfo.name }} </span>
                        </div>
                    </div>

                    <!-- left-body：目录区 -->
                    <div class="layout-side__body">
                        <c-library-content-tree />
                    </div>

                    <!-- left-footer：目录功能操作区 -->
                    <div class="layout-side__footer">
                        <c-library-content-tree-tools />
                    </div>
                </div>

                <!-- mid：面板收缩操作区 -->
                <div class="layout-side-action">
                    <i class="el-icon-d-arrow-right" @click="onChangeSide"></i>
                </div>

                <!-- right：编辑区 -->
                <div class="layout-main">
                    <c-library-content-editor :class="libraryViewStyle" />
                </div>

                <!-- 侧边面板 -->
                <div class="layout-drawer">
                    <c-library-content-drawer />
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import LibraryManager from '@/extends/mixins/library-manager';
    import libraryContentEventBus from '@/extends/utils/library-content-event-bus';
    import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';

    export default {
        name: 'page-library-content',
        mixins: [BasePage, LibraryManager],
        components: {
            'c-library-content-editor': () => import('@/components/library/content/c-library-content-editor'),
            'c-library-content-tree': () => import('@/components/library/content/c-library-content-tree'),
            'c-library-content-tree-tools': () => import('@/components/library/content/c-library-content-tree-tools'),
            'c-library-content-drawer': () => import('@/components/library/content/c-library-content-drawer')
        },
        provide() {
            return { libraryContentEventBus };
        },
        computed: {
            libraryInfoTip() {
                return this.libraryInfo.name;
            },
            // 文档库视图风格（根据偏好设置中的library_default_style）
            libraryViewStyle() {
                if (!this.libraryMemberPreference.config || !this.libraryMemberPreference.config.library_default_style) {
                    return '';
                }
                return 'library-view-style--' + this.libraryMemberPreference.config.library_default_style;
            }
        },
        data() {
            return {
                sideStatus: true
            };
        },
        async created() {
            // 还原侧边栏收缩状态
            this.sideStatus = DataStore.getItem(STORE_KEYS.LIBRARY_CONTENT_SIDE_STATUS, true);

            const libraryId = this.$utils.Input('library_id/d', 0);
            if (libraryId <= 0) {
                await this.$utils.Error('参数错误，缺少必需参数');
            }

            // 初始化文档库管理信息
            await this.initLibraryManagerInfo(libraryId);

            // 通知子组件初始化
            libraryContentEventBus.$emit('library-content-init');

            // 重新打开历史编辑的文档（仅最后一个）
            const hashDocId = this.$route.query.doc_id || 0;
            hashDocId && libraryContentEventBus.$emit('doc-will-modify', hashDocId);
        },
        beforeDestroy() {
            libraryContentEventBus.destroy();
        },
        methods: {
            // 初始化文档库管理信息
            async initLibraryManagerInfo(libraryId) {
                let libraryManagerInfo = false;
                await this.$api.v1.LibraryManagerInfo({ library_id: libraryId }, {
                    loading: (status) => { this.$fullLoading.status = status; },
                    report: true
                }).then(({ resData }) => {
                    libraryManagerInfo = resData;
                }).catch(async ({ resMsg = '未知错误' }) => {
                    await this.$utils.Error(resMsg);
                });

                // 获取文档库偏好设置相关
                let libraryMemberPreference = {};
                await this.$api.v1.LibraryMemberLibraryPreference({ library_id: libraryId }).then(({ resData }) => {
                    libraryMemberPreference = resData;
                });
                libraryManagerInfo.libraryMemberPreference = libraryMemberPreference;

                this.$store.commit('libraryManager/setLibraryManagerInfo', libraryManagerInfo);

                this.$utils.SetDocummentTitle(libraryManagerInfo.libraryInfo.name);

                return libraryManagerInfo;
            },
            // 事件：改变侧边栏状态
            onChangeSide() {
                this.sideStatus = !this.sideStatus;
                DataStore.setItem(STORE_KEYS.LIBRARY_CONTENT_SIDE_STATUS, this.sideStatus);
            }
        }
    };
</script>

<style lang="scss">
    .page-library-content {
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
            .c-library-content-tree {
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
    .page-library-content {
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
            z-index: 0;
        }

        .layout-side__footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 270px;
        }

        .layout-main {
            height: calc(100vh - 20px);
            min-height: calc(100vh - 20px);
            padding: 10px 15px;
            background: #fff;
            position: fixed;
            min-width: 650px;
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