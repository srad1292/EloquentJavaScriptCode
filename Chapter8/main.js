function strictMode() {
	"use strict";
	console.log("for(counter = 0; coundter < 10; counter++){\nconsole.log(counter);\n}");
	console.log("Would produce 'uncaught reference error: counter is undefined'");
	console.log("Typically counter would turn into a global but strict doesn't allow that");
}


function testing(){
	function Vector(x,y){
		this.x = x;
		this.y = y;
	}
	Vector.prototype.plus = function(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	function testVector() {
		var p1 = new Vector(10,20);
		var p2 = new Vector(-10,5);
		var p3 = p1.plus(p2);

		if(p1.x !== 10) return "fail: x property";
		if(p1.y !== 20) return "fail: y property";
		if(p2.x !== -10) return "fail: negative x property";
		if(p3.x !== 0) return "fail: x from plus";
		if(p3.y !== 25) return "fail: y from plus";
		return "everything okay";
	}
	console.log(testVector());
}

function exceptions(){
	function promptDirection(question){
		var result = prompt(question, "");
		if(result.toLowerCase() == "left") return "L";
		if(result.toLowerCase() == "right") return "R";
		throw new Error("Invalid direction: " + result);
	}

	function look() {
		if(promptDirection("Which way?") == "L"){
			return "a house";
		}
		else{
			return "two angry bears";
		}
	}

	try{
		console.log("You see ", look());
	}
	catch (error) {
		console.log("Something went wrong: " + error);
	}
}

function finallyExample(){
	var context = 10;
	function withContext(newContext){
		var oldContext = context;
		context = newContext;
		try {
			return body(context);
		}catch(error) {
			console.log(error);
		}
		finally {
			context = oldContext;
		}
	}

	function body(val){
		console.log("context inside of body: " + val);
		throw new Error("ERROR - Without finally the context wouldn't be set back to it's value");
	}
	console.log("context: " + context);
	withContext(15);
	console.log("context thanks to finally: " + context);
}


function specificError() {
	function InputError(message) { 
		this.message = message;
		this.stack= (new Error()).stack;
	}
	InputError.prototype = Object.create(Error.prototype);
	InputError.prototype.name = "InputError";

	function promptDirection(question){
		var result = prompt(question, "");
		if(result.toLowerCase() == "left") return "L";
		if(result.toLowerCase() == "right") return "R";
		throw new InputError("Invalid direction: " + result);
	}

	for(;;) {
		try {
			var dir = promptDirection("Where?");
			console.log("You chose ", dir);
			break;
		}
		catch(e) {
			if (e instanceof InputError) {
				console.log("Not a valid direction. Try Again");
			}
			else {
				throw e;
			}
		}
	}
}


function assertions() {
	function AssertionFailed(message) {
		this.message = message;
	}
	AssertionFailed.prototype = Object.create(Error.prototype);

	function assert(test, message) {
		if(!test){
			throw new AssertionFailed(message);
		}
	}

	function lastElement(array) {
		try{
			assert(array.length > 0, "empty array in lastElement");
		}catch(e){
			console.log(e);
		}
		return [array.length-1];
	}

	var anArray = [1,2,3,4];
	var emptyArray = [];

	console.log("anArray: " + anArray);
	console.log("lastElement(anArray): " + lastElement(anArray));

	console.log("emptyArray: " + emptyArray);
	console.log("lastElement(emptyArray): " + lastElement(emptyArray));
}


/**
1: Retry
You have a primitiveMultiply that only works 50% of the time
the other 50% it raises an exception of type MultiplicatorUnitFailure
Write a function that wraps this function and keeps trying until a call succeeds
then return the result
*/
function retry() {

	function primitiveMultiply(a,b){
		var x = Math.random();
		if(x < 0.5) {
			return a*b;
		}
		else{
			throw new Error("MultiplicatorUnitFailure");
		}
	}

	function reliableMultiply(a, b) {
		for (;;) {
			try {
				return primitiveMultiply(a, b);
		  	} catch (e) {
		    if (!(e instanceof MultiplicatorUnitFailure))
		    	console.log("trying again");
		    	return reliableMultiply(a,b);
		  	}
		}
	}

	function MultiplicatorUnitFailure() {}

	console.log(reliableMultiply(2,3));
}


/**
2: Locked Box

var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

Write a function - withBoxUnlocked - that takes a function
value as argument and unlocks the box, runs the function,
then ensures the box is locked again
*/

function lockedBox() {
	var box = {
		locked: true,
		unlock: function() { this.locked = false; },
		lock: function() { this.locked = true;  },
		_content: [],
	
		get content() {
			if (this.locked) throw new Error("Locked!");
				return this._content;
		}
	};

	function withBoxUnlocked(body) {
  		var locked = box.locked;
  		if (!locked)
    		return body();

  		box.unlock();
  		try {
  			return body();
  		} finally {
  			box.lock();
  		}
	}

	withBoxUnlocked(function() {
  		box.content.push("secret");
	});

	try {
  		withBoxUnlocked(function() {
    	throw new Error("lock even if there's an error");
  	});
	} catch (e) {
  		console.log("Error raised:", e);
	}

	console.log(box.locked);
	// → true
}


function main() {
	console.log("STRICT MODE");
	strictMode();
	console.log("HUMAN TESTING");
	console.log(testing);
	testing();
	console.log("EXCEPTIONS");
	exceptions();
	console.log("FINALLY");
	finallyExample();
	console.log("SPECIFIC ERROR");
	specificError();
	console.log("ASSERTIONS");
	assertions();
	console.log("EXERCISE ONE");
	retry();
	console.log("EXERCISE TWO");
	lockedBox();
}


main();