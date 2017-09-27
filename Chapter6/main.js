function basicMethod(){
	var dog = {
		bark: function(line){console.log(line);}
	};

	console.log("dog.bark = function(){console.log('bark bark')}");
	console.log("bark is now a method in the dog object");
	console.log("dog.bark('bark bark') ->");
	dog.bark('bark bark');
}

function prototypes(){
	var protoRabbit = {
		speak: function(line) {
			console.log("The " + this.type + " rabbit says '" + line + "'");
		},
		type: "rabbit"
	};

	var killerRabbit = Object.create(protoRabbit);
	killerRabbit.type = "killer";
	killerRabbit.speak("SKREEE");
}

function constructors(){
	function Rabbit(type) {
		this.type = type;
	}

	var killerRabbit = new Rabbit("killer");
	var blackRabbit = new Rabbit("black");

	//add a method to the rabbi prototype
	Rabbit.prototype.speak = function(line) {
			console.log("The " + this.type + " rabbit says '" + line + "'");
	};

	killerRabbit.speak("SKREE");
	blackRabbit.speak("doom...");
}

function nonenumerableProperty(){
	var rabbit = {
		type: "rabbit",
		name: "bob"
	};
	Object.defineProperty(Object.prototype,"hiddenNonsense",{enumerable: false, value: "hello"});

	for(var key in rabbit){
		console.log("key: " + key);
	}

	console.log("rabbit.hiddenNonsense: " + rabbit.hiddenNonsense);
}

/**
1: Vector -
- Create a vector constructor that takes and x and y parameter.
- Give the vector prototype plus and minus methods that take
another vector as a parameter and returns a new vector
with the sum or difference of the two vectors
- Add a getter property length that computes the distance from
  (0,0) to (x,y)
*/
function vectorType(){
	function Vector(x, y){
		this.x = x;
		this.y = y;
	}
	Vector.prototype.plus = function(vector){
		var newX = this.x + vector.x;
		var newY = this.y + vector.y;
		var newVect = new Vector(newX, newY);
		return newVect;
	};

	Vector.prototype.minus = function(vector){
		var newX = this.x - vector.x;
		var newY = this.y - vector.y;
		var newVect = new Vector(newX, newY);
		return newVect;
	};

	var vectorA = new Vector(3,4);
	var vectorB = new Vector(2,1);
	console.log("vectorA.x , vectorA.y -> " + vectorA.x + " , " + vectorA.y);
	console.log("vectorB.x , vectorB.y -> " + vectorB.x + " , " + vectorB.y);

	var vectorAdd = vectorA.plus(vectorB);
	console.log("vectorAdd.x , vectorAdd.y-> " + vectorAdd.x + " , " + vectorAdd.y);

	var vectorMinus = vectorA.minus(vectorB);
	console.log("vectorMinus.x , vectorMinus.y -> " + vectorMinus.x + " , " + vectorMinus.y);

	Object.defineProperty(Vector.prototype, "length", {
		get: function(){
			var squared = (this.x*this.x) + (this.y*this.y);
			return Math.sqrt(squared);
		}
	})

	console.log("vectorA.length: " + vectorA.length);
}



function main(){
	console.log("BASIC METHOD");
	basicMethod();

	console.log("PROTOTYPES");
	prototypes();

	console.log("CONSTRUCTORS");
	constructors();

	console.log("NONENUMERABLE PROPERTY");
	nonenumerableProperty();


	console.log("EXERCISE ONE");
	vectorType();
}

main();