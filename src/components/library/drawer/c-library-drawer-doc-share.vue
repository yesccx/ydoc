<template>
    <div class="c-library-drawer-doc-share">
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
                        <i slot="suffix" class="el-input__icon el-icon-document-copy"></i>
                    </el-input>
                    <div class="footer-optrate">
                        <el-button v-if="shareInfo.id > 0" slot="reference" type="danger" @click="onShareCancel">取消分享</el-button>
                        <el-button type="primary" :loading="shareLoading" @click="onShare">生成分享</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import BaseDrawer from '@/common/mixins/base-drawer';
    import LibraryContent from '@/extends/mixins/library-content';
    import { mapGetters } from 'vuex';

    // 分享信息初始值
    const shareInfoInitial = {
        id: 0,
        share_code: '',
        share_name: '',
        share_desc: '',
        access_password: '',
        access_count: 0,
        expire_time: ''
    };

    export default {
        name: 'c-library-drawer-doc-share',
        mixins: [BaseDrawer, LibraryContent],
        computed: {
            ...mapGetters('userSession', ['userInfo']),
            title() {
                return '文档分享';
            },
            shareUrl() {
                if (!this.shareInfo.share_code) {
                    return '';
                }
                return `https://www.baidu.com/share/${this.shareInfo.share_code}`;
            }
        },
        data() {
            return {
                docId: 0,
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
                }
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档分享
                bus.$on('doc-will-share', ({ docId }) => {
                    this.docId = docId;
                    this.visibleDrawer = true;
                });
            },
            // 初始化文档分享信息
            async initShareInfo() {
                shareInfoInitial.share_name = this.generateShareName();
                this.shareInfo = { ...shareInfoInitial };

                const reqData = { library_id: this.libraryId, library_doc_id: this.docId };
                await this.$api.v1.LibraryMemberDocShareInfo(reqData, {
                    loading: (status) => { this.loading = status; },
                    report: true
                }).then(({ resData }) => {
                    resData.expire_time = resData.expire_time ? resData.expire_time * 1000 : '';
                    this.shareInfo = resData;
                }).catch(() => { });
            },
            // 构建随机的分享名称
            generateShareName() {
                return this.$utils.DateFormat(Date.now() / 1000, 'm-d H:i') + ` 来自「${this.userInfo.nickname}」的分享`;
            },
            // 事件：drawer被展开
            onDrawerOpen() {
                this.initShareInfo();
            },
            // 事件：展开/收缩更多配置项
            onMoreOptions() {
                this.moreOptionsOpen = !this.moreOptionsOpen;
            },
            // 事件：生成分享
            async onShare() {
                const shareInfo = this.$utils.CloneDeep(this.shareInfo);
                shareInfo.library_id = this.libraryId;
                shareInfo.library_doc_id = this.docId;
                shareInfo.expire_time = shareInfo.expire_time ? (shareInfo.expire_time / 1000) >> 0 : 0;

                await this.$api.v1.LibraryMemberDocShare(shareInfo, {
                    loading: (status) => { this.shareLoading = status; }
                }).then(({ resData }) => {
                    resData.expire_time = resData.expire_time ? resData.expire_time * 1000 : '';
                    this.shareInfo = resData;
                    this.$tip.success('生成分享成功！');
                });
            },
            // 事件：分享取消
            async onShareCancel() {
                const reqData = { library_id: this.libraryId, library_doc_id: this.docId };
                await this.$api.v1.LibraryMemberDocShareCancel(reqData, {
                    loading: (status) => { this.shareLoading = status; }
                }).then(({ resData }) => {
                    this.$tip.success('取消分享成功！');
                    this.visibleDrawer = false;
                });
            }
        }
    };
</script>

<style lang="scss">
    .c-library-drawer-doc-share {
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
    }

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
</style>