(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6990a55f"],{"0b16":function(t,e,a){},"68c7":function(t,e,a){"use strict";a("96cf");var n=a("3b8d");e["a"]={data:function(){return{pageLoading:!0,pageFirstInited:!1}},methods:{checkValidate:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs||!this.$refs[e]){t.next=5;break}return t.next=3,this.$refs[e].validate();case 3:return a=t.sent,t.abrupt("return",a);case 5:return t.abrupt("return",!1);case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),resetValidate:function(t){this.$refs&&this.$refs[t]&&this.$refs[t].resetFields()},loadaction:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e,a){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this[a]=!0,t.next=3,e();case 3:return n=t.sent,this[a]=!1,t.abrupt("return",n);case 6:case"end":return t.stop()}}),t,this)})));function e(e,a){return t.apply(this,arguments)}return e}()}}},"6d57":function(t,e,a){},"7d5a":function(t,e,a){"use strict";var n=a("6d57"),s=a.n(n);s.a},e248:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.pageLoading,expression:"pageLoading"}],staticClass:"page-user-info"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"user-base-info"},[a("el-avatar",{staticClass:"user-base-info__avatar",attrs:{size:190,fit:"fill",src:t.user.avatar_url}},[t._v("^ v ^")]),a("el-divider"),a("ul",[a("li",{staticClass:"user-base-info__item"},[t._v("\n                        用户账号："),a("span",[t._v(t._s(t.user.account||"-"))])]),a("li",{staticClass:"user-base-info__item"},[t._v("\n                        注册时间："),a("span",[t._v(t._s(t._f("dateFormat")(t.user.reg_time)))])])])],1),a("el-card",{staticClass:"user-base-operate"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-lock",plain:""},on:{click:t.onModifyPassword}},[t._v("修改密码")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-back",plain:""},on:{click:t.onLogout}},[t._v("退出登录")])],1)],1),a("el-col",{staticClass:"user-info",attrs:{span:18}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("p",[t._v("个人信息")])]),a("ul",[a("li",[a("div",[a("span",{staticClass:"field"},[t._v("用户名 / 登录账号")]),a("span",{staticClass:"value"},[t._v(t._s(t.user.account||"-"))])])]),a("li",{on:{click:t.onUserNicknameModify}},[a("div",[a("span",{staticClass:"field"},[t._v("用户昵称")]),a("span",{staticClass:"value"},[t._v(t._s(t.user.nickname||"-"))])]),a("span",{staticClass:"operate"},[t._v("\n                            修改"),a("i",{staticClass:"el-icon-arrow-right"})])])])]),a("el-card",{attrs:{disabled:""}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("p",[t._v("联系方式")])]),a("ul",[a("li",[a("div",[a("span",{staticClass:"field"},[t._v("手机号")]),a("span",{staticClass:"value"},[t._v(t._s(t.user.phone||"-"))])]),a("span",{staticClass:"operate"},[t._v("\n                            立即绑定\n                            "),a("i",{staticClass:"el-icon-arrow-right"})])]),a("li",[a("div",[a("span",{staticClass:"field"},[t._v("QQ号")]),a("span",{staticClass:"value"},[t._v(t._s(t.user.qq||"-"))])]),a("span",{staticClass:"operate"},[a("i",{staticClass:"el-icon-arrow-right"})])]),a("li",[a("div",[a("span",{staticClass:"field"},[t._v("邮箱")]),a("span",{staticClass:"value"},[t._v(t._s(t.user.email||"-"))])]),a("span",{staticClass:"operate"},[t._v("\n                            立即绑定\n                            "),a("i",{staticClass:"el-icon-arrow-right"})])])])])],1)],1)],1)},s=[],r=(a("96cf"),a("3b8d")),i=a("68c7"),c={name:"page-user-info",mixins:[i["a"]],data:function(){return{user:{id:0,account:"",email:"",nickname:"",reg_time:0,avatar_url:"",qq:""}}},created:function(){this.initUserInfo()},methods:{initUserInfo:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.$api.v1.UserInfo({},{loading:function(t){e.pageLoading=t}}).then((function(t){var a=t.resData;e.user=a}));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onLogout:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.$fullLoading.status=!0,t.next=3,this.$store.dispatch("userSession/logout");case 3:e=t.sent,this.$fullLoading.status=!1,e?this.$link.login():this.$tip.error("退出登录失败，请重试");case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onModifyPassword:function(){this.$link.userPassword()},onUserNicknameModify:function(){var t=this;this.$prompt("请输入新昵称","修改昵称",{confirmButtonText:"确认",cancelButtonText:"取消",inputValue:this.user.nickname,beforeClose:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(a,n,s){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("confirm"===a){e.next=3;break}return s(),e.abrupt("return",!0);case 3:return e.next=5,t.$api.v1.UserNicknameModify({nickname:n.inputValue},{loading:function(t){n.confirmButtonLoading=t,n.confirmButtonText=t?"修改中...":"确认"},report:!0}).then((function(t){t.resData;s()})).catch((function(e){var a=e.resMsg;t.$tip.error(a)}));case 5:case"end":return e.stop()}}),e)})));function a(t,a,n){return e.apply(this,arguments)}return a}()}).then((function(e){var a=e.value;t.user.nickname=a,t.$store.commit("userSession/updateNickname",a),t.$tip.success("修改成功")}))}}},o=c,u=(a("7d5a"),a("fa5bc"),a("2877")),l=Object(u["a"])(o,n,s,!1,null,"69c1441c",null);e["default"]=l.exports},fa5bc:function(t,e,a){"use strict";var n=a("0b16"),s=a.n(n);s.a}}]);