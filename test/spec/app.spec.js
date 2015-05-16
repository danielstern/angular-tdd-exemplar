var assert = chai.assert;
var expect = chai.expect;

describe("The Contact Service",function(){
	beforeEach(function(){
		
			module('AddressBook');
			module('ngMock');
			
			inject(function(_contactService_,$injector){
				contactService = _contactService_;
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.whenGET(/contacts/).respond(200);
//				$httpBackend.expectGET('http://localhost:3000/contacts');
					
		})
	})
	
//	it('should return an array of contacts',
//		inject(function(contactService){
//			var contacts = contactService.getContacts();
//			assert.isArray(contacts);
//		}
//	));
	
	describe("The Contacts",function(){	
		beforeEach(function(){
			
				inject(function($injector,contactService){
					
					contactService.getContacts()
					.then(function(a){
						contacts = a;
					})
					$httpBackend.flush();
			})
		})
		
//		it('should be that each contact has a name',	function(){
//				contacts.forEach(function(contact){
//					expect(contact).to.have.property('name');
//					expect(contact.name).to.be.a('string');
//				});
//		});					
		
		
		it('ought to be that each contact has a numeric age property',
			inject(function(contactService){
				var contacts = contactService.getContacts();
				contacts.forEach(function(contact){
					expect(contact).to.have.property('age');
					expect(contact.age).to.be.a('number');
				})
			}
		));
		
	})
});

//describe("The Contact List Controller",function(){
//	beforeEach(function(){
//		module('AddressBook');	
//	});
//	
//	it('should get a copy of the contact list on startup and store it in $scope',
//		inject(function($rootScope,$controller,contactService){
//		
//			/* Create a new scope that we can assign as the controllers scope. By keeping a reference to it, we can run tests. */
//			var $scope = $rootScope.$new();
//		
//			/* Create a new instance of the controller with the $controller service */
//			var contactListController = $controller("ContactList",{$scope:$scope});
//		
//			var contacts = $scope.contacts;
//			expect(contacts).to.be.an('array');
//			expect(contacts).to.deep.equal(contactService.getContacts());
//		}
//	));
//})
