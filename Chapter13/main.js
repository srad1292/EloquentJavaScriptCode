function getAnElementByTag() {
	var link = document.body.getElementsByTagName("a")[2];
	console.log("The Third Link Is: " + link.href);

}

function getAnElementById() {
	var header = document.getElementById("gertrude");
	console.log("The text in the element with id of 'gertrude' is: " + header.innerHTML);
}

function appendAnElement() {
	var para = document.createElement("p");
	var node = document.createTextNode("A new paragraph!");
	para.appendChild(node);


	var header = document.getElementById("gertrude");
	header.appendChild(para);
}

function removeAnElement() {
	var contain = document.getElementById("container");
	contain.removeChild(contain.childNodes[0]);
}

function styleAnElement() {
	var fillDiv = document.getElementById("colorMe");
	fillDiv.style.backgroundColor = "aqua";
}

function paragraphQuerySelector() {
	var pars = document.getElementById("countP");
	var num = document.querySelectorAll("p").length;
	pars.innerHTML = pars.innerHTML + num;
}

function linkQuerySelector() {
	var links = document.getElementById("countA");
	var num = document.querySelectorAll("a").length;
	links.innerHTML = links.innerHTML + num;
}


/**
1: Building a Table
Given an array of objects, create a DOM structure
that represents a table to display these objects
*/
function exerciseOne() {

	var MOUNTAINS = [
		{name: "Kilimanjaro", height: 5895, country: "Tanzania"},
		{name: "Everest", height: 8848, country: "Nepal"},
		{name: "Mount Fuji", height: 3776, country: "Japan"},
		{name: "Mont Blanc", height: 4808, country: "Italy/France"},
		{name: "Vaalserberg", height: 323, country: "Netherlands"},
		{name: "Denali", height: 6168, country: "United States"},
		{name: "Popocatepetl", height: 5465, country: "Mexico"}
	];


	var tab = document.createElement("table");
	var keys = Object.keys(MOUNTAINS[0]);
	var headRow = document.createElement("tr");

	//Create the headers based of the keys of the objects
	for(key in keys) {
		var head = document.createElement("th");
		var node = document.createTextNode(keys[key]);
		head.appendChild(node);
		headRow.appendChild(head);
	}
	tab.appendChild(headRow);

	//create a row for each object and then fill the data 
	for(var i = 0; i < MOUNTAINS.length; i++){
		var row = document.createElement("tr");
		var current = MOUNTAINS[i];
		console.log(current);
		for(var x=0; x<keys.length;x++) {
			var data = document.createElement("td");
			var node = document.createTextNode(current[keys[x]]);
			data.appendChild(node);
			row.appendChild(data);
		}
		tab.appendChild(row);
	}

	document.getElementById("exerOne").appendChild(tab);
}

/**
2: byTagName
Take a node and a tagName and return how many direct descendants of
the node match the tagName
*/

function byTagName(node, tagName) {
	var found = [];
	tagName = tagName.toUpperCase();
	
	function explore(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
	    	var child = node.childNodes[i];
	    	if (child.nodeType == document.ELEMENT_NODE) {
	      		if (child.nodeName == tagName)
	        		found.push(child);
	      		explore(child);
	    	}
	  	}	
	}
	explore(node);
	return found;
}

function byTagNameDivOne(){
	var divOne = document.getElementById("exerDivOne");
	var elems = byTagName(divOne,"p");
	var count = elems.length;
	var last = document.getElementById("lastP");
	last.innerHTML += count;
}

function byTagNameDivTwo(){
	var divTwo = document.getElementById("exerDivTwo");
	var elems = byTagName(divTwo,"hr");
	var count = elems.length;
	var last = document.getElementById("twoLastP");
	last.innerHTML += count;
}


function main() {
	console.log("GET AN ELEMENT BY IT'S TAG");
	getAnElementByTag();
	console.log("GET AN ELEMENT BY IT'S ID");
	getAnElementById();

}

main();