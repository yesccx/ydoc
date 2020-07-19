(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-650aad50"],{"6e08":function(e,t,n){
/*!
 * Vditor v3.3.6 - A markdown editor written in TypeScript.
 *   
 * MIT License
 * 
 * Copyright (c) 2018-present B3log 开源, b3log.org
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
!function(t,n){e.exports=n()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}([function(e,t,n){"use strict";n.d(t,"h",(function(){return i})),n.d(t,"g",(function(){return o})),n.d(t,"i",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return f}));var r=n(6),i=function(e,t){for(var n=u(e,t),r=!1,i=!1;n&&!n.classList.contains("vditor-reset")&&!i;)(r=u(n.parentElement,t))?n=r:i=!0;return n||!1},o=function(e,t,n){for(var r=s(e,t,n),i=!1,o=!1;r&&!r.classList.contains("vditor-reset")&&!o;)(i=s(r.parentElement,t,n))?r=i:o=!0;return r||!1},a=function(e,t){for(var n=Object(r.b)(e,t),i=!1,o=!1;n&&!n.classList.contains("vditor-reset")&&!o;)(i=Object(r.b)(n.parentElement,t))?n=i:o=!0;return n||!1},c=function(e){var t=a(e,"UL"),n=a(e,"OL"),r=t;return n&&(!t||t&&n.contains(t))&&(r=n),r},s=function(e,t,n){if(!e)return!1;3===e.nodeType&&(e=e.parentElement);for(var r=e,i=!1;r&&!i&&!r.classList.contains("vditor-reset");)r.getAttribute(t)===n?i=!0:r=r.parentElement;return i&&r},l=function(e){if(!e)return!1;3===e.nodeType&&(e=e.parentElement);var t=e,n=!1,r=s(e,"data-block","0");if(r)return r;for(;t&&!n&&!t.classList.contains("vditor-reset");)"H1"===t.tagName||"H2"===t.tagName||"H3"===t.tagName||"H4"===t.tagName||"H5"===t.tagName||"H6"===t.tagName||"P"===t.tagName||"BLOCKQUOTE"===t.tagName||"OL"===t.tagName||"UL"===t.tagName?n=!0:t=t.parentElement;return n&&t},d=function(e,t){if(!e)return!1;3===e.nodeType&&(e=e.parentElement);for(var n=e,r=!1;n&&!r&&!n.classList.contains("vditor-reset");)n.nodeName===t?r=!0:n=n.parentElement;return r&&n},u=function(e,t){if(!e)return!1;3===e.nodeType&&(e=e.parentElement);for(var n=e,r=!1;n&&!r&&!n.classList.contains("vditor-reset");)n.classList.contains(t)?r=!0:n=n.parentElement;return r&&n},f=function(e){for(;e&&e.lastChild;)e=e.lastChild;return e}},function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return s})),n.d(t,"h",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"g",(function(){return u})),n.d(t,"f",(function(){return f})),n.d(t,"d",(function(){return m}));var r=n(3),i=n(2),o=n(0),a=function(e){var t;return getSelection().rangeCount>0&&(t=getSelection().getRangeAt(0),e.isEqualNode(t.startContainer)||e.contains(t.startContainer))||(e.focus(),(t=e.ownerDocument.createRange()).setStart(e,0),t.collapse(!0)),t},c=function(e){var t=window.getSelection().getRangeAt(0);if(!e.contains(t.startContainer)&&!Object(o.e)(t.startContainer,"vditor-panel--none"))return{left:0,top:0};var n,r=e.parentElement.getBoundingClientRect();if(0===t.getClientRects().length)if(3===t.startContainer.nodeType){var i=t.startContainer.parentElement;if(!(i&&i.getClientRects().length>0))return{left:0,top:0};n=i.getClientRects()[0]}else{var a=t.startContainer.children;if(a[t.startOffset]&&a[t.startOffset].getClientRects().length>0)n=a[t.startOffset].getClientRects()[0];else if(t.startContainer.childNodes.length>0){var c=t.cloneRange();t.selectNode(t.startContainer.childNodes[Math.max(0,t.startOffset-1)]),n=t.getClientRects()[0],t.setEnd(c.endContainer,c.endOffset),t.setStart(c.startContainer,c.startOffset)}else n=t.startContainer.getClientRects()[0];if(!n){for(var s=t.startContainer.childNodes[t.startOffset];!s.getClientRects||s.getClientRects&&0===s.getClientRects().length;)s=s.parentElement;n=s.getClientRects()[0]}}else n=t.getClientRects()[0];return{left:n.left-r.left,top:n.top-r.top}},s=function(e,t){if(!t){if(0===getSelection().rangeCount)return!1;t=getSelection().getRangeAt(0)}var n=t.commonAncestorContainer;return e.isEqualNode(n)||e.contains(n)},l=function(e){var t=window.getSelection();t.removeAllRanges(),t.addRange(e)},d=function(e,t,n){var r={end:0,start:0};if(!n){if(0===getSelection().rangeCount)return r;n=window.getSelection().getRangeAt(0)}if(s(t,n)){var i=n.cloneRange();e.childNodes[0]&&e.childNodes[0].childNodes[0]?i.setStart(e.childNodes[0].childNodes[0],0):i.selectNodeContents(e),i.setEnd(n.startContainer,n.startOffset),r.start=i.toString().length,r.end=r.start+n.toString().length}return r},u=function(e,t,n){var r=0,i=0,o=n.childNodes[i],a=!1,c=!1;e=Math.max(0,e),t=Math.max(0,t);var s=n.ownerDocument.createRange();for(s.setStart(o||n,0),s.collapse(!0);!c&&o;){var d=r+o.textContent.length;if(!a&&e>=r&&e<=d&&(0===e?s.setStart(o,0):3===o.childNodes[0].nodeType?s.setStart(o.childNodes[0],e-r):o.nextSibling?s.setStartBefore(o.nextSibling):s.setStartAfter(o),a=!0,e===t)){c=!0;break}a&&t>=r&&t<=d&&(0===t?s.setEnd(o,0):3===o.childNodes[0].nodeType?s.setEnd(o.childNodes[0],t-r):o.nextSibling?s.setEndBefore(o.nextSibling):s.setEndAfter(o),c=!0),r=d,o=n.childNodes[++i]}return!c&&n.childNodes[i-1]&&s.setStartBefore(n.childNodes[i-1]),l(s),s},f=function(e,t){var n=e.querySelector("wbr");if(n){if(n.previousElementSibling)if(n.previousElementSibling.isSameNode(n.previousSibling)){if(n.previousElementSibling.lastChild)return t.setStartBefore(n),t.collapse(!0),l(t),!Object(i.c)()||"EM"!==n.previousElementSibling.tagName&&"STRONG"!==n.previousElementSibling.tagName&&"S"!==n.previousElementSibling.tagName||(t.insertNode(document.createTextNode(r.a.ZWSP)),t.collapse(!1)),void n.remove();t.setStartAfter(n.previousElementSibling)}else t.setStart(n.previousSibling,n.previousSibling.textContent.length);else n.previousSibling?t.setStart(n.previousSibling,n.previousSibling.textContent.length):n.nextSibling?3===n.nextSibling.nodeType?t.setStart(n.nextSibling,0):t.setStartBefore(n.nextSibling):t.setStart(n.parentElement,0);t.collapse(!0),n.remove(),l(t)}},m=function(e,t){var n=document.createElement("div");n.innerHTML=e;var r="sv"===t.currentMode?n.querySelectorAll('[data-type="p"]'):n.querySelectorAll("p");1===r.length&&!r[0].previousSibling&&!r[0].nextSibling&&t[t.currentMode].element.children.length>0&&("sv"===t.currentMode&&r[0].querySelectorAll('[data-type="newline"]').forEach((function(e){e.remove()})),e=r[0].innerHTML.trim());var i=document.createElement("template");i.innerHTML=e;var c=a(t[t.currentMode].element);""!==c.toString()&&(t[t.currentMode].preventInput=!0,document.execCommand("delete",!1,""));var s=Object(o.c)(c.startContainer);i.content.firstElementChild&&"0"===i.content.firstElementChild.getAttribute("data-block")&&s?s.insertAdjacentHTML("afterend",e):(c.insertNode(i.content.cloneNode(!0)),c.collapse(!1))}},function(e,t,n){"use strict";n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"g",(function(){return s})),n.d(t,"c",(function(){return l}));var r=function(){return navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")},i=function(){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1},o=function(){try{return"undefined"!=typeof localStorage}catch(e){return!1}},a=function(){return navigator.userAgent.indexOf("iPhone")>-1?"touchstart":"click"},c=function(e){return navigator.platform.toUpperCase().indexOf("MAC")>=0?!(!e.metaKey||e.ctrlKey):!(e.metaKey||!e.ctrlKey)},s=function(e){return/Mac/.test(navigator.platform)||"iPhone"===navigator.platform?(e=e.replace("ctrl","⌘").replace("shift","⇧").replace("alt","⌥")).indexOf("⇧")>-1&&(e=i()?e.replace(";",":").replace("=","+"):e.replace(":",";").replace("+","=").replace("_","-")):(e=e.replace("⌘","ctrl").replace("⇧","shift").replace("⌥","alt")).indexOf("shift")>-1&&(e=e.replace(";",":").replace("=","+")),e},l=function(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}},function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}));var r="3.3.6",i=function(){function e(){}return e.ZWSP="​",e.MOBILE_WIDTH=520,e.CLASS_MENU_DISABLED="vditor-menu--disabled",e.EDIT_TOOLBARS=["emoji","headings","bold","italic","strike","link","list","ordered-list","outdent","indent","check","line","quote","code","inline-code","insert-after","insert-before","upload","record","table"],e.CODE_THEME=["abap","algol","algol_nu","arduino","autumn","borland","bw","colorful","dracula","emacs","friendly","fruity","github","igor","lovelace","manni","monokai","monokailight","murphy","native","paraiso-dark","paraiso-light","pastie","perldoc","pygments","rainbow_dash","rrt","solarized-dark","solarized-dark256","solarized-light","swapoff","tango","trac","vim","vs","xcode"],e.CODE_LANGUAGES=["mermaid","echarts","mindmap","abc","graphviz","apache","bash","cs","cpp","css","coffeescript","diff","xml","http","ini","json","java","javascript","js","makefile","markdown","nginx","objectivec","php","perl","properties","python","ruby","sql","shell","dart","erb","go","gradle","julia","kotlin","less","lua","matlab","rust","scss","typescript","ts","yaml"],e.CDN="https://cdn.jsdelivr.net/npm/vditor@3.3.6",e.MARKDOWN_OPTIONS={autoSpace:!1,chinesePunct:!1,codeBlockPreview:!0,fixTermTypo:!1,footnotes:!0,linkBase:"",listStyle:!1,paragraphBeginningSpace:!1,sanitize:!0,setext:!0,toc:!1},e.HLJS_OPTIONS={enable:!0,lineNumber:!1,style:"github"},e.MATH_OPTIONS={engine:"KaTeX",inlineDigit:!1,macros:{}},e.THEME_OPTIONS={current:"light",list:{dark:"Dark",light:"Light",wechat:"WeChat"},path:e.CDN+"/dist/css/content-theme"},e}()},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={en_US:{alignCenter:"Center",alignLeft:"Left",alignRight:"Right",alternateText:"Alternate text",bold:"Blod",both:"editor & preview",check:"Task List",code:"Code Block","code-theme":"Code Block Theme Preview",column:"Column",confirm:"Confirm","content-theme":"Content Theme Preview",copied:"Copied",copy:"Copy","delete-column":"Delete Row","delete-row":"Delete Column",devtools:"DevTools",down:"Down",downloadTip:"The browser does not support the download function",edit:"Edit","edit-mode":"Toggle Edit Mode",emoji:"Emoji",export:"Export",fileTypeError:"file type is error",footnoteRef:"Footnote Ref",fullscreen:"Toggle Fullscreen",generate:"Generating",headings:"Headings",help:"Help",imageURL:"image URL",indent:"Indent",info:"Info","inline-code":"Inline Code","insert-after":"Insert line after","insert-before":"Insert line Before","insert-column":"Insert Column","insert-row":"Insert Row",instantRendering:"Instant Rendering",italic:"Italic",language:"Language",line:"Line",link:"Link",linkRef:"Link Ref",list:"List",more:"More",nameEmpty:"Name is empty","ordered-list":"Order List",outdent:"Outdent",outline:"Outline",over:"over",performanceTip:"Real-time preview requires ${x}ms, you can close it",preview:"Preview",quote:"Quote",record:"Start Record/End Record","record-tip":"The device does not support recording",recording:"recording...",redo:"Redo",remove:"Remove",row:"Row",splitView:"Split View",strike:"Strike",table:"Table",textIsNotEmpty:"text(no empty)",tooltipText:"Tooltip text",undo:"Undo",up:"Up",update:"Update",upload:"Upload image or file",uploadError:"upload error",uploading:"uploading...",wysiwyg:"WYSIWYG"},ko_KR:{alignCenter:"가운데",alignLeft:"왼쪽",alignRight:"오른쪽",alternateText:"이미지 태그",bold:"굵게",both:"에디터 & 미리보기",check:"체크박스",code:"코드블럭삽입","code-theme":"코드블럭테마",column:"행",confirm:"확인","content-theme":"컨텐츠테마",copied:"복사완료",copy:"복사","delete-column":"열 삭제","delete-row":"행 삭제",devtools:"개발툴",down:"다운",downloadTip:"브라우저가 다운로드 기능을 지원하지 않습니다",edit:"수정","edit-mode":"편집모드",emoji:"이모지",export:"내보내기",fileTypeError:"지원하지않습니다.",footnoteRef:"각주참조",fullscreen:"전체화면",generate:"생성",headings:"제목크기",help:"도움말",imageURL:"이미지 URL",indent:"들여쓰기",info:"정보","inline-code":"인라인코드","insert-after":"블락 뒤로 입력","insert-before":"블락 앞으로 입력","insert-column":"열 삽입","insert-row":"행 삽입",instantRendering:"타이포라",italic:"기울임꼴",language:"언어",line:"문단나눔",link:"링크",linkRef:"링크 참조",list:"순서없는 목록",more:"더보기",nameEmpty:"이름이 비어있습니다.","ordered-list":"순서있는 목록",outdent:"내어쓰기",outline:"개요",over:"오버",performanceTip:"실시간 미리보기에는 ${x}ms가 필요하며 에디터/미리보기 버튼을 클릭하여 닫을 수 있습니다.",preview:"미리보기",quote:"인용단락",record:"녹음시작/녹음종료","record-tip":"녹음을 지원하지 않습니다.",recording:"녹음중...",redo:"되돌리기",remove:"삭제",row:"열",splitView:"마크다운",strike:"취소선",table:"표삽입",textIsNotEmpty:"텍스트(no empty)",tooltipText:"툴팁",undo:"취소하기",up:"위로",update:"업데이트",upload:"이미지 업로드하기",uploadError:"업로드 실패",uploading:"업로드중...",wysiwyg:"위지위그"},zh_CN:{alignCenter:"居中",alignLeft:"居左",alignRight:"居右",alternateText:"替代文本",bold:"粗体",both:"编辑 & 预览",check:"任务列表",code:"代码块","code-theme":"代码块主题预览",column:"列",confirm:"确定","content-theme":"内容主题预览",copied:"已复制",copy:"复制","delete-column":"删除列","delete-row":"删除行",devtools:"开发者工具",down:"下",downloadTip:"该浏览器不支持下载功能",edit:"编辑","edit-mode":"切换编辑模式",emoji:"表情",export:"导出",fileTypeError:"文件类型不允许上传",footnoteRef:"脚注标识",fullscreen:"全屏切换",generate:"生成中",headings:"标题",help:"帮助",imageURL:"图片地址",indent:"列表缩进",info:"关于","inline-code":"行内代码","insert-after":"末尾插入行","insert-before":"起始插入行","insert-column":"插入列","insert-row":"插入行",instantRendering:"即时渲染",italic:"斜体",language:"语言",line:"分隔线",link:"链接",linkRef:"引用标识",list:"无序列表",more:"更多",nameEmpty:"文件名不能为空","ordered-list":"有序列表",outdent:"列表反向缩进",outline:"大纲",over:"超过",performanceTip:"实时预览需 ${x}ms，可点击编辑 & 预览按钮进行关闭",preview:"预览",quote:"引用",record:"开始录音/结束录音","record-tip":"该设备不支持录音功能",recording:"录音中...",redo:"重做",remove:"删除",row:"行",splitView:"分屏预览",strike:"删除线",table:"表格",textIsNotEmpty:"文本（不能为空）",tooltipText:"提示文本",undo:"撤销",up:"上",update:"更新",upload:"上传图片或文件",uploadError:"上传错误",uploading:"上传中...",wysiwyg:"所见即所得"}}},function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}));var r=function(e,t){if(document.getElementById(t))return!1;var n=new XMLHttpRequest;n.open("GET",e,!1),n.setRequestHeader("Accept","text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"),n.send("");var r=document.createElement("script");r.type="text/javascript",r.text=n.responseText,r.id=t,document.head.appendChild(r)},i=function(e,t){return new Promise((function(n,r){if(document.getElementById(t))return n(),!1;var i=document.createElement("script");i.src=e,i.async=!0,document.head.appendChild(i),i.onload=function(){if(document.getElementById(t))return i.remove(),n(),!1;i.id=t,n()}}))}},function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}));var r=function(e,t){if(!e)return!1;3===e.nodeType&&(e=e.parentElement);for(var n=e,r=!1;n&&!r&&!n.classList.contains("vditor-reset");)0===n.nodeName.indexOf(t)?r=!0:n=n.parentElement;return r&&n},i=function(e){var t=r(e,"H");return!(!t||2!==t.tagName.length||"HR"===t.tagName)&&t}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e,t){if(!document.getElementById(t)){var n=document.createElement("link");n.id=t,n.rel="stylesheet",n.type="text/css",n.href=e,document.getElementsByTagName("head")[0].appendChild(n)}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(7),i=function(e,t){var n=document.getElementById("vditorContentTheme"),i=t+"/"+e+".css";n?n.href!==i&&(n.remove(),Object(r.a)(i,"vditorContentTheme")):Object(r.a)(i,"vditorContentTheme")}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){return e.replace(/\u00a0/g," ")}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(5),o=function(e,t){void 0===e&&(e=document),void 0===t&&(t=r.a.CDN);var n=e.querySelectorAll(".language-abc");n.length>0&&Object(i.a)(t+"/dist/js/abcjs/abcjs_basic.min.js","vditorAbcjsScript").then((function(){n.forEach((function(e){var t=document.createElement("div");t.className="language-abc",e.parentNode.replaceChild(t,e),ABCJS.renderAbc(t,e.textContent.trim()),t.style.overflowX="auto"}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(5),o=function(e,t){void 0===e&&(e=document),void 0===t&&(t=r.a.CDN);var n=e.querySelectorAll(".language-echarts");n.length>0&&Object(i.a)(t+"/dist/js/echarts/echarts.min.js","vditorEchartsScript").then((function(){n.forEach((function(e){var t=e.innerText.trim();if(t)try{if("true"===e.getAttribute("data-processed"))return;var n=JSON.parse(t);echarts.init(e).setOption(n),e.setAttribute("data-processed","true")}catch(t){e.className="vditor-reset--error",e.innerHTML="echarts render error: <br>"+t}}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(25),i=n.n(r),o=n(4),a=n(9),c=function(e,t){void 0===t&&(t="zh_CN"),e.querySelectorAll("pre > code").forEach((function(n,r){if(!(n.classList.contains("language-mermaid")||n.classList.contains("language-echarts")||n.classList.contains("language-mindmap")||n.classList.contains("language-abc")||n.classList.contains("language-graphviz")||n.style.maxHeight.indexOf("px")>-1||e.classList.contains("vditor-preview")&&r>5)){var c=n.innerText;if(n.classList.contains("highlight-chroma")){var s=document.createElement("code");s.innerHTML=n.innerHTML,s.querySelectorAll(".highlight-ln").forEach((function(e){e.remove()})),c=s.innerText}var l=document.createElement("div");l.className="vditor-copy",l.innerHTML='<span aria-label="'+o.a[t].copy+"\"\nonmouseover=\"this.setAttribute('aria-label', '"+o.a[t].copy+"')\"\nclass=\"vditor-tooltipped vditor-tooltipped__w\"\nonclick=\"this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '"+o.a[t].copied+"')\">"+i.a+"</span>";var d=document.createElement("textarea");d.value=Object(a.a)(c),l.insertAdjacentElement("afterbegin",d),n.before(l),n.style.maxHeight=window.outerHeight-40+"px"}}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(5),o=function(e,t){void 0===t&&(t=r.a.CDN);var n=e.querySelectorAll(".language-graphviz");0!==n.length&&Object(i.a)(t+"/dist/js/graphviz/viz.js","vditorGraphVizScript").then((function(){n.forEach((function(e){if("true"!==e.getAttribute("data-processed")){try{var t=new Blob(["importScripts('"+document.getElementById("vditorGraphVizScript").src.replace("viz.js","full.render.js")+"');"],{type:"application/javascript"}),n=(window.URL||window.webkitURL).createObjectURL(t),r=new Worker(n);new Viz({worker:r}).renderSVGElement(e.textContent).then((function(t){e.innerHTML=t.outerHTML})).catch((function(t){e.innerHTML="graphviz render error: <br>"+t,e.className="vditor-math vditor-reset--error"}))}catch(e){console.error("graphviz error",e)}e.setAttribute("data-processed","true")}}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(3),i=n(5),o=n(7),a=function(e,t,n){void 0===t&&(t=document),void 0===n&&(n=r.a.CDN);var a=e.style;r.a.CODE_THEME.includes(a)||(a="github");var c=document.getElementById("vditorHljsStyle"),s=n+"/dist/js/highlight.js/styles/"+a+".css";c&&c.href!==s&&c.remove(),Object(o.a)(n+"/dist/js/highlight.js/styles/"+a+".css","vditorHljsStyle"),!1!==e.enable&&0!==t.querySelectorAll("pre > code").length&&Object(i.a)(n+"/dist/js/highlight.js/highlight.pack.js","vditorHljsScript").then((function(){t.querySelectorAll("pre > code").forEach((function(t){if(!t.parentElement.classList.contains("vditor-ir__marker--pre")&&!t.parentElement.classList.contains("vditor-wysiwyg__pre")&&!(t.classList.contains("language-mermaid")||t.classList.contains("language-echarts")||t.classList.contains("language-mindmap")||t.classList.contains("language-abc")||t.classList.contains("language-graphviz"))&&(hljs.highlightBlock(t),e.lineNumber)){t.classList.add("vditor-linenumber");var n=t.querySelector(".vditor-linenumber__temp");n||((n=document.createElement("div")).className="vditor-linenumber__temp",t.insertAdjacentElement("beforeend",n));var r=getComputedStyle(t).whiteSpace,i=!1;"pre-wrap"!==r&&"pre-line"!==r||(i=!0);var o="",a=t.textContent.split(/\r\n|\r|\n/g);a.pop(),a.map((function(e){var t="";i&&(n.textContent=e||"\n",t=' style="height:'+n.getBoundingClientRect().height+'px"'),o+="<span"+t+"></span>"})),n.style.display="none",o='<span class="vditor-linenumber__rows">'+o+"</span>",t.insertAdjacentHTML("beforeend",o)}}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(3),i=n(5),o=n(7),a=n(9),c=function(e,t){var n=e.querySelectorAll(".vditor-math");if(0!==n.length){var c={cdn:r.a.CDN,math:{engine:"KaTeX",inlineDigit:!1,macros:{}}};t&&t.math&&(t.math=Object.assign({},c.math,t.math)),"KaTeX"===(t=Object.assign({},c,t)).math.engine?(Object(o.a)(t.cdn+"/dist/js/katex/katex.min.css","vditorKatexStyle"),Object(i.a)(t.cdn+"/dist/js/katex/katex.min.js","vditorKatexScript").then((function(){n.forEach((function(e){if(!e.getAttribute("data-math")){var t=Object(a.a)(e.textContent);e.setAttribute("data-math",t);try{e.innerHTML=katex.renderToString(t,{displayMode:"DIV"===e.tagName,output:"html"})}catch(t){e.innerHTML=t.message,e.className="vditor-math vditor-reset--error"}e.addEventListener("copy",(function(e){e.stopPropagation(),e.preventDefault();var t=e.currentTarget.closest(".vditor-math");e.clipboardData.setData("text/html",t.innerHTML),e.clipboardData.setData("text/plain",t.getAttribute("data-math"))}))}}))}))):"MathJax"===t.math.engine&&(window.MathJax||(window.MathJax={loader:{paths:{mathjax:t.cdn+"/dist/js/mathjax"}},tex:{macros:t.math.macros}}),Object(i.b)(t.cdn+"/dist/js/mathjax/tex-svg.js","vditorMathJaxScript"),setTimeout((function(){n.forEach((function(e){if(!e.getAttribute("data-math")){var t=Object(a.a)(e.textContent);e.setAttribute("data-math",t),window.MathJax.texReset();var n=window.MathJax.getMetricsFor(e);n.display="DIV"===e.tagName,window.MathJax.tex2svgPromise(t,n).then((function(t){e.innerHTML="",e.append(t),window.MathJax.startup.document.clear(),window.MathJax.startup.document.updateDocument();var n=e.querySelector("mjx-container").textContent.trim();""!==n&&(e.innerHTML=n,e.className="vditor-math vditor-reset--error")}))}}))})))}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(5),o=function(e,t,n){void 0===t&&(t=".language-mermaid"),void 0===n&&(n=r.a.CDN),0!==e.querySelectorAll(t).length&&Object(i.a)(n+"/dist/js/mermaid/mermaid.min.js","vditorMermaidScript").then((function(){mermaid.init({noteMargin:10},t)}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(5),o=function(e,t){void 0===e&&(e=document),void 0===t&&(t=r.a.CDN);var n=e.querySelectorAll(".language-mindmap");n.length>0&&Object(i.a)(t+"/dist/js/echarts/echarts.min.js","vditorEchartsScript").then((function(){n.forEach((function(e){var t=e.getAttribute("data-code");if(t)try{if("true"===e.getAttribute("data-processed"))return;var n={series:[{data:[JSON.parse(decodeURIComponent(t))],initialTreeDepth:-1,itemStyle:{borderWidth:0,color:"#4285f4"},label:{backgroundColor:"#f6f8fa",borderColor:"#d1d5da",borderRadius:5,borderWidth:.5,color:"#586069",lineHeight:20,offset:[-5,0],padding:[0,5],position:"insideRight"},lineStyle:{color:"#d1d5da",width:1},roam:!0,symbol:function(e,t){var n;return(null===(n=null==t?void 0:t.data)||void 0===n?void 0:n.children)?"circle":"path://"},type:"tree"}],tooltip:{trigger:"item",triggerOn:"mousemove"}};echarts.init(e).setOption(n),e.setAttribute("data-processed","true")}catch(t){e.className="vditor-reset--error",e.innerHTML="mindmap render error: <br>"+t}}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){e&&e.querySelectorAll("a").forEach((function(e){var t=e.getAttribute("href");t&&(t.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)?function(e,t){e.insertAdjacentHTML("afterend",'<video controls="controls" src="'+t+'"></video>'),e.remove()}(e,t):t.match(/^.+.(mp3|wav|flac)$/)?function(e,t){e.insertAdjacentHTML("afterend",'<audio controls="controls" src="'+t+'"></audio>'),e.remove()}(e,t):function(e,t){var n=t.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/),r=t.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/),i=t.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/),o=t.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/),a=t.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/),c=t.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/),s=t.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/),l=t.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);n&&11===n[1].length?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video" src="//www.youtube.com/embed/'+n[1]+(n[2]?"?start="+n[2]:"")+'"></iframe>'),e.remove()):r&&r[1]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video" src="//player.youku.com/embed/'+r[1]+'"></iframe>'),e.remove()):i&&i[1]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid='+i[1]+'"></iframe>'),e.remove()):o&&o[1]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video"\n src="//coub.com/embed/'+o[1]+'?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>'),e.remove()):a&&a[0]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video"\n src="https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(a[0])+'"></iframe>'),e.remove()):c&&c[2]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video"\n src="https://www.dailymotion.com/embed/video/'+c[2]+'"></iframe>'),e.remove()):s&&s[1]?(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video"\n src="//player.bilibili.com/player.html?bvid='+s[1]+'"></iframe>'),e.remove()):l&&l[1]&&(e.insertAdjacentHTML("afterend",'<iframe class="iframe__video" src="//embed.ted.com/talks/'+l[1]+'"></iframe>'),e.remove())}(e,t))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(3),i=n(7),o=function(e,t){void 0===t&&(t=r.a.CDN),r.a.CODE_THEME.includes(e)||(e="github");var n=document.getElementById("vditorHljsStyle"),o=t+"/dist/js/highlight.js/styles/"+e+".css";n?n.href!==o&&(n.remove(),Object(i.a)(o,"vditorHljsStyle")):Object(i.a)(o,"vditorHljsStyle")}},function(e,t){e.exports='<svg version=1.1 xmlns=http://www.w3.org/2000/svg width=32 height=32 viewBox="0 0 32 32"> <path d="M6 0v32l20-15.977-20-16.023z"></path> </svg> '},function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(6),i=function(e,t,n){var i="";Array.from(e.children).forEach((function(e,t){if(Object(r.a)(e)){var o=parseInt(e.tagName.substring(1),10),a=new Array(2*(o-1)).fill("&emsp;").join(""),c="";c=n&&"ir"===n.currentMode?e.textContent.substring(o+1).trim():e.textContent.trim();var s=e.id.lastIndexOf("_"),l=e.id.substring(0,-1===s?void 0:s);e.id=l+"_"+t,i+='<div data-id="'+e.id+'" class="vditor-outline__item">'+a+c+"</div>"}})),t.innerHTML=i,t.querySelectorAll(".vditor-outline__item").forEach((function(r){r.addEventListener("click",(function(i){var o=document.getElementById(r.getAttribute("data-id"));if(o){if(n)if("auto"===n.options.height){var a=o.offsetTop+n.element.offsetTop;n.options.toolbarConfig.pin||(a+=n.toolbar.element.offsetHeight),window.scrollTo(window.scrollX,a)}else n.element.offsetTop<window.scrollY&&window.scrollTo(window.scrollX,n.element.offsetTop),n.preview.element.contains(e)?e.parentElement.scrollTop=o.offsetTop:e.scrollTop=o.offsetTop;else window.scrollTo(window.scrollX,o.offsetTop);t.querySelectorAll(".vditor-outline__item").forEach((function(e){e.classList.remove("vditor-outline__item--current")})),r.classList.add("vditor-outline__item--current")}}))}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n={},i=function(e){for(var t in e)e.hasOwnProperty(t)&&("[object Object]"===Object.prototype.toString.call(e[t])?n[t]=r(n[t],e[t]):n[t]=e[t])},o=0;o<e.length;o++)i(e[o]);return n}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){var t=Lute.New();return t.PutEmojis(e.emojis),t.SetEmojiSite(e.emojiSite),t.SetHeadingAnchor(e.headingAnchor),t.SetInlineMathAllowDigitAfterOpenMarker(e.inlineMathDigit),t.SetAutoSpace(e.autoSpace),t.SetToC(e.toc),t.SetFootnotes(e.footnotes),t.SetChinesePunct(e.chinesePunct),t.SetFixTermTypo(e.fixTermTypo),t.SetVditorCodeBlockPreview(e.codeBlockPreview),t.SetSetext(e.setext),t.SetSanitize(e.sanitize),t.SetChineseParagraphBeginningSpace(e.paragraphBeginningSpace),t.SetRenderListStyle(e.listStyle),t.SetLinkBase(e.linkBase),e.lazyLoadImage&&t.SetImageLazyLoading(e.lazyLoadImage),t}},function(e,t){e.exports='<svg version=1.1 xmlns=http://www.w3.org/2000/svg width=32 height=32 viewBox="0 0 32 32"> <path d="M11 0h-6c-0.553 0-1 0.448-1 1v30c0 0.553 0.447 1 1 1h6c0.553 0 1-0.447 1-1v-30c0-0.552-0.447-1-1-1zM27 0h-6c-0.553 0-1 0.448-1 1v30c0 0.553 0.447 1 1 1h6c0.553 0 1-0.447 1-1v-30c0-0.552-0.447-1-1-1z"></path> </svg> '},function(e,t){e.exports='<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 32 32" width=32px height=32px> <path d="M28.681 11.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.379 0-2.5 1.121-2.5 2.5v23c0 1.378 1.121 2.5 2.5 2.5h19c1.378 0 2.5-1.122 2.5-2.5v-15.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 9.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268v0zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-19c-0.271 0-0.5-0.229-0.5-0.5v-23c0-0.271 0.229-0.5 0.5-0.5 0 0 11.499-0 11.5 0v7c0 0.552 0.448 1 1 1h7v15.5zM18.841 1.319c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.378 0-2.5 1.121-2.5 2.5v23c0 1.207 0.86 2.217 2 2.45v-25.45c0-0.271 0.229-0.5 0.5-0.5h15.215c-0.301-0.248-0.595-0.477-0.873-0.681z"></path> </svg>'},function(e,t,n){"use strict";n.r(t);var r=n(10),i=n(11),o=n(12),a=n(13),c=n(14),s=function(e){void 0===e&&(e=document);var t=function(e){var t=document.createElement("img");t.src=e.getAttribute("data-src"),t.addEventListener("load",(function(){e.getAttribute("style")||e.getAttribute("class")||e.getAttribute("width")||e.getAttribute("height")||t.naturalHeight>t.naturalWidth&&t.naturalWidth/t.naturalHeight<document.querySelector(".vditor-reset").clientWidth/(window.innerHeight-40)&&t.naturalHeight>window.innerHeight-40&&(e.style.height=window.innerHeight-40+"px"),e.src=t.src})),e.removeAttribute("data-src")};if(!("IntersectionObserver"in window))return e.querySelectorAll("img").forEach((function(e){e.getAttribute("data-src")&&t(e)})),!1;window.vditorImageIntersectionObserver?(window.vditorImageIntersectionObserver.disconnect(),e.querySelectorAll("img").forEach((function(e){window.vditorImageIntersectionObserver.observe(e)}))):(window.vditorImageIntersectionObserver=new IntersectionObserver((function(e){e.forEach((function(e){(void 0===e.isIntersecting?0!==e.intersectionRatio:e.isIntersecting)&&e.target.getAttribute("data-src")&&t(e.target)}))})),e.querySelectorAll("img").forEach((function(e){window.vditorImageIntersectionObserver.observe(e)})))},l=n(15),d=n(18),u=n(16),f=n(17),m=n(21),p=n(3),h=n(8),g=n(5),v=n(22),b=n(23),w=n(24),y=n.n(w),S=n(20),j=n.n(S),x=n(1),T=function(e,t){if(void 0===t&&(t="zh_CN"),"undefined"!=typeof speechSynthesis&&"undefined"!=typeof SpeechSynthesisUtterance){var n=document.querySelector(".vditor-speech");if(!n){(n=document.createElement("div")).className="vditor-speech",document.body.insertAdjacentElement("beforeend",n);var r=function(){var e,n;return speechSynthesis.getVoices().forEach((function(r){r.lang===t.replace("_","-")&&(e=r),r.default&&(n=r)})),e||(e=n),e};void 0!==speechSynthesis.onvoiceschanged&&(speechSynthesis.onvoiceschanged=r);var i=r();n.onclick=function(){if("vditor-speech"===n.className){var e=new SpeechSynthesisUtterance(n.getAttribute("data-text"));e.voice=i,e.onend=function(){n.className="vditor-speech",speechSynthesis.cancel(),n.innerHTML=j.a},speechSynthesis.speak(e),n.className="vditor-speech vditor-speech--current",n.innerHTML=y.a}else speechSynthesis.speaking&&(speechSynthesis.paused?(speechSynthesis.resume(),n.innerHTML=y.a):(speechSynthesis.pause(),n.innerHTML=j.a));Object(x.h)(window.vditorSpeechRange)},document.body.addEventListener("click",(function(){""===getSelection().toString().trim()&&"block"===n.style.display&&(n.className="vditor-speech",speechSynthesis.cancel(),n.style.display="none")}))}e.addEventListener("mouseup",(function(e){var t=getSelection().toString().trim();if(speechSynthesis.cancel(),""!==getSelection().toString().trim()){window.vditorSpeechRange=getSelection().getRangeAt(0).cloneRange();var r=getSelection().getRangeAt(0).getBoundingClientRect();n.innerHTML=j.a,n.style.display="block",n.style.top=r.top+r.height+document.querySelector("html").scrollTop-20+"px",n.style.left=e.screenX+2+"px",n.setAttribute("data-text",t)}else"block"===n.style.display&&(n.className="vditor-speech",n.style.display="none")}))}},E=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function c(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}s((r=r.apply(e,t||[])).next())}))},C=function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!((i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},L=function(e){var t={anchor:0,cdn:p.a.CDN,customEmoji:{},emojiPath:(e&&e.emojiPath||p.a.CDN)+"/dist/images/emoji",hljs:p.a.HLJS_OPTIONS,lang:"zh_CN",markdown:p.a.MARKDOWN_OPTIONS,math:p.a.MATH_OPTIONS,speech:{enable:!1},theme:p.a.THEME_OPTIONS};return Object(v.a)(t,e)},O=function(e,t){var n=L(t);return Object(g.a)(n.cdn+"/dist/js/lute/lute.min.js","vditorLuteScript").then((function(){var r=Object(b.a)({autoSpace:n.markdown.autoSpace,chinesePunct:n.markdown.chinesePunct,codeBlockPreview:n.markdown.codeBlockPreview,emojiSite:n.emojiPath,emojis:n.customEmoji,fixTermTypo:n.markdown.fixTermTypo,footnotes:n.markdown.footnotes,headingAnchor:0!==n.anchor,inlineMathDigit:n.math.inlineDigit,lazyLoadImage:n.lazyLoadImage,linkBase:n.markdown.linkBase,listStyle:n.markdown.listStyle,paragraphBeginningSpace:n.markdown.paragraphBeginningSpace,sanitize:n.markdown.sanitize,setext:n.markdown.setext,toc:n.markdown.toc});return(null==t?void 0:t.renderers)&&r.SetJSRenderers({renderers:{Md2HTML:t.renderers}}),r.Md2HTML(e)}))},A=function(e,t,n){return E(void 0,void 0,void 0,(function(){var m,p;return C(this,(function(g){switch(g.label){case 0:return m=L(n),[4,O(t,m)];case 1:return p=g.sent(),m.transform&&(p=m.transform(p)),e.innerHTML=p,e.classList.add("vditor-reset"),Object(h.a)(m.theme.current,m.theme.path),1===m.anchor&&e.classList.add("vditor-reset--anchor"),Object(o.a)(e,m.lang),Object(c.a)(m.hljs,e,m.cdn),Object(l.a)(e,{cdn:m.cdn,math:m.math}),Object(u.a)(e,".language-mermaid",m.cdn),Object(a.a)(e,m.cdn),Object(i.a)(e,m.cdn),Object(f.a)(e,m.cdn),Object(r.a)(e,m.cdn),Object(d.a)(e),m.speech.enable&&T(e,m.lang),0!==m.anchor&&(v=m.anchor,document.querySelectorAll(".vditor-anchor").forEach((function(e){1===v&&e.classList.add("vditor-anchor--left"),e.onclick=function(){var t=e.getAttribute("href").substr(1),n=document.getElementById("vditorAnchor-"+t).offsetTop;document.querySelector("html").scrollTop=n}})),window.onhashchange=function(){var e=document.getElementById("vditorAnchor-"+decodeURIComponent(window.location.hash.substr(1)));e&&(document.querySelector("html").scrollTop=e.offsetTop)}),m.after&&m.after(),m.lazyLoadImage&&s(e),[2]}var v}))}))},k=n(19),N=function(){function e(){}return e.codeRender=o.a,e.graphvizRender=a.a,e.highlightRender=c.a,e.mathRender=l.a,e.mermaidRender=u.a,e.chartRender=i.a,e.abcRender=r.a,e.mindmapRender=f.a,e.outlineRender=m.a,e.mediaRender=d.a,e.speechRender=T,e.lazyLoadImageRender=s,e.md2html=O,e.preview=A,e.setCodeTheme=k.a,e.setContentTheme=h.a,e}();t.default=N}]).default}))},"81d8":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"c-library-editor-markdown-view"},[n("h1",{staticClass:"doc-title"},[e._v(e._s(e.docInfo.title))]),n("div",{ref:"markdown"})])},i=[],o=(n("96cf"),n("3b8d")),a=n("6e08"),c=n.n(a),s={name:"c-library-editor-markdown-view",props:{docInfo:{type:Object,default:function(){return{}}}},watch:{"docInfo.content":{handler:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.render(t);case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}},mounted:function(){this.render(this.docInfo.content)},methods:{render:function(e){c.a.preview(this.$refs.markdown,e,{hljs:{lineNumber:!0}})}}},l=s,d=(n("8cff"),n("2877")),u=Object(d["a"])(l,r,i,!1,null,null,null);t["default"]=u.exports},"8cff":function(e,t,n){"use strict";var r=n("f9e1"),i=n.n(r);i.a},f9e1:function(e,t,n){}}]);