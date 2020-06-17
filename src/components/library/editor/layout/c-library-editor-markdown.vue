<template>
    <div class="c-library-editor-markdown">
        <c-md-editor :content.sync="content" />
    </div>
</template>

<script>
    export default {
        name: 'c-library-edtior-markdown',
        components: {
            'c-md-editor': () => import('@/components/extends/c-md-editor')
        },
        props: {
            // 初始化值
            initContent: {
                type: String,
                default: ''
            }
        },
        watch: {
            initContent: {
                handler(val) {
                    this.content = val;
                },
                immediate: true
            }
        },
        data() {
            return {
                content: ''
            };
        },
        methods: {
            // 暴露给外部调用，返回正在编辑的内容
            fetchContent() {
                return this.content;
            }
        }
    };
</script>
