angular.module('AddressBook.Contacts')
.controller("AddContact",function($scope,contactService,validationService){
	$scope.contact = {
		name:"Bronn",
		email:"bronn@anonymo.us",
		occupation:"Sellsword",
		age:39		
	}
	$scope.addContact = function(){
		if (!validationService.isValidContact($scope.contact)){
			$scope.errorMessage = true;
			return false;
		};
		
		contactService.addContact(angular.copy($scope.contact))
		.then(function(){
			$scope.contact = {};
		},function(){
			alert("Sorry, we couldn't add your contact.");
		})
	}
})