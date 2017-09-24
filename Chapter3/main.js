function basicFunction(){
	console.log("FUNCTION");
	console.log("you're in a function");
}

function parameters(base, exp){
	console.log("PARAMETERS");
	var result = 1;
	for(var i = 0; i < exp; i++){
		result *= base;
	}
	console.log(base + "^" + exp + " -> " + result);
}

function functionVariable(){
	console.log("FUNCTIONS AS A VARIABLE")
	var func = function(){
		console.log("func is a variable set to a function ->");
		console.log("func = " + func);
	}
	func();
}


//Extra arguments are ignored, missing are declared undefined
function optionalParamters(base,exp){
	console.log("OPTIONAL PARAMETERS");
	if (exp == undefined){
		exp = 2;
	}
	var result = 1;
	for(var i = 0; i < exp; i++){
		result *= base;
	}
	console.log(base + "^" + exp + " -> " + result);

}

//References a specific instance of a local variable 
//From an inclosing function is called 'closure'
function closure(multiplier){
	return function(number){
		console.log("number " + number);
		console.log("multiplier " + multiplier);
		return number * multiplier;
	};
}


function powRecursion(base,exp){
	if(exp == 0){
		return 1;
	}
	else{
		var result = base * powRecursion(base,exp-1);
		return result;
	}
}


/*
1: Minimum - Returns a number
A function that takes two arguments and returns the minimum
*/
function minimum(num1, num2){
	return (num1 <= num2 ? num1 : num2);
}

/*
2: isEvenRecursion - Returns a boolean 
A) Zero is even
B) One is odd
C) A number N has the same evenness as N-2
handle a number less than 0 as well
*/
function isEvenRecursion(number){
	if(number == 0){
		return true;
	}
	else if(number == 1){
		return false;
	}
	else if(number < 0){
		return isEvenRecursion(-(number));
	}
	else{
		return isEvenRecursion(number-2);
	}
}


/*
3: Bean Counting - Returns a number
Take a string and a character and 
then return the number of times that
the character is in the string
*/
function countChar(word, char){
	var result = 0;
	for(var i = 0; i < word.length; i++){
		if(word.charAt(i) === char){
			result++;
		}
	}
	return result;
}


function main(){
	
	basicFunction();
	parameters(2,3);
	functionVariable();
	optionalParamters(3);
	
	console.log("CLOSURE");
	var twice = closure(2);
	console.log(twice(5));


	console.log("RECURSION");
	var pow = powRecursion(2,4);
	console.log("2 ^ 4 -> " + pow);
	

	console.log("EXERCISE 1 - MINIMUM");
	console.log("minumum(1,2) -> " + minimum(1,2));
	console.log("minumum(2,2) -> " + minimum(2,2));
	console.log("minumum(2,1) -> " + minimum(2,1));

	console.log("EXERCISE 2 - IS EVEN RECURSION");
	console.log("isEven(10) -> " + isEvenRecursion(10));
	console.log("isEven(9) -> " + isEvenRecursion(9));
	console.log("isEven(1) -> " + isEvenRecursion(1));
	console.log("isEven(0) -> " + isEvenRecursion(0));
	console.log("isEven(-1) -> " + isEvenRecursion(-1));
	console.log("isEven(-2) -> " + isEvenRecursion(-2));

	console.log("EXERCISE 3 - BEAN COUNTING");
	console.log("countChar('hello', 'l') - > " + countChar("hello","l"));
	console.log("countChar('hello', 'z') - > " + countChar("hello","z"));
	console.log("countChar('helloHELLOhello', 'l') - > " + countChar("helloHELLOhello","l"));
}

main();