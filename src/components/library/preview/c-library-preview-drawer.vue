<template>
    <div class="c-library-preview-drawer">
        <c-library-preview-info-modal :share-info="libraryShareInfo" :visible.sync="shareInfoModal.visible" />
        <c-library-preview-drawer-fulltext />
    </div>
</template>

<script>
    import LibraryPreviewBase from '@/extends/mixins/library-preview-base';

    export default {
        name: 'c-library-preview-drawer',
        components: {
            'c-library-preview-info-modal': () => import('@/components/library/preview/c-library-preview-info-modal'),
            'c-library-preview-drawer-fulltext': () => import('@/components/library/preview/c-library-preview-drawer-fulltext')
        },
        mixins: [LibraryPreviewBase],
        data() {
            return {
                shareInfoModal: {
                    visible: false
                }
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：分享信息查看
                bus.$on('share-info-view', () => {
                    this.shareInfoModal.visible = true;
                });
            }
        }
    };
</script>