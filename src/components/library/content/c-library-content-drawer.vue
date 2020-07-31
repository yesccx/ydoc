<template>
    <div class="c-library-content-drawer">
        <c-library-drawer-doc />
        <c-library-drawer-doc-templates />
        <c-library-drawer-doc-template-info />
        <c-library-drawer-doc-historys />
        <c-library-drawer-library-share :visible.sync="libraryShare.visible" :library-id="libraryId" />
        <c-library-drawer-doc-share />
        <c-library-drawer-doc-fulltext />
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-content-drawer',
        mixins: [LibraryContent],
        components: {
            'c-library-drawer-doc': () => import('@/components/library/drawer/c-library-drawer-doc'),
            'c-library-drawer-doc-templates': () => import('@/components/library/drawer/c-library-drawer-doc-templates'),
            'c-library-drawer-doc-template-info': () => import('@/components/library/drawer/c-library-drawer-doc-template-info'),
            'c-library-drawer-doc-historys': () => import('@/components/library/drawer/c-library-drawer-doc-historys'),
            'c-library-drawer-library-share': () => import('@/components/library/drawer/c-library-drawer-library-share'),
            'c-library-drawer-doc-share': () => import('@/components/library/drawer/c-library-drawer-doc-share'),
            'c-library-drawer-doc-fulltext': () => import('@/components/library/drawer/c-library-drawer-doc-fulltext')
        },
        data() {
            return {
                libraryShare: { visible: false }
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                // 事件：文档库分享
                bus.$on('library-share', () => {
                    this.libraryShare.visible = true;
                });
            }
        }
    };
</script>