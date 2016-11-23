function __loadScript(sURL,onLoad) {
  try {
  var loadScriptHandler = function() {
    var rs = this.readyState;
    if (rs == 'loaded' || rs == 'complete') {
      this.onreadystatechange = null;
      this.onload = null;
      if (onLoad) {
        window.setTimeout(onLoad,20);
      }
    }
  }
  function scriptOnload() {
    this.onreadystatechange = null;
    this.onload = null;
    window.setTimeout(onLoad,20);
  }
  var oS = document.createElement('script');
  oS.type = 'text/javascript';
  if (onLoad) {
    oS.onreadystatechange = loadScriptHandler;
    oS.onload = scriptOnload;
  }
  oS.src = sURL;
  document.getElementsByTagName('head')[0].appendChild(oS);
  } catch(e) {
    // oh well
  }
}

function doStats() {
  try {
    if (window.location.href.toString().match(/soundmanager/i)) {
      // SM + SM2
      reinvigorate.track("u8v2l-jvr8058c6n");
    } else {
      reinvigorate.track("47064-bd3p5901pd");
    }
  } catch(err) {}
/*
  if (typeof re_ != 'undefined') {
    re_('f6795-v062d0xv4u');
  }
*/
}

setTimeout(function(){
  if (document.domain.match(/schillmania.com/i)) {
//    if (window.location.href.toString().match(/soundmanager2/i)) {
if (!window.location.href.toString().match(/dialog/i) && !window.location.href.toString().match(/arkanoid/i)) {
//      __loadScript('http://static.woopra.com/js/woopra.js');
   }
   var loc = window.location.href.toString();
   var matches = [
     /dhtml-arkanoid/i,
     /dialog2/,
     /soundmanager/i,
     /schillmania.com\/$/i
   ];
   var didMatch = false;
   for (var i=matches.length; i--;) {
     if (loc.match(matches[i])) {
       didMatch = true;
       break;
     }
   }
   if (typeof window.reinvigorate === 'undefined') {
      __loadScript('http://include.reinvigorate.net/re_.js',doStats);
   }
  }
},100);

