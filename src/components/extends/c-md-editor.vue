<template>
    <div class="c-md-editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button v-for="command in editorCommandsMap" :key="command.skey" class="menubar__button"
                    :class="{ 'is-active': isActive[command.cmd] && isActive[command.cmd](command.params) }"
                    @click="commands[command.cmd](command.params)">
                    <i class="icon" :class="command.sclass"></i>
                </button>
            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
        Focus,
        Placeholder,
        TrailingNode
    } from 'tiptap-extensions';

    export default {
        name: 'c-md-editor',
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        components: {
            EditorContent,
            EditorMenuBar
        },
        computed: {
            editorCommandsMap() {
                return this.editorCommands.map(command => {
                    command.sclass = `y-icon-editor-${command.field}`;
                    command.skey = `${command.field}-${command.cmd}`;
                    return command;
                });
            }
        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem({
                            nested: true
                        }),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new Focus({
                            className: 'has-focus',
                            nested: true
                        }),
                        new Placeholder({
                            emptyNodeClass: 'is-empty',
                            emptyNodeText: '请输入内容...',
                            showOnlyWhenEditable: true
                        }),
                        new TrailingNode({
                            node: 'paragraph',
                            notAfter: ['paragraph']
                        })
                    ],
                    content: this.content
                }),
                editorCommands: [
                    { field: 'bold', cmd: 'bold', params: {} },
                    { field: 'italic', cmd: 'italic', params: {} },
                    { field: 'strikethrough', cmd: 'strike', params: {} },
                    { field: 'underline', cmd: 'underline', params: {} },
                    { field: 'code', cmd: 'code', params: {} },
                    { field: 'paragraph', cmd: 'paragraph', params: {} },
                    { field: 'h1', cmd: 'heading', params: { level: 1 } },
                    { field: 'h2', cmd: 'heading', params: { level: 2 } },
                    { field: 'h3', cmd: 'heading', params: { level: 3 } },
                    { field: 'ul', cmd: 'bullet_list', params: {} },
                    { field: 'ol', cmd: 'ordered_list', params: {} },
                    { field: 'quote', cmd: 'blockquote', params: {} },
                    { field: 'code', cmd: 'code_block', params: {} },
                    { field: 'hr', cmd: 'horizontal_rule', params: {} },
                    { field: 'undo', cmd: 'undo', params: {} },
                    { field: 'redo', cmd: 'redo', params: {} },
                    { field: 'todo_list', cmd: 'todo_list', params: {} }
                ]
            };
        },
        created() {
            this.editor.on('update', ({ getHTML }) => {
                this.$emit('update:content', getHTML());
            });
        },
        beforeDestroy() {
            this.editor.destroy();
        }
    };
</script>

<style lang="scss">
    $color-black: #000000;
    $color-white: #ffffff;
    $color-grey: #dddddd;

    .y-icon-editor {
        &-todo_list,
        &-ol,
        &-ul {
            font-weight: bold;
        }
    }

    .editor {
        position: relative;
        margin: 0 auto 5rem auto;

        &__content {
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            padding: 30px;

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
    }

    .menubar {
        position: sticky;
        z-index: 10;
        top: 0;
        padding: 13px 8px;
        -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
        transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
        background: #f4f4f4;

        &__button {
            &.is-active {
                background-color: rgba(0, 0, 0, 0.1);
            }
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            background: transparent;
            border: 0;
            color: #000;
            padding: 0.2rem 0.5rem;
            margin-right: 0.2rem;
            border-radius: 3px;
            cursor: pointer;
        }
        [class*="y-icon-"],
        [class^="y-icon-"] {
            font-size: 14px;
        }
    }

    .c-md-editor {
        border: 0;
    }

    ul[data-type="todo_list"] {
        padding-left: 0;
    }
    li[data-type="todo_item"] {
        display: flex;
        flex-direction: row;
    }
    .todo-checkbox {
        border: 2px solid $color-black;
        height: 0.9em;
        width: 0.9em;
        box-sizing: border-box;
        margin-right: 10px;
        margin-top: 0.3rem;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        border-radius: 0.2em;
        background-color: transparent;
        transition: 0.4s background;
    }
    .todo-content {
        flex: 1;
        > p {
            line-height: 1.5;
        }
        > p:last-of-type {
            margin-bottom: 0;
        }
        > ul[data-type="todo_list"] {
            margin: 0.5rem 0;
        }
    }
    li[data-done="true"] {
        > .todo-content {
            > p {
                text-decoration: line-through;
            }
        }
        > .todo-checkbox {
            background-color: $color-black;
        }
    }
    li[data-done="false"] {
        text-decoration: none;
    }

    // .has-focus {
    //     border-radius: 3px;
    //     box-shadow: 0 0 0 3px #3ea4ffe6;
    // }

    p.is-empty:first-child::before {
        content: attr(data-empty-text);
        float: left;
        color: #aaa;
        pointer-events: none;
        height: 0;
        font-style: italic;
    }
</style>