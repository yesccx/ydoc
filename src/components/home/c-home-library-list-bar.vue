<template>
    <div class="c-home-library-list-bar">
        <el-input class="search-input" v-model="searchKey" @keydown.enter.native="onSearch" @change="onSearchKeyChange"
            placeholder="搜索文档库名称" clearable>
            <el-select class="search-select" v-model="libraryGroupId" @change="onLibraryGroupChange" slot="prepend"
                placeholder="请选择">
                <el-button class="library-group-manager" @click="onLibraryGroupManager" type="text" icon="el-icon-setting">
                    管理分组
                </el-button>
                <el-option-group v-for="collection in libraryGroupsCollection" :key="collection.label" :label="collection.label">
                    <el-option v-for="libraryGroup in collection.libraryGroups" :key="libraryGroup.id" :label="libraryGroup.name"
                        :value="libraryGroup.id">
                    </el-option>
                </el-option-group>
            </el-select>
            <el-button @click="onSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <!-- 视图风格切换按钮 -->
        <el-tooltip :content="viewStyleTip" placement="top-start" :open-delay="500">
            <el-button class="view-style-btn" type="text" :icon="viewStyleIcon" @click="onSwitchViewStyle"> </el-button>
        </el-tooltip>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DataStore, { keys as STORE_KEYS } from '@/common/utils/datastore-utils';

    export default {
        name: 'c-home-library-list-bar',
        watch: {
            homeViewStyle: {
                handler(val) {
                    this.viewStyle = val;
                },
                immediate: true
            }
        },
        computed: {
            ...mapGetters('global', ['homeViewStyle']),
            // 文档库分组集合
            libraryGroupsCollection() {
                const collection = [
                    {
                        label: '常规分组',
                        libraryGroups: [
                            { id: 'all', name: '所有文档库' },
                            { id: 'self', name: '我创建的文档库' },
                            { id: 'groups', name: '我参与的文档库' }
                        ]
                    }
                ];

                if (this.libraryGroups.length > 0) {
                    collection.push({
                        label: '自定义分组',
                        libraryGroups: this.libraryGroups
                    });
                }

                return collection;
            },
            // 视图风格icon
            viewStyleIcon() {
                return {
                    'simple': 'icon y-icon-danliemoshi',
                    'many': 'icon y-icon-duoliemoshi'
                }[this.viewStyle] || '';
            },
            // 视图风格tip
            viewStyleTip() {
                return {
                    'simple': '切换视图风格，当前为「单列」',
                    'many': '切换视图风格，当前为「多列」'
                }[this.viewStyle] || '切换视图风格';
            }
        },
        data() {
            return {
                libraryGroups: [],
                searchKey: '',
                libraryGroupId: '',
                viewStyle: 'simple'
            };
        },
        async created() {
            await this.initialize();
        },
        methods: {
            // 初始化
            async initialize() {
                await this.initLibraryGroups();
                this.initDefaultLibraryGroup();
            },
            // 初始化获取所有文档库分组
            async initLibraryGroups() {
                let libraryGroups = [];
                await this.$api.v1.LibraryGroupCollection().then(({ resData }) => {
                    libraryGroups = resData;
                });

                this.libraryGroups = libraryGroups;
            },
            // 初始化默认选中文档库分组id
            initDefaultLibraryGroup() {
                // 获取历史选择的分组
                const userSessionConfig = DataStore.getItem(STORE_KEYS.USER_SESSION_CONFIG, {});
                this.libraryGroupId = userSessionConfig.home_library_list_group_id || 'all';

                this.$nextTick(() => {
                    if (this.libraryGroupId) {
                        if (this.libraryGroupId >> 0 > 0 && this.libraryGroups.map(item => item.id).indexOf(this.libraryGroupId) < 0) {
                            this.libraryGroupId = 'all';
                        }
                        this.emitSearch();
                    }
                });
            },
            // 事件：文档库分组管理
            onLibraryGroupManager() {
                this.$link.libraryGroupManager();
            },
            // 事件：搜索关键字变更
            onSearchKeyChange() { },
            // 事件：文档库分组变更
            onLibraryGroupChange() {
                this.emitSearch();

                DataStore.setItem(STORE_KEYS.USER_SESSION_CONFIG, (data) => {
                    data = data || {};
                    data.home_library_list_group_id = this.libraryGroupId;
                    return data;
                });
            },
            // 事件：切换视图风格
            onSwitchViewStyle() {
                this.viewStyle = this.viewStyle === 'simple' ? 'many' : 'simple';
                this.$store.commit('global/setHomeViewStyle', this.viewStyle);
            },
            // 事件：查询
            onSearch() {
                this.emitSearch();
            },
            // 触发：查询
            emitSearch() {
                this.$emit('search', {
                    search_key: this.searchKey,
                    group_id: this.libraryGroupId
                });
            }
        }
    };
</script>

<style lang="scss">
    .c-home-library-list-bar {
        display: flex;
        justify-content: space-between;
        align-content: center;

        .el-input-group__append {
            padding: 0px 13px;
        }

        .view-style-btn {
            i {
                transition: color 0.3s;
                font-size: 14px;
                line-height: 12px;
                color: $--color-primary-light-5;
                font-weight: normal;
                &:hover {
                    color: $--color-primary-light-2;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .search-input {
        margin-right: 10px;
    }
    .search-select {
        width: 150px;
    }
    .library-group-manager {
        padding-left: 20px;
        color: rgb(92, 98, 105);
    }
    .search-select {
        width: 150px;
    }
</style>