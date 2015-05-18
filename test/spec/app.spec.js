var assert = chai.assert;
var expect = chai.expect;
var sample_valid_contact = {
	"name":"Jon Snow",
	"age":15,
	"occupation":"Lord Commander of the Wall",
	"email":"jon@nightswatch.wl"
}

describe("The Address Book App",function(){
	
	beforeEach(function(done){

			module('AddressBook');
			module('ngMock');

			inject(function(_contactService_,$injector){
				contactService = _contactService_;
				$httpBackend = $injector.get('$httpBackend');
				
				
				/* Mocking data is fast and efficient, but can leave you blind to errors in your real server interactions */
				$httpBackend.whenGET('http://localhost:3000/contacts').respond(200,[sample_valid_contact]);
				done();
				
		})
	});

	describe("The Contact Service",function(){

		beforeEach(function(){
				inject(function($injector){
					contactService = $injector.get("contactService");
					$httpBackend = $injector.get('$httpBackend');
				})
				
				
		});
		
		describe('getting contacts',function(){
			it('should return an array of contacts asynchronously',function(done){
				$httpBackend.expectGET('http://localhost:3000/contacts');
				
				contactService.getContacts()
				.then(function(contacts){
					expect(contacts).to.be.an('array');
					done();
				});
				$httpBackend.flush();
			});
		});
		
		describe('adding contacts',function(){			
			
			it ("should add a new contact if it is valid",function(done){
				$httpBackend.expectPOST('http://localhost:3000/contacts/new')
					.respond(201,{});
				
				contactService.addContact(sample_valid_contact)
					.then(function(){
						done();
					});
					$httpBackend.flush();
			});		
			
			it ("shoud return an err if the method didn't work",function(done){
				var invalid_contact = {name:"Ramsay"};
				$httpBackend.expectPOST('http://localhost:3000/contacts/new')
					.respond(409,"Error");
				
				contactService.addContact(invalid_contact)
					.then(function(){
						throw new Error();
					},
					function(response){
						done();
					});
				$httpBackend.flush();
			});
		})
	});
	

	describe("The Contact List Controller",function(){
		beforeEach(function(){

			inject(function($rootScope,$injector){
				/* Create a new scope that we can assign as the controllers scope. By keeping a reference to it, we can run tests. */
				$scope = $rootScope.$new();
				contactService = $injector.get("contactService");
				$controller = $injector.get("$controller");			
			})
		});

		it('should get a copy of the contact list on startup and store it in $scope',function(done){
			/* Create a new instance of the controller with the $controller service */
			contactListController = $controller("ContactList",{$scope:$scope,contactService:contactService});		
			contactService.getContacts()
				.then(function(contacts){
					expect($scope.contacts).to.be.an('array');
					expect($scope.contacts).to.deep.equal(contacts);
					done();
				});

			setTimeout($httpBackend.flush,10);
		});
	})
})