describe("the app",function(){
	describe('the contact service',function(){
		beforeEach(function(){
			
			module("AddressBook");
			
			inject(function($injector){
				contactService = $injector.get("contactService")
			})
		})
		
		it("should return an array of contacts",function(){
			var contacts = contactService.getContacts();
			assert.isArray(contacts);
		});
	})
})