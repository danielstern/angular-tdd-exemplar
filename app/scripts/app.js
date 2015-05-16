angular.module('AddressBook',[])
.run(function(){

})
.service("contactService",function($http){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = undefined;
	$http.get(contactUrl)
	.then(function(res){
		console.log('got contacts',res);
		contacts = res.body;		
	})
	
	
	function getContacts(){
		return contacts;
	};
	
	return {
		getContacts:getContacts
	}
})
.controller("ContactList",function($scope,contactService){
	$scope.contacts = contactService.getContacts();
})