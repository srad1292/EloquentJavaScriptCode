function basicArithmetic(){
	console.log("BASIC ARITHMETIC");
	//Basic Arithmetic
	console.log("100+4*11 = " + (100 + 4 * 11));
	console.log("(100+4)*11 = " + ((100 + 4) * 11));
	//Mod i.e remainder
	console.log("The remainder of 10/3 is: " + (10%3));
}

function strings(){
	console.log("STRINGS");
	//Text i.e string
	console.log("This is a string of text");
	var basicText = "This is basic text";
	console.log("Type of variable 'basicText' is: " + typeof basicText);
	var twoLines = "This is line one\nThis is line two";
	console.log(twoLines);
}


function unaryOperators(){
	console.log("UNARY OPERATORS");
	//Unary Operators - operators that operate on only one value
	//typeOf
	var basicNumber = 42;
	console.log("Type of variable 'basicNumber' is: " + typeof basicNumber);
	
	//- can be used as a boolean operate and a unary operator
	console.log("-(10-2) is " + (- (10-2)));
}

function booleanValues(){
	console.log("BOOLEAN VALUES");
	//Boolean values
	console.log("true or false for (3>2): " + (3>2));
	console.log("true or false for ('A' < 'Z'): " + ("A" < "Z"));
	//A-Z < a-z
	console.log("true or false for ('Z' < 'a'): " + ("Z" < "a"));
}


function logicalOperators(){
	console.log("LOGICAL OPERATORS");
	//Logical Operators - && || ! ?
	// And - &&
	console.log("true and true (true && true): " + (true && true));
	console.log("true and false (true && false): " + (true && false));
	
	// Or - ||
	console.log("true or true (true || true): " + (true || true));
	console.log("true or false (true || false): " + (true || false));
	console.log("false or false (false || false): " + (false || false));
	
	//Not - !
	console.log("not true (!true): " + (!true));
	console.log("not false (!false): " + (!false));

	//Ternary - ?
	console.log("(true ? 'hello' : 'goodbye'): " + (true ? "hello" : "goodbye"));
}


function automaticTypeConversion(){
	console.log("AUTOMATIC TYPE CONVERSION");
	//JavaScript converting types is called "Type Coercion"
	console.log("'5' - 1: " + ("5" - 1));
	console.log("'5' + 1: " + ("5" + 1));
	console.log("'5' * 2: " + ("5" * 2));
	console.log("'five' * 2: " + ("five" * 2));
	console.log("false == 0: " + (false == 0));
	console.log("false === 0: " + (false === 0));
}


function shortCircuitEvaluation(){
	console.log("SHORT CIRCUIT EVALUATION")
	//For && and || the expression on the right is evaluated only when necessary
	console.log("null || 'user': " + (null || 'user'));
	console.log("'Karl' || 'user': " + ('Karl' || 'user'));

}


function main(){
	basicArithmetic();
	strings();
	unaryOperators();
	booleanValues();
	logicalOperators();
	automaticTypeConversion();
	shortCircuitEvaluation();

}

main();