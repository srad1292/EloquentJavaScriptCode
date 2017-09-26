function greaterThan(n){
	return function(m){return m>n;};
}

function toAndFromJSON(){
	var anObject = {
		name: "sam",
		born: 1992
	};
	var aString = JSON.stringify(anObject);
	console.log("JSON.stringify(anObject) -> " + aString);
	console.log("JSON.parse(aString).born -> " + JSON.parse(aString).born);
}

function filterAnArray(values){
	console.log(values.filter(function(person){
		return person.born >= 1900 && person.born < 1925
	}));
}

function mapAnArray(values){
	console.log(values.map(function(person){
		return {Person: person.name, Father: person.father} 
	}));
}

function reduceAnArray(values){
	console.log(values.reduce(function(min,cur){
		if(cur.born < min.born){
			return cur;
		}
		else{
			return min;
		}
	}));
}


/* 
1: Flattening - 
Write a funciton that uses reduce and concat to
turn an array of arrays into a single array
*/

function flattening(values){
	
	var oneDim = [];
	oneDim = values.reduce(function(res, cur){
		return res.concat(cur);
	});
	console.log("oneDim.length -> " + oneDim.length);
	console.log("oneDim -> " + oneDim);
}

/*
2: Life Expectancy
Compute the average age of a person per century
Century - (Math.ceil(person.died/100))

-Helper functions - groupBy, ages, average
*/

function lifeExpectancy(values){
	var centuries = groupBy(values,function(person){
		return (Math.ceil(person.died/100));
	});

	for(key in centuries){
		var cent = ages(centuries[key]);
		console.log(key + " century average age: " + average(cent));
	}
}

function groupBy(values,getGroup){
	var groups = {};
	values.forEach(function(person){
		var groupName = getGroup(person);
		if(groupName in groups){
			groups[groupName].push(person);
		}
		else{
			groups[groupName] = [person];
		}
	});
	return groups;
}

function ages(values){
	var centAges = values.map(function(person){
		return person.died - person.born;
	});
	return centAges;
}

function average(values){
	total = 0;
	var sum = values.reduce(function(cur,next){
		return cur+next;
	});
	return (sum/values.length);
}


/*
3: every and some
write a function every that takes and array and a predicate
and returns true or false

write a function some that takes and array and a predicate
and returns true or false
*/

function every(values, predicate){
	for(i = 0; i<values.length; i++){
		if(!predicate(values[i])){
			return false;
		}
	}
	return true;
}

function some(values, predicate){
	for(i = 0; i<values.length; i++){
		if(predicate(values[i])){
			return true;
		}
	}
	return false;
}


function main(){

	console.log("FUNCTION THAT CREATES FUNCTIONS");
	console.log(greaterThan);
	console.log("var greaterThan10 = greaterThan(10)");
	var greaterThan10 = greaterThan(10);
	console.log("greaterThan10(11) -> " + greaterThan10(11));
	console.log("JSON");
	toAndFromJSON();
	
	var ancestryFile = JSON.parse(getAncestry());

	console.log(ancestryFile);
	console.log("FILTERING AN ARRAY");
	console.log("Filter an array to find people born 1900-1924")
	filterAnArray(ancestryFile);

	console.log("MAPPING AN ARRAY");
	console.log("Map an array of people and their father");
	mapAnArray(ancestryFile);

	console.log("REDUCING AN ARRAY");
	console.log("Find the oldest ancester");
	reduceAnArray(ancestryFile);


	console.log("EXERCISE ONE");
	var twoDim = [[1,2,3,4],[5,6,7,8],[9,8,7,6],[5,4,3,2]];
	console.log("twoDim -> " + twoDim.length);
	flattening(twoDim);


	console.log("EXERCISE TWO");
	lifeExpectancy(ancestryFile);

	console.log("EXERCISE THREE");
	var test = [1,2,3,4,5,NaN];
	var test2 = [1,2,3,4,5];
	var test3 = [NaN];
	console.log(test);
	console.log(test2);
	console.log(test3);
	console.log(every(test,isNaN));
	console.log(every(test3,isNaN));

	console.log(some(test,isNaN));
	console.log(some(test2, isNaN));
	console.log(some(test3, isNaN));

}

main();


 
function getAncestry(){ 
	return JSON.stringify([
  {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"},
  {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
  {"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"},
  {"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"},
  {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null},
  {"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null},
  {"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"},
  {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
  {"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"},
  {"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null},
  {"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"},
  {"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"},
  {"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"},
  {"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null},
  {"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"},
  {"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"},
  {"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null},
  {"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"},
  {"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"},
  {"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"},
  {"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"},
  {"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"},
  {"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"},
  {"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"},
  {"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"},
  {"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"},
  {"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"},
  {"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}
]);}