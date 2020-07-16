<template>
    <div class="page-user-message" v-loading="pageLoading" element-loading-text="处理中">
        <el-row :gutter="10">
            <!-- 消息列表 -->
            <el-col :span="7">
                <el-card shadow="hover">
                    <div class="message-list-operate">
                        <el-input class="message-list-operate__input" size="mini" placeholder="搜索消息" v-model="searchKey"
                            clearable>
                            <el-select class="message-list-operate__select" v-model="searchStatus" slot="prepend"
                                placeholder="请选择" @change="onSearch">
                                <el-option :label="'全部(' + messageCount['-1'] + ')'" value="-1"></el-option>
                                <el-option :label="'未读(' + messageCount[0] + ')'" value="0"></el-option>
                                <el-option :label="'已读(' + messageCount[1] + ')'" value="1"></el-option>
                            </el-select>
                            <el-button slot="append" :loading="messageListLoading" icon="el-icon-search" @click="onSearch">
                            </el-button>
                        </el-input>

                        <el-dropdown calss="message-list-operate__more" trigger="hover" placement="bottom"
                            @command="onMessageListOperate">
                            <span class="el-dropdown-link">
                                <i class="el-icon-more" title="更多操作"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="allRead">
                                    <i class="el-icon-view"></i> 全部已读
                                </el-dropdown-item>
                                <el-dropdown-item command="refresh">
                                    <i class="el-icon-refresh"></i> 刷新列表
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                    <!-- 列表 -->
                    <el-scrollbar class="scrollbar">
                        <c-infinite-list ref="messageList" :request="getMessageList" :empty-tip="'暂无消息'">
                            <ul class="message-list">
                                <li v-for="message in messageList" :key="message.id" class="message-item"
                                    :class="message.id === activeMessage ? 'active' : ''" @click="onMessageView(message)">
                                    <div class="message-item__header">
                                        <div class="message-item__header-title text-overflow">
                                            {{ message.title }}
                                        </div>
                                        <div class="message-item__header-status">
                                            <el-tag v-show="!message.status" size="mini" type="danger">未读</el-tag>
                                        </div>
                                    </div>

                                    <div class="message-item__footer">
                                        <div class="message-item__footer-date">
                                            <i class="el-icon-time"></i> {{ message.create_time|dateFormat }}
                                        </div>
                                        <!-- <div class="message-item__footer-operate">
                                            <i class="el-icon-delete" @click.stop="onRemove(message)"></i>
                                        </div> -->
                                    </div>
                                </li>
                            </ul>
                        </c-infinite-list>
                    </el-scrollbar>
                </el-card>
            </el-col>

            <!-- 消息详情view -->
            <el-col :span="17">
                <el-card v-loading="messageViewLoading" shadow="hover" element-loading-text="读取中...">
                    <div v-show="isMessageView" class="message-view">
                        <p class="message-view__title">{{ messageView.title }}</p>
                        <p class="message-view__date"><i class="el-icon-time"></i> {{ messageView.create_time|dateFormat }}</p>
                        <div class="message-view__content">{{ messageView.content }}</div>
                    </div>
                    <div v-show="!isMessageView" class="message-view-empty">
                        <div class="message-view-empty__tip"> ^ ^ 欢迎使用YDOC~ </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';

    export default {
        name: 'page-user-message',
        components: {
            'c-infinite-list': () => import('@/components/c-infinite-list')
        },
        mixins: [BasePage],
        computed: {
            // 标记当前是否正查看某个消息详情
            isMessageView() {
                return this.messageView.id > 0 && this.messageView;
            },
            messageIndexCollection() {
                const indexCollection = {};
                this.$utils.ForEach(this.messageList, (message, index) => {
                    indexCollection[message.id] = index;
                });
                return indexCollection;
            }
        },
        data() {
            return {
                searchStatus: '-1',
                searchKey: '',
                activeMessage: '',
                messageList: [],
                messageListLoading: false,
                messageView: {},
                messageViewLoading: false,
                messageCount: {
                    '-1': 0,
                    '0': 0,
                    '1': 0
                },
                pageLoading: false
            };
        },
        created() {
            this.initMessageAcountAll();
        },
        methods: {
            // 获取消息列表
            async getMessageList(page, handler) {
                let hres = {};

                // 获取第一页时，同时更新获取统计信息
                if (page.page_num === 1) {
                    await this.getMessageCountByStatus(this.searchStatus);
                }

                await this.$api.v1.UserMessageList({
                    ...page, search_status: this.searchStatus, search_key: this.searchKey
                }, {
                    loading: (status) => { this.messageListLoading = status; }
                }).then(({ resData, res }) => {
                    this.$utils.ArrayConcat(this.messageList, resData.list);
                    hres = res;
                });
                handler(hres);
            },
            // 处理消息为已读
            handleMessageRead(messageId) {
                this.messageList[this.messageIndexCollection[messageId]].status = 1;
                this.initMessageAcountAll();
            },
            // 处理所有消息为已读
            handlerMessageReadAll() {
                this.$api.v1.UserMessageReadAll({}, {
                    loading: (status) => { this.pageLoading = status; }
                }).then(() => {
                    this.$utils.ForEach(this.messageList, (message) => {
                        message.status = 1;
                    });
                    this.initMessageAcountAll();
                });
            },
            // 处理消息为已读
            handleMessageRemove(messageId) {
                this.messageList.splice(this.messageIndexCollection[messageId], 1);
            },
            // 根据消息状态获取消息数统计
            async getMessageCountByStatus(status) {
                status = status >> 0;
                await this.$api.v1.UserMessageCount({ status }, {
                    loading: (status) => { this.messageListLoading = status; }
                }).then(({ resData }) => {
                    this.messageCount[status] = resData.count;
                });
            },
            // 初始化消息统计数
            async initMessageAcountAll() {
                await this.$api.v1.UserMessageCountAll({}, {
                    loading: (status) => { this.messageListLoading = status; }
                }).then(({ resData }) => {
                    this.messageCount = resData;
                    // 未读数为0时，更新全局状态值
                    if (resData[0] >> 0 === 0) {
                        this.$store.commit('global/setUserMessageUnreadCount', 0);
                    }
                });
            },
            // 事件：消息列表operate
            onMessageListOperate(command) {
                switch (command) {
                    case 'allRead':
                        this.handlerMessageReadAll();
                        break;
                    case 'refresh':
                        this.onSearch();
                        break;
                }
            },
            // 事件：查看消息
            onMessageView(message) {
                const activeMessage = message.id;
                if (this.activeMessage === activeMessage) {
                    this.activeMessage = '';
                    this.messageView = {};
                    return true;
                }

                this.activeMessage = activeMessage;
                this.$api.v1.UserMessageInfo({ message_id: message.id }, {
                    loading: (status) => { this.messageViewLoading = status; }
                }).then(({ resData }) => {
                    this.messageView = resData;
                    this.handleMessageRead(message.id);
                });
            },
            // 事件：搜索消息
            onSearch() {
                this.messageList = [];
                this.$refs.messageList.initList();
            },
            // 事件：删除消息
            onRemove(message) {
                this.$api.v1.UserMessageRemove({ message_id: message.id }, {
                    loading: (status) => { this.pageLoading = status; }
                }).then(({ resData }) => {
                    this.$tip.success('删除成功');
                    this.handleMessageRemove(message.id);
                });
            }
        }
    };
