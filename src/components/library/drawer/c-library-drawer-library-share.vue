<template>
    <div class="c-library-drawer-library-share">
        <el-drawer :title="title" :visible.sync="visibleDrawer" custom-class="content-drawer" size="400px"
            :modal-append-to-body="false">
            <div v-loading="loading">
                <el-scrollbar class="scrollbar">
                    <div class="content-drawer__content">
                        <el-form :model="shareInfo" label-position="top">
                            <el-form-item label="分享名称">
                                <el-input v-model="shareInfo.share_name" maxlength="32" placeholder="请输入分享名称" autocomplete="off"
                                    clearable show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span slot="label">
                                    <el-tooltip class="item" effect="dark" content="定义一个好记的分享码，为空时将随机生成！" placement="top-start">
                                        <span>个性化分享码 <i class="el-icon-warning"></i></span>
                                    </el-tooltip>
                                </span>
                                <el-input v-model="shareInfo.share_code" minlength="3" maxlength="32"
                                    placeholder="请输入个性化分享码，长度在3～32位" autocomplete="off" clearable show-word-limit></el-input>
                            </el-form-item>

                            <!--  more-options -->
                            <el-divider>
                                <el-button class="more-options-btn" type="text"
                                    :icon="moreOptionsOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="onMoreOptions">
                                    更多参数
                                </el-button>
                            </el-divider>

                            <el-collapse-transition>
                                <div v-show="moreOptionsOpen">
                                    <el-form-item label="访问密码">
                                        <span slot="label">
                                            <el-tooltip class="item" effect="dark" content="不设置访问密码将公开！" placement="top-start">
                                                <span>访问密码 <i class="el-icon-warning"></i></span>
                                            </el-tooltip>
                                        </span>
                                        <el-input v-model="shareInfo.access_password" type="password" maxlength="32"
                                            placeholder="请输入访问密码，长度在3～20位" autocomplete="off" clearable show-word-limit
                                            show-password>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="有效时间">
                                        <span slot="label">
                                            <el-tooltip class="item" effect="dark" content="不设置有效时间将永久有效！" placement="top-start">
                                                <span>有效时间 <i class="el-icon-warning"></i></span>
                                            </el-tooltip>
                                        </span>
                                        <el-date-picker value-format="timestamp" class="wd100" v-model="shareInfo.expire_time"
                                            type="datetime" placeholder="选择有效时间" align="right"
                                            :picker-options="shareExpireTimeOptions">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="分享简介">
                                        <el-input v-model="shareInfo.share_desc" maxlength="255" placeholder="分享简介，1～255个字符之间"
                                            type="textarea" rows="3" resize="none" show-word-limit></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <span slot="label">
                                            <div class="custom-content-label">
                                                <el-tooltip class="item" effect="dark" content="开启后，可自定义分享内容"
                                                    placement="top-start">
                                                    <span>自定义内容 <i class="el-icon-warning"></i></span>
                                                </el-tooltip>
                                                <el-switch class="custom-content-switch" v-model="isCustomContent"> </el-switch>
                                            </div>
                                        </span>

                                        <!-- 自定义分享内容 select -->
                                        <el-scrollbar v-show="isCustomContent" class="content-select-tree-scrollbar">
                                            <c-library-content-select-tree ref="contentTree" :library-id="libraryId"
                                                :init-checked-data="shareInfo.custom_content" />
                                        </el-scrollbar>
                                    </el-form-item>
                                </div>
                            </el-collapse-transition>
                        </el-form>
                    </div>
                </el-scrollbar>

                <el-alert v-if="shareInfo.id > 0" title="修改过分享配置后，需要重新生成链接才生效！" type="info" :closable="false" show-icon>
                </el-alert>
                <el-alert v-else title="点击下方的 '生成分享' 来生成分享链接" type="warning" :closable="false" show-icon>
                </el-alert>
                <div class="content-drawer__footer">
                    <el-input class="share-url-input" :value="shareUrl" placeholder="点击下方的 '生成分享'" readonly>
                        <span slot="prepend"><i class="el-icon-share"></i> 分享地址</span>
                        <i slot="suffix" class="el-input__icon el-icon-document-copy" v-clipboard="shareUrl"></i>
                    </el-input>
                    <div class="footer-optrate">
                        <el-button v-if="shareInfo.id > 0" type="danger" @click="onShareCancel">取消分享</el-button>
                        <el-button type="primary" :loading="shareLoading" @click="onShare">
                            {{ shareInfo.id > 0 ? '重新生成分享' : '生成分享' }}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import { mapGetters } from 'vuex';
    import { buildLibraryShareLink } from '@/extends/utils/library-share-utils';

    // 分享信息初始值
    const shareInfoInitial = {
        id: 0,
        share_code: '',
        share_name: '',
        share_desc: '',
        access_password: '',
        access_count: 0,
        expire_time: '',
        custom_content: []
    };

    export default {
        name: 'c-library-drawer-library-share',
        mixins: [BaseDrawer],
        props: {
            libraryId: {
                type: Number,
                require: true
            }
        },
        computed: {
            ...mapGetters('userSession', ['userInfo']),
            title() {
                return '文档库分享';
            },
            shareUrl() {
                if (!this.shareInfo.share_code) {
                    return '';
                }
                return buildLibraryShareLink(this.shareInfo.share_code);
            }
        },
        data() {
            return {
                moreOptionsOpen: false,
                shareInfo: { ...shareInfoInitial },
                loading: false,
                shareLoading: false,
                shareExpireTimeOptions: {
                    shortcuts: [{
                        text: '在一小时内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '仅当天',
                        onClick(picker) {
                            picker.$emit('pick', new Date(new Date().toLocaleDateString()).getTime() + 3600 * 1000 * 24 - 1);
                        }
                    }, {
                        text: '在一天内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '在一周内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '在一月内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                isCustomContent: false
            };
        },
        methods: {
            // 初始化文档库分享信息
            async initShareInfo() {
                shareInfoInitial.share_name = this.generateShareName();
                this.shareInfo = { ...shareInfoInitial };
                this.isCustomContent = false;

                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryMemberLibraryShareInfo(reqData, {
                    loading: (status) => { this.loading = status; },
                    report: true
                }).then(({ resData }) => {
                    resData.expire_time = resData.expire_time ? resData.expire_time * 1000 : '';
                    resData.custom_content = resData.custom_content || [];
                    this.shareInfo = resData;

                    // 标识是否自定义了分享内容
                    this.isCustomContent = Array.isArray(resData.custom_content) && resData.custom_content.length > 0;

                    // 存在'更多参数'时，默认展开显示
                    if (resData.share_desc || resData.expire_time || resData.access_password || resData.custom_content.length > 0) {
                        this.moreOptionsOpen = true;
                    }
                }).catch(() => { });
            },
            // 构建随机的分享名称
            generateShareName() {
                return this.$utils.DateFormat(Date.now() / 1000, 'm-d H:i') + ` 来自「${this.userInfo.nickname.substr(0, 13)}」的分享`;
            },
            // 事件：drawer被展开
            onDrawerOpen() {
                this.moreOptionsOpen = false;
                this.initShareInfo();
            },
            // 事件：展开/收缩更多配置项
            onMoreOptions() {
                this.moreOptionsOpen = !this.moreOptionsOpen;
            },
            // 事件：生成分享
            async onShare() {
                const customContent = this.isCustomContent ? this.$refs.contentTree.getCheckedData() : [];
                const shareInfo = this.$utils.CloneDeep(this.shareInfo);
                shareInfo.library_id = this.libraryId;
                shareInfo.custom_content = customContent;
                shareInfo.expire_time = shareInfo.expire_time ? (shareInfo.expire_time / 1000) >> 0 : 0;

                await this.$api.v1.LibraryMemberLibraryShare(shareInfo, {
                    loading: (status) => { this.shareLoading = status; }
                }).then(({ resData }) => {
                    resData.expire_time = resData.expire_time ? resData.expire_time * 1000 : '';
                    this.shareInfo = resData;
                    this.$tip.success('生成分享成功！');
                });
            },
            // 事件：分享取消
            async onShareCancel() {
                const reqData = { library_id: this.libraryId };
                await this.$api.v1.LibraryMemberLibraryShareCancel(reqData, {
                    loading: (status) => { this.shareLoading = status; }
                }).then(({ resData }) => {
                    this.$tip.success('取消分享成功！');
                    this.visibleDrawer = false;
                });
            }
        },
        components: {
            'c-library-content-select-tree': () => import('@/components/library/content/c-library-content-select-tree')
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-library-share {
        .el-form-item__label {
            width: 100%;
        }
        .el-drawer {
            &__header {
                font-weight: bold;
            }

            &__body {
                padding: 20px;
                display: flex;
                flex-direction: column;
            }
        }

        .el-drawer .content-drawer {
            &__content {
                height: 100%;
                & form {
                    flex: 1;
                }
                label {
                    color: $--color-primary-light-4;
                    font-size: 13px;
                    font-weight: bold;
                }
            }
            &__footer .footer-optrate {
                display: flex;
                justify-content: space-between;
                button,
                span {
                    width: 100%;
                }
            }
        }

        .custom-content-label {
            display: inline-flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
        }

        .custom-content-switch {
            margin-top: -1px;
            .el-switch__core {
                height: 16px;
                &::after {
                    height: 12px;
                    width: 12px;
                }
            }
            &.is-checked .el-switch__core::after {
                margin-left: -14px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .more-options-btn {
        span {
            font-weight: normal;
        }
    }

    .share-url-input {
        margin-bottom: 8px;
    }

    .scrollbar {
        height: calc(100vh - 230px);
    }

    .content-select-tree-scrollbar {
        height: 500px;
        margin-right: 20px;
    }
</style>