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

	describe("the proper filter",function(){
		beforeEach(function(){
			module("AddressBook");
			inject(function($injector){
				proper = $injector.get("$filter")("proper");
			});
		})

		it ("should proper case a string",function(){
			expect(proper("ned stark")).to.equal("Ned Stark");
			expect(proper("cersei lannister")).to.equal("Cersei Lannister");
		});

		it ("should take a number and return that as a string",function(){
			expect(proper(42)).to.equal("42");
		})

		it ("should throw an error on an incompatible type",function(){
			assert.throws(function(){
				proper(undefined)
			});
		})
	})

	describe("avatar",function(){
		beforeEach(function(){
			module("AddressBook");
		})

		it ("should display the capitalized first letter of a name",function(){
			inject(function($rootScope,$compile){
			  $rootScope.contact = {name:'jon arryn'};
				var element = $compile('<avatar name=contact.name/>')($rootScope);
				$rootScope.$digest();
				var dirText = element.text();
				expect(dirText).to.equal("J");
			})
		})
	})
})
