angular.module('AddressBook',[])
.service("contactService",function($http,$q, validationService){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = [];	
	
	function getContacts(){
		var deferral = $q.defer();
		
		$http.get(contactUrl)
		.then(function(res){
			contacts = res.data;
			deferral.resolve(contacts);
		})
		
		return deferral.promise;
	};
	
	function addContact(contact){
		var i = contacts.push(contact);
		var request = $http.post(contactUrl+'/new',contact);
		request.then(
			function success(res){},
			function fail(){
				contacts.splice(i-1,1);
			});
		return request;
	}
	
	return {
		getContacts:getContacts,
		addContact:addContact
	}
})

.service("validationService",Validation)

.controller("ContactList",function($scope,contactService){
	contactService.getContacts().then(function(contacts){
		$scope.contacts = contacts;
	})
})

/* todo, test this directive */
.directive("avatar",function(){
	return {
		restrict:"AE",
		scope:{
			name:"=",
		},
		template:"<span class=avatar style='border:1px solid purple'>{{name[0]}}</span>"
	}
})

.filter("proper",function(){
	return function(name){
		var type = typeof name;
		if (type !== 'number' && type !== 'string') throw new Error();		
		return name.toString().split(" ").map(function(word){
			return word[0].toUpperCase().concat(word.slice(1))
		}).join(" ");
	}
})

.controller("AddContact",function($scope,contactService,validationService){
	$scope.contact = {
		name:"Bronn",
		email:"bronn@anonymo.us",
		occupation:"Sellsword",
		age:39		
	}
	$scope.addContact = function(){
		if (!validationService.isValidContact($scope.contact)){
			$scope.errorMessage = true;
			return false;
		};
		
		contactService.addContact(angular.copy($scope.contact))
		.then(function(){
			$scope.contact = {};
		},function(){
			alert("Sorry, we couldn't add your contact.");
		})
	}
})