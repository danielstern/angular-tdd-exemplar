describe("The validationService logic",function(){
		beforeEach(function(){
			module("AddressBook.Global");
			inject(function($injector){
				validationService = $injector.get('validationService');
			});
		})
		describe("the contact validationService function",function(){

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