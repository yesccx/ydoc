import LibraryManager from '@/extends/mixins/library-manager';

export default {
    mixins: [LibraryManager],
    inject: ['libraryContentEventBus'],
    watch: {
        libraryId: {
            async handler(id) {
                if (id > 0) {
                    this.initComponent && await this.initComponent();
                }
            },
            immediate: true
        }
    },
    async created() {
        this.initEventBus && this.initEventBus(this.libraryContentEventBus);
    },
    methods: {
        // 初始化eventbus事件监听
        initEventBus(bus) { },
        // 初始化组件
        initComponent() { }
    }
};