function variables(){
	console.log("VARIABLES");
	var variable = 42;
	console.log("var variable = 42;");
	console.log("console.log(variable) -> " + variable);
}

function basicFunction(){
	console.log("FUNCTIONS");
	function aFunction(){ return 42; }
	console.log("function aFunction(){return 42;}");
	var x = aFunction();
	console.log("var x = aFunction();");
	console.log("x is now equal to -> " + x);
}


function functionConfirm(){
	console.log("CONFIRM");
	var conf = confirm("Shall We?");
	console.log("var conf = confirm('Shall We?'')");
	console.log("conf -> " + conf);
}

function functionPrompt(){
	console.log("PROMPT");
	var aPrompt = prompt("Your Name?");
	console.log("var aPrompt = prompt('your name?')");
	console.log("aPrompt -> " + aPrompt);
}

function ifStatements(){
	console.log("IF STATEMENTS");
	var x = 15;
	console.log("var x = 15");
	console.log("if(x<10){ print small} else if(x>=20){ print large} else{ print medium");
	if(x < 10){
		console.log("small");
	}
	else if(x >= 20){
		console.log("large");
	}
	else{
		console.log("medium");
	}

}

function whileLoops(){
	console.log("WHILE LOOP");
	var number = 0;
	console.log("Print all even numbers up to 12");
	while(number <=12){
		console.log(number);
		number +=2;
	}
}

function doWhileLoops() {
	console.log("DO WHILE LOOP");
	var number = 14;
	do{
		console.log("number: " + number);
	}while(number <= 12);
}

function forLoops(){
	console.log("FOR LOOPS");
	var names = ["greg", "anne", "steve", "sam"];
	for(var i = 0; i < names.length; i++){
		console.log("names[" + i + "] -> " + names[i]);
	}

}

function switchStatements(){
	console.log("SWITCH STATEMENTS");
	var item = "Steak";
	var price = 0.0;
	switch(item){
		case "Hamburger":
			price = 3.99;
			break;
		case "Hotdog":
			price = 0.99;
			break;
		case "Pizza":
			price = 1.50;
			break;
		default:
			price = 9.99;
			break;
	}
	console.log("Price of " + item + " is -> " + price);
}


/**
1: Looping A Triangle

Write a loop that makes seven calls to 
console.log to output the following:
#
##
###
####
#####
######
#######
*/
function exerciseOne(){
	for(var i = "#"; i.length<8; i+="#"){
		console.log(i);
	}
}


/*
2: FizzBuzz 

Print all numbers 1-100 except:
If divisible by 3 - print fizz
If divisible by 5 - print buzz
If divisible by 3 and 5 - print fizzbuzz

*/
function exerciseTwo(){
	for(var i = 1; i <= 100; i++){
		if((i%3==0)&&(i%5==0)){
			console.log("fizzbuzz");
		}
		else if(i % 3 == 0){
			console.log("fizz");
		}
		else if(i % 5 == 0){
			console.log("buzz");
		}
		else{
			console.log(i);
		}
	}


	/*Their solution
	for (var n = 1; n <= 100; n++) {
 		var output = "";
 		if (n % 3 == 0)
			output += "Fizz";
		if (n % 5 == 0)
    		output += "Buzz";
  		console.log(output || n);
	}
	*/	
}

/*
3: Chess Board

Display a string representation of an NxN
chessboard using new-line characters to
separate lines. 
Size - 8 -> 
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
*/

function exerciseThree(size){
	var board = "";
	var even = "";
	var odd = "";
	for(var i=0; i<size; i++){
		if(i%2==0){
			even += "#";
			odd += " ";
		}
		else{
			even += " ";
			odd += "#";
		}
	}
	even += "\n";
	odd += "\n";
	for(var i=0; i<size/2; i++){
		board = board + even + odd;
	}
	console.log(board);
}

function main() {
	variables();
	basicFunction();
	functionConfirm();
	functionPrompt();
	ifStatements();
	whileLoops();
	doWhileLoops();
	forLoops();
	switchStatements();
	exerciseOne();
	exerciseTwo();
	exerciseThree(8);
}

main();