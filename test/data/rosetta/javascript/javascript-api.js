/*
for more information and examples of using the bitly API visit http://api.bitly.com/
*/
if (typeof(BitlyApi) == 'undefined')
var BitlyApi = {}; // BitlyApi namespace. You sholdn't need to access methods here. Instead, use an instance of BitlyApiClient().
if (typeof(BitlyCB) == 'undefined')
var BitlyCB = {
"_cb_":{},
"_cb_count_":0
}; // global namespace for your callback methods. Allows you to define callabacks from within other method calls.
BitlyApi.loadScript = function(_src) {
var e = document.createElement('script');
e.setAttribute('language','javascript');
e.setAttribute('type', 'text/javascript');
e.setAttribute('src',_src); document.body.appendChild(e);
};
BitlyApi.loadCss = function(u) {
var e = document.createElement('link');
e.setAttribute('type', 'text/css');
e.setAttribute('href', u);
e.setAttribute('rel', 'stylesheet');
e.setAttribute('media', 'screen');
try {
document.getElementsByTagName('head')[0].appendChild(e);
} catch(z) {
document.body.appendChild(e);
}
};
BitlyApi.call = function(method, params, callback_method_name) {
params = params || {};
params["client"] = "bitly-javascript-api"
var s = "http://api.bit.ly/v3/" + method;
var url_args = [];
if (callback_method_name) url_args.push("callback=" + callback_method_name);
for (var name in params) {
url_args.push(name + "=" + encodeURIComponent(params[name]));
};
s += "?" + url_args.join("&");
BitlyApi.loadScript(s);
};
BitlyApi.wrapv2Call = function(method, params, callback_method_name) {
var wrapper_method = "_"+method+"_wrapper_";
var cb_method = (eval(callback_method_name));
var id = BitlyCB._cb_count_++;
BitlyCB["_cb_"]["_"+id] = function(resp) {
BitlyApi[wrapper_method].call(window, BitlyApi.genericTransform(resp), cb_method);
BitlyCB["_cb_"]["_"+id] = null;
delete BitlyCB["_cb_"]["_"+id];
id = null;
};
var alias_cb_method = 'BitlyCB._cb_._'+id;
return BitlyApi.call(method, params, alias_cb_method);
}
BitlyApi._clicks_wrapper_ = function(data, cb) {
var results = {}, new_results = {};
if(data.data && data.data.clicks && data.data.clicks.length) {
results = data.data.clicks[0];
}
new_results.hash = results.global_hash || results.hash;
new_results.userHash = results.user_hash;
new_results.clicks = results.global_clicks || 0;
new_results.userClicks = results.user_clicks;
new_results.referrers = new_results.userReferrers = {};
data.results = new_results;
//if(results.error) { data.statusCode = results.error; }
delete data.data;
cb.call(window, data);
};
BitlyApi._info_wrapper_ = function(data, cb) {
var results = {}, new_results = {};
if(data.data && data.data.info && data.data.info.length) {
results = data.data.info[0];
}
new_results.hash = results.user_hash || results.hash;
new_results.globalHash = results.global_hash;
new_results.userHash = results.user_hash
new_results.htmlTitle = results.title || null;
new_results.shortenedByUser = results.created_by;
new_results.error = results.error;
data.results = {};
data.results[new_results.hash] = new_results;
delete data.data;
cb.call(window, data);
};
BitlyApi._expand_wrapper_ = function(data, cb) {
var results = {}, new_results = {};
if(data.data && data.data.expand && data.data.expand.length) {
results = data.data.expand[0];
}
if(!results.error) {
var hash = results.user_hash || results.global_hash;
new_results.longUrl = results.long_url;
data.results = {};
data.results[hash] = new_results;
}
else {
if(results.error == "NOT_FOUND") {
data.errorMessage = "No info available for requested document.";
data.errorCode = 1203;
data.statusCode = "";
}
data.results = null;
}
delete data.data;
cb.call(window, data);
};
BitlyApi._shorten_wrapper_ = function(data, cb) {
var results = {}, new_results = {};
if(data.data) {
results = data.data;
}
data.results = {};
if(data.statusCode === "OK") {
new_results.userHash = results.hash;
new_results.hash = results.global_hash;
new_results.shortUrl = new_results.shortCNAMEUrl = new_results.shortKeywordUrl = results.url;
data.results[results.long_url] = new_results;
}
else if(data.statusCode === "INVALID_URI") {
new_results = {
errorCode: 1206,
errorMessage: "URL you tried to shorten was invalid.",
statusCode:"ERROR"
};
data.statusCode = "OK";
data.results["error"] = new_results;
}
else if(data.statusCode === "ALREADY_A_BITLY_LINK") {
new_results = {
errorCode: 1214,
errorMessage: "URL you tried to shorten was already a short bitly URL.",
statusCode:"ERROR"
};
data.statusCode = "OK";
data.results["error"] = new_results;
}
delete data.data;
cb.call(window, data);
};
BitlyApi.genericTransform = function(data) {
data["errorCode"] = 0;
data["errorMessage"] = "";
data["results"] = {};
data["statusCode"] = data["status_txt"];
delete data["status_code"];
delete data["status_txt"];
return data;
}
var BitlyApiClient = function(login, apiKey, version){
this.login = login || "monitter";
this.apiKey = apiKey || "R_2332338150c3bafe5cccf5e733e5cfed";
};
BitlyApiClient.prototype.googleVisRequired = "This method requires the google visualization api. Please include javascript from: http://www.google.com/jsapi. More info: http://code.google.com/apis/visualization/documentation/index.html";
BitlyApiClient.prototype.availableModules = ['stats'];
BitlyApiClient.prototype.loadingModules = {};
BitlyApiClient.prototype.moduleLoaded = function(module_name, callback_method_name) {
BitlyApiClient.prototype.loadingModules[module_name] = true;
for (var mod in BitlyApiClient.prototype.loadingModules) {
if (!BitlyApiClient.prototype.loadingModules[mod]) {
return false;
}
};
eval(callback_method_name + "();");
};
BitlyApiClient.prototype.loadModules = function(module_names, callback_method_name) {
for (var i=0; i < module_names.length; i++) {
BitlyApiClient.prototype.loadingModules[module_names[i]] = false;
};
for (var i=0; i < module_names.length; i++) {
var name = module_names[i];
var callback_name = "module_" + name + "_loaded";
BitlyCB[callback_name] = function() {
BitlyApiClient.prototype.moduleLoaded(name, callback_method_name);
};
var s = "http://$CALLBACK_HOST/app/modules/" + name + ".js?callback=BitlyCB." + callback_name;
try {
BitlyApi.loadScript(s);
} catch(e) {
BitlyClient.addPageLoadEvent(function(){
BitlyApi.loadScript(s);
});
}
};
try {
BitlyApi.loadCss("http://$CALLBACK_HOST/static/css/javascript-modules.css");
} catch(e) {
BitlyClient.addPageLoadEvent(function(){
BitlyApi.loadCss("http://$CALLBACK_HOST/static/css/javascript-modules.css");
});
}
};
/*
####################################################################################################
# utils
####################################################################################################
*/
BitlyApiClient.prototype.addPageLoadEvent = function(func) {
var oldonload = window.onload;
if (typeof window.onload != 'function') {
window.onload = func;
} else {
window.onload = function() { oldonload(); func(); };
}
};
BitlyApiClient.prototype.extractBitlyHash = function(bitly_url_or_hash) {
if (bitly_url_or_hash == null) {
return null;
} else {
var m = bitly_url_or_hash.match(/\/([^\/]+)$/);
if (m) {
return m[1];
}
else {
return bitly_url_or_hash;
}
}
};
BitlyApiClient.prototype.createElement = function(element_type, attrs) {
var el = document.createElement(element_type);
for (var k in attrs) {
if (k == "text") {
el.appendChild(document.createTextNode(attrs[k]));
} else {
this.setAttribute(el, k, attrs[k]);
}
};
return el;
};
BitlyApiClient.prototype.setAttribute = function(element, attribute_name, attribute_value) {
if (attribute_name == "class") {
element.setAttribute("className", attribute_value); // set both "class" and "className"
}
return element.setAttribute(attribute_name, attribute_value);
};
BitlyApiClient.prototype.listen = function (elem, evnt, func) {
if (elem.addEventListener) // W3C DOM
elem.addEventListener(evnt,func,false);
else if (elem.attachEvent) { // IE DOM
var r = elem.attachEvent("on"+evnt, func);
return r;
}
};
BitlyApiClient.prototype.targ = function (e) {
var targ;
if (!e) var e = window.event;
if (e.target) targ = e.target;
else if (e.srcElement) targ = e.srcElement;
if (targ.nodeType == 3) // defeat Safari bug
targ = targ.parentNode;
return targ;
};
BitlyApiClient.prototype.toggle = function(el) {
var e;
if (typeof(el) == 'string') {
e = document.getElementById(el);
if (typeof(e) == undefined) {
throw "toggle: No DOM element with id: " + el;
return;
}
} else {
e = el;
}
if (e.style.display == 'none') {
e.style.display = '';
} else {
e.style.display = 'none';
}
};
/*
####################################################################################################
# API
####################################################################################################
Generic API caller for more advanced API usage. Allows you to specify extra params for method calls with options. Eg, you can call the /info API and ask for a subset of data using the 'keys' param.
*/
BitlyApiClient.prototype.call = function(method, params, callback_method_name, response_format) {
params['login'] = this.login;
params['apiKey'] = this.apiKey;
if(response_format && response_format === "v3") {
return BitlyApi.call(method, params, callback_method_name);
}
else {
return BitlyApi.wrapv2Call(method, params, callback_method_name);
}
};
// shorten a long url
BitlyApiClient.prototype.shorten = function(longUrl, callback_method_name, response_format) {
response_format = response_format || null;
return this.call('shorten', {'longUrl': longUrl}, callback_method_name, response_format);
};
// expand a bitly url
BitlyApiClient.prototype.expand = function(shortUrl, callback_method_name, response_format) {
response_format = response_format || null;
return this.call('expand', {'shortUrl': shortUrl}, callback_method_name, response_format);
};
// get info about one or more bitly urls or hashes
BitlyApiClient.prototype.info = function(bitly_hash, callback_method_name, response_format) {
response_format = response_format || null;
var arr = bitly_hash.split(',');
var hashes = [];
for (var i=0; i < arr.length && i < 1; i++) {// limit to 1 bitly_hash
hashes.push(this.extractBitlyHash(arr[i]));
};
return this.call('info', {'hash': hashes.join(',')}, callback_method_name, response_format);
};
// get referrer data about a bilty url or hash
BitlyApiClient.prototype.stats = function(bitly_hash_or_url, callback_method_name, response_format) {
response_format = response_format || null;
bitly_hash_or_url = this.extractBitlyHash(bitly_hash_or_url);
return this.call('clicks', {'hash': bitly_hash_or_url}, callback_method_name, response_format);
};
/*
####################################################################################################
# INSTANTIATE CLIENT
####################################################################################################
*/
var BitlyClient = new BitlyApiClient();
