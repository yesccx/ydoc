(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3798c6ba"],{"476c":function(e,r,t){"use strict";t("8e6e"),t("ac6a"),t("456d"),t("96cf");var n=t("3b8d"),i=t("bd86"),a=t("2f62");function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){Object(i["a"])(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}r["a"]={computed:o(o({},Object(a["c"])("libraryPreview",["libraryShareInfo","isAccessed","isShareSimplify"])),Object(a["b"])("libraryPreview",["libraryId","shareAccessToken"])),inject:["libraryPreviewEventBus"],watch:{isAccessed:{handler:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=5;break}if(e.t0=this.initComponent,!e.t0){e.next=5;break}return e.next=5,this.initComponent();case 5:case"end":return e.stop()}}),e,this)})));function r(r){return e.apply(this,arguments)}return r}(),immediate:!0}},created:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.initEventBus&&this.initEventBus(this.libraryPreviewEventBus);case 1:case"end":return e.stop()}}),e,this)})));function r(){return e.apply(this,arguments)}return r}()}},"557a":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"c-library-preview-drawer"},[t("c-library-preview-info-modal",{attrs:{"share-info":e.libraryShareInfo,visible:e.shareInfoModal.visible},on:{"update:visible":function(r){return e.$set(e.shareInfoModal,"visible",r)}}})],1)},i=[],a=t("476c"),c={name:"c-library-preview-drawer",components:{"c-library-preview-info-modal":function(){return t.e("chunk-52d34774").then(t.bind(null,"9d0f"))}},mixins:[a["a"]],data:function(){return{shareInfoModal:{visible:!1}}},methods:{initEventBus:function(e){var r=this;e.$on("share-info-view",(function(){r.shareInfoModal.visible=!0}))}}},o=c,s=t("2877"),u=Object(s["a"])(o,n,i,!1,null,null,null);r["default"]=u.exports}}]);