</script>

<style lang="scss">
    .message-list-operate {
        .el-input-group__append {
            padding: 0 13px;
        }
    }
</style>

<style lang="scss" scoped>
    .message-list-operate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        &__input {
            width: 270px;
        }

        &__select {
            width: 110px;
        }

        &__more {
            cursor: pointer;
        }
    }

    .message-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 12px;
        color: $--color-primary-light-6;
    }

    .message-item {
        padding: 18px 5px;
        cursor: pointer;
        border-bottom: 1px solid $--color-primary-light-9;

        &.active {
            background-color: #fafafa;
            .message-item__header-title {
                font-weight: bold;
            }
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 17px;

            &-title {
                color: $--color-primary-light-3;
                font-size: 15px;
                width: 250px;
                line-height: 20px;
            }
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-date {
                color: $--color-primary-light-7;
            }

            &-operate .el-icon-delete:hover {
                color: $--color-danger;
            }
        }
    }

    .message-view-empty {
        height: calc(100vh - 142px);

        &__tip {
            text-align: center;
            font-size: 20px;
            color: $--color-primary-light-6;
            padding-top: 20vh;
        }
    }

    .message-view {
        height: calc(100vh - 142px);

        &__title {
            text-align: center;
            font-size: 30px;
            color: $--color-primary-light-3;
            margin-top: 10px;
        }

        &__date {
            text-align: center;
            font-size: 13px;
            color: $--color-primary-light-6;
        }

        &__content {
            font-size: 14px;
            color: $--color-primary-light-6;
            text-indent: 2em;
        }
    }

    .scrollbar {
        height: calc(70vh - 180px);
    }
</style>