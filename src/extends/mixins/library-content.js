import LibraryManager from '@/extends/mixins/library-manager';

export default {
    mixins: [LibraryManager],
    inject: ['libraryContentEventBus'],
    async created() {
        this.initEventBus && this.initEventBus(this.libraryContentEventBus);
        this.libraryContentEventBus.$on('library-content-init', async () => {
            this.initComponent && await this.initComponent();
        });
    },
    methods: {
        // 初始化eventbus事件监听
        initEventBus(bus) { },
        // 初始化组件
        initComponent() { }
    }
};