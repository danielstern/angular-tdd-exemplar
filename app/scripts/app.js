angular.module('AddressBook',[])
.run(function(){

})
.service("contactService",function(){
	var contacts = [{
		name:"Shotaro Kaneda",
		age:16,
		occupation:"Futuristic Biker Gang Captain",
		email:"kaneda@capsules.co.jp"
	},{
		name:"Jon Snow",
		age:15,
		occupation:"Lord Commander of the Wall",
		email:"jon@nightswatch.wl"
	},{
		name:"Lara Croft",
		age:21,
		occupation:"Tomb Raider",
		email:"lara@croft.co.uk"
	}];
	
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