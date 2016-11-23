// DATA FORMAT

var data = {
	a : ['Ant farm', 'Ant massage parlor'],
	b : ['Bat farm', 'Bat massage parlor']
}

// CACHE MECHANICS

var searchFor = function(str, list, caseSensitive, reduce){
	str = str.replace(/(?:^\s*|\s*$)/g, ''); // trim whitespace
	var found = [];
	var reg = new RegExp('^\\s?'+str, 'g' + caseSensitive ? '':'i');
	var i = list.length;
	while(i--){
		if(reg.test(list[i])) found.push(list[i]);
		reduce && list.splice(i, 1);
	}
}
	
var lookUp = function(str, caseSensitive){
	str = str.replace(/(?:^\s*|\s*$)/g, ''); // trim whitespace
	if(data[str]) return cache[str];
	var firstChar = caseSensitive ? str[0] : str[0].toLowerCase();
	var list = data[firstChar];
	if(!list) return (data[str] = []);
	// we cache on data since it's already a caching object.
	return (data[str] = searchFor(str, list, caseSensitive)); 
}

// PRECACHE OBJECT - JSON.stringify

// we need lookUp function from above, this might take a while
var preCache = function(arr){
	var chars = "abcdefghijklmnopqrstuvwxyz".split('');
	var cache = {};
	var i = chars.length;
	while(i--){
		// reduce is true, so we're destroying the original list here.
		cache[chars[i]] = searchFor(chars[i], arr, false, true);
	}
	return cache;
}