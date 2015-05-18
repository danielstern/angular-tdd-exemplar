angular.module("AddressBook.Global")
.filter("proper",function(){
	return function(name){
		var type = typeof name;
		if (type !== 'number' && type !== 'string') throw new Error();		
		return name.toString().split(" ").map(function(word){
			return word[0].toUpperCase().concat(word.slice(1))
		}).join(" ");
	}
})