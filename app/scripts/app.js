angular.module('AddressBook',[])
.service("contactService",function($http,$q, validationService){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = undefined;	
	
	function getContacts(){
		var deferral = $q.defer();
		
		$http.get(contactUrl)
		.then(function(res){
			deferral.resolve(res.data);
		})
		
		return deferral.promise;
	};
	
	
	return {
		getContacts:getContacts	
	}
})

.service("validationService",function(){
	
	function isValidContact(contact){
		if (!contact) return null;
		
		var valid = true;
		
		if (!contact.name || !isValidName(contact.name)) valid = false;
		if (!contact.email) valid = false;
//		if (contact.age && !validAge()) valid = false;
//		if (contact.occupation && !validOccupation()) valid = false;
		
		return valid;
	}
	
	function isValidName(name){
		return typeof name === 'string' && name.length > 1
	};
	
	return {
		isValidName:isValidName,
		isValidContact:isValidContact
	}
})

.controller("ContactList",function($scope,contactService){
	console.log("contactl ist init.");
	contactService.getContacts().then(function(contacts){
		console.log("got contacts.");
		$scope.contacts = contacts;
	})
})

.controller("AddContact",function($scope,contactService,validationService){
	$scope.addContact = function(){
		console.log("Add new contact...",$scope.contact);
		if (!validationService.isValidContact($scope.contact)){
			return false;
		}
	}
})