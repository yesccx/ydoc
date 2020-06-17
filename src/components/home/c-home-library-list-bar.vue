<template>
    <div class="c-home-library-list-bar">
        <el-input v-model="searchKey" @keydown.enter.native="onSearch" @change="onSearchKeyChange" placeholder="请输入内容" clearable>
            <el-select class="search-select" v-model="libraryGroupId" @change="onLibraryGroupChange" slot="prepend"
                placeholder="请选择">
                <el-button class="library-group-manager" @click="onLibraryGroupManager" type="text" icon="el-icon-setting">
                    管理分组
                </el-button>
                <el-option-group v-for="collect in libraryGroupsCollect" :key="collect.label" :label="collect.label">
                    <el-option v-for="libraryGroup in collect.libraryGroups" :key="libraryGroup.id" :label="libraryGroup.name"
                        :value="libraryGroup.id">
                    </el-option>
                </el-option-group>
            </el-select>
            <el-button @click="onSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: 'c-home-library-list-bar',
        computed: {
            // 文档库分组集合
            libraryGroupsCollect() {
                const collect = [
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
                    collect.push({
                        label: '自定义分组',
                        libraryGroups: this.libraryGroups
                    });
                }

                return collect;
            }
        },
        data() {
            return {
                libraryGroups: [],
                searchKey: '',
                libraryGroupId: ''
            };
        },
        async created() {
            await this.initialize();
        },
        methods: {
            // 初始化
            async initialize() {
                this.libraryGroupId = 'all';
                await this.initLibraryGroups();
            },
            // 初始化获取所有文档库分组
            async initLibraryGroups() {
                let libraryGroups = [];
                await this.$api.LibraryGroupAll().then(({ resData }) => {
                    libraryGroups = resData;
                });

                this.libraryGroups = libraryGroups;
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
        .el-input-group__append {
            padding: 0px 13px;
        }
    }
</style>
<style lang="scss" scoped>
    .library-group-manager {
        padding-left: 20px;
        color: rgb(92, 98, 105);
    }
    .search-select {
        width: 150px;
    }
</style>