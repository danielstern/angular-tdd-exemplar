var assert = chai.assert;
var expect = chai.expect;

describe("The Contact Service",function(){
	beforeEach(function(){
		
			module('AddressBook');
//			module('ngMock');
			
			inject(function(_contactService_,_$httpBackend_){
				contactService = _contactService_;
				$httpBackend = _$httpBackend_;	
					
		})
	})
	
	it('should return an array of contacts',
		inject(function(contactService){
			var contacts = contactService.getContacts();
			assert.isArray(contacts);
		}
	));
	
	describe("The Contacts",function(){	
		
		it.only('should make a request to get contacts',function(done){
			$httpBackend.whenGET(/contacts/).respond({});
			$httpBackend.expectGET('http://localhost:3000/contacts');
			$httpBackend.flush();
			done();
		})

		it('should be that each contact has a name',	function(done){
			
				
				contactService.getContacts()
				.then(function(contacts){
					contacts.forEach(function(contact){
						expect(contact).to.have.property('name');
						expect(contact.name).to.be.a('string');
					});

					done();
				});			
			
		});
		
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
