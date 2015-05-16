angular.module('AddressBook',[])
.run(function(){

})
.service("contactService",function($http,$q,$interval){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = undefined;
	$http.get(contactUrl)
	.then(function(res){
		contacts = res.data;
	})
	
	
	function getContacts(){
		var deferral = $q.defer();
		
		console.log("getting contacts...");

		var watch = $interval(function(){
			if (contacts){
				$interval(watch);
				deferral.resolve(contacts);
//				console.log("got contacts...",contacts);
			}
		});
		
		return deferral.promise;
	};
	
	return {
		getContacts:getContacts
	}
})
.controller("ContactList",function($scope,contactService){
	contactService.getContacts().then(function(contacts){
		console.log("list got contacts...",contacts);
		$scope.contacts = contacts;
	})
})