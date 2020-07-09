import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('libraryPreview', ['libraryShareInfo', 'isAccessed', 'isShareSimplify']),
        ...mapGetters('libraryPreview', ['libraryId', 'shareAccessToken'])
    },
    inject: ['libraryPreviewEventBus'],
    watch: {
        isAccessed: {
            async handler(val) {
                if (val) {
                    this.initComponent && await this.initComponent();
                }
            },
            immediate: true
        }
    },
    async created() {
        this.initEventBus && this.initEventBus(this.libraryPreviewEventBus);
    }
};