<template>
    <div class="page-library-settings">
        <el-divider></el-divider>
        <div>
            <el-button type="primary" icon="el-icon-connection " @click="onLibraryTransferReady">转让文档库</el-button>
            <el-alert class="block-alert" title="将文档库转让给某一成员，同时自己将成员普通成员" type="warning" :closable="false" show-icon>
            </el-alert>
        </div>
        <el-divider></el-divider>
        <div>
            <el-button type="primary" icon="el-icon-takeaway-box" @click="onLibraryPermanentReady" disabled>归档文档库</el-button>
            <el-alert class="block-alert" title="此操作后，将文档库变为只读状态" type="warning" :closable="false" show-icon>
            </el-alert>
        </div>
        <el-divider></el-divider>
        <div>
            <el-button type="danger" icon="el-icon-delete" @click="onLibraryRemoveReady">删除文档库</el-button>
            <el-alert class="block-alert" title="将永久删除该文档库，相关的分享内容、模板等都会失效，请谨慎操作" type="warning" :closable="false" show-icon>
            </el-alert>
        </div>

        <!-- 转让文档库Modal -->
        <c-library-manager-setting-transfer-modal :visible.sync="libraryTransferModel.visible" :library-id="libraryId" />

        <!-- 归档文档库Modal -->
        <c-library-manager-setting-permanent-modal :visible.sync="libraryPermanentModel.visible" :library-id="libraryId" />

        <!-- 删除文档库Modal -->
        <c-library-manager-setting-remove-modal :visible.sync="libraryRemoveModel.visible" :library-id="libraryId" />
    </div>
</template>

<script>
    import BasePage from '@/common/mixins/base-page';
    import LibraryManager from '@/extends/mixins/library-manager';

    export default {
        name: 'page-library-settings',
        mixins: [BasePage, LibraryManager],
        components: {
            'c-library-manager-setting-transfer-modal': () => import('@/components/library/manager/c-library-manager-setting-transfer-modal'),
            'c-library-manager-setting-permanent-modal': () => import('@/components/library/manager/c-library-manager-setting-permanent-modal'),
            'c-library-manager-setting-remove-modal': () => import('@/components/library/manager/c-library-manager-setting-remove-modal')
        },
        data() {
            return {
                libraryTransferModel: {
                    visible: false
                },
                libraryPermanentModel: {
                    visible: false
                },
                libraryRemoveModel: {
                    visible: false
                }
            };
        },
        methods: {
            // 事件：转让文档库准备
            onLibraryTransferReady() {
                this.libraryTransferModel.visible = true;
            },
            // 事件：归档文档库准备
            onLibraryPermanentReady() {
                this.libraryPermanentModel.visible = true;
            },
            // 事件：删除文档库准备
            onLibraryRemoveReady() {
                this.libraryRemoveModel.visible = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .block-alert {
        margin-top: 10px;
    }
</style>
