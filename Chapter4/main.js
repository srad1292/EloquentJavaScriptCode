function arrays(){
	var anArray = [2,3,4,5,6,10,15];
	for(i = 0; i < anArray.length; i++){
		console.log("anArray[" + i + "] is " + anArray[i]);
	}
	anArray.push(20);
	console.log("anArray[anArray.length] after pushing " + anArray[anArray.length]);
}

function properties(){
	var person = {
		firstName : "Sam",
		"last name" : "Radford"
	};
	console.log("Two ways to get properties . and []");
	console.log("person.firstName: " + person.firstName);
	console.log("person[\"last name\"]: " + person["last name"]);
	console.log("\"last name\" isn't a valid variable name so it must use [] notation");
}

function objectBrace(){
	var day1 = {
		squirrel: false,
		events: ["work","touched tree","running","television"]
	};
	console.log("day1.squirrel: " + day1.squirrel);
}

function addAndDeleteProperties(){
	var anObject = {
		left: 1,
		right: 2
	};
	console.log(anObject);
	console.log("anObject.middle = 3");
	anObject.middle = 3;
	console.log(anObject);
	console.log("delete anObject.middle");
	delete anObject.middle;
	console.log(anObject);
}

function referenceVsValue(){
	console.log("var object1 = {value:10};");
	console.log("var object2 = object1");
	console.log("var object3 = {value:10};");
	var object1 = {value:10};
	var object2 = object1;
	var object3 = {value:10};

	console.log("object1.value: " + object1.value);
	console.log("object2.value: " + object2.value);
	console.log("object3.value: " + object3.value);

	console.log("object1.value = 15");
	object1.value = 15;

	console.log("object1.value: " + object1.value);
	console.log("object2.value: " + object2.value);
	console.log("object3.value: " + object3.value);
}

function amountOfArguments(){
	console.log("Arugments given: " + arguments.length);
}

function keyValues(){
	var person = {
		firstName : "Sam",
		lastName : "Radford",
		age : 25,
		gender : "Male",
		birthMonth: "September"
	}
	console.log("for(var key in person){print}");
	for (var key in person){
		console.log("key: " + key);
		console.log("value: " + person[key]);
	}
}

/*
1: Sum Of A Range - Returns the sum of numbers given
Take three arguments - start, end, step
Create an array with every number in that range then pass it to
a function named mySum which will produce the sum of the numbers
which will be returned by this function
*/
function sumOfARange(start, end, step){
	var sum = 0;
	var myArray = [];
	if(start <= end){
		for(var i = start; i < end; i += step){
			myArray.push(i);
		}
	}
	else{
		for(var i = start; i > end; i += step){
			myArray.push(i);
		}
	}
	sum = mySum(myArray);
	return sum;
} 

function mySum(values){
	var sum = 0;
	for(i = 0; i<values.length; i++){
		sum += values[i];
	}
	return sum;
}


/**
2: Reverse An Array - 
Function1 - reverseArray - reverse an array using a new array
Function2 - reverseInPlace - reverse using the given array 
*/
function reverseAnArray(values){
	console.log("REVERSE ARRAY");
	reverseArray(values);
	console.log("REVERSE ARRAY IN PLACE");
	reverseInPlace(values);
}

function reverseArray(values){
	var newArray = [];
	console.log("Reverse and place in newArray");
	for(var i = (values.length-1); i >= 0; i--){
		newArray.push(values[i]);
	}

	for(var i = 0; i < newArray.length; i++){
		console.log("newArray[" + i + "]: " + newArray[i]);
	}
}

function reverseInPlace(values){
	for(var i = 0; i < (values.length/2); i++){
		var temp = values[i];
		values[i] = values[values.length-(i+1)];
		values[values.length-(i+1)] = temp;
	}
	for(var i = 0; i < values.length; i++){
		console.log("values[" + i + "]: " + values[i]);
	}
}

/**
3: A List
list = {item: value, rest: {item:value, rest:{}}};
Create a function that takes an array and turns it into a list
Create a functino that takes a list and turns it into an array
*/
function aList(){
	var aList = arrayToList([1,3,5,7,9]);
	var anArray = listToArray(aList);
}

function arrayToList(values){
	var list = null;
	for (var i = values.length - 1; i >= 0; i--){
    	list = {value: values[i], rest: list};
	}
	console.log(list);
	return list;
}

function listToArray(aList){
	var values = [];
	while(aList !== null){
		values.push(aList.value);
		aList = aList.rest;
	}
	console.log(values);
}


/**
4: Deep Comparison - boolean - true if objects keys/values are equal
Takes two objects and compares their keys and values to see 
If they are equal
*/
function deepComparison(value1, value2) {
  if (value1 === value2) return true;
  
  if (value1 == null || typeof value1 != "object" ||
      value2 == null || typeof value2 != "object")
    return false;
  
  var keysInValue1 = 0, keysInValue2 = 0;

  for (var key in value1)
    keysInValue1 += 1;

  for (var key in value2) {
    keysInValue2 += 1;
    if (!(key in value1) || !deepComparison(value1[key], value2[key]))
      return false;
  }

  return keysInValue1 == keysInValue2;
}

function main() {
	console.log("ARRAYS");
	arrays();
//	
	console.log("PROPERTIES");
	properties();

	console.log("OBJECT BRACE NOTATION");
	objectBrace();

	console.log("ADD AND DELETE PROPERTIES");
	addAndDeleteProperties();

	console.log("REFERENCE VS VALUE");
	referenceVsValue();

	console.log("ANY AMOUNT OF ARGUMENTS");
	console.log("amountOfArguments('hello','goodbye','saiyonara')");
	amountOfArguments('hello','goodbye','saiyonara');

	console.log("PRINT AN OBJECTS KEY VALUE PAIRS");
	keyValues();

	console.log("EXERCISE ONE");
	console.log(sumOfARange(9,0,-2));

	console.log("EXERCISE TWO");
	reverseAnArray([1,3,5,7,9,11]);

	console.log("EXERCISE THREE");
	aList();

	console.log("EXERCISE FOUR");
	var obj = {here: {is: "an"}, object: 2};
	var obj2 = {here: {is: "an"}, object: 3};
	var obj3 = {here: {is: "an"}, o: 2};
	console.log(deepComparison(obj,obj));
	console.log(deepComparison(obj,obj2));
	console.log(deepComparison(obj,obj3));


}

main();