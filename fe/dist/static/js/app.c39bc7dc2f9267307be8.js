webpackJsonp([1],{"7kZU":function(t,e){},"M+GR":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("/5sW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view",{staticClass:"router-view"})],1)},staticRenderFns:[]};var i=s("VU/8")({name:"App"},o,!1,function(t){s("7kZU")},"data-v-6fd8e4dc",null).exports,a=s("/ocq"),r=s("Gu7T"),c=s.n(r),p=s("mvHQ"),l=s.n(p);function u(t,e){f("GET",t,"",e)}function d(t,e,s){f("POST",t,e,s)}function f(t,e){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=new XMLHttpRequest;i.open(t,e),i.setRequestHeader("content-type","application/json"),i.onreadystatechange=function(){if(4===i.readyState&&200===i.status){var a=JSON.parse(i.responseText);0!==a.errCode?o>=2?alert(a.errMsg):setTimeout(function(){f(t,e,s="",n,o+1)},200):n&&n(a.info)}},i.send(l()(s))}function h(t,e,s){var n=e.map(function(t){return{type:t,color:s[t].color}});d("/v1/project/update_entity_types",{projectName:t,entityTypes:l()(n)})}var y={name:"NER",data:function(){return{configCanCtlType:!1,pageNumber:1,pageSize:20,inputType:"",projectName:"",projectType:"",columnWordCount:10,files:[],textDic:{},startIdx:-1,endIdx:-1,nowFile:"",nowText:"",ners:[],nowNer:{},nowType:"",typeList:["person","location","organiztion"],isAnnoDic:{},nowFocus:"",fastKeyType:localStorage.fastKeyType?JSON.parse(localStorage.fastKeyType):{},fastTypeKey:localStorage.fastTypeKey?JSON.parse(localStorage.fastTypeKey):{},types:{person:{color:"#e61490"},location:{color:"#0aab8a"},organiztion:{color:"#2770cd"}},wordsType:[],wordsOutType:[],nersCache:{},mode:""}},computed:{wordColor:function(){return"#ff0000"},nowNers:function(){return this.nowNer?[].concat(c()(this.ners),[this.nowNer]):this.ners},processRate:function(){var t=this.files||[];if(!t.length)return 0;for(var e=this.nersCache||{},s=this.projectName||"",n=this.isAnnoDic||{},o=0,i=0;i<t.length;i+=1){var a=t[i];(n[s+"_"+a]||e[a]&&e[a].length)&&(o+=1)}return o/t.length}},methods:{lastPage:function(){var t=this;t.pageNumber>1&&(t.pageNumber=t.pageNumber-1,u("/v1/files/query?projectName="+t.projectName+"&pageNumber="+t.pageNumber+"&pageSize="+t.pageSize,function(e){t.$set(t,"files",e.map(function(e){return"string"==typeof e?e:(t.isAnnoDic[t.projectName+"_"+e.fileName]=e.isAnno,e.fileName)}))}))},nextPage:function(){var t=this;t.files.length===t.pageSize&&(t.pageNumber=t.pageNumber+1,u("/v1/files/query?projectName="+t.projectName+"&pageNumber="+t.pageNumber+"&pageSize="+t.pageSize,function(e){t.$set(t,"files",e.map(function(e){return"string"==typeof e?e:(t.isAnnoDic[t.projectName+"_"+e.fileName]=e.isAnno,e.fileName)}))}))},goHome:function(){this.$router.push({path:"/"})},save:function(){if(window.isLoadingNowText){if(Date.now()-window.isLoadingNowText<1e4)return alert("请等待文件内容加载"),!1;delete window.isLoadingNowText}return d("/v1/anno/create",{projectName:this.projectName,fileName:this.nowFile,annoDetails:this.ners}),this.$set(this.nersCache,this.nowFile,[].concat(c()(this.ners))),!0},setNowText:function(t){var e=this;window.isLoadingNowText=Date.now(),e.nowFile=t,e.nowText=e.textDic[t];var s=!!e.nersCache[t];e.$set(e,"ners",e.nersCache[t]?[].concat(c()(e.nersCache[t])):[]),e.flushWordsType(),e.nowText?delete window.isLoadingNowText:u("/v1/anno/query?projectName="+e.projectName+"&fileName="+t,function(n){delete window.isLoadingNowText,!s&&n.annoDetails&&(e.$set(e,"ners",n.annoDetails),e.$set(e.nersCache,e.nowFile,[].concat(c()(e.ners))),e.flushWordsType()),e.$set(e.textDic,t,n.fileContent),e.nowText=e.textDic[t]})},changeIdx:function(t){var e=this.files.indexOf(this.nowFile)+t;e<0&&(e=0),e>=this.files.length&&(e=this.files.length-1),this.setNowText(this.files[e])},pointWord:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("select"===this.mode){if(!this.nowType)return alert("请先选择标签"),!1;this.endIdx=t;var s=this.nowType,n=Math.min(this.startIdx,this.endIdx),o=Math.max(this.startIdx,this.endIdx)+1,i=this.nowText.substring(n,o);return this.$set(this,"nowNer",{name:i,type:s,start:n,end:o,isMove:!e.isDefaultClick}),t}},setType:function(t,e){this.$set(this,"nowType",t)},delType:function(t,e){if(!this.configCanCtlType)return!1;e&&e.preventDefault();for(var s={},n=[],o=this.typeList,i=this.types,a=0;a<o.length;a++){var r=o[a];t!==r&&(n.push(r),s[r]=i[r])}this.typeList=n,this.types=s,this.flushWordsType(),h(this.projectName,this.typeList,this.types)},checkDelType:function(t,e){if(!this.configCanCtlType)return!1;e&&e.stopPropagation(),window.confirm("确定删除标签【"+t+"】么？")&&this.delType(t)},addType:function(){var t=this.inputType;return document.getElementById("type-input").value="",this.inputType="",!!t&&(!this.types[t]&&(this.$set(this.types,t,{color:function(){for(var t="0123456789abcdef",e="#",s=0;s<6;s+=1)e+=t[Math.random()*t.length|0];return e}()}),this.typeList.push(t),void h(this.projectName,this.typeList,this.types)))},typeInput:function(t){this.inputType=t.target.value,"Enter"!==t.code&&"NumpadEnter"!==t.code||this.addType(t)},setMode:function(t){"select"===this.mode&&this.endSelect(),this.mode=t},flushWordsType:function(){var t=JSON.parse(l()(this.ners));this.nowNer&&t.push(this.nowNer),this.wordsType=[];for(var e=0;e<t.length;e+=1)for(var s=t[e],n=s.start;n<s.end;n+=1)this.wordsType[n]=s.type;this.$set(this,"wordsType",this.wordsType),this.wordsOutType=[];for(var o=0;o<t.length;o+=1){for(var i=t[o],a=!1,r=i.start;r<i.end;r+=1)if(i.type!==this.wordsType[r]){a=!0;break}if(a)for(var c=i.start;c<i.end;c+=1)this.wordsOutType[c]=i.type}this.$set(this,"wordsOutType",this.wordsOutType)},startSelect:function(t,e){if(3===e.which){e.preventDefault();for(var s=this.ners,n=s.length-1;n>=0;n-=1){var o=s[n];if(t>=o.start&&t<o.end)return s.splice(n,1),this.$set(this,"ners",s),this.flushWordsType(),this.save(),!0}return!0}this.setMode("select"),this.$set(this,"nowNer",{}),this.startIdx=t,this.endIdx=t,this.pointWord(t,{isDefaultClick:!0})},checkIsRepeat:function(t){for(var e=0;e<this.ners.length;e+=1){var s=this.ners[e];if(s.start===t.start&&s.end===t.end)return!0}return!1},endSelect:function(){if(!this.nowType)return!1;!this.checkIsRepeat(this.nowNer)&&this.nowNer.isMove&&(delete this.nowNer.isMove,this.ners.push(this.nowNer),this.$set(this,"ners",this.ners.sort(function(t,e){return t.start-e.start+.001*(e.end-t.end)}))),this.$set(this,"nowNer",void 0),this.flushWordsType(),this.startIdx=-1,this.save()},stopPrev:function(t){t.preventDefault()},setFiles:function(t){t.stopPropagation(),t.preventDefault();var e=t.dataTransfer.files;this.processFiles(e)},processFiles:function(t){var e=this;e.$set(e,"files",[]),e.$set(e,"textDic",{});for(var s=function(s){var n=t[s],o=new FileReader;o.onload=function(t){e.$set(e.files,s,n.name),e.$set(e.textDic,n.name,t.target.result)},o.readAsText(n,"UTF-8")},n=0;n<t.length;n+=1)s(n)},outAllNers:function(){return window.open("/v1/files/get_json?projectName="+this.projectName,"_self"),!0},saveTxt:function(t,e){var s=document.createElement("a");s.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),s.setAttribute("download",t),s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)},setFastKey:function(t){console.log(t)},setTypeByFastKey:function(t){console.log(t)},setFocus:function(t){this.nowFocus=t},clickColor:function(t){document.getElementById(t).click()},changeColor:function(t,e){console.log(t,e.target.value),this.$set(this.types[t],"color",e.target.value),h(this.projectName,this.typeList,this.types)}},watch:{ners:function(){for(var t=void 0,e=0;e<this.ners.length;e++){var s=this.ners[e];s.isSmall=!1,t&&s.start<=t&&(s.isSmall=!0),t||(t=s.end-1),t=Math.max(t,s.end-1)}}},mounted:function(){var t=this,e=t.$route.query,s=e.projectName,n=e.projectType,o=e.entityTypes;if(s){t.projectName=s,t.projectType=n,t.entityTypes=o?JSON.parse(o):[];var i={};t.typeList=t.entityTypes.map(function(t){return i[t.type]={color:t.color},t.type}),t.types=i,t.typeList&&t.typeList[0]&&(t.nowType=t.typeList[0]),u("/v1/files/query?projectName="+s+"&pageNumber="+t.pageNumber+"&pageSize="+t.pageSize,function(e){t.$set(t,"files",e.map(function(e){return"string"==typeof e?e:(t.isAnnoDic[t.projectName+"_"+e.fileName]=e.isAnno,e.fileName)}))})}function a(){return(document.getElementById("ner-box").offsetWidth-30)/20|0}t.$set(t,"columnWordCount",a()),window.onresize=function(){t.$set(t,"columnWordCount",a())},window.onkeydown=function(e){if(t.nowFocus){var s=e.key;if("ner-box"===t.nowFocus){var n=t.fastKeyType[s];if(n)if("page-up"===n)t.changeIdx(-1);else if("page-down"===n)t.changeIdx(1);else{var o=t.fastKeyType[s];t.setType(o)}}else{var i=t.fastTypeKey[t.nowFocus];i&&t.$set(t.fastKeyType,i,void 0),"Escape"!==s&&t.$set(t.fastKeyType,s,t.nowFocus);var a={};for(var r in t.fastKeyType){a[t.fastKeyType[r]]=r}t.$set(t,"fastTypeKey",a),localStorage.fastKeyType=l()(t.fastKeyType),localStorage.fastTypeKey=l()(t.fastTypeKey)}}}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"layout"},[s("span",{staticClass:"home",on:{click:t.goHome}},[t._v("whaleAnno")]),t._v(" "),s("h1",{staticClass:"out-title"},[t._v(t._s(t.projectName)+"（"+t._s(t.projectType)+"）")]),t._v(" "),s("div",{staticClass:"container",on:{dragover:t.stopPrev,drop:function(e){return t.setFiles(e)}}},[s("div",{staticClass:"left"},[s("div",{staticClass:"file-list"},[t._l(t.files,function(e){return s("div",{key:e,class:["file",t.nowFile===e?"selected":"",t.isAnnoDic[t.projectName+"_"+e]||t.nersCache[e]&&t.nersCache[e].length?"checked":""].join(" "),attrs:{title:e},on:{click:function(s){return t.setNowText(e)}}},[t._v("\n          "+t._s(e)+"\n          "),t.isAnnoDic[t.projectName+"_"+e]||t.nersCache[e]&&t.nersCache[e].length?s("svg",{staticClass:"checked-icon",attrs:{t:"1619449859327",viewBox:"0 0 1152 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1159",width:"16",height:"16"}},[s("path",{attrs:{d:"M4.266667 576l238.933333-187.733333 204.8 192c0 0 379.733333-328.533333 699.733333-512l0 123.733333C704 580.266667 426.666667 989.866667 426.666667 989.866667L4.266667 576 4.266667 576zM4.266667 576","p-id":"1160",fill:"#35e558"}})]):t._e()])}),t._v(" "),s("div",{staticClass:"process-bar",style:{width:100*t.processRate+"%"}})],2),t._v(" "),s("div",{staticClass:"page-ctl"},[s("span",{staticClass:"page-ctl-last",style:{opacity:1===t.pageNumber?0:1},on:{click:t.lastPage}},[t._v("上页")]),t._v(" "),s("span",{staticClass:"page-number"},[t._v(t._s(t.pageNumber))]),t._v(" "),s("span",{staticClass:"page-ctl-next",style:{opacity:t.files.length<t.pageSize?0:1},on:{click:t.nextPage}},[t._v("下页")])]),t._v(" "),s("div",{staticClass:"out-btn",on:{click:t.outAllNers}},[t._v("导出json结果")])]),t._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"title"},[s("span",[t._v("选择标签：")]),t._v(" "),s("div",{staticClass:"type-box"},[t._l(t.typeList,function(e){return s("span",{key:e,class:t.nowType===e?"type selected":"type",style:{backgroundColor:t.types[e]?t.types[e].color:"#fff"},on:{click:function(s){return t.setType(e)},contextmenu:function(s){return t.delType(e,s)},mouseover:function(s){return t.setFocus(e)},mouseleave:function(e){return t.setFocus("")}}},[t.configCanCtlType?s("svg",{staticClass:"color-icon",attrs:{t:"1618942541356",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1686",width:"18",height:"18"},on:{click:function(s){return s.stopPropagation(),t.clickColor(e,s)}}},[s("path",{attrs:{d:"M204.4 524.9c-14.5 1.5-26.2 13.2-27.7 27.7-2.1 19.9 14.6 36.7 34.6 34.6 14.5-1.5 26.2-13.2 27.8-27.8 2-19.9-14.8-36.6-34.7-34.5zM265.4 473.7c21.8-1.9 39.4-19.5 41.4-41.4 2.5-28.5-21.2-52.3-49.7-49.7-21.8 1.9-39.4 19.5-41.4 41.4-2.6 28.4 21.2 52.2 49.7 49.7zM415.8 266.9c-28.5 1.8-51.6 24.9-53.4 53.4-2.2 34.5 26.4 63.1 60.9 60.9 28.5-1.8 51.6-24.9 53.4-53.4 2.1-34.6-26.4-63.1-60.9-60.9zM621.9 253.8c-35.1 2.2-63.4 30.6-65.6 65.6-2.7 42.4 32.4 77.6 74.8 74.8 35.1-2.2 63.4-30.6 65.6-65.6 2.8-42.4-32.3-77.5-74.8-74.8zM966.5 276.4c-0.5-7.6-4-14.6-9.8-19.6l-0.7-0.6c-5.2-4.5-11.9-7-18.8-7-8.3 0-16.2 3.6-21.6 9.9L574 652.4l-43.5 85.5 1.1 0.9-4.9 11.3 11.1-5.9 1.5 1.3 78-54.3 342.3-394c5-5.8 7.4-13.2 6.9-20.8z","p-id":"1687",fill:"#2c3e50"}}),s("path",{attrs:{d:"M897.8 476.3c-13.8-1.4-26.7 7.4-30.4 20.7-6.9 24.6-19.3 64.5-35.1 97.8C809.5 643 767.4 710.1 696.7 756c-72.2 46.9-142.7 56.7-189.2 56.7-37 0-72.2-6.1-101.7-17.7-26.9-10.5-46.4-24.6-54.9-39.7-3.4-6.1-7.2-12.9-11.2-20.2-17.2-31.1-36.6-66.5-49.7-77.4-15.9-13.2-39.1-15-59.8-15-8.1 0-40.8 1.3-48.5 1.3-33.1 0-49.4-6.5-56.1-22.4-17.8-42.3-7.3-114.3 26.8-183.4C205.2 331.4 300 253.3 412.6 224c40-10.6 81.2-18.9 121.3-18.9 85.6 0 187.8 32.8 252.5 77.2 11.4 7.8 26.9 5.8 35.7-4.9 10.4-12.6 7.1-31.4-6.8-39.8-23.3-14-57.9-34-86.3-47.1-60.3-27.9-123.7-41.9-189.2-41.9-68.1 0-148.8 16.4-217.2 47.2-78.1 35-135.2 85-179.4 147.5-36.4 51.4-67.8 111.1-80.1 168.7-7.5 35.1-6.8 57.4-2.4 87.8 4.2 29.2 13.4 52.5 26.9 67.5 22.4 25.1 51.5 37.4 89 37.4 13.9 0 56.3-5 63.1-5 7.4 0 12.2 1.2 14.4 3.8 6.4 7.4 14.4 22.4 23.7 39.9 7.5 14.1 15.9 30.1 25.4 45.3 12.1 19.5 36.9 40.4 66.5 55.9 27 14.1 71.9 31 132.2 31 72 0 148.3-23.6 226.7-70.1 74.9-44.4 123-118.9 150.2-173.6 19-38.3 34.7-87.2 43.8-119.1 4.8-17.3-7-34.7-24.8-36.5z","p-id":"1688",fill:"#2c3e50"}})]):t._e(),t._v(" "),t.configCanCtlType?s("input",{staticClass:"color-input",attrs:{id:e,type:"color"},domProps:{value:t.types[e].color},on:{change:function(s){return t.changeColor(e,s)},click:function(t){t.stopPropagation()}}}):t._e(),t._v("\n            "+t._s(e)+" "+t._s(t.fastTypeKey[e]?"【"+t.fastTypeKey[e]+"】":"")+"\n            "),t.configCanCtlType?s("svg",{staticClass:"close-icon",attrs:{t:"1618943942999",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3793",width:"18",height:"18"},on:{click:function(s){return t.checkDelType(e,s)}}},[s("path",{attrs:{d:"M512 421.504l274.752-274.752 90.496 90.496L602.496 512l274.752 274.752-90.496 90.496L512 602.496l-274.752 274.752-90.496-90.496L421.504 512 146.752 237.248l90.496-90.496z","p-id":"3794",fill:"#ff0000"}})]):t._e()])}),t._v(" "),t.configCanCtlType?s("span",{staticClass:"type-input-box"},[s("input",{staticClass:"type-input",attrs:{id:"type-input",placeholder:"新增标签"},on:{keypress:t.typeInput,change:t.typeInput}}),t._v(" "),s("button",{staticClass:"page-btn",on:{click:t.addType}},[t._v("提交")])]):t._e()],2)]),t._v(" "),s("div",{staticClass:"ner-box",attrs:{id:"ner-box"},on:{mouseup:function(e){return t.setMode("")},mouseleave:function(e){t.setMode(""),t.setFocus("")},keydown:t.setTypeByFastKey,mouseover:function(e){return t.setFocus("ner-box")}}},[s("div",{staticClass:"word-rect-area"},t._l(t.nowNers,function(e,n){return s("span",{key:n,staticClass:"rect"},t._l(e.name,function(n,o){return s("span",{key:""+e+n+o},[0===o||(e.start%t.columnWordCount+o)%t.columnWordCount==0?s("span",{staticClass:"ner-anchor",style:{border:"1px solid #ccc",position:"absolute",display:"inline-block",left:(e.start+o)%t.columnWordCount*20+(e.isSmall&&0===o?2:0)+"px",top:35*((e.start+o)/t.columnWordCount|0)+(e.isSmall?0:-2)+"px",width:20*Math.min(e.end-(e.start+o),t.columnWordCount,t.columnWordCount-(e.start+o)%t.columnWordCount)-(e.isSmall&&0===o?4:0)+"px",height:(e.isSmall?18:22)+"px",background:""+(t.types[e.type]?t.types[e.type].color:"000000"),lineHeight:"25px",borderTopLeftRadius:(0===o?6:0)+"px",borderBottomLeftRadius:(0===o?6:0)+"px",borderLeft:(0===o?1:0)+" solid #ccc",borderTopRightRadius:(0!==o&&e.name.length-o<=t.columnWordCount||0===o&&e.start%t.columnWordCount+e.name.length<=t.columnWordCount?6:0)+"px",borderBottomRightRadius:(0!==o&&e.name.length-o<=t.columnWordCount||0===o&&e.start%t.columnWordCount+e.name.length<=t.columnWordCount?6:0)+"px",borderRight:(0!==o&&e.name.length-o<=t.columnWordCount||0===o&&e.start%t.columnWordCount+e.name.length<t.columnWordCount?1:0)+" solid #ccc"}}):t._e()])}),0)}),0),t._v(" "),t._l(t.nowText,function(e,n){return s("span",{key:n,staticClass:"word",on:{contextmenu:t.stopPrev,mousedown:function(e){return t.startSelect(n,e)},mousemove:function(e){return t.pointWord(n)}}},[t._v("\n          "+t._s(e)+"\n        ")])})],2),t._v(" "),s("div",{staticClass:"page-btn-box"},[s("button",{staticClass:"page-btn",on:{click:function(e){return t.changeIdx(-1)},mouseover:function(e){return t.setFocus("page-up")},mouseleave:function(e){return t.setFocus("")}}},[t._v("上一个 "+t._s(t.fastTypeKey["page-up"]?"【"+t.fastTypeKey["page-up"]+"】":""))]),t._v(" "),s("button",{staticClass:"page-btn",on:{click:function(e){return t.changeIdx(1)},mouseover:function(e){return t.setFocus("page-down")},mouseleave:function(e){return t.setFocus("")}}},[t._v("下一个 "+t._s(t.fastTypeKey["page-down"]?"【"+t.fastTypeKey["page-down"]+"】":""))])])]),t._v(" "),s("div",{staticClass:"result-box"},t._l(t.ners,function(e,n){return s("div",{key:n,staticClass:"result",class:t.nowType===e.type?"result selected":"result",style:{backgroundColor:t.types[e.type]?t.types[e.type].color:"#fff"}},[s("span",{staticClass:"result-type"},[t._v(t._s(e.type.substr(0,2)))]),t._v(" "),s("span",{staticClass:"result-name"},[t._v(t._s(e.name))])])}),0)])])},staticRenderFns:[]};var m=s("VU/8")(y,v,!1,function(t){s("M+GR")},"data-v-27d97914",null).exports;function g(t,e){T("GET",t,"",e)}function T(t,e){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},i=new XMLHttpRequest;i.open(t,e),o.contentType||i.setRequestHeader("content-type","application/json"),i.onreadystatechange=function(){if(4===i.readyState&&200===i.status){var t=JSON.parse(i.responseText);0!==t.errCode?alert(t.errMsg):n&&n(t.info)}},"multipart/form-data"===o.contentType?i.send(s):i.send(l()(s))}var w={name:"home",data:function(){return{projects:[],projectName:"",projectType:"",page:"list",types:{},typeList:[]}},computed:{},watch:{projectName:console.log},methods:{goHome:function(){this.page="list"},setName:function(t){this.projectName=t.target.value},setType:function(t){this.projectType=t.target.value},submit:function(){var t,e,s=this,n=s.typeList.map(function(t){return{type:t,color:s.types[t].color}}),o=s.projectName;t="/v1/project/create",e={projectName:s.projectName,projectType:s.projectType,entityTypes:l()(n)},T("POST",t,e,function(){s.type="",s.projectName="",g("/v1/index",function(t){s.$set(s,"projects",t),s.projectName="",s.projectType="",s.page="list"});var t,e=document.getElementById("file-input");if(e.files[0]){var n=new FormData;n.append("projectName",o),n.append("file",e.files[0]),T("POST","/v1/project/get_zipped_data",n,t,{contentType:"multipart/form-data"})}})},toNerAnno:function(t){var e=t.projectName,s=t.projectType,n=t.entityTypes;this.$router.push({path:"/NER",query:{projectName:e,projectType:s,entityTypes:n}})},toEdit:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};console.log("project",t),this.projectName=t.projectName||"",this.projectType=t.projectType||"命名实体识别",this.page=t.projectName?"edit":"create";var e=t.entityTypes?JSON.parse(t.entityTypes):[],s={};this.typeList=e.map(function(t){return s[t.type]={color:t.color},t.type}),this.types=s},toList:function(){this.page="list"},addType:function(){var t=this.inputType;return document.getElementById("type-input").value="",this.inputType="",!!t&&(!this.types[t]&&(this.$set(this.types,t,{color:function(){for(var t="0123456789abcdef",e="#",s=0;s<6;s+=1)e+=t[Math.random()*t.length|0];return e}()}),this.typeList.push(t),void console.log(this.typeList)))},delType:function(t,e){e&&e.preventDefault();for(var s={},n=[],o=this.typeList,i=this.types,a=0;a<o.length;a++){var r=o[a];t!==r&&(n.push(r),s[r]=i[r])}this.typeList=n,this.types=s},checkDelType:function(t,e){e&&e.stopPropagation(),window.confirm("确定删除标签【"+t+"】么？")&&this.delType(t)},typeInput:function(t){this.inputType=t.target.value,"Enter"!==t.code&&"NumpadEnter"!==t.code||this.addType(t)},clickColor:function(t){document.getElementById(t).click()},changeColor:function(t,e){console.log(t,e.target.value),this.$set(this.types[t],"color",e.target.value)}},mounted:function(){var t=this;g("/v1/index",function(e){t.$set(t,"projects",e)})}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"layout"},[s("h1",{staticClass:"out-title"},[s("span",{staticClass:"home",on:{click:t.goHome}},[t._v("whaleAnno")])]),t._v(" "),s("div",{staticClass:"container"},["list"===t.page?s("div",{staticClass:"project-box"},[s("div",{staticClass:"project-box-titile"},[s("h3",{staticClass:"inner-title"},[t._v("我的项目")]),t._v(" "),s("div",{staticClass:"btn-area"},[s("button",{staticClass:"button",on:{click:function(e){return t.toEdit()}}},[t._v("新建项目")])])]),t._v(" "),s("div",{staticClass:"list-box"},[0===t.projects.length?s("div",{staticClass:"project",staticStyle:{border:"none",color:"#ccc"}},[t._v("暂无")]):t._e(),t._v(" "),t._l(t.projects,function(e){return s("div",{key:e.projectName,staticClass:"project"},[s("p",{staticClass:"projectName"},[t._v(t._s(e.projectName))]),t._v(" "),s("p",{staticClass:"projectType"},[t._v(t._s(e.projectType))]),t._v(" "),s("div",{staticClass:"btn-area"},[s("button",{staticClass:"button",on:{click:function(s){return t.toNerAnno(e)}}},[t._v("开始标注")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(s){return t.toEdit(e)}}},[t._v("配置")])])])})],2)]):t._e(),t._v(" "),"edit"===t.page||"create"===t.page?s("div",{staticClass:"edit-box"},[s("p",[t._v("名称："),s("input",{staticClass:"name-input",attrs:{type:"text",name:"name",disabled:"edit"===t.page},domProps:{value:t.projectName},on:{change:t.setName}})]),t._v(" "),s("p",[t._v("类型：\n        "),s("select",{staticClass:"type-input",attrs:{name:"type"},domProps:{value:t.projectType},on:{change:t.setType}},[s("option",{attrs:{value:"命名实体识别"}},[t._v("命名实体识别")])])]),t._v(" "),s("div",{staticClass:"title"},[s("span",[t._v("选择标签：")]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"type-box"},[t._l(t.typeList,function(e){return s("span",{key:e,staticClass:"type",style:{backgroundColor:t.types[e]?t.types[e].color:"#fff"},on:{contextmenu:function(s){return t.delType(e,s)}}},[s("svg",{staticClass:"color-icon",attrs:{t:"1618942541356",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1686",width:"18",height:"18"},on:{click:function(s){return s.stopPropagation(),t.clickColor(e,s)}}},[s("path",{attrs:{d:"M204.4 524.9c-14.5 1.5-26.2 13.2-27.7 27.7-2.1 19.9 14.6 36.7 34.6 34.6 14.5-1.5 26.2-13.2 27.8-27.8 2-19.9-14.8-36.6-34.7-34.5zM265.4 473.7c21.8-1.9 39.4-19.5 41.4-41.4 2.5-28.5-21.2-52.3-49.7-49.7-21.8 1.9-39.4 19.5-41.4 41.4-2.6 28.4 21.2 52.2 49.7 49.7zM415.8 266.9c-28.5 1.8-51.6 24.9-53.4 53.4-2.2 34.5 26.4 63.1 60.9 60.9 28.5-1.8 51.6-24.9 53.4-53.4 2.1-34.6-26.4-63.1-60.9-60.9zM621.9 253.8c-35.1 2.2-63.4 30.6-65.6 65.6-2.7 42.4 32.4 77.6 74.8 74.8 35.1-2.2 63.4-30.6 65.6-65.6 2.8-42.4-32.3-77.5-74.8-74.8zM966.5 276.4c-0.5-7.6-4-14.6-9.8-19.6l-0.7-0.6c-5.2-4.5-11.9-7-18.8-7-8.3 0-16.2 3.6-21.6 9.9L574 652.4l-43.5 85.5 1.1 0.9-4.9 11.3 11.1-5.9 1.5 1.3 78-54.3 342.3-394c5-5.8 7.4-13.2 6.9-20.8z","p-id":"1687",fill:"#2c3e50"}}),s("path",{attrs:{d:"M897.8 476.3c-13.8-1.4-26.7 7.4-30.4 20.7-6.9 24.6-19.3 64.5-35.1 97.8C809.5 643 767.4 710.1 696.7 756c-72.2 46.9-142.7 56.7-189.2 56.7-37 0-72.2-6.1-101.7-17.7-26.9-10.5-46.4-24.6-54.9-39.7-3.4-6.1-7.2-12.9-11.2-20.2-17.2-31.1-36.6-66.5-49.7-77.4-15.9-13.2-39.1-15-59.8-15-8.1 0-40.8 1.3-48.5 1.3-33.1 0-49.4-6.5-56.1-22.4-17.8-42.3-7.3-114.3 26.8-183.4C205.2 331.4 300 253.3 412.6 224c40-10.6 81.2-18.9 121.3-18.9 85.6 0 187.8 32.8 252.5 77.2 11.4 7.8 26.9 5.8 35.7-4.9 10.4-12.6 7.1-31.4-6.8-39.8-23.3-14-57.9-34-86.3-47.1-60.3-27.9-123.7-41.9-189.2-41.9-68.1 0-148.8 16.4-217.2 47.2-78.1 35-135.2 85-179.4 147.5-36.4 51.4-67.8 111.1-80.1 168.7-7.5 35.1-6.8 57.4-2.4 87.8 4.2 29.2 13.4 52.5 26.9 67.5 22.4 25.1 51.5 37.4 89 37.4 13.9 0 56.3-5 63.1-5 7.4 0 12.2 1.2 14.4 3.8 6.4 7.4 14.4 22.4 23.7 39.9 7.5 14.1 15.9 30.1 25.4 45.3 12.1 19.5 36.9 40.4 66.5 55.9 27 14.1 71.9 31 132.2 31 72 0 148.3-23.6 226.7-70.1 74.9-44.4 123-118.9 150.2-173.6 19-38.3 34.7-87.2 43.8-119.1 4.8-17.3-7-34.7-24.8-36.5z","p-id":"1688",fill:"#2c3e50"}})]),t._v(" "),s("input",{staticClass:"color-input",attrs:{id:e,type:"color"},domProps:{value:t.types[e].color},on:{change:function(s){return t.changeColor(e,s)},click:function(t){t.stopPropagation()}}}),t._v("\n            "+t._s(e)+"\n            "),s("svg",{staticClass:"close-icon",attrs:{t:"1618943942999",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3793",width:"18",height:"18"},on:{click:function(s){return t.checkDelType(e,s)}}},[s("path",{attrs:{d:"M512 421.504l274.752-274.752 90.496 90.496L602.496 512l274.752 274.752-90.496 90.496L512 602.496l-274.752 274.752-90.496-90.496L421.504 512 146.752 237.248l90.496-90.496z","p-id":"3794",fill:"#ff0000"}})])])}),t._v(" "),s("span",{staticClass:"type-input-box"},[s("input",{staticClass:"type-input",attrs:{id:"type-input",placeholder:"新增标签"},on:{keypress:t.typeInput,change:t.typeInput}}),t._v(" "),s("button",{staticClass:"page-btn",on:{click:t.addType}},[t._v("提交")])])],2)]),t._v(" "),s("p",[t._v("上传文本：")]),t._v(" "),s("p",{staticStyle:{"font-size":"10px"}},[t._v("（请选择包含文本文件的zip文件）")]),t._v(" "),s("input",{attrs:{type:"file",id:"file-input",accept:".zip,.rar,.7z,.tar"}}),t._v(" "),s("p",{staticClass:"edit-box-btn-area"},[s("button",{staticClass:"button",on:{click:t.submit}},[t._v("提交")]),t._v(" "),s("button",{staticClass:"button",on:{click:t.toList}},[t._v("取消")])])]):t._e()])])},staticRenderFns:[]};var _=s("VU/8")(w,C,!1,function(t){s("kNMz")},"data-v-39d79870",null).exports;n.default.use(a.a);var N=new a.a({routes:[{path:"/NER",name:"NER",component:m,props:{entityTypes:!0}},{path:"/",name:"home",component:_,props:!0}]}),x=s("zL8q");n.default.config.productionTip=!1,n.default.use(x.Button),n.default.use(x.Select),n.default.use(x.Menu),n.default.use(x.MenuItem),new n.default({el:"#app",router:N,render:function(t){return t(i)}})},kNMz:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c39bc7dc2f9267307be8.js.map