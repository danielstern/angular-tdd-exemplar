angular.module('AddressBook.Contacts')
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
