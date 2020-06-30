<template>
    <div class="c-library-editor-meta">
        <el-form :inline="true" class="meta-operation">
            <el-input class="meta-operation__title" v-model="meta.title" size="mini" placeholder="请输入标题" clearable>
            </el-input>
            <span v-show="meta.updateTime > 0 || loading" class="meta-operation__last-time">
                <span v-show="!loading">
                    保存于 {{ meta.updateTime | dateFormat("m-d H:i:s") }}
                </span>
                <span v-show="loading">
                    <i class="el-icon-loading "></i> 保存中
                </span>
            </span>
            <el-button-group class="fr">
                <el-button size="mini">历史记录</el-button>
                <el-dropdown trigger="click" type="primary" size="mini" icon="el-icon-circle-check" @command="onHandleCommand"
                    @click="onSaveDoc" split-button>
                    保存文档
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="doc-info">文档信息</el-dropdown-item>
                        <el-dropdown-item command="switch-style">切换风格</el-dropdown-item>
                        <el-dropdown-item command="save-to-doc" divided>另存为文档</el-dropdown-item>
                        <el-dropdown-item command="copy-doc">复制文档</el-dropdown-item>
                        <el-dropdown-item command="save-to-template" divided>另存为模板</el-dropdown-item>
                        <el-dropdown-item command="use-template">使用模板</el-dropdown-item>
                        <el-dropdown-item command="share-doc" divided>分享</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-button-group>
        </el-form>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-editor-meta',
        mixins: [LibraryContent],
        props: {
            meta: {
                type: Object,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 事件：保存文档
            async onSaveDoc() {
                await this.libraryContentEventBus.$emit('doc-save', this.meta.id);
            },
            // 事件：处理操作指令
            onHandleCommand(command) {
                const docInfo = this.$utils.CloneDeep(this.meta);
                switch (command) {
                    case 'doc-info':
                        this.libraryContentEventBus.$emit('editor-doc-info', docInfo);
                        break;
                    case 'use-template':
                        this.libraryContentEventBus.$emit('will-use-template');
                        break;
                    default:
                        break;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .meta-operation {
        margin: 10px 2px;

        &__title {
            width: 250px;
            margin-right: 5px;
        }

        &__last-time {
            font-size: 12px;
            color: $--color-primary-light-6;
        }
    }
</style>