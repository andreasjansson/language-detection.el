function listEvents(root) {
	var feed = root.feed;
	var entries = feed.entry || [];
	var html = ['<ul>'];

	for (var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		var title = entry.title.$t;
		var start = (entry['gd$when']) ? entry['gd$when'][0].startTime : "";
		html.push('<li>', start, ' ', title, '</li>');
	}

	html.push('</ul>');
	document.getElementById("agenda").innerHTML = html.join("");
}