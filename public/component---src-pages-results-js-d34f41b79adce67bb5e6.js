(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"/b8u":function(t,e,n){var a=n("STAE");t.exports=a&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},"/qmn":function(t,e,n){var a=n("2oRo");t.exports=a.Promise},"0YtT":function(t,e,n){"use strict";n.r(e),function(t){var a=n("kD0k"),r=n.n(a),o=(n("ls82"),n("9Hrx")),i=n("/S4K"),s=n("q1tI"),l=n.n(s),c=n("Bl7J"),u=n("robv"),p=n("kjs3"),d=n("M5Ap"),f=n.n(d),m=n("eMp/"),h=n.n(m),b=(n("rM0B"),n("dF3G")),y=n.n(b),v=n("vDqi"),g=n.n(v),E=n("72Yz"),k=n("DZeF");function w(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return x(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0;return function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function j(t,e,n){var a=new Blob([t],{type:e}),r=document.createElement("a");r.download=n,r.href=URL.createObjectURL(a),r.dataset.downloadurl=[e,r.download,r.href].join(":"),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),setTimeout((function(){URL.revokeObjectURL(r.href)}),1500)}function O(t){return _.apply(this,arguments)}function _(){return(_=Object(i.a)(r.a.mark((function t(e){var n,a,o,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}},a={subID:e.subID,pdb:e.pdb,inputNamingScheme:e.inputNamingScheme,outputpKs:e.outputpKs,outputfile:e.outputfile,outputNamingScheme:e.outputNamingScheme,outputFilepH:e.outputFilepH,pHmin:e.pHmin,pHmax:e.pHmax,pHstep:e.pHstep,epsin:e.epsin,epsout:e.epsout,ionic:e.ionic,email:e.email},console.log(a),t.prev=3,t.next=6,g.a.post("http://127.0.0.1:5000/submitSim",a,n);case 6:return o=t.sent,i=o.data,console.log(i),t.abrupt("return",i);case 12:t.prev=12,t.t0=t.catch(3),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[3,12]])})))).apply(this,arguments)}function S(){return(S=Object(i.a)(r.a.mark((function t(e,n){var a,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O(e.state);case 2:a=t.sent,o=a.titration,e.setState({tit_x:o[0],tit_y:o[1],pKas:a.pKas,params:a.parameters,pdb_out:a.pdb_out,titdatarevision:2}),n.saveSubmission(e.state.subID,a);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N=function(t){if(t.pKas)var e=t.pKas.map((function(t){return l.a.createElement("tr",{key:t[2]+t[1]},l.a.createElement("th",{scope:"row"},t[0]),l.a.createElement("td",null,t[1]),l.a.createElement("td",null,t[2]),l.a.createElement("td",null,t[3]))})),n="";else e=l.a.createElement("tr",null),n=l.a.createElement(k.a,null);return l.a.createElement("div",null,l.a.createElement("table",{className:"table table-hover",style:{textAlign:"center"}},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Chain"),l.a.createElement("th",null,"Residue Name"),l.a.createElement("th",null,"Residue Number"),l.a.createElement("th",null,"p",l.a.createElement("em",null,"K"),l.a.createElement("sub",null,"a")))),l.a.createElement("tbody",null,e)),n)},D=function(e){function n(t){var n;return(n=e.call(this,t)||this).DownloadTitration=function(){var t="pH;pKa\n";for(var e in n.state.tit_y){var a=n.state.tit_x[e],r=n.state.tit_y[e];t=t.concat(a+";"+r+"\n")}console.log(t),j(t,"text/csv","titration.csv")},n.DownloadpKTable=function(){for(var t,e="Chain;Type;Number;pKa\n",a=w(n.state.pKas);!(t=a()).done;){var r=t.value;e=e.concat((r+"\n").split(",").join(";"))}console.log(e),j(e,"text/csv","pKs.csv")},n.DownloadParams=function(){j(n.state.params.split(",").join("").split(":").join("=").split("{").join("").split("}").join("").split(" '").join("").split("'").join(""),"text/txt","params.txt")},n.DownloadPDB=function(){j(n.state.pdb_out,"text/txt","pdb_"+n.state.outputFilepH+".out")},n.state={subID:0,pdb:"",inputNamingScheme:"",outputpKs:"",outputfile:"",outputNamingScheme:"",outputFilepH:"",pHmin:0,pHmax:0,pHstep:0,epsin:0,epsout:0,ionic:0,nchains:0,nsites:0,protein_name:"",time_estimate:0,email:"",pKas:[],tit_x:[],tit_y:[],params:[],pdb_out:"",titdatarevision:null},t.location.state&&(n.state=t.location.state.send_json,n.global=new E.a(n.state.subID)),n}Object(o.a)(n,e);var a=n.prototype;return a.componentDidMount=function(){console.log(this.global),0!==t.state.pKas.length&&0!==t.state.tit_x.length&&0!==t.state.tit_y.length?this.setState({pKas:t.state.pKas,tit_x:t.state.tit_x,tit_y:t.state.tit_y,params:t.state.params,pdb_out:t.state.pdb_out,titdatarevision:1}):function(t,e){S.apply(this,arguments)}(this,t);var e,n,a=document,r=a.getElementById,o=a.createElement,i=a.getElementsByTagName,s="typef_orm_share";r.call(a,s)||((e=o.call(a,"script")).id=s,e.src="https://embed.typeform.com/embed.js",(n=i.call(a,"script")[0]).parentNode.insertBefore(e,n))},a.render=function(){return l.a.createElement(c.a,null,l.a.createElement(u.a,{image:f.a,title:"Results",subtitle:""}),this.state.pKas?"":l.a.createElement(k.b,{run_time:this.state.time_estimate}),l.a.createElement("section",{id:"basic",className:"section bb-1"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row gap-y"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement("div",{className:"card shadow-4 "+h.a.card},l.a.createElement("div",{className:"card-body "+h.a.cardBody},l.a.createElement("h2",null,this.state.protein_name),l.a.createElement("div",{className:"row gap-y"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement("p",null,"Number of Titrable Sites: ",this.state.nsites),l.a.createElement("p",null,"Number of Chains: ",this.state.nchains),l.a.createElement("p",null,"Number of Amino Acids"),this.state.pdb_out?l.a.createElement("button",{type:"button",className:"btn btn-outline-primary",onClick:this.DownloadPDB},"PDB at pH ",this.state.outputFilepH," "):""),l.a.createElement("div",{className:"col-md-6"},l.a.createElement("p",null,"pH range: ",this.state.pHmin,"-",this.state.pHmax),l.a.createElement("p",null,"Protein Dielectric: ",this.state.epsin),l.a.createElement("p",null,"Solvent Dielectric: ",this.state.epsout),this.state.params?l.a.createElement("button",{type:"button",className:"btn btn-outline-primary",onClick:this.DownloadParams},"All Parameters"):"")))),l.a.createElement("br",null),l.a.createElement("div",{className:"card shadow-4 "+h.a.card},this.state.tit_x?l.a.createElement("button",{type:"button",className:"btn btn-outline-primary",onClick:this.DownloadTitration},"Download CSV"):"",l.a.createElement("div",{className:"card-body "+h.a.cardBody},this.state.tit_x?l.a.createElement(p.a,{x:this.state.tit_x,y:this.state.tit_y,width:"100px",revision:this.state.titdatarevision}):l.a.createElement("div",null,l.a.createElement("h5",null,"Titration Curve"),l.a.createElement(k.a,null))))),l.a.createElement("div",{className:"col-md-6"},l.a.createElement("div",{className:"card shadow-4 "+h.a.card},this.state.tit_x?l.a.createElement("button",{type:"button",className:"btn btn-outline-primary",onClick:this.DownloadpKTable},"Download CSV"):"",l.a.createElement("div",{className:"card-body "+h.a.cardBody},l.a.createElement(N,{pKas:this.state.pKas}))))))),l.a.createElement("section",{className:"section"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row gap-y align-items-center"},l.a.createElement("div",{className:"col-md-6 text-center"},l.a.createElement("img",{src:y.a,alt:"..."})),l.a.createElement("div",{className:"col-md-6 text-center text-md-left"},l.a.createElement("h2",null,"Help us design better analysis"),l.a.createElement("p",{className:"lead mb-6"},"Let us know what other plots and data you would like to see"),l.a.createElement("p",null,l.a.createElement("a",{className:"btn btn-lg btn-round btn-info typeform-share button",href:"https://hdcalgarve.typeform.com/to/jGgOaU","data-mode":"popup",target:"_blank"},"Reach Out")))))))},n}(l.a.Component);e.default=D}.call(this,n("yLpj"))},"33Wh":function(t,e,n){var a=n("yoRg"),r=n("eDl+");t.exports=Object.keys||function(t){return a(t,r)}},"6LWA":function(t,e,n){var a=n("xrYK");t.exports=Array.isArray||function(t){return"Array"==a(t)}},"72Yz":function(t,e,n){"use strict";e.a=function(t){this.saveSubmission=function(t,e){localStorage.setItem(t,JSON.stringify(e))},this.state={subID:t,pKas:[],tit_x:[],tit_y:[],params:"",pdb_out:null};var e=JSON.parse(localStorage.getItem(t));e&&(this.state.pKas=e.pKas,this.state.tit_x=e.titration[0],this.state.tit_y=e.titration[1],this.state.params=e.parameters,this.state.pdb_out=e.pdb_out)}},"8GlL":function(t,e,n){"use strict";var a=n("HAuM"),r=function(t){var e,n;this.promise=new t((function(t,a){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=a})),this.resolve=a(e),this.reject=a(n)};t.exports.f=function(t){return new r(t)}},"9N29":function(t,e,n){"use strict";var a=n("I+eb"),r=n("1Y/n").right,o=n("pkCn"),i=n("rkAj"),s=n("LQDL"),l=n("YF1G"),c=o("reduceRight"),u=i("reduce",{1:0});a({target:"Array",proto:!0,forced:!c||!u||!l&&s>79&&s<83},{reduceRight:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},A2ZE:function(t,e,n){var a=n("HAuM");t.exports=function(t,e,n){if(a(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,a){return t.call(e,n,a)};case 3:return function(n,a,r){return t.call(e,n,a,r)}}return function(){return t.apply(e,arguments)}}},BIHw:function(t,e,n){"use strict";var a=n("I+eb"),r=n("or9q"),o=n("ewvW"),i=n("UMSQ"),s=n("ppGB"),l=n("ZfDv");a({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=o(this),n=i(e.length),a=l(e,0);return a.length=r(a,e,e,n,0,void 0===t?1:s(t)),a}})},DZeF:function(t,e,n){"use strict";n.d(e,"b",(function(){return w})),n.d(e,"a",(function(){return x}));var a=n("9Hrx"),r=n("q1tI"),o=n.n(r),i=n("H2TA"),s=n("R/WZ"),l=n("k1TG"),c=n("aXB2"),u=n("iuhU"),p=n("NqtD");function d(t){var e,n,a;return e=t,n=0,a=1,t=(Math.min(Math.max(n,e),a)-n)/(a-n),t=(t-=1)*t*t+1}var f=r.forwardRef((function(t,e){var n,a=t.classes,o=t.className,i=t.color,s=void 0===i?"primary":i,f=t.disableShrink,m=void 0!==f&&f,h=t.size,b=void 0===h?40:h,y=t.style,v=t.thickness,g=void 0===v?3.6:v,E=t.value,k=void 0===E?0:E,w=t.variant,x=void 0===w?"indeterminate":w,j=Object(c.a)(t,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),O={},_={},S={};if("determinate"===x||"static"===x){var N=2*Math.PI*((44-g)/2);O.strokeDasharray=N.toFixed(3),S["aria-valuenow"]=Math.round(k),"static"===x?(O.strokeDashoffset="".concat(((100-k)/100*N).toFixed(3),"px"),_.transform="rotate(-90deg)"):(O.strokeDashoffset="".concat((n=(100-k)/100,n*n*N).toFixed(3),"px"),_.transform="rotate(".concat((270*d(k/70)).toFixed(3),"deg)"))}return r.createElement("div",Object(l.a)({className:Object(u.a)(a.root,o,"inherit"!==s&&a["color".concat(Object(p.a)(s))],{indeterminate:a.indeterminate,static:a.static}[x]),style:Object(l.a)({width:b,height:b},_,y),ref:e,role:"progressbar"},S,j),r.createElement("svg",{className:a.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},r.createElement("circle",{className:Object(u.a)(a.circle,m&&a.circleDisableShrink,{indeterminate:a.circleIndeterminate,static:a.circleStatic}[x]),style:O,cx:44,cy:44,r:(44-g)/2,fill:"none",strokeWidth:g})))})),m=Object(i.a)((function(t){return{root:{display:"inline-block"},static:{transition:t.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:t.palette.primary.main},colorSecondary:{color:t.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:t.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(f),h=n("ye/S"),b=n("tr08"),y=r.forwardRef((function(t,e){var n=t.classes,a=t.className,o=t.color,i=void 0===o?"primary":o,s=t.value,d=t.valueBuffer,f=t.variant,m=void 0===f?"indeterminate":f,h=Object(c.a)(t,["classes","className","color","value","valueBuffer","variant"]),y=Object(b.a)(),v={},g={bar1:{},bar2:{}};if("determinate"===m||"buffer"===m)if(void 0!==s){v["aria-valuenow"]=Math.round(s),v["aria-valuemin"]=0,v["aria-valuemax"]=100;var E=s-100;"rtl"===y.direction&&(E=-E),g.bar1.transform="translateX(".concat(E,"%)")}else 0;if("buffer"===m)if(void 0!==d){var k=(d||0)-100;"rtl"===y.direction&&(k=-k),g.bar2.transform="translateX(".concat(k,"%)")}else 0;return r.createElement("div",Object(l.a)({className:Object(u.a)(n.root,n["color".concat(Object(p.a)(i))],a,{determinate:n.determinate,indeterminate:n.indeterminate,buffer:n.buffer,query:n.query}[m]),role:"progressbar"},v,{ref:e},h),"buffer"===m?r.createElement("div",{className:Object(u.a)(n.dashed,n["dashedColor".concat(Object(p.a)(i))])}):null,r.createElement("div",{className:Object(u.a)(n.bar,n["barColor".concat(Object(p.a)(i))],("indeterminate"===m||"query"===m)&&n.bar1Indeterminate,{determinate:n.bar1Determinate,buffer:n.bar1Buffer}[m]),style:g.bar1}),"determinate"===m?null:r.createElement("div",{className:Object(u.a)(n.bar,("indeterminate"===m||"query"===m)&&n.bar2Indeterminate,"buffer"===m?[n["color".concat(Object(p.a)(i))],n.bar2Buffer]:n["barColor".concat(Object(p.a)(i))]),style:g.bar2}))})),v=Object(i.a)((function(t){var e=function(e){return"light"===t.palette.type?Object(h.d)(e,.62):Object(h.a)(e,.5)},n=e(t.palette.primary.main),a=e(t.palette.secondary.main);return{root:{position:"relative",overflow:"hidden",height:4,"@media print":{colorAdjust:"exact"}},colorPrimary:{backgroundColor:n},colorSecondary:{backgroundColor:a},determinate:{},indeterminate:{},buffer:{backgroundColor:"transparent"},query:{transform:"rotate(180deg)"},dashed:{position:"absolute",marginTop:0,height:"100%",width:"100%",animation:"$buffer 3s infinite linear"},dashedColorPrimary:{backgroundImage:"radial-gradient(".concat(n," 0%, ").concat(n," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},dashedColorSecondary:{backgroundImage:"radial-gradient(".concat(a," 0%, ").concat(a," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},bar:{width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},barColorPrimary:{backgroundColor:t.palette.primary.main},barColorSecondary:{backgroundColor:t.palette.secondary.main},bar1Indeterminate:{width:"auto",animation:"$indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite"},bar1Determinate:{transition:"transform .".concat(4,"s linear")},bar1Buffer:{zIndex:1,transition:"transform .".concat(4,"s linear")},bar2Indeterminate:{width:"auto",animation:"$indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite"},bar2Buffer:{transition:"transform .".concat(4,"s linear")},"@keyframes indeterminate1":{"0%":{left:"-35%",right:"100%"},"60%":{left:"100%",right:"-90%"},"100%":{left:"100%",right:"-90%"}},"@keyframes indeterminate2":{"0%":{left:"-200%",right:"100%"},"60%":{left:"107%",right:"-8%"},"100%":{left:"107%",right:"-8%"}},"@keyframes buffer":{"0%":{opacity:1,backgroundPosition:"0 -23px"},"50%":{opacity:0,backgroundPosition:"0 -23px"},"100%":{opacity:1,backgroundPosition:"-200px -23px"}}}}),{name:"MuiLinearProgress"})(y),g=Object(i.a)({root:{color:"#0e97ff"}})(m),E=Object(i.a)({colorPrimary:{backgroundColor:"#9ad2ff"},barColorPrimary:{backgroundColor:"#0e97ff"}})(v),k=Object(s.a)((function(t){return{root:{flexGrow:1,margin:0,textAlign:"center"},margin:{margin:t.spacing(1)}}})),w=function(t){function e(){for(var e,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))||this).state={update_step:50/e.props.run_time,value:0},e}Object(a.a)(e,t);var n=e.prototype;return n.componentDidMount=function(){var t=this;setInterval((function(){t.setState({value:t.state.value+t.state.update_step})}),500)},n.render=function(){return o.a.createElement("div",{className:k.root},o.a.createElement(E,{className:k.root,variant:"determinate",value:this.state.value}))},e}(o.a.Component);function x(){var t=k();return o.a.createElement("div",{className:t.root},o.a.createElement(g,{size:30,thickness:4}))}},"G+Rx":function(t,e,n){var a=n("0GbY");t.exports=a("document","documentElement")},JOtS:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("qT3F")),r=o(n("95T3"));function o(t){return t&&t.__esModule?t:{default:t}}var i=(0,a.default)(r.default);e.default=i},"N+g0":function(t,e,n){var a=n("g6v/"),r=n("m/L8"),o=n("glrk"),i=n("33Wh");t.exports=a?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,l=0;s>l;)r.f(t,n=a[l++],e[n]);return t}},QFcT:function(t,e,n){var a=n("I+eb"),r=Math.hypot,o=Math.abs,i=Math.sqrt;a({target:"Math",stat:!0,forced:!!r&&r(1/0,NaN)!==1/0},{hypot:function(t,e){for(var n,a,r=0,s=0,l=arguments.length,c=0;s<l;)c<(n=o(arguments[s++]))?(r=r*(a=c/n)*a+1,c=n):r+=n>0?(a=n/c)*a:n;return c===1/0?1/0:c*i(r)}})},QGkA:function(t,e,n){n("RNIs")("flat")},RNIs:function(t,e,n){var a=n("tiKp"),r=n("fHMY"),o=n("m/L8"),i=a("unscopables"),s=Array.prototype;null==s[i]&&o.f(s,i,{configurable:!0,value:r(null)}),t.exports=function(t){s[i][t]=!0}},SEBh:function(t,e,n){var a=n("glrk"),r=n("HAuM"),o=n("tiKp")("species");t.exports=function(t,e){var n,i=a(t).constructor;return void 0===i||null==(n=a(i)[o])?e:r(n)}},STAE:function(t,e,n){var a=n("0Dky");t.exports=!!Object.getOwnPropertySymbols&&!a((function(){return!String(Symbol())}))},ZfDv:function(t,e,n){var a=n("hh1v"),r=n("6LWA"),o=n("tiKp")("species");t.exports=function(t,e){var n;return r(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!r(n.prototype)?a(n)&&null===(n=n[o])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},dF3G:function(t,e,n){t.exports=n.p+"static/graph_design-89e5a37ab700984f3f8a629ddd623b36.png"},fHMY:function(t,e,n){var a,r=n("glrk"),o=n("N+g0"),i=n("eDl+"),s=n("0BK2"),l=n("G+Rx"),c=n("zBJ4"),u=n("93I0"),p=u("IE_PROTO"),d=function(){},f=function(t){return"<script>"+t+"<\/script>"},m=function(){try{a=document.domain&&new ActiveXObject("htmlfile")}catch(r){}var t,e;m=a?function(t){t.write(f("")),t.close();var e=t.parentWindow.Object;return t=null,e}(a):((e=c("iframe")).style.display="none",l.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(f("document.F=Object")),t.close(),t.F);for(var n=i.length;n--;)delete m.prototype[i[n]];return m()};s[p]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(d.prototype=r(t),n=new d,d.prototype=null,n[p]=t):n=m(),void 0===e?n:o(n,e)}},kjs3:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("9Hrx"),r=n("q1tI"),o=n.n(r),i=n("JOtS"),s=n.n(i),l=function(t){function e(e){var n;return(n=t.call(this,e)||this).state={x:e.x,y:e.y,width:e.width},n}return Object(a.a)(e,t),e.prototype.render=function(){return console.log(this.state),o.a.createElement(s.a,{data:[{type:"scatter",x:this.state.x,y:this.state.y,mode:"lines+markers",marker:{color:"red"},line:{shape:"spline"}}],layout:{title:"Titration Curve",autosize:!0,xaxis:{title:"pH",showgrid:!1,zeroline:!0},yaxis:{title:"Protonation",showline:!1}},style:{width:"100%",height:"100%"},config:{displayModeBar:!1,responsive:!0}})},e}(o.a.Component)},lSNA:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},or9q:function(t,e,n){"use strict";var a=n("6LWA"),r=n("UMSQ"),o=n("A2ZE"),i=function(t,e,n,s,l,c,u,p){for(var d,f=l,m=0,h=!!u&&o(u,p,3);m<s;){if(m in n){if(d=h?h(n[m],m,e):n[m],c>0&&a(d))f=i(t,e,d,r(d.length),f,c-1)-1;else{if(f>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[f]=d}f++}m++}return f};t.exports=i},p532:function(t,e,n){"use strict";var a=n("I+eb"),r=n("xDBR"),o=n("/qmn"),i=n("0Dky"),s=n("0GbY"),l=n("SEBh"),c=n("zfnd"),u=n("busE");a({target:"Promise",proto:!0,real:!0,forced:!!o&&i((function(){o.prototype.finally.call({then:function(){}},(function(){}))}))},{finally:function(t){var e=l(this,s("Promise")),n="function"==typeof t;return this.then(n?function(n){return c(e,t()).then((function(){return n}))}:t,n?function(n){return c(e,t()).then((function(){throw n}))}:t)}}),r||"function"!=typeof o||o.prototype.finally||u(o.prototype,"finally",s("Promise").prototype.finally)},qT3F:function(t,e,n){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(i,e);var n,a,r=(n=i,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=d(n);if(a){var r=d(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return u(this,t)});function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=r.call(this,t)).p=Promise.resolve(),e.resizeHandler=null,e.handlers={},e.syncWindowResize=e.syncWindowResize.bind(p(e)),e.syncEventHandlers=e.syncEventHandlers.bind(p(e)),e.attachUpdateEvents=e.attachUpdateEvents.bind(p(e)),e.getRef=e.getRef.bind(p(e)),e.handleUpdate=e.handleUpdate.bind(p(e)),e.figureCallback=e.figureCallback.bind(p(e)),e.updatePlotly=e.updatePlotly.bind(p(e)),e}return function(t,e,n){e&&l(t.prototype,e);n&&l(t,n)}(i,[{key:"updatePlotly",value:function(e,n,a){var r=this;this.p=this.p.then((function(){if(!r.unmounting){if(!r.el)throw new Error("Missing element reference");return t.react(r.el,{data:r.props.data,layout:r.props.layout,config:r.props.config,frames:r.props.frames})}})).then((function(){r.unmounting||(r.syncWindowResize(e),r.syncEventHandlers(),r.figureCallback(n),a&&r.attachUpdateEvents())})).catch((function(t){r.props.onError&&r.props.onError(t)}))}},{key:"componentDidMount",value:function(){this.unmounting=!1,this.updatePlotly(!0,this.props.onInitialized,!0)}},{key:"componentDidUpdate",value:function(t){this.unmounting=!1;var e=t.frames&&t.frames.length?t.frames.length:0,n=this.props.frames&&this.props.frames.length?this.props.frames.length:0,a=!(t.layout===this.props.layout&&t.data===this.props.data&&t.config===this.props.config&&n===e),r=void 0!==t.revision,o=t.revision!==this.props.revision;(a||r&&(!r||o))&&this.updatePlotly(!1,this.props.onUpdate,!1)}},{key:"componentWillUnmount",value:function(){this.unmounting=!0,this.figureCallback(this.props.onPurge),this.resizeHandler&&h&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null),this.removeUpdateEvents(),t.purge(this.el)}},{key:"attachUpdateEvents",value:function(){var t=this;this.el&&this.el.removeListener&&m.forEach((function(e){t.el.on(e,t.handleUpdate)}))}},{key:"removeUpdateEvents",value:function(){var t=this;this.el&&this.el.removeListener&&m.forEach((function(e){t.el.removeListener(e,t.handleUpdate)}))}},{key:"handleUpdate",value:function(){this.figureCallback(this.props.onUpdate)}},{key:"figureCallback",value:function(t){if("function"==typeof t){var e=this.el;t({data:e.data,layout:e.layout,frames:this.el._transitionData?this.el._transitionData._frames:null},this.el)}}},{key:"syncWindowResize",value:function(e){var n=this;h&&(this.props.useResizeHandler&&!this.resizeHandler?(this.resizeHandler=function(){return t.Plots.resize(n.el)},window.addEventListener("resize",this.resizeHandler),e&&this.resizeHandler()):!this.props.useResizeHandler&&this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null))}},{key:"getRef",value:function(t){this.el=t,this.props.debug&&h&&(window.gd=this.el)}},{key:"syncEventHandlers",value:function(){var t=this;f.forEach((function(e){var n=t.props["on"+e],a=t.handlers[e],r=Boolean(a);n&&!r?t.addEventHandler(e,n):!n&&r?t.removeEventHandler(e):n&&r&&n!==a&&(t.removeEventHandler(e),t.addEventHandler(e,n))}))}},{key:"addEventHandler",value:function(t,e){this.handlers[t]=e,this.el.on(this.getPlotlyEventName(t),this.handlers[t])}},{key:"removeEventHandler",value:function(t){this.el.removeListener(this.getPlotlyEventName(t),this.handlers[t]),delete this.handlers[t]}},{key:"getPlotlyEventName",value:function(t){return"plotly_"+t.toLowerCase()}},{key:"render",value:function(){return o.default.createElement("div",{id:this.props.divId,style:this.props.style,ref:this.getRef,className:this.props.className})}}]),i}(o.Component);return e.propTypes={data:i.default.arrayOf(i.default.object),config:i.default.object,layout:i.default.object,frames:i.default.arrayOf(i.default.object),revision:i.default.number,onInitialized:i.default.func,onPurge:i.default.func,onError:i.default.func,onUpdate:i.default.func,debug:i.default.bool,style:i.default.object,className:i.default.string,useResizeHandler:i.default.bool,divId:i.default.string},f.forEach((function(t){e.propTypes["on"+t]=i.default.func})),e.defaultProps={debug:!1,useResizeHandler:!1,data:[],style:{position:"relative",display:"inline-block"}},e};var r,o=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=s();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(n("q1tI")),i=(r=n("17x9"))&&r.__esModule?r:{default:r};function s(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return s=function(){return t},t}function l(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?p(t):e}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=["AfterExport","AfterPlot","Animated","AnimatingFrame","AnimationInterrupted","AutoSize","BeforeExport","BeforeHover","ButtonClicked","Click","ClickAnnotation","Deselect","DoubleClick","Framework","Hover","LegendClick","LegendDoubleClick","Relayout","Relayouting","Restyle","Redraw","Selected","Selecting","SliderChange","SliderEnd","SliderStart","SunburstClick","Transitioning","TransitionInterrupted","Unhover"],m=["plotly_restyle","plotly_redraw","plotly_relayout","plotly_relayouting","plotly_doubleclick","plotly_animated","plotly_sunburstclick"],h="undefined"!=typeof window},rM0B:function(t,e,n){},tiKp:function(t,e,n){var a=n("2oRo"),r=n("VpIT"),o=n("UTVS"),i=n("kOOl"),s=n("STAE"),l=n("/b8u"),c=r("wks"),u=a.Symbol,p=l?u:u&&u.withoutSetter||i;t.exports=function(t){return o(c,t)||(s&&o(u,t)?c[t]=u[t]:c[t]=p("Symbol."+t)),c[t]}},zfnd:function(t,e,n){var a=n("glrk"),r=n("hh1v"),o=n("8GlL");t.exports=function(t,e){if(a(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}}}]);
//# sourceMappingURL=component---src-pages-results-js-d34f41b79adce67bb5e6.js.map