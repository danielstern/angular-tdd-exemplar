angular.module('AddressBook',[])
.run(function(){
	console.log("Address Book has initialized...");
})
.service("contactService",function(){
	var contacts = [{name:"Test Wilson"}];
	
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