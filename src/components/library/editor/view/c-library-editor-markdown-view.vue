<template>
    <div class="c-library-editor-markdown-view">
        <h1 class="doc-title">{{ docInfo.title }}</h1>
        <div v-html="docInfo.content"></div>
    </div>
</template>

<script>
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
        }
    };
</script>

<style lang="scss">
    .c-library-editor-markdown-view {
        .doc-title {
            text-align: center;
            margin-bottom: 50px;
        }

        $color-black: #000000;
        $color-white: #ffffff;
        $color-grey: #dddddd;

        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;

        * {
            caret-color: currentColor;
        }

        pre {
            padding: 0.7rem 1rem;
            border-radius: 5px;
            background: $color-black;
            color: $color-white;
            font-size: 0.8rem;
            overflow-x: auto;

            code {
                display: block;
            }
        }

        p code {
            display: inline-block;
            padding: 0 0.4rem;
            border-radius: 5px;
            font-size: 0.8rem;
            font-weight: bold;
            background: rgba($color-black, 0.1);
            color: rgba($color-black, 0.8);
        }

        ul,
        ol {
            padding-left: 1rem;
        }

        li > p,
        li > ol,
        li > ul {
            margin: 0;
        }

        a {
            color: inherit;
        }

        blockquote {
            border-left: 3px solid rgba($color-black, 0.1);
            color: rgba($color-black, 0.8);
            padding-left: 0.8rem;
            font-style: italic;

            p {
                margin: 0;
            }
        }

        img {
            max-width: 100%;
            border-radius: 3px;
        }

        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            margin: 0;
            overflow: hidden;

            td,
            th {
                min-width: 1em;
                border: 2px solid $color-grey;
                padding: 3px 5px;
                vertical-align: top;
                box-sizing: border-box;
                position: relative;
                > * {
                    margin-bottom: 0;
                }
            }

            th {
                font-weight: bold;
                text-align: left;
            }

            .selectedCell:after {
                z-index: 2;
                position: absolute;
                content: "";
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(200, 200, 255, 0.4);
                pointer-events: none;
            }

            .column-resize-handle {
                position: absolute;
                right: -2px;
                top: 0;
                bottom: 0;
                width: 4px;
                z-index: 20;
                background-color: #adf;
                pointer-events: none;
            }
        }

        .tableWrapper {
            margin: 1em 0;
            overflow-x: auto;
        }

        .resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            text-size-adjust: 100%;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-touch-callout: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;

            &:focus {
                outline: none;
            }
        }

        *::before,
        *::after {
            box-sizing: border-box;
        }

        a {
            color: inherit;
        }

        h1,
        h2,
        h3,
        p,
        ul,
        ol,
        pre,
        blockquote {
            margin: 1rem 0;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }

        h1,
        h2,
        h3 {
            line-height: 1.3;
        }

        .button {
            font-weight: bold;
            display: inline-flex;
            background: transparent;
            border: 0;
            color: $color-black;
            padding: 0.2rem 0.5rem;
            margin-right: 0.2rem;
            border-radius: 3px;
            cursor: pointer;
            background-color: rgba($color-black, 0.1);

            &:hover {
                background-color: rgba($color-black, 0.15);
            }
        }

        .message {
            background-color: rgba($color-black, 0.05);
            color: rgba($color-black, 0.7);
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            font-style: italic;
        }
    }
</style>
