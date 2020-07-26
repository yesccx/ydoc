<template>
    <div class="c-html-tinymce">
        <editor v-model="content" :init="config" :disabled="disabled">
        </editor>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce';
    import Editor from '@tinymce/tinymce-vue';
    import 'tinymce/themes/silver';

    // 编辑器插件plugins, 更多插件参考：https://www.tiny.cloud/docs/plugins/
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/help';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/autoresize';
    import 'tinymce/icons/default/icons.min.js';

    export default {
        name: 'c-html-tinymce',
        props: {
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isViewMode: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(content) {
                this.content = content;
            },
            content(content) {
                this.$emit('input', content);
            }
        },
        components: {
            Editor
        },
        mounted() {
            tinymce.init({});
        },
        data() {
            return {
                config: {
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/ui/oxide',
                    content_css: '/tinymce/skins/content/default/content.css',
                    resize: false,
                    statusbar: false,
                    auto_focus: true,
                    toolbar_mode: 'sliding',
                    placeholder: '输入内容...',
                    branding: false,
                    menubar: false,
                    image_advtab: true,
                    pagebreak_split_block: true,
                    paste_data_images: true,
                    toolbar_sticky: true,
                    plugins: [
                        'autoresize', 'print', 'preview', 'searchreplace', 'fullscreen', 'image', 'link', 'media',
                        'code', 'codesample', 'table', 'charmap', 'hr', 'pagebreak', 'anchor',
                        'insertdatetime', 'advlist', 'lists', 'imagetools', 'help', 'paste'
                    ],
                    toolbar: this.isViewMode ? false : `fullscreen |
                        bold italic underline strikethrough forecolor backcolor fontselect fontsizeselect formatselect |
                        table image media charmap pagebreak anchor link insertdatetime |
                        searchreplace undo redo |
                        alignle ft aligncenter alignright alignjustify outdent indent numlist bullist hr |
                        codesample blockquote subscript superscript removeformat |
                        pastetext print preview code help`,
                    images_upload_handler: (blobInfo, success, failure) => {
                        this.onUploadFiles(blobInfo, success, failure);
                    },
                    init_instance_callback: (editor) => {
                        this.onInited(editor);
                    }
                },
                content: this.value
            };
        },
        methods: {
            // 事件：文件上传
            onUploadFiles(file, success, error) {
                const params = new FormData();
                params.append('file', file.blob());
                this.$api.v1.ToolsImageUpload(params, {
                    report: true
                }).then(({ resData }) => {
                    success(resData.url);
                }).catch(({ resMsg }) => {
                    error('上传失败：' + resMsg);
                });
            },
            // 事件：保存（按下meta+s）
            onSave() {
                this.$emit('save');
            },
            // 事件：初始化完毕
            onInited(editor) {
                // 视图模式 = 只读模式
                if (this.isViewMode) {
                    editor.setMode('readonly');
                }

                // 监听快捷键保存事件
                editor.shortcuts.add('meta+s', '保存', () => {
                    this.onSave();
                });

                this.$emit('inited');
            }
        }
    };

</script>

<style lang="scss" >
    .c-html-tinymce {
        @import "~@/assets/scss/editor/html/editor-custom";
    }
</style>