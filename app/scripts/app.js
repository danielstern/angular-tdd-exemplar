angular.module('AddressBook',[])
.run(function(){
	console.log("Address Book has initialized.");
})
.service("contactService",function(){
	var contacts = [{
		name:"Joe"
	},{
		name:"Bill"
	}];
	
	function getContacts(){
		return contacts;
	};
	
	return {
		getContacts:getContacts
	}
})
.controller("ContactListController",function($scope,contactService){
	$scope.contacts = contactService.getContacts();
})
