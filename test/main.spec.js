var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App",function(){
	describe("the contact service",function(){
		it("should have a property contacts, an array",function(){
			module('AddressBook');
			inject(function($injector){
				contactService = $injector.get("contactService");
			});

			expect(contactService.contacts).to.be.an('array');

		})
	})
})
