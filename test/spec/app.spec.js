var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App",function(){
	
	beforeEach(function(done){

			module('AddressBook');
			module('ngMock');

			inject(function(_contactService_,$injector){
				contactService = _contactService_;
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.expectGET('http://localhost:3000/contacts');
				
				$.getJSON('http://localhost:3000/contacts')
				.then(function(body,code,res){
					$httpBackend.whenGET('http://localhost:3000/contacts').respond(res.status,body);
					done();
				})
				
		})
	});

	describe("The Contact Service",function(){

		beforeEach(function(){
				inject(function($injector){
					contactService = $injector.get("contactService");
				})
		});

		it('should return an array of contacts asynchronously',function(done){
			contactService.getContacts()
			.then(function(contacts){
				expect(contacts).to.be.an('array');
				done();
			});
			setTimeout($httpBackend.flush);
		});

//		describe("The Contacts",function(){	
//			beforeEach(function(){
//					inject(function($injector){
//						contactService = $injector.get('contactService');															
//					})
//			})
//
//			it('should have a name that is a string',	function(done){
//				contactService.getContacts()
//				.then(function(contacts){
//					contacts.forEach(function(contact){
//						expect(contact).to.have.property('name');
//						expect(contact.name).to.be.a('string');
//						done();
//					});
//				});
//				setTimeout($httpBackend.flush);
//			});					
//
//			it('should have a numeric age property',function(done){
//				contactService.getContacts()
//				.then(function(contacts){
//					contacts.forEach(function(contact){
//						expect(contact).to.have.property('age');
//						expect(contact.age).to.be.a('number');
//						done();
//					});
//				});
//				setTimeout($httpBackend.flush);
//			});
//		})
	});

	describe("The validation service",function(){
		beforeEach(function(){
			inject(function($injector){
				validationService = $injector.get("validationService");
			})
		})
		
		describe("the contact validation function",function(){

			it("should return null on no contact at all",function(){
				expect(validationService.isValidContact(undefined)).to.be.null;
			});

			it("should return false on a contact with no name",function(){
				var contact_with_no_name = {
					age:36,
					occupation:"Janitor",
					email:"janitor@planetexpress.com"
				};
				expect(validationService.isValidContact(contact_with_no_name)).to.be.false;
			});

			it("should return false on a contact with no email",function(){
				var contact_with_no_email = {
					name:"Scruffy",
					age:36,
					occupation:"Janitor",
				};
				assert.isFalse(validationService.isValidContact(contact_with_no_email));
			});

			it("should return true on a contact with no age, it is optional",function(){
				var contact_with_no_age = {
					name:"Scruffy",
					occupation:"Janitor",
					email:"janitor@planetexpress.com"
				};
				expect(validationService.isValidContact(contact_with_no_age)).to.be.true;
			});

			it("should return true on a contact with no occupation, because that is optional",function(){
				var contact_with_no_occupation = {
					name:"Scruffy",
					age:25,
					email:"janitor@planetexpress.com"
				};
				expect(validationService.isValidContact(contact_with_no_occupation)).to.be.true;
			});
		});
		
		describe("the name validator",function(){
			it("should return false if the name is not a string.",function(){
				assert.notOk(validationService.isValidName(0x0dedde))
				assert.notOk(validationService.isValidName({}))
				assert.notOk(validationService.isValidName([]))
			});

			it("should return false on names of less than two letters",function(){
				assert.isFalse(validationService.isValidName('N'));
			});

			it("should return true on a string of two or more characters",function(){
				assert.ok(validationService.isValidName('Eddard'));
				assert.ok(validationService.isValidName('Roose Bolton'));
				assert.ok(validationService.isValidName('Robert Baratheon, King of The Andals'));
			});
		});
		
		describe("the age validator",function(){
			it ("should return true on any number 18 or greater",function(){
				assert(validationService.isValidAge(18));
				assert(validationService.isValidAge(23));
				assert(validationService.isValidAge(66.5));
				assert(validationService.isValidAge(9000));
			});
			
			it("should return false if the age is not a number",function(){
				assert.isFalse(validationService.isValidAge("Grey Wind"));
				assert.isFalse(validationService.isValidAge("Blinky"));
				assert.isFalse(validationService.isValidAge("23"));
			});
			
			it("should return false if the age is less than 18",function(){
				expect(validationService.isValidAge(17)).not.to.be.ok;
				expect(validationService.isValidAge(5)).not.to.be.ok;
				expect(validationService.isValidAge(-4)).not.to.be.ok;
				expect(validationService.isValidAge(0)).not.to.be.ok;
			});
		});
		
		describe("the email validator",function(){
			it("should return true on a valid, normal email address",function(){
				expect(validationService.isValidEmail("info@danielstern.ca")).to.be.true;
				expect(validationService.isValidEmail("chairperson@board.com")).to.be.ok;
				expect(validationService.isValidEmail("lester@gov.co.uk")).to.be.ok;
			});
			it("should return false on anything that's not an email address",function(){
				assert.isFalse(validationService.isValidEmail(12578));
				assert(!validationService.isValidEmail("Hermione Granger"));
			})
		});
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

			setTimeout($httpBackend.flush);
		});
	})
})