var expect = chai.expect;

describe("The Avatar Directive.",function(){
	
	beforeEach(function(){
		module('AddressBook.Contacts');
	});
	
	it("... should display a single letter which is the first letter of the contact's name.",function(){
		inject(function($rootScope,$compile){
			$rootScope.contact = {name:"Jon Arryn"};
			var element = $compile('<avatar name=contact.name/>')($rootScope)
			$rootScope.$digest();
			expect(element.text()).to.equal("J");
		})
	});
	
	it("...should display a question mark if there is no associated contact.",function(){
		inject(function($rootScope,$compile){
			var element = $compile('<avatar name=contact.name/>')($rootScope)
			$rootScope.$digest();
			expect(element.text()).to.equal("?");
		});
	});
})