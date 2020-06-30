<template>
    <div class="c-library-editorwelcome">
        <div class="normal-main">
            <p class="normal-main__title">^ ^ 欢迎使用YDOC~</p>
            <p class="normal-main__content">快捷保存文档 <span v-keyboard>Ctrl + S</span> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c-library-editorwelcome',
        data() {
            return {};
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