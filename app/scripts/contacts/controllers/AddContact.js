angular.module('AddressBook.Contacts')
.controller("AddContact",function($scope,contactService,validationService){
	$scope.addContact = function(){
		if (!validationService.isValidContact($scope.contact)){
			$scope.errorMessage = true;
			return false;
		};
		
		contactService.addContact(angular.copy($scope.contact))
		.then(function(){
			$scope.contact = {};
			$scope.errorMessage = false;
		},function(){
			alert("Sorry, we couldn't add your contact.");
		})
	}
})