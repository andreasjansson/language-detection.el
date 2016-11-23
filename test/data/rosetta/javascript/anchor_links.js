window.onload = function(){
	var Anchor = unescape(self.document.location.hash.substring(1)); // Get the string after # from the URL
        alert(Anchor)
        if(Anchor!=""){Anchor = "#" + Anchor;
        window.location = String(window.location).replace(/\#.*$/, "") + Anchor;}; // Replace previous #anchor with null and add new anchor
}