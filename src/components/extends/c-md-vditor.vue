<template>
    <div class="c-md-vditor">
        <div ref="vditor"></div>
    </div>
</template>

<script>
    import Vditor from 'vditor';

    // 上一次内容值
    let lastValue = '';

    export default {
        name: 'c-md-vditor',
        props: {
            initContent: {
                type: String,
                default: ''
            },
            handlerInput: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                editor: {}
            };
        },
        mounted() {
            this.initEditor();
        },
        methods: {
            // 初始化编辑器
            initEditor() {
                this.editor = new Vditor(this.$refs.vditor, {
                    preview: {
                        hljs: {
                            lineNumber: true
                        },
                        maxWidth: '100%'
                    },
                    value: this.initContent,
                    input: this.onInput,
                    toolbar: [
                        { name: 'headings', tipPosition: 's' },
                        { name: 'bold', tipPosition: 's' },
                        { name: 'italic', tipPosition: 's' },
                        { name: 'strike', tipPosition: 's', hotkey: '' },
                        { name: 'link', tipPosition: 's' },
                        '|',
                        { name: 'list', tipPosition: 's' },
                        { name: 'ordered-list', tipPosition: 's' },
                        { name: 'check', tipPosition: 's' },
                        { name: 'outdent', tipPosition: 's' },
                        { name: 'indent', tipPosition: 's' },
                        '|',
                        { name: 'quote', tipPosition: 's' },
                        { name: 'line', tipPosition: 's' },
                        { name: 'code', tipPosition: 's' },
                        { name: 'inline-code', tipPosition: 's' },
                        { name: 'insert-before', tipPosition: 's' },
                        { name: 'insert-after', tipPosition: 's' },
                        '|',
                        { name: 'upload', tipPosition: 's', tip: '上传图片' },
                        { name: 'table', tipPosition: 's' },
                        '|',
                        { name: 'undo', tipPosition: 's' },
                        { name: 'redo', tipPosition: 's' },
                        '|',
                        { name: 'fullscreen', tipPosition: 's' },
                        {
                            name: 'more',
                            toolbar: [
                                'both',
                                'export',
                                'outline',
                                'preview',
                                'info'
                            ]
                        }
                    ],
                    placeholder: '输入内容...',
                    tab: '\t',
                    cache: {
                        enable: false
                    },
                    toolbarConfig: {
                        pin: true
                    },
                    upload: {
                        accept: 'image/*',
                        handler: (files) => {
                            this.onUploadFiles(files);
                        },
                        url: this.$utils.ApiUrlBuilder('v1/tools/image/upload')
                    }
                });
            },
            // 事件：input
            onInput(value) {
                if (value === lastValue) {
                    return true;
                }
                lastValue = value;
                this.handlerInput(value);
            },
            // 事件：文件上传
            onUploadFiles(files) {
                const params = new FormData();
                params.append('file', files[0]);
                this.editor.tip('上传中...');
                this.$api.v1.ToolsImageUpload(params, {
                    report: true
                }).then(({ resData }) => {
                    this.editor.insertValue(`<img src="${resData.url}" alt="${resData.key}">`);
                    this.editor.tip('上传成功', 1000);
                }).catch(({ resMsg }) => {
                    this.editor.tip('上传失败：' + resMsg, 3000);
                });
            }
        },
        beforeDestroy() {
            this.editor.destory && this.editor.destory();
        }
    };
</script>

<style lang="scss">
    @import "~vditor/src/assets/scss/index";

    .c-md-vditor {
        height: inherit;
    }
</style>