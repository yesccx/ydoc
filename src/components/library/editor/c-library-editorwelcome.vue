<template>
    <div class="c-library-editorwelcome">
        <div class="normal-main">
            <p class="normal-main__title">^ ^ 欢迎使用YDOC~</p>
            <p class="normal-main__content">快捷键保存文档 <span v-keyboard>Ctrl + S</span> </p>
            <p class="normal-main__content">
                从左下方
                <span class="pointer" @click="onDocWillCreate">新增文档 <i class="el-icon-document-add"></i></span>，
                <span class="pointer" @click="onDocGroupWillCreate">新增分组 <i class="el-icon-folder-add"></i></span>
            </p>
        </div>
    </div>
</template>

<script>
    import LibraryContent from '@/extends/mixins/library-content';

    export default {
        name: 'c-library-editorwelcome',
        mixins: [LibraryContent],
        data() {
            return {};
        },
        methods: {
            // 事件：新增文档
            onDocWillCreate() {
                this.libraryContentEventBus.$emit('doc-will-create');
            },
            // 事件：新增文档分组
            onDocGroupWillCreate() {
                this.libraryContentEventBus.$emit('doc-group-will-create');
            }
        },
        directives: {
            // keyboard风格样式
            keyboard: {
                bind(el) {
                    el.dataset.keyboard = el.innerText;
                },
                inserted(el) {
                    const keyboardCollection = el.dataset.keyboard.split(/\s*\+\s*/);
                    const hArr = [];
                    keyboardCollection.forEach((keyboard) => {
                        hArr.push(`<span class="keyboard">${keyboard}</span>`);
                    });

                    el.innerHTML = hArr.join('<span class="keyboard-join">+</span>');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .normal-main {
        text-align: center;
        margin-top: 40vh;
        &__title {
            color: $--color-primary-light-5;
            font-size: 22px;
        }
        &__content {
            color: $--color-primary-light-3;
            font-size: 16px;
        }
    }
</style>