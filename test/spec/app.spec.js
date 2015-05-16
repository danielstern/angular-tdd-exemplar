var assert = chai.assert;
var expect = chai.expect;

describe("The Contact Service",function(){
	beforeEach(function(){
		
			module('AddressBook');
			module('ngMockE2E');
			
			inject(function(_contactService_,$injector){
				contactService = _contactService_;
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.whenGET('http://localhost:3000/contacts').passThrough();
				$httpBackend.expectGET('http://localhost:3000/contacts');
					
		})
	})
	
	it('should return an array of contacts asynchronously',function(){
			contactService.getContacts()
			.then(function(contacts){
				expect('contacts').to.be.an('array');
			});
			
	});
	
	describe("The Contacts",function(){	
		beforeEach(function(){
				inject(function($injector){
					contactService = $injector.get('contactService');															
				})
		})
		
		it('should have a name that is a string',	function(){
			contactService.getContacts()
			.then(function(contacts){
				contacts.forEach(function(contact){
					expect(contact).to.have.property('name');
					expect(contact.name).to.be.a('string');
				});
			});
		});					
				
		it('should have a numeric age property',function(){
			contactService.getContacts()
			.then(function(contacts){
				contacts.forEach(function(contact){
					expect(contact).to.have.property('age');
					expect(contact.age).to.be.a('number');
				})
			})
		});
	})
});

describe("The Contact List Controller",function(){
	beforeEach(function(){
		module('AddressBook');	
		inject(function($rootScope,$controller,contactService){
			/* Create a new scope that we can assign as the controllers scope. By keeping a reference to it, we can run tests. */
			$scope = $rootScope.$new();
	
			/* Create a new instance of the controller with the $controller service */
			contactListController = $controller("ContactList",{$scope:$scope});
			
		})
	});
	
	it('should get a copy of the contact list on startup and store it in $scope',function(){
		setTimeout(function(){
			expect($scope.contacts).to.be.an('array');
		},50);
	});
})
