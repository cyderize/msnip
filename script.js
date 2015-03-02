function init() {
	var maths = getQueryParameter("q", location.href);
	var presenter = getQueryParameter("p", location.href) == "true" ? true: false;
	var html = getQueryParameter("h", location.href) == "true" ? true: false;
	
	document.getElementById("maths_input").value = maths;
	document.getElementById("present").checked = presenter;
	document.getElementById("html").checked = html;
	setPresenterMode(presenter);
}
function getQueryParameter(name, url) {
	name = name.replace("/[\[]/", "\\\[").replace("/[\]]/","\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	return results == null ? null : decodeURIComponent(results[1]);
}
function share() {
	var input = encodeURIComponent(document.getElementById("maths_input").value);
	var presenter = document.getElementById("present").checked;
	var html = document.getElementById("html").checked;
	
	var url = [location.protocol, '//', location.host, location.pathname].join('') + "?q=" + input + "&p=" + (presenter ? "true" : "false") + "&h=" + (html ? "true" : "false");
	
	var script = document.createElement('script');
	script.src = "http://is.gd/create.php?format=json&callback=shareLink&url=" + encodeURIComponent(url);
	document.head.appendChild(script);
	document.head.removeChild(script);
}

function shareLink(json) {
	var share = document.getElementById("share");
	share.textContent = json.shorturl;
	share.href = json.shorturl;
}

function setPresenterMode(mode) {
	renderMaths();
	
	var output = document.getElementById("output");
	
	document.getElementById("input").style.display = mode ? "none" : "block";
	document.getElementById("render_button").style.display = mode ? "none" : "inline";
	
	if (mode) {
		output.style.backgroundColor = "#FFFFFF";
		output.style.border = "solid 1px #CCC";
		output.style.borderRadius = "4px";
	}
	else {
		output.style.backgroundColor = "";
		output.style.border = "";
	}
}
function renderMaths() {
	var input = document.getElementById("maths_input").value;
	var output = document.getElementById("output");
	
	var htmlMode = document.getElementById("html").checked;
	if (htmlMode) {
		output.innerHTML = input;
	}
	else {
		output.textContent = input;
	}
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, output]);
}