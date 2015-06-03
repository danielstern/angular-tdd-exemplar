var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App",function(){
	describe("the contact service",function(){
		beforeEach(function(){
			module('AddressBook');
			inject(function($injector){
				contactService = $injector.get("contactService");
				$httpBackend = $injector.get("$httpBackend");
			});
		})

		it("should have a property contacts, an array",function(){
			expect(contactService.contacts).to.be.an('array');
		});

		it ("should call the backend",function(){
			$httpBackend.expectGET("http://localhost:9001/contacts")
				.respond(200,[]);
			$httpBackend.flush();
		})
	})

	describe("the contact controller",function(){
		beforeEach(function(){
			module('AddressBook');
			inject(function($injector,$rootScope){
				$scope = $rootScope.$new();
				contactService = $injector.get("contactService");
				$httpBackend = $injector.get("$httpBackend");
				$controller = $injector.get("$controller");
			})
		})

		it ("should store an array of contacts in scope",function(){
			$controller("ContactController",{$scope:$scope,contactService:contactService});
			assert.isArray($scope.contacts);
		})
	})
})
