function objectToExport(){
	(function(exports) {
		var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
					 "Thursday", "Friday", "Saturday"];

		exports.name = function(number) {
			return names[number];
		};

		exports.number = function(name) {
			return names.indexOf(name);
		};
	})
	(this.weekDay = {});


	console.log(weekDay.name(weekDay.number("Saturday")));
}


function requireCommonModule() {
	function require(name){
		if (name in require.cache){
			return require.cache[name];
		}
		var code = new Function("exports, module", readFile(name));
		var exports = {};
		var module = {exports: exports};
		code(exports, module);

		require.cache[name] = module.exports;
		return module.exports;
	}
	//require.cache = Object.create(null);
}

function usingDefine() {

	function define(depNames, moduleFunction) {
	  var myMod = currentMod;
	  var deps = depNames.map(getModule);
	
	  deps.forEach(function(mod) {
	    if (!mod.loaded)
	      mod.onLoad.push(whenDepsLoaded);
	  });
	
	  function whenDepsLoaded() {
	    if (!deps.every(function(m) { return m.loaded; }))
	      return;
	
	    var args = deps.map(function(m) { return m.exports; });
	    var exports = moduleFunction.apply(null, args);
	    if (myMod) {
	      myMod.exports = exports;
	      myMod.loaded = true;
	      myMod.onLoad.forEach(function(f) { f(); });
	    }
	  }
	  whenDepsLoaded();
	}
	


	var defineCache = Object.create(null);
	var currentMod = null;
	function getMode(name) {
		if(name in defineCache) {
			return defineCache[name];
		}

		var module = {exports: null, 
					  loaded: false,
					  onload: []};
		defineCache[name] = module;
		backgroundReadFile(name, function(code) {
			currentMod = module;
			new Function("", code)();
		});
		return module;
	}
}

/**
1: Month Names
Write a simple module that converts month numbers to names
and names to month numbers.
*/
function monthNames() {
	var month = function() {
		var names = ["January", "February", "March", "April", "May",
	             "June", "July", "August", "September", "October",
	             "November", "December"];
		return {
	  	name: function(number) { return names[number]; },
	  	number: function(name) { return names.indexOf(name); }
		};
	}();

	console.log(month.name(month.number("September")));
}

function main() {
	console.log("OBJECT TO EXPORT");
	objectToExport();
	console.log("COMMONJS MODULES REQUIRE");
	console.log(requireCommonModule);
	console.log("USING DEFINE");
	console.log(usingDefine);
	console.log("EXERCISE ONE");
	monthNames();

}

main();







