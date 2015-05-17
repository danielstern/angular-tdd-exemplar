angular.module('AddressBook',[])
.service("contactService",function($http,$q,$interval){
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
	
	function isValidContact(contact){
		var valid = true;
		
		if (!contact.name) valid = false;
		if (!contact.email) valid = false;
		if (!contact.age) valid = false;
		if (!contact.occupation) valid = false;
		
		return valid;
	}
	
	return {
		getContacts:getContacts,
		isValidContact:isValidContact,
	}
})

.controller("ContactList",function($scope,contactService){
	contactService.getContacts().then(function(contacts){
		$scope.contacts = contacts;
	})
})

.controller("AddContact",function($scope,contactService){
	$scope.addContact = function(){
		console.log("Add new contact...",$scope.contact);
		if (!contactService.isValidContact){
			return false;
		}
	}
})