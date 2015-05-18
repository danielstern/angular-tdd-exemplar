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
	
	describe("The proper filter...",function(){
		/* how can you possibly test this? */
		
		beforeEach(function(){
			inject(function($injector){
				proper = $injector.get("$filter")("proper");
			});
		})
		
		it("should take any string and return that string in proper case (first letter of each word uppercase)",function(){
			expect(proper('danaerys')).to.equal("Danaerys");
			expect(proper('sour alyn')).to.equal("Sour Alyn");
		});
		
		it("should coerce a number into a string",function(){
				expect(proper(5323)).to.equal('5323');
				expect(proper(1236910)).to.equal('1236910');
				expect(proper(0x0eabbe)).to.equal('961470'); // no way that is so cool
		})
		
		it("should throw an error on any other value",function(){
			/* this is how to test for an error */;
			assert.throws(function(){ 	proper(undefined);  })
			assert.throws(function(){ 	proper({});  })
			assert.throws(function(){ 	proper([]);  })
		})
	});
	describe("The Avatar directive...",function(){
		beforeEach(function(){
			
		})
		it("should display a single letter which is the first letter of the contact's name.",function(){
			inject(function($rootScope,$compile){
				scope = $rootScope;
				scope.contact = {name:"Jon Arryn"};
				var element = $compile('<avatar name=contact.name/>')(scope)
				scope.$digest();
				expect(element.text()).to.equal("J");
				
				
//				var avatar = angular.element('<avatar name=contact.name/>');
//				var g = $compile(avatar,scope);
//				scope.$digest();
//				content = avatar.find('span');
				
//				debugger;	
			})
		});
		it("should display a question mark if there is no associated contact.");
	})

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

			$httpBackend.flush();
		});
	})
})