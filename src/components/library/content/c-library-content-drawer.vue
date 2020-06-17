<template>
    <div class="c-library-content-drawer">
        <c-library-drawer-doc :doc-info="docInfo" :visible.sync="docVisible" />
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-content-drawer',
        components: {
            'c-library-drawer-doc': () => import('@/components/library/drawer/c-library-drawer-doc')
        },
        mixins: [LibraryContent],
        data() {
            return {
                docInfo: {
                    id: 0,
                    title: '',
                    content: '',
                    groupId: 0,
                    libraryId: 0
                },
                docVisible: false
            };
        },
        methods: {
            // 初始化eventbus事件监听
            initEventBus(bus) {
                bus.$on('editor-doc-info', (docInfo) => {
                    this.docInfo = this.$utils.CloneDeep(docInfo);
                    this.docVisible = true;
                });
            }
        }
    };
</script>