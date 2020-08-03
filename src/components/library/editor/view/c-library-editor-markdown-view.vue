<template>
    <div class="c-library-editor-markdown-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <div class="doc-body">
            <div class="doc-body__content vditor-reset" ref="markdown"></div>
            <div class="doc-body__toc">
                <el-scrollbar>
                    <div ref="toc" class="doc-body__toc-content"></div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
    import VditorMethod from 'vditor/dist/method.min';

    export default {
        name: 'c-library-editor-markdown-view',
        props: {
            // 初始化值
            docInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        watch: {
            'docInfo.content': {
                async handler(value) {
                    this.render(value);
                }
            }
        },
        mounted() {
            this.render(this.docInfo.content);
        },
        destroy() {
            this.initAnchorClickEvent(false);
            this.initAnchorScrollEvent(false);
        },
        data() {
            return {
                lastScroll: 0
            };
        },
        methods: {
            async render(value) {
                await VditorMethod.preview(this.$refs.markdown, value, {
                    hljs: { lineNumber: true }
                });
                await VditorMethod.outlineRender(this.$refs.markdown, this.$refs.toc);
                this.onInited();
            },
            // 事件：初始化成功
            onInited() {
                this.initAnchorClickEvent(true);
                this.initAnchorScrollEvent(true);
                this.$nextTick(() => {
                    const hash = this.$route.hash.slice(1);
                    hash && this.goAnchor(decodeURI(hash));
                });

                this.$emit('inited');
            },
            // 跳转至锚点
            goAnchor(key, scroll = true) {
                this.$router.replace({ ...this.$route, hash: '#' + key }).catch(error => error);
                if (scroll) {
                    this.$el.parentNode.parentNode.scrollTop = this.$el.querySelector(`[id="${key}"]`).offsetTop;
                } else {
                    // 内容滚动的同时，大纲列表也要跟着滚动（防抖）
                    const lastScroll = this.lastScroll;
                    setTimeout(() => {
                        if (lastScroll !== this.lastScroll) {
                            return false;
                        }
                        const scrollTop = this.$el.querySelector(`[data-id="${key}"]`).getBoundingClientRect().top;
                        this.$refs.toc.parentNode.parentNode.scrollTop = scrollTop - 200;
                    }, 50);
                }

                const currentItem = this.$el.querySelector('.vditor-outline__item--current');
                currentItem && currentItem.classList.remove('vditor-outline__item--current');
                this.$el.querySelector(`[data-id="${key}"]`).classList.add('vditor-outline__item--current');
            },
            // 初始化锚点点击事件
            initAnchorClickEvent(listen = true) {
                const target = this.$el.querySelector('.doc-body__toc-content');
                if (listen) {
                    target.addEventListener('click', this.handleAnchorClick);
                } else {
                    target.removeEventListener('click', this.handleAnchorClick);
                }
            },
            // 处理锚点点击事件
            handleAnchorClick(event) {
                if (Array.from(event.target.classList).indexOf('vditor-outline__item') >= 0) {
                    this.goAnchor(event.target.dataset.id);
                }
            },
            // 初始化锚点滚动事件
            initAnchorScrollEvent(listen = true) {
                const target = this.$el.parentNode.parentNode;
                if (listen) {
                    target.addEventListener('scroll', this.handleAnchorScroll);
                } else {
                    target.removeEventListener('scroll', this.handleAnchorScroll);
                }
            },
            // 处理锚点滚动事件
            handleAnchorScroll(event) {
                this.lastScroll = Date.now();

                // 遍历找出最近的一个anchor
                let anchorCollection = this.$el.querySelectorAll('[data-id]');
                let lately = null;
                anchorCollection.forEach((anchor) => {
                    const anchorTarget = this.$el.querySelector(`[id="${anchor.dataset.id}"]`);
                    if (anchorTarget && anchorTarget.getBoundingClientRect().top < 50 &&
                        (!lately || anchorTarget.getBoundingClientRect().top > lately.getBoundingClientRect().top)) {
                        lately = anchorTarget;
                    }
                });

                if (lately) {
                    this.goAnchor(lately.id, false);
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "~vditor/src/assets/scss/index";

    .c-library-editor-markdown-view {
        @import "~@/assets/scss/editor/markdown/preview-custom";
    }

    @import "~@/assets/scss/editor/markdown/preview-layout";
</style>
