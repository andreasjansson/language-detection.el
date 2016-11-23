
if(typeof jQuery==="undefined"){(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return!!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return!!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return+new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return!o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return-1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return!!T.firstChild},empty:function(T){return!T.firstChild},has:function(V,U,T){return!!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex"in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return!F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();}


//Multiple Video Player - minified. Last Updated: 10/14/2010
//Dependencies: swfobject, jquery
(function(t){function p(a,c){c=c||false;var b=window.location.search.substr(1);if(b.length>0){b=b.split("&");for(var f={},e=0;e<b.length;e++){var g=b[e].split("=");f[g[0]]=g[1]}if(f.stc==="y"||c)typeof window.console==="object"&&console.log(a)}}function y(a,c){function b(){return Math.floor(Math.random()*a)%2===1?true:false}function f(){var e=b()?97:65;return String.fromCharCode(e+Math.round(Math.random()*25))}a=a||999999;c=c||25;return function(){for(var e=[],g=0;g<c-1;g++)e.push(b()?f():Math.floor(Math.random()* 10));e.sort(function(){return 0.5-Math.random()});return f()+e.join("")}()}function w(){this.video={};this.controls.root=this.listeners.root=this;this.prefix={controls:"player-controls-",playPause:"playpause-",fullScreen:"fullscreen-",loadPct:"load-counter-"};this.prefix.time={current:"time-current",duration:"time-duration"};this.controlsHTML='<strong>listeners:</strong> <a id="'+this.prefix.playPause+'${id}" href="#">${playState}</a> | Current Time: <span id="'+this.prefix.time.current+'${id}">00:00</span> | Duration Time: <span id="'+ this.prefix.time.duration+'${id}">00:00</span>';x.ol={arg:"P",lmp:"COM",rd:"USER"}}function z(){}function A(){}function B(){}function C(){}window.MvPlayer=function(){this.revision="10.14.2010";this._namespace=null;this._config={};this._videoDomain="video.foxnews.com";this._callbacksObj={};this._autoEmbed=true;this.holder={};this.playerIds=[];this.playerMap={};this.idSeparator=":";this.instanceId=["videoid","videolink","playlistid"];this.feedFolder={video:"/v/feed/video/",playlist:"/v/feed/playlist/"}; this.itemType={videoid:"video",playlistid:"playlist"};this.feedQueryString={template:"grab"};this.playTimeout={};this.dataObj={};this.holderObj={};this.overlayObj={defaultImg:"http://www.foxnews.com/static/all/img/vp-overlay.png",blankImg:"http://www.foxnews.com/static/all/img/clear.gif"}};MvPlayer.prototype={init:function(a){for(i in a)this["_"+i]=a[i];this.embed.root=this.feed.root=this.video.root=this.format.root=this.controls.root=this.thirdParty.root=this.feedParser.root=this._helper.root=this; a={};var c=this._config;if(c.player.feedSettings){if(c.player.feedSettings.videoFolder)a.video=c.player.feedSettings.videoFolder;if(c.player.feedSettings.playlistFolder)a.playlist=c.player.feedSettings.playlistFolder}this.videoTypeLinks={videoid:"http://"+this._videoDomain+(a.video?a.video:this.feedFolder.video),playlistid:"http://"+this._videoDomain+(a.playlist?a.playlist:this.feedFolder.playlist)};if(typeof w!=="undefined"){a=new w;if(a.init()){this.pandora=a;this.pandora.main=this;this.pandora.init()}}if(!this._autoEmbed)return false; this.holder.videoObj=t(".video,.video-ct");this.embed.players()},render:function(a){function c(){var h=false;if(a.holder.find("[id^='videoHolder:']").size()>0){h=a.holder.find("[id^='videoHolder:']:first").attr("id");b.setPlayerMap({type:"set",vId:e,domId:h});h=b.setPlayerMap({type:"get",vId:e})}else h=b.setPlayerMap({type:"create",vId:e});h=t("<div></div>").attr({id:h});a.cssClass&&h.addClass(a.cssClass);if(b.pandora){h.data("pandora",true);h.data("autoplay",a.autoplay)}a.holder.html(h)}a=a||false; if(!a)return false;if(!a.id||!a.holder)return false;var b=this,f=this.idSeparator,e=a.id,g=this._helper;if(a.callbacks)if(b._callbacksObj[e])for(i in a.callbacks)b._callbacksObj[e][i]=a.callbacks[i];else b._callbacksObj[e]=a.callbacks;if(!a.autoplay||typeof a.autoplay!=="boolean")a.autoplay=false;if(a.holder.data("currentId")===e)return false;var k=a.holder.find("> object");if(k.size()>0)try{if(g.isPlayFileReady(k.get(0))){b.setPlayerMap({type:"set",vId:e,domId:k.attr("id")});a.cssClass&&k.addClass(a.cssClass)}else c()}catch(l){c()}else c(); if(b.embed.validate(a.holder.children().filter(":first"),e.substring(0,e.indexOf(f)),f)){a.holder.data("currentId",e);a.holder.children().filter(":first").data("pandora")?b.pandora.load(e,a.autoplay):b.feed.get({id:e,autoplay:a.autoplay,method:"render"})}},getFeed:function(a){a=a||false;if(!a)return false;if(!a.id||!a.callback)return false;this.feed.get({id:a.id,method:"getFeed",raw:true,processed:!a.processed?false:true,callback:a.callback})},setPlayerMap:function(a){a=a||false;if(!a)return false; switch(a.type){case "create":for(var c="videoHolder:"+y();this.playerMap[c];)c="videoHolder:"+y();this.playerMap[c]=a.vId;return this.playerMap[a.vId]=c;case "set":c=false;for(i in this.playerMap)if(i===a.domId){c=this.playerMap[i];break}c||delete this.playerMap[c];this.playerMap[a.domId]=a.vId;this.playerMap[a.vId]=a.domId;break;case "get":if(a.vId)return this.playerMap[a.vId]?this.playerMap[a.vId]:false;else if(a.domId)return this.playerMap[a.domId]?this.playerMap[a.domId]:false;return false}}, setCustomFlashVars:function(a,c){if(this._config.display.customFlashVars){var b=this._config.display.customFlashVars;if(b[c]){var f={};for(i in b[c])f[i]=b[c][i];this.holderObj[a].customFlashVars=f}}}};MvPlayer.prototype.controls={pause:function(a){if(!this.validate())return false;var c=this.root,b=c.holderObj[a];try{b.data("pandora")?c.pandora.CONTROLS.pause(a):document.getElementById(a).pause()}catch(f){p("[videoPlayer.controls.pause] Error caught:"+f)}},play:function(a){if(!this.validate())return false; var c=this.root,b=c.holderObj[a];try{b.data("pandora")?c.pandora.CONTROLS.play(a):document.getElementById(a).unpause()}catch(f){p("[videoPlayer.controls.play] Error caught:"+f)}},validate:function(a){a=a||false;if(!a)return false;if(!this.root.dataObj[a])return false;return true}};MvPlayer.prototype.embed={validate:function(a,c,b){var f=this.root,e=f._config.display.allow;if(typeof f.format[c]==="undefined")return false;for(d in e)if(a.hasClass(d)){c=f.format[c](a,c,b);f.holderObj[c]={id:c,elm:a, dim:e[d],format:d};f.setCustomFlashVars(c,d);f.pandora&&f.holderObj[c].elm.data("pandora",true);return c}return false},players:function(){var a=this,c=this.root,b=c.idSeparator;c.holder.videoObj.each(function(){for(var f=t(this),e=false,g=0;g<c.instanceId.length;g++){var k=c.instanceId[g];f.find("div[id^='"+k+b+"']").each(function(){var l=t(this),h=c.setPlayerMap({type:"create",vId:l.attr("id")});l.attr("id",h);e=a.validate(l,k,b)})}if(e){c.holderObj[e].elm.data("pandora")?c.pandora.load(e):c.feed.get(e); f.children().filter("div.img").hide()}})},player:function(a){a=a||false;if(!a)return false;var c=this.root,b=c.holderObj[a];if(b.elm.data("videoLoaded"))return false;var f=c._helper,e=c._config.player;c.playerIds.push(a);if(b.elm.data("pandora")){if(!b.elm.data("pandoraLoaded")){e={id:a,format:b.format,width:b.dim[0]+"px",height:b.dim[1]+"px"};if(c._config.player.flashVars.autoplay==="true")e.autoplay=true;b.elm.data("pandora",true);b.elm.data("pandoraLoaded",true);b.elm.data("videoLoaded",true); c.holderObj[a].vAttr=e}c.pandora.load(a)}else{if(typeof swfobject==="undefined"){p("[videoPlayer.embed.player] swfobject not found.");return false}if(b.elm.data("swfLoaded"))c.video.load(a);else{var g=c.setPlayerMap({type:"get",vId:a});if(f.isPlayFileReady(document.getElementById(g)))c.video.load(a);else{c.thirdParty.akamai(a,true);a=c._config.player.flashVars;f={};for(i in a)f[i]=a[i];if(b.customFlashVars)for(i in b.customFlashVars)f[i]=b.customFlashVars[i];swfobject.embedSWF(e.location,g,b.dim[0], b.dim[1],e.flashVersion,e.expressInstall,f,c._config.player.params);b.elm.data("swfLoaded",true);b.elm.data("videoLoaded",true)}}}},clickthru:function(a,c){var b=this,f=this.root,e=f.holderObj[c],g=f.overlayObj.blankImg;e.elm.parent().css({width:e.dim[0]+"px",height:e.dim[1]+"px"});e.elm.html('<a href="#"><img src="'+g+'" /></a>');var k=e.elm.find("img");k.css({width:e.dim[0]+"px",height:e.dim[1]+"px",opacity:"0"});(function(){var j=new Image;j.onload=function(){k.attr("src",a.thumbnail).animate({opacity:"1"}, 400,"swing")};j.src=a.thumbnail})();var l=e.elm.find("a");l.css({display:"block",visibility:"visible",padding:"0"}).click(function(){function j(){b.player(c)}if(typeof f._config.display.clickThruImage==="object")if(f._config.display.clickThruImage.callbackFn){f._config.display.clickThruImage.callbackFn({runPlayer:j});return false}j();return false}).hover(function(){t("img",this).addClass("hover")},function(){t("img",this).removeClass("hover")});l.prepend('<span class="vp-overlay" style="position:absolute;"><img style="display:none;" src="'+ g+'"/></span>');var h=function(){var j=f._config.display.clickThruImage,m=f.overlayObj.defaultImg;if(typeof j==="object")if(j.overlayImg)m=j.overlayImg;return m}(),o=function(j){j=j.split("/");var m=j[j.length-1];j.pop();j=j.join("/");m=m.split(".");for(var q="",r=0;r<m.length-1;r++)q+=m[r];return j+"/"+q+"-hover."+m[m.length-1]}(h);(function(){var j=new Image;j.onload=function(){var m=e.dim[0]*0.3,q=m>j.width?j.width:m,r=e.dim[0]*0.5-q*0.5,n=e.dim[1]*0.5-q*0.5;l.find(".vp-overlay").each(function(){var u= t(this),s=u.find("img");u.css({top:n+"px",left:r+"px"});s.css({width:q,height:q,opacity:"0",display:"inline"});s.attr("src",h);t.browser.msie?s.show().css("filter",""):s.animate({opacity:1},400,"swing");l.hover(function(){s.attr("src",o)},function(){s.attr("src",h)})})};j.src=h})()}};MvPlayer.prototype.thirdParty={akamai:function(a){function c(h,o){for(var j=0;j<h.length;j++)if(f.elm.hasClass(h[j])){switch(o){case "share":b._config.player.flashVars.show_sharing_overlay="false";break;case "email":b._config.player.flashVars.show_email_overlay= "false"}return true}return false}var b=this.root,f=b.holderObj[a],e=a.split(":")[1].replace(/[a-zA-z]/gi,""),g=b.itemType[b.dataObj[a].itemType];b._config.player.flashVars.video_id=e;b._config.player.flashVars.data_feed_url="http://"+b._videoDomain+"/v/feed/"+g+"/"+e+".js?template=grab";if(typeof b._config.display!=="undefined"){e=b._config.display;if(typeof e.restrict!=="undefined"){e.restrict.sharingOverlay&&c(e.restrict.sharingOverlay,"share");e.restrict.emailOverlay&&c(e.restrict.emailOverlay, "email")}}if(g.toLowerCase().indexOf("playlist")>-1)try{var k=b.dataObj[a].PLVideos[0]["media-content"]["mvn-assetUUID"];b._config.player.flashVars.video_id=k;b._config.player.flashVars.data_feed_url="http://"+b._videoDomain+"/v/feed/video/"+k+".js?template=grab"}catch(l){p("[videoPlayer.thirdparty.akamai] Failed to load first video from playlist feed: "+l,true)}},baynote:function(a){function c(){if(typeof baynote_track_video_attribute!=="undefined"){if(k&&h&&l&&o){baynote_track_video_attribute(k, h,l,o);p("[videoPlayer.thirdparty.baynote] Successful baynote call: baynote_track_video_attribute(thumbnailUrl,duration,linkText)");p("[videoPlayer.thirdparty.baynote] thumbnailUrl = "+k);p("[videoPlayer.thirdparty.baynote] duration = "+h);p("[videoPlayer.thirdparty.baynote] linkText = "+l);p("[videoPlayer.thirdparty.baynote] url = "+o);return true}p("[videoPlayer.thirdparty.baynote] Baynote track function not triggered. insufficient video data for: thumbnail url / duration / link text / url.");return true}p("[videoPlayer.thirdparty.baynote] Baynote track function not defined."); return false}function b(){if(typeof baynote_track_video_attribute!=="undefined"){c();clearTimeout(q)}else if(m>j){p("[videoPlayer.thirdparty.baynote] Baynote track function call attempts maxed out... ");c();clearTimeout(q)}else{m++;q=setTimeout(function(){p("[videoPlayer.thirdparty.baynote] Attempting to call Baynote track function... attempt: "+m);b()},500)}}var f=this.root,e=f.dataObj[a],g=f._helper,k=e.thumbnail?e.thumbnail:false,l=e.title?e.title:false,h=function(){var r=e.duration?e.duration: false;if(!r)return false;if(isNaN(r))return false;return r}(),o=function(){var r=g.cleanTitle(e.title),n="http://"+f._videoDomain;n+="/v/"+e.guid+"/"+r+"/";return n}(),j=30,m=0,q=false;typeof baynote_track_video_attribute!=="undefined"?c():t(document).ready(function(){b()})}};MvPlayer.prototype.video={load:function(a){var c=this,b=this.root,f=b._helper,e=b._config.player.flashVars.autoplay,g=b.setPlayerMap({type:"get",vId:a});g=document.getElementById(g);if(f.isPlayFileReady(g)){f=typeof b._config.display.clickThruImage=== "undefined"?false:typeof b._config.display.clickThruImage!=="object"?b._config.display.clickThruImage:b._config.display.clickThruImage.render;if(b.dataObj[a]){e=f?true:b._config.player.flashVars.autoplay?true:false;g.playFile(b.dataObj[a].rawData,e)}else b.feed.get({id:a,autoplay:e});clearTimeout(b.playTimeout[a])}else b.playTimeout[a]=setTimeout(function(){c.load(a)},100)}};MvPlayer.prototype.feed={get:function(a){function c(){return k.type==="playlistid"||b.pandora?true:false}var b=this.root,f= b.idSeparator,e={};if(typeof a==="object")for(i in a)e[i]=a[i];else e.id=a;if(!e.id){p("[videoPlayer.feed.get] Error: no id passed");return false}a="parse_"+b._helper.formatVideoId(e.id,true,true)+(e.raw?"_getraw":"");var g=b._namespace+".feed."+a,k=false;a:{for(i in b.videoTypeLinks)if(e.id.indexOf(i)>-1){k={prefix:b.videoTypeLinks[i],type:i};break a}k=false}if(!k){p("[videoPlayer.feed.get] Error: no feed link: "+e.id);return false}f=e.id.substr(k.type.length+f.length);var l=k.prefix;if(f.charAt(0).toLowerCase()!== "g"){if(k.type==="videoid")l=l.replace("/v/","/")}else f=f.substr(1);f=l+f+".js";l=[];l.push("callback="+g);if(b.feedQueryString){g=b.feedQueryString;for(i in g)if(i==="template")c()||l.push(i+"="+g[i]);else l.push(i+"="+g[i])}l.push("jsonp=?");g="?"+l.join("&");l=e.method?e.method==="render"?true:false:false;if(!b.feed[a]||l)b.feed[a]=function(h){var o=c()?b.feedParser.legacy(h):b.feedParser.grab(h);if(e.raw){if(e.callback)e.callback(e.processed?o:h)}else{var j=typeof b._config.display.clickThruImage=== "undefined"?false:typeof b._config.display.clickThruImage!=="object"?b._config.display.clickThruImage:b._config.display.clickThruImage.render;b.dataObj[e.id]=o;b.dataObj[e.id].rawData=h;b.dataObj[e.id].itemType=k.type;if(e.autoplay)b._config.player.flashVars.autoplay="true";if(o){j&&!e.autoplay?b.embed.clickthru(o,e.id):b.embed.player(e.id);b._callbacksObj[e.id]&&b._callbacksObj[e.id].feedLoaded&&b._callbacksObj[e.id].feedLoaded(o)}else p("[videoPlayer.feed.get] Warning: no data found!")}};t.getJSON(f+ g)}};MvPlayer.prototype.format={videoid:function(a,c,b){a=this.root.setPlayerMap({type:"get",domId:a.attr("id")});if(!a)return false;c=a.substr(c.length+1);return"videoid"+b+c},videolink:function(a,c,b){c=this.root;a=a.attr("id");var f=c.setPlayerMap({type:"get",domId:a});b="playlistid"+b;if(f.indexOf("?playlist")===-1)return false;f=f.substr(f.indexOf("?")+1).split("&");for(var e=0;e<f.length;e++){var g=f[e].split("=");if(g[0].toLowerCase()==="playlist_id"){b=b+g[1];c.setPlayerMap({type:"set",vId:b, domId:a});return b}}},playlistid:function(a,c,b){a=this.root.setPlayerMap({type:"get",domId:a.attr("id")});if(!a)return false;c=a.substr(c.length+1);return"playlistid"+b+c}};MvPlayer.prototype.feedParser={grab:function(a){var c=this.root._helper;if(typeof a.channel.item==="undefined")return false;var b=a.channel.item,f=[];if(b instanceof Array){for(var e=0;e<b.length;e++)f.push(b[e]);b=a.channel.item[0]}if(!b["media-group"])return false;var g=b["media-group"];a=b.link;e=b.title;var k=b.description, l=b["grab-short_description"],h=g["media-keywords"],o=function(){if(typeof g["media-thumbnail"][0]!=="undefined"){var D=g["media-thumbnail"][0];return D["@attributes"].url?D["@attributes"].url:""}return""}(),j=b.guid,m=b["grab-channel"],q=b["grab-playlist"],r=b["grab-personality"],n=b["grab-format"],u=b["grab-show"],s=g["media-category"];c=c.convertGrabDate(b.pubDate);b="http://"+window.location.host+window.location.pathname;var v;try{v=g["media-content"][0]["@attributes"].duration}catch(E){p("[videoPlayer.feedParser.grab] Get Duration error: "+ E);v="0"}v={url:a,title:e,description:k,shortDescription:l,keywords:h,thumbnail:o,guid:j,channel:m,playlist:q,personality:r,format:n,show:u,category:s,creationDate:c,loc:b,duration:v};if(f.length>0)v.PLVideos=f;return v},legacy:function(a){var c=this.root._helper;if(typeof a.channel.item==="undefined")return false;var b=a.channel.item,f=[];if(b instanceof Array){for(var e=0;e<b.length;e++)f.push(b[e]);b=a.channel.item[0]}if(!b["media-content"])return false;a=b["media-content"];if(!a["media-credit"])return false; c={url:a["@attributes"].url,title:b.title,description:a["media-description"],keywords:a["media-keywords"],thumbnail:a["media-thumbnail"],guid:a["mvn-assetUUID"],mavenid:a["mvn-mavenId"],channel:a["mvn-fnc_channel"]?a["mvn-fnc_channel"]:a["mvn-fbn_channel"],playlist:a["mvn-fnc_default_playlist"],personality:a["mvn-fnc_personality"]?a["mvn-fnc_personality"]:a["mvn-fbn_personality"],format:a["mvn-fnc_format"]?a["mvn-fnc_format"]:a["mvn-fbn_format"],show:a["mvn-fnc_show"]?a["mvn-fnc_show"]:a["mvn-fbn_show"], category:a["mvn-fnc_category"]?a["mvn-fnc_category"]:a["mvn-fbn_category"],creationDate:c.convertDate(a["mvn-creationDate"]),shortDescription:a["mvn-shortDescription"],loc:"http://"+window.location.host+window.location.pathname,duration:a["mvn-duration"]?a["mvn-duration"]:a["mvn-videoSeconds"]?a["mvn-videoSeconds"]:0};if(f.length>0)c.PLVideos=f;return c}};MvPlayer.prototype._helper={isPlayFileReady:function(a){a=a||false;if(!a)return false;return typeof a.playFile!=="undefined"?true:false},formatVideoId:function(a, c,b){c=c||false;if(b=b||false)a=a.split("").reverse().join("");return c?a.replace(/\:/gi,"_"):a.replace(/\_/gi,":")},convertGrabDate:function(a){a=a||false;if(!a)return"";a=new Date(a);if(isNaN(a.getTime()))return"";return["January","February","March","April","May","June","July","August","September","October","November","December"][a.getMonth()]+" "+a.getDate()+", "+a.getFullYear()},convertDate:function(a){if(typeof a!=="undefined"){a=a.toString().split("T");a=a[0].split("-");a=new Date(a[0],a[1]- 1,a[2]);return["January","February","March","April","May","June","July","August","September","October","November","December"][a.getMonth()]+" "+a.getDate()+", "+a.getFullYear()}else return""},extractVideoId:function(a){a=a.replace(/^(http:\/\/)?[a-zA-Z0-9\.]+/,"");a=a.indexOf("#")===0?a.substring(2):a.substring(1);return a.substring(0,a.indexOf("/"))},extractCategoryId:function(a){return a.split("category_id=")[1]},cleanTitle:function(a){a=a.replace(/ /g,"-").toLowerCase();return a.replace(/[^a-z0-9\-]/g, "")},cleanHref:function(a){return a.replace(/^(http:\/\/)?[a-zA-Z0-9\.]+/,"")},cleanImageUrl:function(a){return a.replace("http://media2.foxnews.com","")},convertTime:function(a){var c=Math.floor(a/60);a=Math.floor(a%60);if(a.toString().length==1)a="0"+a;return c+":"+a},videoObjectJSON:function(a){return this.root.feedParser.legacy(a)}};var x={dm:"Agent",vcm:"i",ox:"vt"};w.prototype={init:function(a){if(a=a||false)for(i in a)this["_"+i]=a[i];if(!this.compatible())return false;this.EVENTS=new A;this.PROPERTIES= new B;this.STATES=new C;this.CONTROLS=new z;this.listeners.root=this.EVENTS.root=this.PROPERTIES.root=this.STATES.root=this.CONTROLS.root=this;this.listeners.main=this.EVENTS.main=this.PROPERTIES.main=this.STATES.main=this.CONTROLS.main=this.main;return true},compatible:function(){return this.helper.getQuery("_"+x.ox+x.ol.lmp.toLowerCase()+x.ol.arg.toLowerCase())==="y"?document.createElement("video").play?true:false:(document.createElement("video").play?true:false)&&("createTouch"in document?true: false)?true:false},check:function(){return this.compatible()},create:function(){},load:function(a,c){function b(n){var u=n.length;return n.substring(u-4,u).toLowerCase()===".mp4"?true:false}var f=this,e=this.main;if(!this.check(a))return false;if(e.dataObj[a]){var g=e.dataObj[a];if(b(g.url)){var k=function(n){n=n.split(".");var u=n.length-2,s=n[u],v=s.length-4;n[u]=s.substr(v)==="_MED"?s.slice(0,v)+"_LOW":s;return n.join(".")}(g.url),l=typeof e._config.display.clickThruImage==="undefined"?false:typeof e._config.display.clickThruImage!== "object"?e._config.display.clickThruImage:e._config.display.clickThruImage.render;if(e.holderObj[a].elm.data("pandoraLoaded")){var h=e.holderObj[a],o=h.elm.data("autoplay")?true:false,j=h.elm.parent(),m=[],q=[];for(i in h.vAttr)if(i==="format")m.push('class="'+h.vAttr[i]+' pandora-player"');else if(i==="id"){var r=e.setPlayerMap({type:"get",vId:h.vAttr[i]});e.setPlayerMap({type:"set",vId:a,domId:r});m.push('id="'+r+'"')}else"width|height".indexOf(i)>-1&&q.push(i+":"+h.vAttr[i]+";");h=q.join(" "); k='<video controls="" '+m.join(" ")+' src="'+k+'" style="'+h+'"></video>';j.get(0).innerHTML=k;j.find("video:first").each(function(){var n=t(this);n.data("pandora",true);n.data("pandoraLoaded",true);n.data("autoplay",o);f.video[a]={elm:n,nativeElm:n.get(0)};f.controls.set(a);f.listeners.init(a);e._callbacksObj[a]&&e._callbacksObj[a].dataChanged&&e._callbacksObj[a].dataChanged(g);if(l||o)f.CONTROLS.play(a)})}else e.embed.player(a)}else{e.holderObj[a].elm.data("pandora",false);e.holderObj[a].elm.data("pandoraLoaded", false);if("createTouch"in document?true:false)e._callbacksObj[a]&&e._callbacksObj[a].deviceRenderFailed&&e._callbacksObj[a].deviceRenderFailed();else e.embed.player(a)}}else e.feed.get({id:a,autoplay:c})}};w.prototype.listeners={init:function(a){this.events(a);this.custom(a)},events:function(a){var c=this.root,b=this.main;c.video[a].elm.bind("loadstart",function(){b._callbacksObj[a]&&b._callbacksObj[a].videoLoadStart&&b._callbacksObj[a].videoLoadStart();t.removeData(c.video[a].elm,"Event_ended"); c.EVENTS.loadStart(a)});c.video[a].elm.bind("progress",function(){c.EVENTS.progress(a)});c.video[a].elm.bind("loadedmetadata",function(){b._callbacksObj[a]&&b._callbacksObj[a].videoMedaLoaded&&b._callbacksObj[a].videoMetaLoaded();c.EVENTS.loadedMetaData(a)});c.video[a].elm.bind("ended",function(){b._callbacksObj[a]&&b._callbacksObj[a].videoEnded&&b._callbacksObj[a].videoEnded(c.CONTROLS);c.video[a].elm.data("Event_ended",true);c.EVENTS.ended(a)});c.video[a].elm.bind("playing",function(){b._callbacksObj[a]&& b._callbacksObj[a].videoPlaying&&b._callbacksObj[a].videoPlaying();c.EVENTS.playing(a)});c.video[a].elm.bind("pause",function(){b._callbacksObj[a]&&b._callbacksObj[a].videoPause&&b._callbacksObj[a].videoPause();c.EVENTS.pause(a)});c.video[a].elm.bind("timeupdate",function(){b._callbacksObj[a]&&b._callbacksObj[a].videoTimeUpdate&&b._callbacksObj[a].videoTimeUpdate();c.EVENTS.timeUpdate(a)})},custom:function(){}};w.prototype.controls={set:function(){}};w.prototype.helper={replaceStr:function(a,c,b){for(var f= a.indexOf(c);f!=-1;){a=a.replace(c,b);f=a.indexOf(c)}return a},formatTime:function(a){a=parseInt(a,10);var c=Math.floor(a/360),b=Math.floor(a/60);a=a%60;return(c>0?c<10?"0"+c:c:"")+(b<10?"0"+b:b)+":"+(a<10?"0"+a:a)},getQuery:function(a){for(var c=window.location.search.substr(1).split("&"),b=0;b<c.length;b++){var f=c[b].split("=");if(f[0]===a)return f[1]}return false}};z.prototype={play:function(a){a=this.root.main.setPlayerMap({type:"get",vId:a});typeof document.getElementById(a)!=="undefined"&& document.getElementById(a).play()},pause:function(a){a=this.root.main.setPlayerMap({type:"get",vId:a});typeof document.getElementById(a)!=="undefined"&&document.getElementById(a).pause()},load:function(){},canPlayType:function(){},jumpTo:function(a,c){if(isNaN(c))return false;var b=this.root.main.setPlayerMap({type:"get",vId:a});if(typeof document.getElementById(b)!=="undefined")document.getElementById(b).currentTime=c}};A.prototype={loadStart:function(a){this.root.main.setPlayerMap({type:"get",vId:a})}, progress:function(a){var c=this.root,b=c.STATES.buffered(a,{range:"end",val:0});parseInt(b/c.STATES.duration(a)*100,10)},loadedMetaData:function(){},timeUpdate:function(){},ended:function(){},playing:function(){},pause:function(){}};B.prototype={currentTime:function(a,c){c=c||false;var b=this.root,f=Math.round(b.video[a].nativeElm.currentTime);if(!c){f=b.helper.formatTime(f);b=b.STATES.duration(a,true);return f>b?b:f}return f}};C.prototype={duration:function(a,c){c=c||false;var b=this.root,f=b.main.setPlayerMap({type:"get", vId:a});if(typeof document.getElementById(f)==="undefined")return 0;f=Math.round(document.getElementById(f).duration);if(!c)return b.helper.formatTime(f);return f},buffered:function(a,c){c=c||false;if(!c)return false;var b=this.root.main.setPlayerMap({type:"get",vId:a});if(typeof document.getElementById(b)!=="undefined")switch(c.range){case "length":return document.getElementById(b).buffered.length;case "start":return document.getElementById(b).buffered.start(c.val);case "end":return document.getElementById(b).buffered.end(c.val)}return false}}})(jQuery);

// Touch Event Listener - minified. updated: 03/31/2010
// Dependencies: jQuery
(function(e){function m(){this.listenersArr=[];this.version="03.31.2010"}function n(){this._elm=false;this._eventsCallback={};this._moveSensitivity=15;this.properties={scale:{},move:{origin:{},current:{},diff:{}}};this.thisEventList=["touchstart","touchend","touchmove","gesturestart","gestureend"]}function p(b){typeof window.console==="object"&&console.log(b)}function o(){}m.prototype={append:function(b){b=b||false;if(!b||!b.elm)return false;var a=new n;a.init(b);this.listenersArr.push({fn:a,config:b}); this.trigger(a)},trigger:function(b){b=b||false;var a=this;if(b)b.trigger();else for(var c=0;c<a.listenersArr.length;c++){var d=a.listenersArr[c].fn;a.helper.removeListener(d._elm,b.thisEventList);d.trigger()}},reTriggerListener:function(){var b=this;e(document).ready(function(){function a(){var f=e("iframe").size();if(f!==g)g=f;else c=Math.floor(c/3)+c;if(c<d){b.trigger();setTimeout(function(){a()},c)}}var c=500,d=1E4,g=0;a()})}};m.prototype.helper={removeListener:function(b,a){b.each(function(){var c= e(this);if(a instanceof Array)for(var d=0;d<a.length;d++)c.unbind(a[d]);else c.unbind(a)})}};n.prototype={init:function(b){for(i in b)this["_"+i]=b[i];this.testElm={coords:e("#coords"),start:e("#start"),diff:e("#diff")};this.logger=new o;this.logger.init()},trigger:function(){var b=this;this._elm.each(function(){b.setListeners(e(this))})},setListeners:function(b){b=b||false;if(!b)return false;var a=this;b.get(0);b.bind("touchstart",function(c){c=c.originalEvent;a._elm.data("EVENT_touchstart.trigger", true);a._elm.data("EVENT_touchmove.setOrigin",false);a._elm.data("EVENT_touchmove.directionalOnce",false);a._eventsCallback.touchstart&&a._eventsCallback.touchstart(c)});b.bind("touchend",function(c){c=c.originalEvent;a._elm.data("EVENT_touchstart.trigger",false);a._elm.data("EVENT_touchmove.directionalOnce",false);a._eventsCallback.touchend&&a._eventsCallback.touchend(c)});b.bind("touchmove",function(c){function d(){function q(){a._elm.data("EVENT_touchmove.directionalOnce",true)}var l=a._moveSensitivity, h=[];if(f>=j.x+l){h.push("right");a.logger.log("going right")}else if(f<=j.x-l){h.push("left");a.logger.log("going left")}if(k<=j.y-l){h.push("up");a.logger.log("going up")}else if(k>=j.y+l){h.push("down");a.logger.log("going down")}a._eventsCallback.touchmoveMoveOnce&&a._eventsCallback.touchmoveMoveOnce(h,a.properties.move,g);h.length>0&&q()}var g=c.originalEvent,f=g.touches[0].pageX,k=g.touches[0].pageY;a.properties.move.current={x:f,y:k};if(!a._elm.data("EVENT_touchmove.setOrigin")){a.properties.move.origin.x= f;a.properties.move.origin.y=k;a._elm.data("EVENT_touchmove.setOrigin",true)}var j={x:a.properties.move.origin.x,y:a.properties.move.origin.y};a.properties.move.diff={x:f-j.x,y:k-j.y};a._eventsCallback.touchmoveRaw&&a._eventsCallback.touchmoveRaw(a.properties.move,g);a._elm.data("EVENT_touchmove.directionalOnce")||d()});b.bind("gesturestart",function(c){c=c.originalEvent;var d=a.helper.setScale(c.scale);a.properties.scale.current=a.properties.scale.current||d;a._eventsCallback.gesturestart&&a._eventsCallback.gesturestart(c); a.properties.scale.changed=false});b.bind("gestureend",function(c){c=c.originalEvent;var d=a.helper.setScale(c.scale);a._eventsCallback.gestureend&&a._eventsCallback.gestureend(c);if(a.properties.scale.current!==d){a.properties.scale.current=d;a.properties.scale.changed=true;a.logger.log("Scale changed to: "+d);a._eventsCallback.scaleChange&&a._eventsCallback.scaleChange(d,c)}});b=e(window);if(!b.data("EVENT_orientationchange")){b.bind("orientationchange",function(c){a.logger.log("Orientation change: "+ a.helper.orientation(window.orientation,c.originalEvent))});b.data("EVENT_orientationchange",true)}a._eventsCallback.orientationchange&&b.bind("orientationchange",function(c){a._eventsCallback.orientationchange(a.helper.orientation(window.orientation,c.originalEvent))})}};n.prototype.helper={setScale:function(b){if(!isNaN(b))return Math.round(b*100)/100},orientation:function(b){if(!isNaN(b)){b=Math.abs(b);return b===0||b===180?"vertical":"horizontal"}}};o.prototype={init:function(){this.elm=e("#console ul:first")}, log:function(b){if(this.getQuery("log")!=="y")return false;if(this.elm.size()>0){b="<li>"+b+"</li>";this.elm.append(b)}else p(b)},getQuery:function(b){for(var a=window.location.search.substr(1).split("&"),c=0;c<a.length;c++){var d=a[c].split("=");if(d[0]===b)return d[1]}return false}};window.touchEventListener=new m})(jQuery);

// Hash/Query String getter for video pages. updated 04/05/2010
// Dependencies: none
// NOTE: Any change to the video link setup must be synched up
(function(){var e=window.HashQuery=function(){this.values={};this.hash.root=this;this.link.root=this};e.prototype={check:function(a){if(a=a||false){if(a==="link")return this.link.exists();else if(a==="hash")return this.hash.exists();return false}return false}};e.prototype.hash={exists:function(){return this.get()?true:false},get:function(){if(document.location.hash.length>0){for(var a=document.location.hash.split("/"),d=false,c=false,b=0;b<a.length;b++){if(a[b].toLowerCase()==="v"&&!isNaN(a[b+1])&& !d)d=a[b+1];if(a[b].toLowerCase().indexOf("playlist_id=")>-1&&!c){c=a[b].toLowerCase();c=c.substring(c.indexOf("=")+1)}}if(d){this.root.values.hash={videoId:d,playlistId:c?c:null};return this.root.values.hash}return false}return false}};e.prototype.link={exists:function(){return this.get()?true:false},get:function(){if(document.location.pathname.length>0){for(var a=document.location.pathname.split("/"),d=false,c=false,b=0;b<a.length;b++)if(a[b].toLowerCase()==="v"&&!isNaN(a[b+1])&&!d)d=a[b+1];if(document.location.search.length> 0){a=document.location.search.toLowerCase();if(a.indexOf("playlist_id=")>-1)c=a.substring(a.indexOf("=")+1)}if(d){this.root.values.link={videoId:d,playlistId:c?c:null};return this.root.values.link}return false}return false}}})();

(function($){

// Video Player Port
function FoxVideoPort() {
  this.autoplay = true;
  this.initialized = false;
  this.playerClass = "video-player-format";
  this.playerWrapperClass = "video-player-wrapper";
  this.feedFolder = { // default feed folders
    video: "\/v/feed/video/",
    playlist: "\/v/feed/playlist/"
  };
  this.videoDomain = "video.foxnews.com"; // default video domain
  this.locationPath = document.location.protocol + "\/\/" + this.videoDomain + document.location.pathname;

  // this is only for qa/dev
  }

// Port previous video functions
FoxVideoPort.prototype = {
  init: function(config) {
    config = config || false;

    if (!config) { return false; }
    var VP = this;

    // default values
    config.width = config.width || 604;
    config.height = config.height || 341;
    config.flash_version = config.flash_version || '9.0.115';
    config.autoplay = (typeof config.autoplay!=="undefined") ? config.autoplay : this.autoplay;
    config.video_folder = config.video_folder || this.feedFolder.video;
    config.playlist_folder = config.playlist_folder || this.feedFolder.playlist;
    config.video_domain = this.videoDomain;
    config.callback_options = config.callback_options || false;
    config.exp_install = config.exp_install || 'http:'+config.video_domain+'/assets/akamai/expressInstall.swf';
    config.settings_url= VP.getConfigPath(config.video_domain);
    config.flash_player_location = 'http://' + config.video_domain+'/assets/akamai/FoxNewsPlayer.swf'; //use akamai player
    config.show_autoplay_overlay = (typeof config.show_autoplay_overlay!=="undefined") ? config.show_autoplay_overlay : false;
    config.auto_play_list = (typeof config.auto_play_list!=="undefined") ? config.auto_play_list : false;
    config.cache_bust_key = (typeof config.cache_bust_key!=="undefined") ? config.cache_bust_key : false;

  config.flash_vars.core_yume_ad_library_url = "http://"+config.video_domain+"/assets/akamai/yume_ad_library.swf";
  config.flash_vars.core_yume_player_url = "http://"+config.video_domain+"/assets/akamai/yume_player_4x3.swf";

    // flash Vars
    var fVars = config.flash_vars || videoPlayerFlashVars || false;

    if (!fVars) {
      showToConsole("[error] Flash player variables not declared"); return false;
    }

    // new video player
    var renderConfig = {
      player: {
        location: config.flash_player_location,
        flashVersion: config.flash_version,
        expressInstall: config.exp_install,
        params: {
          bgcolor: '#000000',
          wmode: 'opaque',
          scale: 'noScale',
          menu: 'false',
          allowScriptAccess: 'always',
          allowFullScreen: 'true'
        },
        flashVars: {
          location: this.locationPath ,
          core_ads_enabled: fVars.core_ads_enabled,
          // core_swf_url: fVars.core_swf_url,
          core_omniture_player_name: fVars.core_omniture_player_name,
          core_omniture_account: fVars.core_omniture_account,
          core_ad_player_name: fVars.core_ad_player_name,
          // yume_ad_domain_code: fVars.yume_ad_domain_code,
          // yume_ad_server_domain: fVars.yume_ad_server_domain,
          core_yume_ad_library_url: fVars.core_yume_ad_library_url,
          core_yume_player_url: fVars.core_yume_player_url,
          auto_play: config.autoplay,
          video_id: config.page_videoId,
          settings_url: config.settings_url,
          show_autoplay_overlay : config.show_autoplay_overlay,
          auto_play_list: config.auto_play_list
        },
        feedSettings: {
          videoFolder: config.video_folder,
          playlistFolder: config.playlist_folder
        }
      },
      display: {
        allow: {},
        clickThruImage: false
      }
    };

    // show variable
    if (config.flash_vars.show) {
      renderConfig.player.flashVars.show = config.flash_vars.show;
    }

    // user controlled autoplay - video player autoplay
    if (!config.user_controlled_autoplay) {
      renderConfig.player.flashVars.auto_play_override = renderConfig.player.flashVars.auto_play;
    }

     // sharing overlay
    if (config.show_sharing_overlay) {
        renderConfig.player.flashVars.show_sharing_overlay = config.show_sharing_overlay;
    }

    // share_enabled_providers
    if (config.share_enabled_providers) {
        renderConfig.player.flashVars.share_enabled_providers = config.share_enabled_providers;
    }

    // email overlay
    if (config.show_email_overlay) {
      renderConfig.player.flashVars.show_email_overlay = config.show_email_overlay;
    }

     // show_related_videos overlay
    if (config.show_related_videos) {
      renderConfig.player.flashVars.show_related_videos = config.show_related_videos;
    }

    // class declared attribute - custom declaration
    renderConfig.display.allow[VP.playerClass] = [config.width, config.height];

    // use overlay
    if (config.use_overlay) {
        renderConfig.display.clickThruImage = {
            render: true,
            overlayImg:  "http:\/\/www.foxnews.com/static/all/img/vp-overlay.png"
        };
        renderConfig.player.flashVars.auto_play_override = "true"; // force to true
    }

    // cache string
    if (config.cache_bust_key) {
       renderConfig.player.flashVars.cache_bust_key = config.cache_bust_key;
    }

    // Instantiate player globally
    $(document).ready(function(){
      if (!VP.initialized) {
        var videoPlayer = window.videoPlayer = new MvPlayer();
        videoPlayer.init({
          namespace: 'videoPlayer',
          videoDomain: config.video_domain,
          config: renderConfig,
          autoEmbed: false
        });
      }

      if (config.page_videoId) { // if video id passed, play it
        VP.playVideo(config.page_videoId,config.autoplay,config.callback_options);
      }
    });

  },
  getConfigPath: function(domain) {
  if (!domain) { return false; }
  var url = 'http://'+domain+'/assets/akamai/resources/conf/config${suffix}.xml';
  url = url.replace("${suffix}",(domain.indexOf("foxbusiness")>-1) ? "-fb" : (domain.indexOf("smallbusinesscenter")>-1) ? "-sbc" : "");
  return url;
  },
  cleanHref: function(href) {
    return href.replace(/^(http:\/\/)?[a-zA-Z0-9\.\-]+/, '');
  },
  cleanImageUrl: function(url, w, h) {
    w = w || 121;
    h = h || 68;

    if (url.match(/\/([0-9]{1,3})\/([0-9]{1,3})\//)) {
      return url.replace(/\/([0-9]{1,3})\/([0-9]{1,3})\//, '/' + w + '/' + h + '/');
    } else if (url.match(/thumbnails\/([a-zA-Z0-9\_]+)\.jpg/)) {
      return url.replace(/.*\/thumbnails\/([a-zA-Z0-9\_]+)\.jpg/, 'http://beta.video.foxnews.com/thumbnails/' + w + '/' + h + '/$1.jpg');
    } else if (url.match(/thumbnails\/i\/([0-9]{6})\/([a-zA-Z0-9\_]+)\.jpg/)) {
      return url.replace(/.*\/thumbnails\/i\/([0-9]{6})\/([a-zA-Z0-9\_]+)\.jpg/, 'http://beta.video.foxnews.com/thumbnails/i/$1/' + w + '/' + h + '/$2.jpg');
    }
  },
  cleanMetadata: function(str) {
    if (typeof str==="string") {
      str = str.replace(/[^a-zA-Z0-9\.\-]/g, '_');
      return str.replace(/[\_]+/g, '_');
    }
  },
  cleanTitle: function(title) {
    title = title.replace(/ /g,'-').toLowerCase();
    return title.replace(/[^a-z0-9\-]/g, '');
  },
  convertDate: function(d,isAbbr) {
    d = d || false;
    if (!d) { return ""; }
  var monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    months = (isAbbr)? monthAbbr : months;

    var date = d.toString().split('T');
    date = date[0].split('-');
    date = new Date(date[0], (date[1] - 1), date[2]);
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  },
  convertTime: function(sec) {
    var minutes = Math.floor(sec/60);
    var seconds = Math.floor(sec%60);
    if (seconds.toString().length===1) { seconds = '0' + seconds; }
    return minutes + ':' + seconds;
  },
  convertToRtmp:function(url) {
    return url;
  },
  extractCategoryId:function(str) {
    return str.split('category_id=')[1];
  },
  extractPlaylistId:function(str) {
    return str.split('playlist_id=')[1];
  },
  extractVideoId:function(str) {
    var s = str.replace(/^(http:\/\/)?([a-zA-Z0-9\.]+)?\/v/, '');
    s = (s.indexOf('#')===0) ? s.substring(2) : s.substring(1);
    return s.substring(0, s.indexOf('/'));
  },
  getPermalink:function(videoId, title, playlistId) {
    title = title || false;
    playlistId = playlistId || false;
    var VP = this;
    var url = VP.domain + '/v/' + videoId + '/';

    if (title) { url += VP.cleanTitle(title) + '/'; }
    if (playlistId) { url += '?playlist_id=' + playlistId; }

    return url;
  },
  getVideoObject: function(json) {
    var VP = this;

    if (typeof json.channel.item==='undefined') { return false; }

    var item = json.channel.item;
    var PLVideos = []; // setup array for playlist videos

    if (item instanceof Array) {
      for (var x = 0; x < item.length; x++) { // store video items on the playlist
        PLVideos.push(item[x]);
      }
      // if an array, probably from a playlist, just grab the first video item as main video data
      item = json.channel.item[0];
    }

    if (!item['media-content']) { return false; }
    var details = item['media-content'];

    if (!details['media-credit']) { return false; }
    var credits = details['media-credit'];

    var obj = {
      url: details['@attributes'].url,
      title: item.title,
      description: details['media-description'],
      keywords: details['media-keywords'],
      thumbnail: details['media-thumbnail'],
      guid: details['mvn-assetUUID'],
      mavenid: details['mvn-mavenId'],
      channel: (details['mvn-fnc_channel'])?details['mvn-fnc_channel']:details['mvn-fbn_channel'],
      playlist: details["mvn-fnc_default_playlist"],
      personality: (details['mvn-fnc_personality'])?details['mvn-fnc_personality']:details['mvn-fbn_personality'],
      format: (details['mvn-fnc_format'])?details['mvn-fnc_format']:details['mvn-fbn_format'],
      show: (details['mvn-fnc_show'])?details['mvn-fnc_show']:details['mvn-fbn_show'],
      category: (details['mvn-fnc_category']) ? details['mvn-fnc_category'] : details['mvn-fbn_category'],
      creationDate: this.convertDate(details['mvn-creationDate']),
      shortDescription: details['mvn-shortDescription'],
      loc: VP.cleanMetadata(window.location.host+window.location.pathname)
    };

    if (window.location.toString().indexOf('foxsmallbusinesscenter.com') > -1) {
      obj.category = "fsb";
      obj.format = "fsb";
    }

    // if a playlist feed, add playlist video info
    if (PLVideos.length>0) {
      obj.PLVideos = PLVideos;
    }

    return obj;
  },
  playVideo: function(videoId,autoplay,callbackOptions) {
    // it plays on page load
    callbackOptions = callbackOptions || false;
    var VP = this;
    var attempts = 0;
    var holderElm = $("."+VP.playerWrapperClass);
    var id = "videoid:g"+videoId; // g for grab video
    var config = {
      holder: holderElm,
      type: "video",
      id: id,
      cssClass: VP.playerClass,
      autoplay: autoplay,
      callbacks: { // define callback functions
        feedLoaded: function(data) { // if new feed is loaded
          if (typeof updatePageContent!=="undefined") { updatePageContent(data); }
        },
        dataChanged: function(data) { // if current data was changed
          if (typeof updatePageContent!=="undefined") { updatePageContent(data); }
        },
        videoEnded: function(controls) {
          if (controls) { // html5 controls
            var useDefault = true;

            if (callbackOptions) {
              if (callbackOptions.onVideoEndPlayNext) {
                if (typeof playNextSlideshowVideo!=="undefined") {
                  playNextSlideshowVideo(videoId);
                  useDefault = false;
                } else {
                  showToConsole("[warning] function not found: playNextSlideshowVideo");
                }
              }
            }

            if (useDefault) {
              // "reset" video
              controls.jumpTo(id,0); // go to first frame
              controls.pause(id);
            }
          }
        }
      }
    };

    function renderVideo() {
      if (typeof videoPlayer!=="undefined") {
        videoPlayer.render(config);
      } else {
        attempts++;
        if (attempts<50) {
          setTimeout(function(){ renderVideo(); },100);
        } else {
          showToConsole("[warning] oFoxVideo.playVideo(): Maximum player renderer attempts exceeded"); return false;
        }
      }
    }

    renderVideo();
  },
  playNewVideo:function(videoId,autoplay) { // DEPRECATED
    autoplay = autoplay || false;
    this.playVideo(videoId,autoplay);
    //$.getJSON(oFoxVideo.domain + '/v/feed/video/' + videoId + '.js?callback=oFoxVideo.playVideoCallback&jsonp=?');
  },
  playVideoAttempt:function(videoId, autoplay, domain) { // DEPRECATED
    autoplay = autoplay || false;
    this.playVideo(videoId,autoplay);
  },
  playVideoCallback:function(json) {
    showToConsole("[warning] Deprecated function still being called: oFoxVideo.playVideoCallback()"); return false;
  }
};

//console log for firebug
function showToConsole(str) {
  if (typeof window.console==='object') { console.log(str); }
}
// initialize oFoxVideo
var oFoxVideo = window.oFoxVideo = new FoxVideoPort();

})(jQuery);

var listener_docReady = false;
function embedVideo(config) {
  if (typeof pageVars!=="undefined") {
    if (pageVars.videoId) { config.page_videoId = pageVars.videoId; }
    if (pageVars.playlistId) { config.page_playlistId = pageVars.playlistId; }
  }

  if (typeof HashQuery!=="undefined") {
    var passVars = new HashQuery();
    if (passVars.hash.get()) { // override if hash values were passed
      var hashVals = passVars.values.hash;
      config.page_videoId = hashVals.videoId;
      config.page_playlistId = (hashVals.playlistId) ? hashVals.playlistId : config.page_playlistId;

      if (typeof scrollToCarouselItem==="function") {
        $(document).ready(function(){ scrollToCarouselItem(hashVals.videoId); });
      }
    }
  }

  function findElm() {

    if (document.getElementById(config.dom_id)) {
      oFoxVideo.init(config);
    } else if (listener_docReady) {
      // attempt one last time if document has fully loaded
      if (document.getElementById(config.dom_id)) { oFoxVideo.init(config); }
    } else {
      setTimeout(function(){ findElm(); },1);
    }

  }
  findElm();
  $(document).ready(function(){
    listener_docReady = true;
  });
}


(function(){var domain=document.location.hostname;var videoPlayerFlashVars=window.videoPlayerFlashVars={core_ads_enabled:true,core_yume_ad_library_url:"http://"+domain+"/assets/akamai/yume_ad_library.swf",core_yume_player_url:"http://"+domain+"/assets/akamai/yume_player_4x3.swf"};var videoPlayerParams=window.videoPlayerParams={bgcolor:'#ffffff',wmode:"opaque",scale:"noScale",menu:"false",allowScriptAccess:"always",allowFullScreen:"true"};})();


jQuery.copy=function(data){return jQuery.fn.copy.call({},data);};jQuery.fn.copy=function(delimiter){var self=this,flashcopier=(function(fid){return document.getElementById(fid)||(function(){var divnode=document.createElement('div');divnode.id=fid;document.body.appendChild(divnode);return divnode;})();})('_flash_copier'),data=jQuery.map(self,function(bit){return typeof bit==='object'?bit.value||bit.innerHTML.replace(/<.+>/g,''):'';}).join(delimiter||'').replace(/^\s+|\s+$/g,'')||delimiter,divinfo='<embed src="/swf/jquery.copy.swf"FlashVars="clipboard='+encodeURIComponent(data)+'"width="0"height="0"'+'type="application/x-shockwave-flash"></embed>';flashcopier.innerHTML=divinfo;return self;};(function($){$.event.special.mousewheel={setup:function(){var handler=$.event.special.mousewheel.handler;if($.browser.mozilla)$(this).bind('mousemove.mousewheel',function(event){$.data(this,'mwcursorposdata',{pageX:event.pageX,pageY:event.pageY,clientX:event.clientX,clientY:event.clientY})});if(this.addEventListener)this.addEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else this.onmousewheel=handler},teardown:function(){var handler=$.event.special.mousewheel.handler;$(this).unbind('mousemove.mousewheel');if(this.removeEventListener)this.removeEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else this.onmousewheel=function(){};$.removeData(this,'mwcursorposdata')},handler:function(event){var args=Array.prototype.slice.call(arguments,1);event=$.event.fix(event||window.event);$.extend(event,$.data(this,'mwcursorposdata')||{});var delta=0,returnValue=true;if(event.wheelDelta)delta=event.wheelDelta/120;if(event.detail)delta=-event.detail/3;event.data=event.data||{};event.type="mousewheel";args.unshift(delta);args.unshift(event);return $.event.handle.apply(this,args)}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}})})(jQuery);(function($){$.jScrollPane={active:[]};$.fn.jScrollPane=function(settings){settings=$.extend({},$.fn.jScrollPane.defaults,settings);var rf=function(){return false};return this.each(function(){var $this=$(this);$this.css('overflow','hidden');var paneEle=this;if($(this).parent().is('.jScrollPaneContainer')){var currentScrollPosition=settings.maintainPosition?$this.position().top:0;var $c=$(this).parent();var paneWidth=$c.innerWidth();var paneHeight=$c.outerHeight();var trackHeight=paneHeight;$('>.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown',$c).remove();$this.css({'top':0})}else{var currentScrollPosition=0;this.originalPadding=$this.css('paddingTop')+' '+$this.css('paddingRight')+' '+$this.css('paddingBottom')+' '+$this.css('paddingLeft');this.originalSidePaddingTotal=(parseInt($this.css('paddingLeft'))||0)+(parseInt($this.css('paddingRight'))||0);var paneWidth=$this.innerWidth();var paneHeight=$this.innerHeight();var trackHeight=paneHeight;var $container=$('<div></div>').attr({'className':'jScrollPaneContainer'}).css({'height':paneHeight+'px','width':paneWidth+'px'});if(settings.enableKeyboardNavigation){$container.attr('tabindex',settings.tabIndex)}$this.wrap($container);$(document).bind('emchange',function(e,cur,prev){$this.jScrollPane(settings)})}if(settings.reinitialiseOnImageLoad){var $imagesToLoad=$.data(paneEle,'jScrollPaneImagesToLoad')||$('img',$this);var loadedImages=[];if($imagesToLoad.length){$imagesToLoad.each(function(i,val){$(this).bind('load readystatechange',function(){if($.inArray(i,loadedImages)==-1){loadedImages.push(val);$imagesToLoad=$.grep($imagesToLoad,function(n,i){return n!=val});$.data(paneEle,'jScrollPaneImagesToLoad',$imagesToLoad);var s2=$.extend(settings,{reinitialiseOnImageLoad:false});$this.jScrollPane(s2)}}).each(function(i,val){if(this.complete||this.complete===undefined){this.src=this.src}})})}}var p=this.originalSidePaddingTotal;var realPaneWidth=paneWidth-settings.scrollbarWidth-settings.scrollbarMargin-p;var cssToApply={'height':'auto','width':realPaneWidth+'px'};if(settings.scrollbarOnLeft){cssToApply.paddingLeft=settings.scrollbarMargin+settings.scrollbarWidth+'px'}else{cssToApply.paddingRight=settings.scrollbarMargin+'px'}$this.css(cssToApply);var contentHeight=$this.outerHeight();var percentInView=paneHeight/contentHeight;if(percentInView<.99){var $container=$this.parent();$container.append($('<div></div>').attr({'className':'jScrollPaneTrack'}).css({'width':settings.scrollbarWidth+'px'}).append($('<div></div>').attr({'className':'jScrollPaneDrag'}).css({'width':settings.scrollbarWidth+'px'}).append($('<div></div>').attr({'className':'jScrollPaneDragTop'}).css({'width':settings.scrollbarWidth+'px'}),$('<div></div>').attr({'className':'jScrollPaneDragBottom'}).css({'width':settings.scrollbarWidth+'px'}))));var $track=$('>.jScrollPaneTrack',$container);var $drag=$('>.jScrollPaneTrack .jScrollPaneDrag',$container);var currentArrowDirection;var currentArrowTimerArr=[];var currentArrowInc;var whileArrowButtonDown=function(){if(currentArrowInc>4||currentArrowInc%4==0){positionDrag(dragPosition+currentArrowDirection*mouseWheelMultiplier)}currentArrowInc++};if(settings.enableKeyboardNavigation){$container.bind('keydown.jscrollpane',function(e){switch(e.keyCode){case 38:currentArrowDirection=-1;currentArrowInc=0;whileArrowButtonDown();currentArrowTimerArr[currentArrowTimerArr.length]=setInterval(whileArrowButtonDown,100);return false;case 40:currentArrowDirection=1;currentArrowInc=0;whileArrowButtonDown();currentArrowTimerArr[currentArrowTimerArr.length]=setInterval(whileArrowButtonDown,100);return false;case 33:case 34:return false;default:}}).bind('keyup.jscrollpane',function(e){if(e.keyCode==38||e.keyCode==40){for(var i=0;i<currentArrowTimerArr.length;i++){clearInterval(currentArrowTimerArr[i])}return false}})}if(settings.showArrows){var currentArrowButton;var currentArrowInterval;var onArrowMouseUp=function(event){$('html').unbind('mouseup',onArrowMouseUp);currentArrowButton.removeClass('jScrollActiveArrowButton');clearInterval(currentArrowInterval)};var onArrowMouseDown=function(){$('html').bind('mouseup',onArrowMouseUp);currentArrowButton.addClass('jScrollActiveArrowButton');currentArrowInc=0;whileArrowButtonDown();currentArrowInterval=setInterval(whileArrowButtonDown,100)};$container.append($('<a></a>').attr({'href':'javascript:;','className':'jScrollArrowUp','tabindex':-1}).css({'width':settings.scrollbarWidth+'px'}).html('Scroll up').bind('mousedown',function(){currentArrowButton=$(this);currentArrowDirection=-1;onArrowMouseDown();this.blur();return false}).bind('click',rf),$('<a></a>').attr({'href':'javascript:;','className':'jScrollArrowDown','tabindex':-1}).css({'width':settings.scrollbarWidth+'px'}).html('Scroll down').bind('mousedown',function(){currentArrowButton=$(this);currentArrowDirection=1;onArrowMouseDown();this.blur();return false}).bind('click',rf));var $upArrow=$('>.jScrollArrowUp',$container);var $downArrow=$('>.jScrollArrowDown',$container);if(settings.arrowSize){trackHeight=paneHeight-settings.arrowSize-settings.arrowSize;$track.css({'height':trackHeight+'px',top:settings.arrowSize+'px'})}else{var topArrowHeight=$upArrow.height();settings.arrowSize=topArrowHeight;trackHeight=paneHeight-topArrowHeight-$downArrow.height();$track.css({'height':trackHeight+'px',top:topArrowHeight+'px'})}}var $pane=$(this).css({'position':'absolute','overflow':'visible'});var currentOffset;var maxY;var mouseWheelMultiplier;var dragPosition=0;var dragMiddle=percentInView*paneHeight/2;var getPos=function(event,c){var p=c=='X'?'Left':'Top';return event['page'+c]||(event['client'+c]+(document.documentElement['scroll'+p]||document.body['scroll'+p]))||0};var ignoreNativeDrag=function(){return false};var initDrag=function(){ceaseAnimation();currentOffset=$drag.offset(false);currentOffset.top-=dragPosition;maxY=trackHeight-$drag[0].offsetHeight;mouseWheelMultiplier=2*settings.wheelSpeed*maxY/contentHeight};var onStartDrag=function(event){initDrag();dragMiddle=getPos(event,'Y')-dragPosition-currentOffset.top;$('html').bind('mouseup',onStopDrag).bind('mousemove',updateScroll);if($.browser.msie){$('html').bind('dragstart',ignoreNativeDrag).bind('selectstart',ignoreNativeDrag)}return false};var onStopDrag=function(){$('html').unbind('mouseup',onStopDrag).unbind('mousemove',updateScroll);dragMiddle=percentInView*paneHeight/2;if($.browser.msie){$('html').unbind('dragstart',ignoreNativeDrag).unbind('selectstart',ignoreNativeDrag)}};var positionDrag=function(destY){destY=destY<0?0:(destY>maxY?maxY:destY);dragPosition=destY;$drag.css({'top':destY+'px'});var p=destY/maxY;$this.data('jScrollPanePosition',(paneHeight-contentHeight)*-p);$pane.css({'top':((paneHeight-contentHeight)*p)+'px'});$this.trigger('scroll');if(settings.showArrows){$upArrow[destY==0?'addClass':'removeClass']('disabled');$downArrow[destY==maxY?'addClass':'removeClass']('disabled')}};var updateScroll=function(e){positionDrag(getPos(e,'Y')-currentOffset.top-dragMiddle)};var dragH=Math.max(Math.min(percentInView*(paneHeight-settings.arrowSize*2),settings.dragMaxHeight),settings.dragMinHeight);$drag.css({'height':dragH+'px'}).bind('mousedown',onStartDrag);var trackScrollInterval;var trackScrollInc;var trackScrollMousePos;var doTrackScroll=function(){if(trackScrollInc>8||trackScrollInc%4==0){positionDrag((dragPosition-((dragPosition-trackScrollMousePos)/2)))}trackScrollInc++};var onStopTrackClick=function(){clearInterval(trackScrollInterval);$('html').unbind('mouseup',onStopTrackClick).unbind('mousemove',onTrackMouseMove)};var onTrackMouseMove=function(event){trackScrollMousePos=getPos(event,'Y')-currentOffset.top-dragMiddle};var onTrackClick=function(event){initDrag();onTrackMouseMove(event);trackScrollInc=0;$('html').bind('mouseup',onStopTrackClick).bind('mousemove',onTrackMouseMove);trackScrollInterval=setInterval(doTrackScroll,100);doTrackScroll();return false};$track.bind('mousedown',onTrackClick);$container.bind('mousewheel',function(event,delta){delta=delta||(event.wheelDelta?event.wheelDelta/120:(event.detail)?-event.detail/3:0);initDrag();ceaseAnimation();var d=dragPosition;positionDrag(dragPosition-delta*mouseWheelMultiplier);var dragOccured=d!=dragPosition;return!dragOccured});var _animateToPosition;var _animateToInterval;function animateToPosition(){var diff=(_animateToPosition-dragPosition)/settings.animateStep;if(diff>1||diff<-1){positionDrag(dragPosition+diff)}else{positionDrag(_animateToPosition);ceaseAnimation()}}var ceaseAnimation=function(){if(_animateToInterval){clearInterval(_animateToInterval);delete _animateToPosition}};var scrollTo=function(pos,preventAni){if(typeof pos=="string"){$e=$(pos,$this);if(!$e.length)return;pos=$e.offset().top-$this.offset().top}$container.scrollTop(0);ceaseAnimation();var maxScroll=contentHeight-paneHeight;pos=pos>maxScroll?maxScroll:pos;$this.data('jScrollPaneMaxScroll',maxScroll);var destDragPosition=pos/maxScroll*maxY;if(preventAni||!settings.animateTo){positionDrag(destDragPosition)}else{_animateToPosition=destDragPosition;_animateToInterval=setInterval(animateToPosition,settings.animateInterval)}};$this[0].scrollTo=scrollTo;$this[0].scrollBy=function(delta){var currentPos=-parseInt($pane.css('top'))||0;scrollTo(currentPos+delta)};initDrag();scrollTo(-currentScrollPosition,true);$('*',this).bind('focus',function(event){var $e=$(this);var eleTop=0;while($e[0]!=$this[0]){eleTop+=$e.position().top;$e=$e.offsetParent()}var viewportTop=-parseInt($pane.css('top'))||0;var maxVisibleEleTop=viewportTop+paneHeight;var eleInView=eleTop>viewportTop&&eleTop<maxVisibleEleTop;if(!eleInView){var destPos=eleTop-settings.scrollbarMargin;if(eleTop>viewportTop){destPos+=$(this).height()+15+settings.scrollbarMargin-paneHeight}scrollTo(destPos)}});if(location.hash){setTimeout(function(){scrollTo(location.hash)},$.browser.safari?100:0)}$(document).bind('click',function(e){$target=$(e.target);if($target.is('a')){var h=$target.attr('href');if(h&&h.substr(0,1)=='#'&&h.length>1){setTimeout(function(){scrollTo(h,!settings.animateToInternalLinks)},$.browser.safari?100:0)}}});function onSelectScrollMouseDown(e){$(document).bind('mousemove.jScrollPaneDragging',onTextSelectionScrollMouseMove);$(document).bind('mouseup.jScrollPaneDragging',onSelectScrollMouseUp)}var textDragDistanceAway;var textSelectionInterval;function onTextSelectionInterval(){direction=textDragDistanceAway<0?-1:1;$this[0].scrollBy(textDragDistanceAway/2)}function clearTextSelectionInterval(){if(textSelectionInterval){clearInterval(textSelectionInterval);textSelectionInterval=undefined}}function onTextSelectionScrollMouseMove(e){var offset=$this.parent().offset().top;var maxOffset=offset+paneHeight;var mouseOffset=getPos(e,'Y');textDragDistanceAway=mouseOffset<offset?mouseOffset-offset:(mouseOffset>maxOffset?mouseOffset-maxOffset:0);if(textDragDistanceAway==0){clearTextSelectionInterval()}else{if(!textSelectionInterval){textSelectionInterval=setInterval(onTextSelectionInterval,100)}}}function onSelectScrollMouseUp(e){$(document).unbind('mousemove.jScrollPaneDragging').unbind('mouseup.jScrollPaneDragging');clearTextSelectionInterval()}$container.bind('mousedown.jScrollPane',onSelectScrollMouseDown);$.jScrollPane.active.push($this[0])}else{$this.css({'height':paneHeight+'px','width':paneWidth-this.originalSidePaddingTotal+'px','padding':this.originalPadding});$this[0].scrollTo=$this[0].scrollBy=function(){};$this.parent().unbind('mousewheel').unbind('mousedown.jScrollPane').unbind('keydown.jscrollpane').unbind('keyup.jscrollpane')}})};$.fn.jScrollPaneRemove=function(){$(this).each(function(){$this=$(this);var $c=$this.parent();if($c.is('.jScrollPaneContainer')){$this.css({'top':'','height':'','width':'','padding':'','overflow':'','position':''});$c.after($this).remove()}})};$.fn.jScrollPane.defaults={scrollbarWidth:10,scrollbarMargin:5,wheelSpeed:18,showArrows:false,arrowSize:0,animateTo:false,dragMinHeight:1,dragMaxHeight:99999,animateInterval:100,animateStep:3,maintainPosition:true,scrollbarOnLeft:false,reinitialiseOnImageLoad:false,tabIndex:0,enableKeyboardNavigation:true,animateToInternalLinks:false};$(window).bind('unload',function(){var els=$.jScrollPane.active;for(var i=0;i<els.length;i++){els[i].scrollTo=els[i].scrollBy=null}})})(jQuery);(function($){var defaults={li:67,padding:5,visible:7,scroll:7,index:0,position:0,callback:null,slideLeft:false,slideRight:true,jump:1,type:'horizontal'};$.fn.slider=function(options){slider=this;this.sliderInit(options);return this};$.fn.extend({deBug:function(obj){console.log(obj)},getSliderWidth:function(){return(this.opts.li+this.opts.padding)*this.totalItems},getTotalItems:function(){return this.children('li').length},getScrollWidth:function(){return(this.opts.li*this.opts.visible)*this.opts.index},getTotalPage:function(){return(Math.ceil(this.totalItems/this.opts.scroll))},sliderInit:function(options){this.opts=$.extend({},defaults,options);this.totalItems=this.getTotalItems();this.sliderWidth=this.getSliderWidth();this.totalPage=this.getTotalPage();if(this.opts.type=='vertical'){$(this).css({height:this.sliderWidth+'px'})}else{$(this).css({width:this.sliderWidth+'px'})}this.opts.callback(this)},slidePrev:function(){if(this.opts.index>0){this.opts.slideLeft=true;this.opts.index-=1;this.scrollWidth=this.getScrollWidth();if(this.opts.type=='vertical'){$(this).animate({"bottom":this.scrollWidth+"px"},500)}else{$(this).animate({"right":this.scrollWidth+"px"},500)}}else{this.opts.slideLeft=false}},slideNext:function(){if(this.opts.index<(this.totalPage)-1){this.opts.slideRight=true;this.opts.index+=1;this.scrollWidth=this.getScrollWidth();if(this.opts.type=='vertical'){$(this).animate({"bottom":this.scrollWidth+"px"},500)}else{$(this).animate({"right":this.scrollWidth+"px"},500)}}else{this.opts.slideRight=false}},updateSlider:function(options){this.opts=$.extend({},defaults,options);this.totalItems=this.getTotalItems();this.sliderWidth=this.getSliderWidth();this.opts.index=0;this.totalPage=this.getTotalPage();if(this.opts.type=='vertical'){$(this).css({height:this.sliderWidth+'px'})}else{$(this).css({width:this.sliderWidth+'px'})}},slideTo:function(idx){if(0<=idx&&idx<this.totalPage){if(idx<this.opts.index){this.opts.slideLeft=true;this.opts.slideRight=false;this.opts.index=idx;$(this).animate({"right":this.getScrollWidth()+"px"},500)}else if(idx>this.opts.index){this.opts.slideRight=true;this.opts.slideLeft=false;this.opts.index=idx;$(this).animate({"right":this.getScrollWidth()+"px"},500)}}}})})(jQuery);

var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
      for (var i=0;i<data.length;i++)	{
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1)
            return data[i].identity;
        }
        else if (dataProp)
          return data[i].identity;
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    { 	string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Microsoft Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.userAgent,
      subString: "Windows 95",
      identity: "Windows XP"
    },
    {
      string: navigator.userAgent,
      subString: "Windows 98",
      identity: "Windows XP"
    },
    {
      string: navigator.userAgent,
      subString: "Windows NT 5.0",
      identity: "Windows 2000"
    },
    {
      string: navigator.userAgent,
      subString: "Windows NT 5.1",
      identity: "Windows XP"
    },
    {
      string: navigator.userAgent,
      subString: "Windows NT 5.2",
      identity: "Windows Server 2003"
    },
    {
      string: navigator.userAgent,
      subString: "Windows NT 6.0",
      identity: "Windows Vista"
    },
    {
      string: navigator.userAgent,
      subString: "Windows NT 7.0",
      identity: "Windows 7"
    },
    {
      string: navigator.userAgent,
      subString: "Mac OS X 10.5",
      identity: "Mac OS X 10.5"
    },
    {
      string: navigator.userAgentm,
      subString: "Mac OS X",
      identity: "Mac OS X"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
   ]
};
BrowserDetect.init();

