(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef8210b0"],{"0da2":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{staticClass:"c-library-content-doc-group-modal",attrs:{title:e.title,visible:e.visibleModal,"before-close":e.handleClose,width:"450px","append-to-body":""},on:{"update:visible":function(t){e.visibleModal=t}}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingModal,expression:"loadingModal"}]},[o("el-form",{attrs:{model:e.group,"label-width":"40px",size:"mini"}},[o("el-form-item",{attrs:{label:"名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"32",placeholder:"分组名称，1～32个字符之间",autocomplete:"off","show-word-limit":""},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSaveGroup(t)}},model:{value:e.group.name,callback:function(t){e.$set(e.group,"name",t)},expression:"group.name"}})],1),o("el-form-item",{attrs:{label:"简介",prop:"desc"}},[o("el-input",{attrs:{maxlength:"255",placeholder:"简介，1～255个字符之间",type:"textarea",rows:"4",resize:"none","show-word-limit":""},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSaveGroup(t)}},model:{value:e.group.desc,callback:function(t){e.$set(e.group,"desc",t)},expression:"group.desc"}})],1),o("el-form-item",{attrs:{label:"排序",prop:"sort"}},[o("el-input-number",{attrs:{min:-1,step:1e3},model:{value:e.group.sort,callback:function(t){e.$set(e.group,"sort",t)},expression:"group.sort"}})],1)],1),o("div",{staticClass:"actions"},[o("el-button",{attrs:{icon:"el-icon-close"},on:{click:e.onClose}},[e._v("取 消")]),o("el-button",{attrs:{icon:"el-icon-check",type:"primary",loading:e.saveLoading},on:{click:e.onSaveGroup}},[e._v("保 存")])],1)],1)])},r=[],n=(o("8e6e"),o("ac6a"),o("456d"),o("bd86")),a=(o("96cf"),o("3b8d")),s=(o("c5f6"),o("7cc55"));function u(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,i)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach((function(t){Object(n["a"])(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var c={name:"c-library-content-doc-group-modal",mixins:[s["a"]],props:{libraryId:{type:Number,require:!0},groupId:{type:Number,require:!0},parentId:{type:Number,require:!0}},watch:{visible:function(e){e&&this.initGroupInfo()}},computed:{title:function(){return this.group.id>0?"修改文档分组":"新增文档分组"}},data:function(){return{group:{id:0,library_id:0,name:"",desc:"",pid:0,sort:-1},isUpdated:!1,saveLoading:!1}},methods:{initGroupInfo:function(){this.group.id=this.groupId,this.group.pid=this.parentId,this.group.library_id=this.libraryId,this.isUpdated=!1,this.resetGroupInfo(),this.group.id>0&&(this.loadingModal=!0,this.getGroupInfo())},getGroupInfo:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={library_doc_group_id:this.group.id,library_id:this.group.library_id},e.next=3,this.$api.v1.LibraryDocGroupInfo(t,{loading:function(e){o.loadingModal=e}}).then((function(e){var t=e.resData;o.group=l(l({},o.group),t)})).catch((function(){o.onClose()}));case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),resetGroupInfo:function(){this.group=l(l({},this.group),{},{name:"",desc:"",sort:-1})},saveGroup:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,o,i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.group.id>0?this.$api.v1.LibraryDocGroupModify:this.$api.v1.LibraryDocGroupCreate,o=l(l({},this.group),{},{library_doc_group_id:this.group.id}),e.next=4,t(o,{loading:function(e){i.saveLoading=e}}).then((function(e){e.resData;i.isUpdated=!0,i.onClose()}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onSaveGroup:function(){this.saveGroup()},onClose:function(){var e=this;this.handleClose((function(){e.visibleModal=!1}))},handleClose:function(e){this.saveLoading?this.$notify.warning({title:"无法关闭",message:"正在保存中，请稍后"}):e()}}},p=c,d=(o("d9d3"),o("2877")),f=Object(d["a"])(p,i,r,!1,null,"7f4f687f",null);t["default"]=f.exports},"7cc55":function(e,t,o){"use strict";t["a"]={props:{visible:{type:Boolean,required:!0}},watch:{visible:function(e){this.visibleModal=e},visibleModal:function(e){this.$emit("update:visible",e),e?this.onModalOpen&&this.onModalOpen():this.$emit("close",this.$data)}},data:function(){return{visibleModal:this.visible,loadingModal:!1}},methods:{onClose:function(){this.visibleModal=!1}}}},b2a1:function(e,t,o){},d9d3:function(e,t,o){"use strict";var i=o("b2a1"),r=o.n(i);r.a}}]);