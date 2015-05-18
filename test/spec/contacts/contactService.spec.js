var sample_valid_contact = {
	"name":"Jon Snow",
	"age":15,
	"occupation":"Lord Commander of the Wall",
	"email":"jon@nightswatch.wl"
}

describe("The Contact Service",function(){

	beforeEach(function(){
		module('AddressBook.Contacts');
		inject(function($injector){
			contactService = $injector.get("contactService");
			$httpBackend = $injector.get('$httpBackend');
		})
	});

	describe('getting contacts',function(){
		it('should return an array of contacts asynchronously',function(done){
			$httpBackend.expectGET('http://localhost:3000/contacts')
				.respond(200,[sample_valid_contact]);

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