var oFoxFeedback = {
  url:'http://tools.foxnews.com/feedback?browser='+BrowserDetect.browser+' '+BrowserDetect.version+'&platform='+BrowserDetect.OS+'&domain=',
  width:550,
  height:475,
  marginTop:100,
  borderWidth:10,
  pop:function(loc) {
	
	function getDomainHost() {
		   var host = window.location.hostname;
		  var pieces = host.split('.');
		  return pieces[(pieces.length - 2)] +'.'+ pieces[(pieces.length - 1)];
	}
    var body = document.getElementsByTagName('body')[0];
    var divOuter = document.createElement('div');
    divOuter.setAttribute('id','feedback_outer');
    var divInner = document.createElement('div');
    var closeBut = document.createElement('img');
    var closeHref = document.createElement('a');
    var iframe = document.createElement('iframe');
    var divOuterCss = 'height:100%;left:0;text-align:center;top:0;width:100%;z-index:100;';
    (screen.height <= 768) ? oFoxFeedback.marginTop = 15 : '';
    var divInnerCss = 'margin:'+oFoxFeedback.marginTop+'px auto 0;padding:'+oFoxFeedback.borderWidth+'px;position:relative;width:'+oFoxFeedback.width+'px;z-index:101;';
    if (/MSIE 6/.test(navigator.userAgent)) {
      divOuter.style.cssText = divOuterCss + 'position:absolute;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=\'true\', sizingMethod=\'scale\', src=\'http://tools.foxnews.com/sites/tools.foxnews.com/modules/feedback_form/images/overlay-bg.png\');';
      divInner.style.cssText = divInnerCss + 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=\'true\', sizingMethod=\'scale\', src=\'http://tools.foxnews.com/sites/tools.foxnews.com/modules/feedback_form/images/overlay-border.png\');';
    } else {
      divOuter.style.cssText = divOuterCss + 'position:fixed;background:transparent url(http://tools.foxnews.com/sites/tools.foxnews.com/modules/feedback_form/images/overlay-bg.png);';
      divInner.style.cssText = divInnerCss + 'background:transparent url(http://tools.foxnews.com/sites/tools.foxnews.com/modules/feedback_form/images//overlay-border.png);';
    }
    
    iframe.setAttribute('src', oFoxFeedback.url + getDomainHost());
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('cellspacing', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('marginwidth', '0');
    iframe.setAttribute('marginheight', '0');
    iframe.setAttribute('height', oFoxFeedback.height);
    iframe.setAttribute('width', '100%');
    divInner.appendChild(iframe);
    divOuter.appendChild(divInner);
    body.appendChild(divOuter);
    closeBut.style.cssText = 'border:0;';
    closeBut.setAttribute('src', 'http://tools.foxnews.com/sites/tools.foxnews.com/modules/feedback_form/images/close.png');
    closeHref.setAttribute('href', '#');
    closeHref.style.cssText = 'position:absolute;left:'+(divInner.offsetLeft+oFoxFeedback.borderWidth+oFoxFeedback.width-3)+'px;top:'+(oFoxFeedback.marginTop-11)+'px;z-index:102;';
    closeHref.onclick = function() { oFoxFeedback.close(this.parentNode);return false; };
    closeHref.appendChild(closeBut);
    divOuter.appendChild(closeHref);
  },
  close:function(element) {
    var body = document.getElementsByTagName('body')[0];
    body.removeChild(element);
    return false;
  }
}


if(typeof $.cookie==="undefined"){
  /* Cookie plugin - Compressed
   * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   */
  jQuery.cookie=function(d,c,a){if(typeof c!="undefined"){a=a||{};if(c===null){c="";a.expires=-1}var b="";if(a.expires&&(typeof a.expires=="number"||a.expires.toUTCString)){if(typeof a.expires=="number"){b=new Date;b.setTime(b.getTime()+a.expires*24*60*60*1E3)}else b=a.expires;b="; expires="+b.toUTCString()}var e=a.path?"; path="+a.path:"",f=a.domain?"; domain="+a.domain:"";a=a.secure?"; secure":"";document.cookie=[d,"=",encodeURIComponent(c),b,e,f,a].join("")}else{c=null;if(document.cookie&&document.cookie!= ""){a=document.cookie.split(";");for(b=0;b<a.length;b++){e=jQuery.trim(a[b]);if(e.substring(0,d.length+1)==d+"="){c=decodeURIComponent(e.substring(d.length+1));break}}}return c}};
}

if (typeof $.jfoxCarousel==="undefined") {
  //jQuery plugin - FoxNews Carousel. last updated: 08/03/2010
  //Dependencies: jQuery
  (function(j){function z(){this._speed="slow";this._scrollTo=this._scroll=1;this._scrollType="relative";this._rotate=true;this._auto={set:false,resume:false,speed:5E3};this._focus={item:0,animate:false};this._slide=this._show=null;this.cloneClass="item-clone";this.isAutoScroll=this._auto.set;this.isAutoScrollResume=this._auto.resume;this.autoSpeed=this._auto.speed;this.minAutoSpeed=3E3;this.targetItem=this.currentCount=0;this.scrollBatch=1;this.timeout=null;this.triggered=this.isItemCountOK=this.isLastBatch= false;this._eventCallback=function(){};this.carouselInfoObj={}}function A(){}function B(a){typeof window.console==="object"&&console.log(a)}function C(){B("[init] error initializing carousel.");return false}if(typeof jQuery.fn.jfoxCarousel!=="undefined"){B("[jfoxCarousel] Already initialized.");return false}jQuery.fn.jfoxCarousel=function(a){if(!a)return false;if(!a.slide||!a.show)return false;return this.each(function(){var b=new z;b.init(j(this),a);return b})};var x={holder:"slideshow",control:"controls"}; z.prototype={init:function(a,b){function l(m){var e,h,g,f,k,q=0;r.find("ul:first").children().each(function(){var n=j(this),t=s.getCSSDimension("margin",this,true),v=s.getCSSDimension("padding",this,true),u=s.getCSSDimension("border",this,true);e=s.format(s.getCSSDimension(m,this));if(m==="width"){h=t.Left+t.Right;g=v.Left+v.Right;f=u.Left+u.Right;k=n.outerWidth(true)}else{h=t.Top+t.Bottom;g=v.Top+v.Bottom;f=u.Top+u.Bottom;k=n.outerHeight(true)}n=e+h+g+f;n=k>n?k:n;if(n>q)q=n});return q}for(i in b)if(i=== "auto"||i==="focus"){var o=b[i];for(p in this["_"+i])if(o[p])this["_"+i][p]=o[p]}else if(i==="identifier")for(c in x){if(b[i][c])x[c]=b[i][c]}else this["_"+i]=b[i];this.obj=a;this.slideshowObj=j(this.obj).find("div."+x.holder);this.controlObj=j(this.obj).find("[class*='"+x.control+"']");var r=this.slideshowObj;if(j(this.slideshowObj).size()<1||this._slide!=="vertical"&&this._slide!=="horizontal"){C();return false}r.scrollLeft(0).scrollTop(0);this.holder={width:s.format(r.css("width")),height:s.format(r.css("height")), item:{count:r.find("ul:first").children().size(),width:l("width"),height:l("height")}};if(this.holder.item.count===0||this._slide==="horizontal"&&this.holder.item.width<=0||this._slide==="vertical"&&this.holder.item.height<=0){C();return false}else this.isItemCountOK=true;if(this._scrollType==="absolute"){o=this.holder.item.count%this._scroll;if(o>0){var d=this._scroll-o;this.holder.item.count+=d;r.find("ul:first").each(function(){for(var m=[],e=j("<span></span>"),h=0;h<d;h++)m.push("<li>&nbsp;</li>"); e.append(m.join(""));e.children().each(function(){j(this).css("visibility","hidden")});j(this).append(e.children())})}}o=Math.ceil((this.holder.item.count-this._show)/this._scroll)+(this.holder.item.count-this._show%this._scroll>0?1:0);this.maxBatch=o<1?1:o;if(typeof this._speed==="string")this._speed=j.fx.speeds[this._speed]?j.fx.speeds[this._speed]:j.fx.speeds.slow;if(this._auto.set)this.isAutoScroll=s.checkBoolean(this._auto.set);if(this._auto.resume)this.isAutoScrollResume=s.checkBoolean(this._auto.resume); if(!isNaN(this._auto.speed))this.autoSpeed=this._auto.speed<this.minAutoSpeed?this.minAutoSpeed:this._auto.speed;this.autoSpeed+=this._speed;this._focus.item>0&&this.slide("scrollToItem",this._focus.item,this._focus.animate);this.setListeners()},setListeners:function(){var a=this;this._eventCallback(this.carouselInfoObj={event:"init",items:this.holder.item.count,target:0,scroll:this._scroll,start:1,end:this._show>this.holder.item.count?this.holder.item.count:this._show,batch:{current:1,max:this.maxBatch}}); if(this._controlsCallback){this.externalControls=new A;this.externalControls.init(this);this._controlsCallback(this.externalControls)}else{this.isAutoScroll=this._auto.set?this._auto.set:true;this.isAutoScrollResume=this._auto.resume?this._auto.resume:true}this.externalControls.scrollToItem(1);if(this.isAutoScroll&&this.isItemCountOK){this.slideshowObj.hover(function(){if(a.isAutoScroll){a.autoScroll.stop(a.timeout);a.isAutoScroll=false;a.carouselInfoObj.event="autoScrollStop";a._eventCallback(a.carouselInfoObj)}}, function(){if(a.isAutoScrollResume){a.autoScroll.play(a);a.isAutoScroll=true;a.carouselInfoObj.event="autoScrollPlay";a._eventCallback(a.carouselInfoObj)}});this.autoScroll.play(a)}},slide:function(a,b,l){function o(){q.find("> li:last").each(function(){var u=j(this),y=q.find("> li:first").clone().addClass(n).removeClass("first");j("<ul></ul>").html(y).each(function(){for(var w=2;w<=h;w++)j(this).append(q.find("> li:nth-child("+w+")").clone().addClass(n));u.after(j(this).children())})});var v=d._slide=== "vertical"?{scrollTop:k.scrollTop()+h*e.height}:{scrollLeft:k.scrollLeft()+h*e.width};k.animate(v,d._speed,"swing",function(){d._slide==="vertical"?k.scrollTop(0):k.scrollLeft(0);q.find("[class*='"+n+"']").remove();d.triggered=false});d.currentCount=0;d.scrollBatch=1;d.isLastBatch=false;d._eventCallback(d.carouselInfoObj={event:"scrollToFirst",items:e.count,target:0,scroll:d._scroll,start:1,end:d._show>e.count?e.count:d._show,batch:{current:1,max:d.maxBatch}})}function r(){q.find("> li:first").removeClass("first").each(function(){var v= j(this),u=e.count-d._show+1,y=q.find("> li:nth-child("+u+")").clone().addClass(n+" first");j("<ul></ul>").html(y).each(function(){for(var w=u+1;w<=e.count;w++)j(this).append(q.find("> li:nth-child("+w+")").clone().addClass("item-clone"));v.before(j(this).children());d._slide==="vertical"?k.scrollTop(h*e.height):k.scrollLeft(h*e.width)})});k.animate(d._slide==="vertical"?{scrollTop:0}:{scrollLeft:0},d._speed,"swing",function(){q.find("[class*='"+n+"']").remove();q.find(":first").addClass("first"); d._slide==="vertical"?k.scrollTop((e.count-h)*e.height):k.scrollLeft((e.count-h)*e.width);d.triggered=false});d.currentCount=e.count-h;d.scrollBatch=d.maxBatch;d.isLastBatch=true;d._eventCallback(d.carouselInfoObj={event:"scrollToLast",items:e.count,target:0,scroll:d._scroll,start:e.count-h,end:e.count,batch:{current:d.maxBatch,max:d.maxBatch}})}b=b||false;l=typeof l==="undefined"||l===null?true:l;this.triggered=true;var d=this,m=this._scroll,e=this.holder.item,h=this._show,g=this.currentCount,f= this.scrollBatch,k=this.slideshowObj,q=j("ul:first",k),n=this.cloneClass,t=0;if(a==="scrollToBatch"){if(!b||isNaN(b))return;if(b<=1){f=1;g=0;this.isLastBatch=false}else if(b>=this.maxBatch){f=this.maxBatch;g=e.count-h;this.isLastBatch=true}else{f=b;g=m*(b-1)}if(g===this.currentCount&&f===this.scrollBatch)return}else if(a==="scrollToItem"){if(!b||isNaN(b))return;if(b<=1){f=1;g=0;t=1;this.isLastBatch=false}else if(b>=e.count){f=this.maxBatch;g=e.count-h;t=e.count;this.isLastBatch=true}else{f=Math.ceil(b/ m);if(f>=this.maxBatch){f=this.maxBatch;g=e.count-h;this.isLastBatch=true}else{f=f;g=m*(f-1)}t=b}if(g===this.currentCount&&f===this.scrollBatch&&this.carouselInfoObj.target===b)return}else if(a==="next"){b=g+m;if(b+h>e.count){if(g+h===e.count&&this._rotate){o();return}g=e.count-h;this.isLastBatch=true;f++;f=f>this.maxBatch?this.maxBatch:f}else{g=b;f++}}else if(a==="prev"){b=g-m;if(b<0){g=0;f--;if(f<1&&this._rotate){r();return}else if(f<1)f=1}else{g=b;f--}}this.scrollBatch=f;this.currentCount=g;this._eventCallback(this.carouselInfoObj= {event:a,items:e.count,target:t,scroll:this._scroll,start:g+1,end:g+h>e.count?e.count:g+h,batch:{current:this.scrollBatch,max:this.maxBatch}});a=g*(this._slide==="vertical"?e.height:e.width);if(l)k.animate(this._slide==="vertical"?{scrollTop:a}:{scrollLeft:a},d._speed,"swing",function(){d.triggered=false});else{this._slide==="vertical"?k.scrollTop(a):k.scrollLeft(a);d.triggered=false}},autoScroll:{play:function(a){a.timeout=setInterval(function(){a.slide("next")},a.autoSpeed)},stop:function(a){clearInterval(a)}}}; A.prototype={init:function(a){this.root=a},scrollToBatch:function(){var a=arguments,b,l=true;if(typeof a[0]==="object"){b=a[0].batch;l=a[0].animate}else b=a[0];this.root.slide("scrollToBatch",b,l)},scrollToItem:function(){var a=arguments,b,l=true;if(typeof a[0]==="object"){b=a[0].item;l=a[0].animate}else b=a[0];this.root.slide("scrollToItem",b,l)},slide:function(a){if(this.root.isItemCountOK)this.root.triggered||this.root.slide(a)},stopAutoScroll:function(){this.root.isAutoScrollResume=false;this.root.autoScroll.stop(this.root.timeout)}, startAutoScroll:function(){this.root.autoScroll.play(this.root)}};var s={format:function(a){a=parseInt(a.replace(/[a-zA-z]/gi,""),10);return isNaN(a)?0:a},checkBoolean:function(a){var b=false;if(typeof a==="string"&&a==="true")b=true;else if(typeof a==="boolean")b=a;return b},getCSSDimension:function(a,b,l){if(!a)return false;var o=["Top","Right","Bottom","Left"],r={};if(a==="margin"||a==="padding"||a==="border"){for(var d=0;d<o.length;d++){var m=j(b).css(a+o[d]);r[o[d]]=typeof m!=="undefined"?l? this.format(m):m:0}return r}return j(b).css(a)}}})(jQuery);
}

var MAX_RELATED_VIDEOS = 14;
var SLIDE_SPEED = 'slow';
var EXPAND_CLASS = 'expanded';
var isEditorsFeatured = false;

jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

/** NEW VIDEO PLAYER FUNCTIONS **/
function playShowsVideo(videoId,autoplay,playlistTitle) {
  // it plays on page load
  holderElm = $(".video-player-wrapper");
  var id = "videoid:g"+videoId; // g for grab video
  var config = {
    holder: holderElm,
    type: "video",
    id: id,
    cssClass: "video-player-format",
    autoplay: true,
    callbacks: { // define callback functions
      feedLoaded: function(data) {
        updatePageContent(data);
        data.playlistTitle = (playlistTitle) ? playlistTitle : "";
        if (typeof videoPageTracker==="function") { videoPageTracker("thumbnail",data); } // tracker
      }, // if new feed is loaded
      dataChanged: function(data) { updatePageContent(data); }, // if current data was changed
      videoEnded: function(controls) {
        playNextSlideshowVideo(videoId); // play the next video
      }
    }
  };

  $(document).ready(function(){
    videoPlayer.render(config);
  });
}

function playNextVideo() {
  videoPlayer.getFeed({
    id:"playlistid:"+pageVars.playlistId,
    callback: function(data) { playNextVideoCallback(data); }
  });
}

/* from video player recommendations */
function foxVideoPlayerRecommendation(videoUrl) {
  videoUrl = videoUrl || false;
  if (!videoUrl) { return false; }
  var videoId = false;

  function trigger(id) {
    if (id) { playShowsVideo(id); }
    return true;
  }

  if (isNaN(videoUrl)) {
    var hostArr = (document.location.hostname).split(".");
    var len = hostArr.length;
    var host = hostArr[len-2] + "." + hostArr[len-1];
    videoUrl = $.trim(videoUrl);

    // if the video url is not the same host, open a new window for it.
    if (videoUrl.indexOf(host)===-1) {
      window.open(videoUrl,"openVideoWindow"+host.replace("\.",""));
    } else {
      videoUrl = videoUrl.replace("http:\/\/",""); // strip out the protocol
      var arr = videoUrl.split("/");
      var domain = arr[0];

      for (var x = 0; x < arr.length; x++) {
        if (arr[x]==="v") {
          if (typeof arr[x+1]!=="undefined") { videoId = arr[x+1]; break; }
        }
      }
    }
  } else {
    videoId = videoUrl;
  }

  var ret = trigger(videoId);
  return ret;
}

function returnItemData(aTag) {
  var href = oFoxVideo.cleanHref(aTag.attr("href"));
  var playlistId = oFoxVideo.extractPlaylistId(href);
  var videoId = oFoxVideo.extractVideoId(href);

  var obj = {
    href: href,
    playlistId: playlistId,
    videoId: videoId
  };

  return obj;
}

function setSlideshowVideoItems(videoItems,isFeaturedItem) {
  isFeaturedItem = isFeaturedItem || false;
  videoItems = videoItems || false;
  if (!videoItems) { return false; }

  var mainParent = videoItems.filter(":first").parent().parent();
  var vidContainer = mainParent.hasClass(".container-videos");

  videoItems.each(function(i){
    var item = $(this);
    var overlay = item.find("a > .opacity");

    item.find("a:first").each(function(){
      var data = returnItemData($(this));
      if (!item.data("itemVideoId")) { // set this for reference on playNexSlideshowVideo()
        item.data("itemVideoId",data.videoId);
      }
    });

    item.hover(
      function(){
        item.addClass("active");
        overlay.css({ display:"block" });
      },
      function(){
        item.removeClass("active");
        overlay.css({ display:"none" });
      }
    );

    item.click(function(){
      var thisLi = $(this);
      var thisLink = thisLi.find('a');

      var data = returnItemData(thisLink);
      var containerVideo = $('#containerVideos ul li').find(".play-symbol");
      var slideShowVideos = $('#overlaySlideshow-a').find(".play-symbol2");

      //if its an editors pick or featured set flag (global variable)
      isEditorsFeatured = isFeaturedItem;

      pageVars.videoId = data.videoId;
      pageVars.playlistId = data.playlistId;

      containerVideo.css("display","none");
      slideShowVideos.css("display","none");
      videoItems.removeClass("selected");

      //$(".video-"+data.videoId).find(".play-symbol,.play-symbol2").css("display","block");

      item.addClass("selected");
      document.location.hash = data.href;
      $("html, body").animate({scrollTop:0}, "slow", "swing");

      var playlistText = (isFeaturedItem) ? $("#related-video-a .related-header h3.expand-header").html() : $("#playlist-2 ul:visible > .selected a").html();
      $(".breadcrumbs").html(playlistText);
      playShowsVideo(data.videoId,true,playlistText);

      return false;
    });
  });
}

function playNextSlideshowVideo(id) {
  // note: different element targeted - container-videos
  var items = $(".container-videos ul").children();
  var index = -1;
  items.each(function(i){
    var videoId = $(this).data("itemVideoId");
    if (videoId===id) {
      index = i;
      return true;
    }
  });

  if (index > -1) {
    var prevIndex = index;
    index = (index+1 > items.size()-1) ? 0 : index+1;
    var prevItem = $(items[prevIndex]);
    var videoItem = $(items[index]);
    videoItem.find("a:first").each(function(){
      var data = returnItemData($(this));

      pageVars.videoId = data.videoId;
      pageVars.playlistId = data.playlistId;

      prevItem.removeClass("selected");
      videoItem.addClass("selected");
      document.location.hash = data.href;

      playShowsVideo(data.videoId,true);
    });

    var carouselItem = index+1;
  }
}

function playNextVideoCallback(json) {
  var nextVideoId, nextVideoTitle = null;
  var videoIdFound = false;
  var autoplay = true; // playing next video via callback will always auto start
  $.each(json.channel.item, function(i, item){
    var vId = item['media-content']['mvn-assetUUID'];
    var vTitle = item.title;
    if (i===0) { // keep tabs on the first one, in case the last vid is playing
      nextVideoId = vId;
      nextVideoTitle = vTitle;
    }
    if (i > 7 && isEditorsFeatured){
      var itemObj = json.channel.item[0];
      nextVideoId = itemObj['media-content']['mvn-assetUUID'];
      nextVideoTitle = itemObj.title;
      return false;
    }
    if (videoIdFound) {
      nextVideoId = vId;
      nextVideoTitle = vTitle;
      return false; // get out of here
    }
    if (vId == pageVars.videoId) { videoIdFound = true; }
  });
    playShowsVideo(nextVideoId,autoplay);
  //$('.play-symbol,.play-symbol2').css("display", "none");
  //$('.play-sym-'+ nextVideoId + ',.play-sym2-'+ nextVideoId).css("display", "block");
}

function updatePageContent(oVideo) {
  pageVars.videoId = oVideo.guid;
  $('div#containerVideos li.selected, div.slideLinks li.selected').removeClass('selected');
  $('div#containerVideos li.video-' + pageVars.videoId + ', div.slideLinks li.video-' + pageVars.videoId).addClass('selected');
  // page elements
  document.title = oVideo.title + ' - Fox News Video - FoxNews.com';
  $('.article h2').html(oVideo.title);
  var regExpr = /^([A-Z,a-z]{0,3})[a-z]+([ ,0-9]+)/;
  var dateArr = oVideo.creationDate.match(regExpr);

  $('.article .date').html(dateArr[1] + dateArr[2]);
  $('.article .time').html('-&nbsp;'+ oFoxVideo.convertTime(oVideo.duration) + ' -&nbsp;');
  $('.article p.description').html(oVideo.shortDescription);
  $('#embed-input').val(unescape('%3Cscript type="text/javascript" src="http://video.foxnews.com/v/embed.js?id=' + pageVars.videoId + '&w=400&h=249"%3E%3C/script%3E%3Cnoscript%3EWatch%20the%20latest%20news%20video%20at%20%3Ca%20href%3D%22http%3A%2F%2Fvideo.foxnews.com%2F%22%3Evideo.foxnews.com%3C%2Fa%3E%3C%2Fnoscript%3E'));
}

/** NEW VIDEO PLAYER FUNCTIONS - END **/

// new video //

(function($){ // footer
  $(document).ready(function(){
    var vThGal = new videoThumbGalleries();
    vThGal.init();
  });

  var videoThumbGalleries = function() {};

  videoThumbGalleries.prototype = {

    attachEvents : function () {
      thisObj = this;
      var controllerLi = $('.controller li');
      var channelSubGroupsLi = $('.playlist-2 ul li');

      controllerLi.each(function(i){
        var thisCntrlLiObj = $(this);
        var channelLink = thisCntrlLiObj.find('a');
        var channelSubGroups = $('.playlist-2 ul');
        var channelDefaultGroup = $('.playlist-2 ul:eq('+ i +')');
        var channelDefaultGroupLi = $('.playlist-2 ul:eq('+ i +') li:eq(0) a');

        //channels
        channelLink.click(function(){
          isEditorsFeatured = false;
          channelSubGroups.css("display","none");
          channelDefaultGroup.css("display","block");
          controllerLi.removeClass("active");
          $('.controller li:eq('+ i +')').addClass("active");

          var defaultGroupId = channelDefaultGroupLi.attr("href");
          thisObj.loadPlaylist(channelDefaultGroupLi);

          return false;
        });
      });

      channelSubGroupsLi.each(function(){
        var thisLiObj = $(this);
        var listItemLink = thisLiObj.find('a');

        listItemLink.click(function(){
          thisObj.loadPlaylist(listItemLink);
          var ul= $(this).parent().parent();
          ul.find('li').removeClass('selected');
          thisLiObj.addClass('selected');
          return false;
        });
      });
    },
    loadPlaylist : function (targetLi) {
      var counter = 0;
      var playlistId = targetLi.attr('href').split('=')[1];

      $('#containerVideos ul').empty();
      if($.cookie('v_dmmr') == "light"){
        $('#containerVideos').css('background','url(/images/ajax-loader-light.gif) no-repeat scroll 50% 50% transparent');
      }
      else{
        $('#containerVideos').css('background','url(/images/ajax-loader-dark.gif) no-repeat scroll 50% 50% transparent');
      }

      var itemHtml = [];

      $.get('/v/feed/playlist/' + playlistId + '.xml?escape=true', function(xml) {
        videoPageTracker("playlist",targetLi.text()); // tracker
        $(xml).find('item').each(function(i){
          var item = $(this);
          var videoId = item.find('mvn-assetUUID').text();
          var desc = (window.location.toString().indexOf('foxnews.com') > -1) ? item.find('media-description').text() : item.find('mvn-shortDescription').text();

          itemHtml.push('<li class="video-' + videoId + '"');
          itemHtml.push('><a href="/v/' + videoId + '/' + oFoxVideo.cleanTitle(item.find('title').text()) + '/?playlist_id=' + playlistId + '">');
          itemHtml.push('<div class="opacity"></div>');
          itemHtml.push('<img alt="" src="' + oFoxVideo.cleanImageUrl(item.find('media-thumbnail').text(), 121, 68) + '" /></a>');
          itemHtml.push('<h4><a href="/v/' + videoId + '/' + oFoxVideo.cleanTitle(item.find('title').text()) + '/?playlist_id=' + playlistId + '">');
          itemHtml.push(item.find("title").text() + '</a></h4>');

          if (videoId == pageVars.videoId) {
            itemHtml.push('<div class="play-symbol play-sym-' + videoId +'" style="display:block"><img src="/images/icon-play.png" /> </div>');
          } else {
            itemHtml.push('<div class="play-symbol play-sym-' + videoId +'" style="display:none"><img src="/images/icon-play.png" /> </div>');
          }

          var _time_ = oFoxVideo.convertDate(item.find('mvn-creationDate',true).text());
          var regExpr = /^([A-Z,a-z]{0,3})[a-z]+([ ,0-9]+)/;
          var dateArr = _time_.match(regExpr);
          _time_ =dateArr[1] + dateArr[2];
          itemHtml.push('<div class="thumb-info"><p class="date">' + _time_ + '</p>');
          itemHtml.push('<p class="time">' + oFoxVideo.convertTime(item.find('mvn-duration').text()) + '</p></div></li>');
        });

        $('#containerVideos ul').html(itemHtml.join(""));

        // preload images
        $('#containerVideos ul li img').each(function(){
          var item = $(this);
          var src = item.attr("src");
          var img = new Image();
          item.css({ opacity:"0",display:"inline" });
          img.onload = function() {
            item.animate({ opacity:1 },500,"swing",function(){ item.attr("style",""); });
          };
          img.src = src;
        });

        setSlideshowVideoItems($('#containerVideos ul > li'));

        $('#containerVideos ul li').click(function(){
          var thisLi = $(this);
          var thisLiAnchor = thisLi.find('a');
          var playSymbol = $('.play-symbol');
          var data = returnItemData(thisLiAnchor);
          var allVideoItemPlayBut = $(".play-symbol,.play-symbol2");
          //allVideoItemPlayBut.css("display","none");

          pageVars.videoId = data.videoId;
          pageVars.playlistId = data.playlistId;

          $('#containerVideos ul li').removeClass("selected");

          document.location.hash = data.href;
          thisLi.addClass("selected");
          //$(".video-"+data.videoId).find(".play-symbol,.play-symbol2").css("display","block");
          var playlistText = $("#playlist-2 ul:visible > .selected a").html();
          $(".breadcrumbs").html(playlistText);
          playShowsVideo(data.videoId,true,playlistText);

          return false;
        });

        $('#containerVideos').css('background','none');
      });
    },
    init : function () {
      thisObj = this;
      thisObj.attachEvents();
    }
  };

})(jQuery);

function init() {

  $('div.playlist ul li ul').hide();
  setSlideshowVideoItems($(".container-videos ul").children());

  var category = $("div.playlist ul li a[href='/?playlist_id=" + pageVars.playlistId + "']");
  var parentCategory = category.parent('li').parent('ul').parent('li').children('a.red');

  $('#playlist ul li a').click(function() {
    var item = $(this);

    if (item.attr('href') == '#') {
      var expanded = item.parent('span').parent('li').hasClass(EXPAND_CLASS);
      var previous = $('#playlist ul li.' + EXPAND_CLASS);
      if (previous.exists()) {
        previous.children('ul').slideUp(SLIDE_SPEED, function() {
          $('#playlist').jScrollPane({showArrows:true, scrollbarWidth:16, animateTo:true});
          previous.removeClass(EXPAND_CLASS);
        });
      }

      if(!expanded) {
        if(item.parent('span').parent('li').children('ul').exists()) {
          item.parent('span').parent('li').addClass(EXPAND_CLASS);
          item.parent('span').parent('li').children('ul').slideDown(SLIDE_SPEED, function() {
            $('#playlist').jScrollPane({showArrows:true, scrollbarWidth:16, animateTo:true});
          });
        }
      }
    } else {
      // loadPlaylist($(this));
    }
    return false;
  });

  setSlideshowVideoItems($("div.slideLinks ul").children(),true);

}

function getDomainHost() {
  var host = window.location.hostname;
  var pieces = host.split('.');
  return pieces[(pieces.length - 2)] +'.'+ pieces[(pieces.length - 1)];
}

function toggleHideFlash(parentElem){
  parentElem = parentElem || ".right-ad";
  $(parentElem).each(function(){
    var elem = $(this);

    function show() { elem.css("display", ""); }

    if(!elem.is(":hidden")) {
      elem.css("display", "none");

         var counter= 0, maxAttempts = 100;
      if (typeof window.togFlashInterval==="undefined") { window.togFlashInterval = false; }
      clearInterval(togFlashInterval); // clear any existing listener to not overlap

      togFlashInterval = setInterval(function(){
        var allHidden = true;
        $('#feedback_outer, #login-provider, #registration-overlay').each(function(){
          if (!$(this).is(":hidden")) { allHidden = false; }
        });
        if (allHidden) { clearInterval(togFlashInterval); show();  }
        counter++;
        if (counter > maxAttempts) { clearInterval(togFlashInterval); }
      },600);
    }
    else {
      show();
    }
  });
}

function facebookBtn() {
  var html = '<fb:like href="${href}" layout="button_count" show_faces="false" width="380"></fb:like>';
  var baseUrl = "http:\/\/www.facebook.com/";

  var fbPage = {
    fn: { path:"FoxNewsVideo", title:"Fox News Video" },
    fb: { path:"FoxBusinessVideo", title:"Fox Business Video" },
    sbc: { path:"pages/Fox-Small-Buisness/164730086894580", title:"Fox Small Business Center" }
  };

  var href = false;
  var title = "";
  switch (getDomainHost()) {
    case "foxsmallbusinesscenter.com": href = baseUrl + fbPage.sbc.path; title = fbPage.sbc.title; break;
    case "foxbusiness.com": href = baseUrl + fbPage.fb.path; title = fbPage.fb.title; break;
    case "foxnews.com": href = baseUrl + fbPage.fn.path; title = fbPage.fn.title; break;
  }

  if (!href) { return; }
  html = html.replace("${href}",href);
  $("#fb-page span a").attr("href",href).html(title);
  $(".fb-recommend").html(html);
  // append fb script
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.async = true;
  script.src = "http://connect.facebook.net/en_US/all.js#xfbml=1";
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
}

function getPlaceHolderImg(isDark){
		var domainName = getDomainHost();
		var imgURL = "images/300x250-fn-default-light.gif";
		if(domainName.indexOf("foxnews") > -1){
			imgURL = isDark ? "/images/300x250-fn-default-dark.gif" : "/images/300x250-fn-default-light.gif"	
		}
		if(domainName.indexOf("foxbusiness") > -1){
			imgURL = isDark ? "/images/300x250-fb-default-dark.gif" : "/images/300x250-fb-default-light.gif"	
		}		
		if(domainName.indexOf("foxsmallbusiness") > -1){
			imgURL = isDark ? "/images/300x250-sbc-default-dark.gif" : "/images/300x250-sbc-default-light.gif"
		}
		if(domainName.indexOf("latino") > -1){
			imgURL = isDark ? "/images/300x250-flatino-default-dark.gif" : "/images/300x250-flatino-default-light.gif"
		}
		
	return imgURL;
}

function dimmLightUp(dimElms){
	var imgURL = getPlaceHolderImg(false);
  dimElms.body.removeClass('dark');
  dimElms.thisButLink.text("Dim the lights");
  dimElms.imgDark.css("display","none");
  dimElms.imgLight.css("display","inline");
  dimElms.feedBackImgDark.css("display","none");
  dimElms.feedBackImgLight.css("display","inline");
  dimElms.faceBookImgDark.css("display","none");
  dimElms.faceBookImgLight.css("display","inline");
  dimElms.topFoxLogoDark.css("display","none");
  dimElms.topFoxLogoLight.css("display","inline");
  dimElms.topProfileDark.css("display","none");
  dimElms.topProfileLight.css("display","inline");
	dimElms.adPlaceHolder.css("background-image", 'url('+ imgURL +')').css("background-repeat","no-repeat");
}

function dimmLightDown(dimElms){
	var imgURL = getPlaceHolderImg(true);
  dimElms.body.addClass('dark');
  dimElms.thisButLink.text("Raise the lights");
  dimElms.imgDark.css("display","inline");
  dimElms.imgLight.css("display","none");
  dimElms.feedBackImgDark.css("display","inline");
  dimElms.feedBackImgLight.css("display","none");
  dimElms.faceBookImgDark.css("display","inline");
  dimElms.faceBookImgLight.css("display","none");
  dimElms.topFoxLogoDark.css("display","inline");
  dimElms.topFoxLogoLight.css("display","none");
  dimElms.topProfileDark.css("display","inline");
  dimElms.topProfileLight.css("display","none");
	dimElms.adPlaceHolder.css("background-image", 'url('+ imgURL +')').css("background-repeat","no-repeat");
}

function videoPageTracker(type,data) {
  if (!type) { return; }
  if (!$.ad) { return; }
  var trigger = function(t,d) {
    var obj = {}; obj[t] = d;
    $.ad.track(obj);
  };
  // in case we do some custom stuff
  switch (type) {
    case "thumbnail": trigger("video-thumbnail",data); break; // video click
    case "playlist": trigger("video-playlist",{ title:data }); break; // playlist
  }
}

function getDimElms(){
  return {
    thisBut : $('.dim'),
    feedBack : $(".feedback"),
    faceBook : $(".facebook"),
    headLogo : $("#header .logo"),
    feedBackImgDark : $(".feedback").find('img.dark'),
    feedBackImgLight : $(".feedback").find('img.light'),
    faceBookImgDark : $(".facebook").find('img.dark'),
    faceBookImgLight : $(".facebook").find('img.light'),
    thisButLink : $('.dim').find("a"),
    imgDark : $('.dim').find("img.dark"),
    imgLight : $('.dim').find("img.light"),
    topFoxLogoDark : $("#header .logo").find('img.dark'),
    topFoxLogoLight : $("#header .logo").find('img.light'),
    topProfileDark : $("#account .encapsulate").find('img.dark'),
    topProfileLight : $("#account .encapsulate").find('img.light'),
		body : $('body'),
		adPlaceHolder : $("#vid-mod .right-ad > div")
  };
}

function setCarouselSlideshow() {
  var target = $(".carousel");
  var controlElm = target.find("p.controls");
  var sectionElm = target.find("ol.sectioning");

  var prev = controlElm.find(".prev");
  var next = controlElm.find(".next");

  function setItems(max) {
    var html = [];
    for (var x = 0; x < max; x++) { html.push('<li><a href="#">&nbsp;</a></li>'); }
    sectionElm.html(html.join(""));
  }

  var config = {
    auto: false, // auto scroll
    slide: 'horizontal', // horizontal or vertical
    scroll: 2, // number of items to scroll per event
    show: 2, // items shown
    speed: "slow", // scroll speed
    rotate: false, // rotate back to star if end
    eventCallback: function(obj) { // callback function for all carousel events
      var start = obj.start;
      var end = obj.end;

      if (obj.event==="init") { setItems(obj.batch.max); }
      sectionElm.find("> li").each(function(i){
        $(this).toggleClass("focus",(obj.batch.current===(i+1)));
      });

      if (obj.batch.current===obj.batch.max) {
        next.addClass("off");
      } else {
        next.removeClass("off");
      }

      if (obj.batch.current===1) {
        prev.addClass("off");
      } else {
        prev.removeClass("off");
      }
    },
    controlsCallback: function(control) { // callback to set up controls
      controlElm.find(".prev").click(function(){ // previous link
        control.stopAutoScroll();
        control.slide("prev");
        return false;
      });

      controlElm.find(".next").click(function(){ // next link
        control.stopAutoScroll();
        control.slide("next");
        return false;
      });

      sectionElm.find("> li").each(function(i){
        $(this).find("a").click(function(){
          control.stopAutoScroll();
          control.scrollToBatch((i+1));
          return false;
        });
      });
    }
  };

  target.jfoxCarousel(config);
}

function bottomInit() {
  facebookBtn();

  if(!$.cookie('v_dmmr')) { // default cookie if does not exist
    $.cookie('v_dmmr', 'light',{expires: 365 });
  }

  var  dimElms = getDimElms();

  if($.cookie('v_dmmr') === "dark"){
    dimmLightDown(dimElms);
  } else { // default "light"
    dimmLightUp(dimElms);
  }

  // flash toggle
  getDimElms().feedBack.click(function(){
    toggleHideFlash();
  });

  $("#section-head #authentication > li a").click(function(){
    toggleHideFlash();
  });

  setCarouselSlideshow();
}

$(document).ready(function(){
  init();
  $('.play-sym-'+pageVars.videoId).css("display","block");
  $('#related-video-a').css('display', 'block');
  var  dimElms = getDimElms();

  dimElms.thisBut.click(function(){
    if( dimElms.thisButLink.text() == "Dim the lights"){
      dimmLightDown(dimElms)
      $.cookie('v_dmmr', 'dark',{expires: 365 });
    } else {
      dimmLightUp(dimElms)
      $.cookie('v_dmmr', 'light',{expires: 365 });
    }

    return false;
  });

  $('.container-videos').hover(
    function(){
      var thisObj = $(this);
      thisObj.addClass('hover');
    },
    function(){
      var thisObj = $(this);
      thisObj.removeClass('hover');
    }
  );

  $('.slideLinks').hover(
    function(){
      var thisObj = $(this);
      thisObj.addClass('hover');
    },
    function(){
      var thisObj = $(this);
      thisObj.removeClass('hover');
    }
  );

  	$('#fb-page a').click(function(){
		window.open(this.href);
		return false;
	})
}); // document.ready //


var f_cb_medrect1_served=false;var f_need_cb=false;var f_cb_medrect1_real=false;function yume_backfill_banner(banner_div_id,banner_frame_id,imu_type){var rc=0;var cb_width=document.getElementById(banner_div_id).style.width;var cb_height=document.getElementById(banner_div_id).style.height;var y_c_frame=document.getElementById(banner_frame_id);var cb_w=cb_width.split("px",1);var cb_h=cb_height.split("px",1);var arg1="/html/dynamic_banner_iframe.html?width="+cb_w+"&height="+cb_h+"&imu="+imu_type;try{y_c_frame.contentWindow.document.getElementsByTagName("body")[0].innerHTML="<iframe src=\""+arg1+"\" height='"+cb_height+"' width='"+cb_width+"' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' topmargin='0' leftmargin='0' style='overflow:hidden'></iframe>";rc=1;}catch(e){}
return rc;}
function yume_serve_cb_frame(banner_div_id,banner_frame_id,frame_src_url){var rc=0;var cb_width=document.getElementById(banner_div_id).style.width;var cb_height=document.getElementById(banner_div_id).style.height;var y_c_frame=document.getElementById(banner_frame_id);try{y_c_frame.contentWindow.document.getElementsByTagName("body")[0].innerHTML="<iframe src=\""+frame_src_url+"\" height='"+cb_height+"' width='"+cb_width+"' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' topmargin='0' leftmargin='0' style='overflow:hidden'></iframe>";rc=1;}catch(e){}
return rc;}
function yume_serve_cb_image(banner_div_id,banner_frame_id,frame_img,frame_link,frame_trackers){var rc=0;var cb_width=document.getElementById(banner_div_id).style.width;var cb_height=document.getElementById(banner_div_id).style.height;var y_c_frame=document.getElementById(banner_frame_id);try{var htmlString=""
if(frame_link!='null'){htmlString="<a href='"+frame_link+"' target='_blank'><img src=\""+frame_img+"\" border='0' width='"+cb_width+"' height='"+cb_height+"'></a>";}else{htmlString="<img src=\""+frame_img+"\" border='0' width='"+cb_width+"' height='"+cb_height+"'>";}
y_c_frame.contentWindow.document.getElementsByTagName("body")[0].innerHTML=htmlString;for(i=0;i<frame_trackers.length;i++){htmlString+="<img width='1' height='1' src=\""+frame_trackers[i]+"\" style='position:absolute;'></img>"}
y_c_frame.contentWindow.document.getElementsByTagName("body")[0].innerHTML=htmlString;rc=1;}catch(e){}
return rc;}
function yume_serve_cb_swf(banner_div_id,banner_frame_id,frame_img,frame_link,frame_trackers){var rc=0;var cb_width=document.getElementById(banner_div_id).style.width;var cb_height=document.getElementById(banner_div_id).style.height;var y_c_frame=document.getElementById(banner_frame_id);try{var htmlString=""
if(frame_img.indexOf(".swf?",0)>0){htmlString="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+cb_width+"' height='"+cb_height+"'> <param name='bgcolor' value='#E3F0EB' />  <param name='movie' value=\""+frame_img+"\"><param name='allowScriptAccess' value='always'> <param name='wmode' value='transparent'> <param name='quality' value='high'><embed src=\""+frame_img+"\" bgcolor='#E3F0EB' quality='high' wmode='transparent' allowScriptAccess='always' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+cb_width+"' height='"+cb_height+"'></embed></object>"}else{htmlString="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+cb_width+"' height='"+cb_height+"'> <param name='bgcolor' value='#E3F0EB' />  <param name='movie' value=\""+frame_img+"?clickTAG="+frame_link+"\"><param name='allowScriptAccess' value='always'> <param name='wmode' value='transparent'> <param name='quality' value='high'><embed src=\""+frame_img+"?clickTAG="+frame_link+"\" bgcolor='#E3F0EB' quality='high' wmode='transparent' allowScriptAccess='always' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+cb_width+"' height='"+cb_height+"'></embed></object>"}
for(i=0;i<frame_trackers.length;i++){htmlString+="<img width='1' height='1' src=\""+frame_trackers[i]+"\" style='position:absolute;'></img>"}
y_c_frame.contentWindow.document.getElementsByTagName("body")[0].innerHTML=htmlString;rc=1;}catch(e){}
return rc;}
function yume_img_is_swf(img_url){var ix_getElement=img_url.indexOf("/getElement?",0);var ix_extSWF=img_url.indexOf("ext=.swf",0);var rc=0;if(ix_getElement>0&&ix_extSWF>ix_getElement){rc=1;}
return rc;}
function delegate(that,thatMethod){if(arguments.length>2){var _params=[];for(var n=2;n<arguments.length;++n){_params.push(arguments[n]);}
return function(){try{return thatMethod.apply(that,_params);}catch(e){}};}else{return function(){try{return thatMethod.apply(that);}catch(e){}};}}
function obj(){}
obj.prototype.serveImage=function(ref,banner_div_id,banner_frame_id,frame_img,frame_link,frame_trackers){this.pic=new Image();this.pic.src=frame_img;try{if(window.addEventListener){this.pic.addEventListener('onload',delegate(ref,yume_serve_cb_image(banner_div_id,banner_frame_id,frame_img,frame_link,frame_trackers)),false);}else if(window.attachEvent){this.pic.attachEvent('onload',delegate(ref,yume_serve_cb_image(banner_div_id,banner_frame_id,frame_img,frame_link,frame_trackers)));}}catch(e){}}
function yume_flash_callback(command,arg1,arg2,arg3,arg4,arg5){if(command=='companionbanner/iframe'||(command=='companionbanner/image'&&yume_img_is_swf(arg1)>0)){if(arg3=="cb1"||arg3=="cb_medrect1"){if(yume_serve_cb_frame("cb_medrect1_div","cb_medrect1_frame",arg1)>0){f_cb_medrect1_served=true;f_cb_medrect1_real=true;}}
if(arg3=="cb1"||arg3=="cb_31rect1"){if(yume_serve_cb_frame("cb_31rect_div","cb_31rect_frame",arg1)>0){f_cb_31rect_served=true;f_cb_31rect_real=true;}}}else if(command=='companionbanner/image'){if(arg3=="cb1"||arg3=="cb_medrect1"){if(arg5=="application/x-shockwave-flash"){if(yume_serve_cb_swf("cb_medrect1_div","cb_medrect1_frame",arg1,arg2,arg4)>0){f_cb_medrect1_served=true;f_cb_medrect1_real=true;}}else{var cb_medrect1_image=new obj.prototype.serveImage(this,"cb_medrect1_div","cb_medrect1_frame",arg1,arg2,arg4);}}
if(arg3=="cb1"||arg3=="cb_31rect1"){if(arg5=="application/x-shockwave-flash"){if(yume_serve_cb_swf("cb_31rect_div","cb_31rect_frame",arg1,arg2,arg4)>0){f_cb_31rect_served=true;f_cb_31rect_real=true;}}else{var cb_medrect1_image=new obj.prototype.serveImage(this,"cb_31rect_div","cb_31rect_frame",arg1,arg2,arg4);}}}else if(command=="yume_leader_start"||command=="yume_preroll_start"||command=="yume_postroll_start"||command=="yume_midroll_start"){f_need_cb=true;if(command=="yume_leader_start"){f_cb_medrect1_real=false;f_cb_medrect1_served=false;}
document.getElementById('cb_medrect1_div').style.display='block';}else if(command=="yume_leader_end"||command=="yume_preroll_end"||command=="yume_postroll_end"||command=="yume_midroll_end"){f_need_cb=false;}else if(command=="yume_ad_end"){f_cb_medrect1_served=false;f_cb_31rect_served=false;}else if((command=="yume_ad_start"&&f_need_cb==true)||(command=="yume_end"&&arg1=="0"&&f_need_cb==true)){if((f_cb_medrect1_served==false)&&(f_cb_medrect1_real==false)){if(yume_backfill_banner("cb_medrect1_div","cb_medrect1_frame","medrect")>0){f_cb_medrect1_served=true;}}}}

