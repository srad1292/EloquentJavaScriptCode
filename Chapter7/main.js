/**
We will create a world represented by a two-dimensional grid
where each entity in the world takes up one square.  On every
turn each critter gets to perform some action

#######################
#     #    #    O    ##
#                     #
#        ####         #
#        #  #         #
# ##  O    #          #
#        O            #
#######################

# - wall/rock
O - critter

- plan array can create a world object which keeps track of
  the size and content of the world.  
- A toString method which converts
  the world back into a printable string as pictured above.
- A turn method which allows all critters to take a turn and
  then updates the world
*/
main();

function main(){
	
	//Plan is an array that will be used to create a world object
	var plan = 
		   ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];


	//squares are identified by their x,y coord using vectors
	function Vector(x,y){
		this.x = x;
		this.y = y; 
	}
	Vector.prototype.plus = function(diffVector){
		var newX = this.x + diffVector.x;
		var newY = this.y + diffVector.y;
		return new Vector(newX, newY);
	};

	//Grid object that handles grid related things
	//Grid is represented by an array like 
	/**
	  [0 1 2
	   3 4 5]
	  [topleft topmiddle topright
	   botleft botmiddle botright]
	   so access is array[x + (width * y)]

	  array[4] = (1,1) = (1 + (3*1)) = 4

	*/
	function Grid(width, height) {
		this.space = new Array(width*height);
		this.width = width;
		this.height = height;
	}

	//validate the coordinate is within the range of x,y values
	Grid.prototype.isInside = function(vector) {
		return (vector.x >=0 && vector.x < this.width && 
			vector.y >= 0 && vector.y < this.height);
	};


	Grid.prototype.get = function(vector) {
		return this.space[vector.x + this.width * vector.y];
	};

	Grid.prototype.set = function(vector, value){
		this.space[vector.x + this.width * vector.y] = value;
	};


	/**
	critters can see only the squares directly connected to them
	so we will create a directions object to map
	cooredinate offsets that we can use on a critter
	*/
	var directions = {
		"n": new Vector(0,-1),
		"ne": new Vector(1,-1),
		"e": new Vector(1,0),
		"se": new Vector(1,1),
		"s": new Vector(0,1),
		"sw": new Vector(-1,1),
		"w": new Vector(-1,0),
		"nw": new Vector(-1,-1),
	};

	/**
	get a random element from an array such as direction names
	to be used for simulations
	*/
	function randomElement(array){
		return array[Math.floor(Math.random() * array.length)];
	}

	//get an array of direction names
	function directionNames() {
		return "n ne e se s sw w nw".split(" ");
	}

	function BouncingCritter() {
		this.direction = randomElement(directionNames());
	}

	BouncingCritter.prototype.act = function(view) {
 		if (view.look(this.direction) != " "){
 			this.direction = view.find(" ") || "s";
 		}
		return {type: "move", direction: this.direction};
	};

	/**
	World object type
	constructor takes a plan(array of strings representing the world)
	and a legend of arguments which is an object that tells us which each character means
	which contains a constructor for each character except for space
	*/
	function World(map, legend) {
		var grid = new Grid(map[0].length, map.length);
		this.grid = grid;
		this.legend = legend;

		map.forEach(function(line, y) {
			for(var x = 0; x < line.length; x++){
				grid.set(new Vector(x,y), elementFromChar(legend,line[x]));
			}
		});
	}

	//Build up a string representation of the world's current state
	World.prototype.toString = function() {
		var output = "";
		for(var y = 0; y < this.grid.height; y++){
			for(var x = 0; x < this.grid.width; x++){
				var element = this.grid.get(new Vector(x,y));
				output += charFromElement(element);
			}
			output += "\n";
		}
		return output;
	};

	/**
	Create an instance of the correct type by using
	new legend[ch]() and then add the originChar
	which will allow us to build a maplike string in
	the toString method of world.
	*/
	function elementFromChar(legend, ch) {
		if (ch == " ") {
			return null;
		}
		var element = new legend[ch]();
		element.originChar = ch;
		return element;
	}

	function charFromElement(element) {
		if(element == null){
			return " ";
		}
		else{
			return element.originChar;
		}
	}

	function Wall(){}

	//Instantiate a world object
	var world = new World(plan, {"#": Wall, "o": BouncingCritter});
	console.log(world.toString());

	/** 
	Use the call method to call the function given as an argument
	on each element in the grid that isn't null or undefined
	allowing us to use a this for calls to the iteration function
	*/
	Grid.prototype.forEach = function(f, context) {
		for(var y = 0; y < this.height; y++){
			for(var x = 0; x < this.width; x++){
				var value = this.space[x + (y * this.width)];
				if(value != null) {
					f.call(context, value, new Vector(x,y));
				}
			}
		}
	}


	/**
	Animating life - 
	A turn method that uses the forEach we just created
	to find objects with an act method and then calls that
	method to get an action object and carries out the action
	if it is valid.  We must keep track of critters that have
	already moved so that if they move into a square that hasn't
	been checked, they don't get to move again.
	*/

	World.prototype.turn = function() {
		var acted = [];
		this.grid.forEach(function(critter, vector) {
			if(critter.act && acted.indexOf(critter == -1)) {
				acted.push(critter);
				this.letAct(critter, vector);
			}
		}, this);
	};


	/**Let Act - 
	Give the critter a view of the world and get an action in return

	If action is move the destination is checked to be valid
	and if so the destination is filled with the critter while
	the current location is set to null
	*/
	World.prototype.letAct = function(critter, vector) {
		var action = critter.act(new View(this, vector));
		//Handle the move action
		if (action && action.type == "move") {
			var dest = this.checkDestination(action, vector);
			if (dest && this.grid.get(dest) == null) {
				this.grid.set(vector, null);
				this.grid.set(dest, critter);
			}
		}
	};


	World.prototype.checkDestination = function(action, vector) {
		if (directions.hasOwnProperty(action.direction)) {
			var dest = vector.plus(directions[action.direction]);
			if(this.grid.isInside(dest)){
				return dest;
			}
		}
	}


	/**
	View
	*/

	function View(world, vector) {
		this.world = world;
		this.vector = vector;
	}

	//Ensures that the coords are inside the grid and finds the
	//character corresponding to the element
	View.prototype.look = function(dir) {
		var target = this.vector.plus(directions[dir]);
		if (this.world.grid.isInside(target)){
			return charFromElement(this.world.grid.get(target));
		}
		else{
			return "#";
		}
	};

	//Finds all of a certain type surrounding an element
	View.prototype.findAll = function(ch) {
		var found = [];
		for(var dir in directions){
			if(this.look(dir) == ch){
				found.push(dir);
			}
		}
		return found;
	};

	//Finds a single of a certain type surrounding an element
	View.prototype.find = function(ch) {
		var found = this.findAll(ch);
		if(found.length == 0) {
			return null;
		}
		return randomElement(found);
	};

	for(var i = 0; i < 5; i++) {
		world.turn();
		console.log(world.toString());
	}

}


/**
    //Test that grid is created and you can add a value to a coord
	var grid = new Grid(5,5);
	console.log(grid.get(new Vector(1,1)));
	grid.set(new Vector(1,1),"X");
	console.log(grid.get(new Vector(1,1)));
*/
