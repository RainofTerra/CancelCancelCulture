walk(document.body);
document.title = buttify(document.title);

// Causes issues with some in-page text editors
var observer = new MutationObserver(function(mutations) {
	mutations.reduce(function(acc, mutation){
		Array.prototype.push.apply(acc, mutation.addedNodes);
		return acc;
	}, []).forEach(walk);
});
observer.observe(document.body, {childList: true, subtree: true});

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement != null && node.parentElement.tagName.toLowerCase() != "script" && node.parentElement.tagName.toLowerCase() != "style" && node.parentElement.tagName.toLowerCase() != "textarea") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) {
	textNode.nodeValue = buttify(textNode.nodeValue);
}

function buttify(text) {
	// Deal with the easy case
	text = text.replace(/\b(t)he (c)loud/gi, function(match, p1, p2, offset, string) {
		// t - 7 = m
		// c - 1 = b
		m = String.fromCharCode(p1.charCodeAt(0) - 7);
		b = String.fromCharCode(p2.charCodeAt(0) - 1);
		return m + "y " + b + "utt";
	});

	// Deal with private clouds
	text = text.replace(/\b(p)rivate (c)loud/gi, function(match, p1, p2, offset, string) {
		// p + 9 = y
		// c - 1 = b
		y = String.fromCharCode(p1.charCodeAt(0) + 9);
		b = String.fromCharCode(p2.charCodeAt(0) - 1);
		return y + "our " + b + "utt";
	});

	// Deal with the rest of the clouds
	if(text.match(/cloud/i)) {
		// If we're not talking about weather
		// We probably don't need this check as it no longer replaces textarea contents
		/*if(text.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|resources/i)) {
			text = text.replace(/(c)loud/gi, function(match, p1, offset, string) {
				// c - 1 = b
				b = String.fromCharCode(p1.charCodeAt(0) - 1);
				return b + "utt";
			});
		}*/
		text = text.replace(/(c)loud/gi, function(match, p1, offset, string) {
			// c - 1 = b
			b = String.fromCharCode(p1.charCodeAt(0) - 1);
			return b + "utt";
		});
	}
	
	return text;
}


