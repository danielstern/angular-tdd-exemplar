angular.module('AddressBook',[])
.run(function(){
	console.log("Address Book has initialized.");
})
.service("contactService",function(){
	var contacts = [];
	
	function getContacts(){
		return contacts;
	};
	
	return {
		getContacts:getContacts
	}
})