function firstEvent(){
	console.log("You pressed the paragraph to activate this handler!");
}

function whichButtonPressed(){
	var para = document.getElementById("whichMouseButton");
	var toAppend = "";
	if(event.which == 1){
		toAppend = "Left Button";
	}
	else if(event.which == 2){
		toAppend = "Middle Button";
	}
	else if(event.which == 3){
		toAppend = "Right Button";
	}
	para.innerHTML += toAppend;
}

function pPropagate(){
	console.log("Paragraph event fired");
}

function buttonInPara(){
	console.log("button moused down");
	if(event.which == 1){
		console.log("left clicked so p won't fire")
		event.stopPropagation();
	}

}

addEventListener("keydown", function(event){
	if(event.keyCode == 86){
		document.getElementById("divColor").style.background = "violet";
	}
});

addEventListener("keypress", function(event){
	var keyPara = document.getElementById("whatKeyPressed");
	keyPara.innerHTML = String.fromCharCode(event.charCode) + " - " + event.charCode;
});


function dragDiv(){
	var lastX;
	var thisDiv = document.getElementById("draggableDiv");
	thisDiv.addEventListener("mousedown",function(event) {
		if(event.which == 1){
			lastX = event.pageX;
			addEventListener("mousemove",moved);
			event.preventDefault();
		}
	});

	function moved(event){
		if(!buttonPressed(event)){
			removeEventListener("mousemove",moved);
		}
		else{
			var dist = event.pageX - lastX;
			var newWidth = Math.max(10,thisDiv.offsetWidth + dist);
			thisDiv.style.width = newWidth + "px";
			lastX = event.pageX;
		}
	}

	function buttonPressed(event) {
		if(event.buttons == null){
			return event.which != 0;
		}
		else{
			return event.buttons != 0;
		}
	}	
}


function timedColor(){
	colorDiv = document.getElementById("divToColor");
	setTimeout(function() {
		colorDiv.style.background = "aqua";
	}, 1000);
}


function bombTimer(){
	var pa = document.getElementById("bombStatus");
	bombStatus.innerHTML = "Bomb Status: ARMED 2 SECONDS"
	var bombTime = setTimeout(function() {
		bombStatus.innerHTML = "BOOM!";
	}, 2000);

	if(Math.random() < 0.5) {
		setTimeout(function(){ 
			bombStatus.innerHTML = "Bomb Status: Defused";
			clearTimeout(bombTimer);
		},400);
	}
}


