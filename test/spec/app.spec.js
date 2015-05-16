var assert = chai.assert;

describe("the contact list",function(){
	beforeEach(function(){
		module('AddressBook');
		
	})
	
	it('should return an array of contacts',
		inject(function(contactService){
			var contacts = contactService.getContacts();
			assert.isArray(contacts);
		}
	));
})