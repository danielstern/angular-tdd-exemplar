describe("The Contact List Controller:",function(){
	beforeEach(function(){
		module('AddressBook.Contacts');
		inject(function($rootScope,$injector){
			
			/* Create a new scope that we can assign as the controllers scope. By keeping a reference to it, we can run tests. */
			$scope = $rootScope.$new();
			$httpBackend = $injector.get("$httpBackend");
			contactService = $injector.get("contactService");
			$controller = $injector.get("$controller");			
		})
	});

	it('Should get a copy of the contact list on startup and store it in $scope.',function(){
		/* Create a new instance of the controller with the $controller service */

		$httpBackend.expectGET('http://localhost:3000/contacts')
			.respond(200,[sample_valid_contact]);

		contactListController = $controller("ContactList",{$scope:$scope,contactService:contactService});		
		$httpBackend.flush();
		expect($scope.contacts).to.be.an('array');

	});
})