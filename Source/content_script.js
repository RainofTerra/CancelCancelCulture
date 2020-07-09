walk(document.body);
document.title = cancelcancel(document.title);

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
            if(node.parentElement != null && node.parentElement.tagName.toLowerCase() != "script"
		    && node.parentElement.tagName.toLowerCase() != "style" 
		    && node.parentElement.tagName.toLowerCase() != "textarea" 
		    && node.parentElement.contentEditable != "true"
	    	    && node.getAttribute("data-text") !== "true") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) {
	textNode.nodeValue = cancelcancel(textNode.nodeValue);
}

function cancelcancel(text) {
	// replace caps with caps
	text = text.replace(/\bCANCEL CULTURE/g, "EXPERIENCING THE CONSEQUENCES OF YOUR ACTIONS");
	text = text.replace(/\bCancel Culture/g, "Experiencing the Consequences of Your Actions");
	text = text.replace(/\bcancel culture/gi, "experiencing the consequences of your actions");
	
	return text;
}


