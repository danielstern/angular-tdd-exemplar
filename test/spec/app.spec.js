var assert = chai.assert;
var expect = chai.expect;

describe("The Contact Service",function(){
	beforeEach(function(){
		module('AddressBook');
		
	})
	
	it('should return an array of contacts',
		inject(function(contactService){
			var contacts = contactService.getContacts();
			assert.isArray(contacts);
		}
	));
});

describe("The Contact List Controller",function(){
	beforeEach(function(){
		module('AddressBook');	
	});
	
	it('should get a copy of the contact list on startup and store it in $scope',
		inject(function($rootScope,$controller,contactService){
		
			/* Create a new scope that we can assign as the controllers scope. By keeping a reference to it, we can run tests. */
			var $scope = $rootScope.$new();
		
			/* Create a new instance of the controller with the $controller service */
			var contactListController = $controller("ContactList",{$scope:$scope});
		
			var contacts = $scope.contacts;
			expect(contacts).to.be.an('array');
			expect(contacts).to.deep.equal(contactService.getContacts());
		}
	));


})
