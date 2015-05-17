angular.module('AddressBook',[])
.service("contactService",function($http,$q, validationService){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = [];	
	
	function getContacts(){
		var deferral = $q.defer();
		
		$http.get(contactUrl)
		.then(function(res){
			while(res.data[0]){
				contacts.push(res.data.pop());
			};
			deferral.resolve(res.data);
		})
		
		return deferral.promise;
	};
	
	function addContact(contact){
		var i = contacts.push(contact);
		var request = $http.post(contactUrl+'/new',contact);
		request.then(function success(res){
				
		},
		function fail(){
			contacts.splice(i-1,1);
			alert("Sorry, we couldn't add your contact.");
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

.controller("AddContact",function($scope,contactService,validationService){
	$scope.contact = {
		name:"Ali",
		email:"Ali@baba.com"
	}
	$scope.addContact = function(){
		if (!validationService.isValidContact($scope.contact)){
			$scope.errorMessage = true;
			return false;
		};
		
		contactService.addContact(angular.copy($scope.contact));		
		$scope.contact = {};
	}
})