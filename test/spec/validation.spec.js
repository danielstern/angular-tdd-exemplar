describe("The validation logic",function(){
		beforeEach(function(){
			validation = new Validation();
		});
	
		describe("the contact validation function",function(){

			it("should return null on no contact at all",function(){
				expect(validation.isValidContact(undefined)).to.be.null;
			});

			it("should return false on a contact with no name",function(){
				var contact_with_no_name = {
					age:36,
					occupation:"Janitor",
					email:"janitor@planetexpress.com"
				};
				expect(validation.isValidContact(contact_with_no_name)).to.be.false;
			});

			it("should return false on a contact with no email",function(){
				var contact_with_no_email = {
					name:"Scruffy",
					age:36,
					occupation:"Janitor",
				};
				assert.isFalse(validation.isValidContact(contact_with_no_email));
			});

			it("should return true on a contact with no age, it is optional",function(){
				var contact_with_no_age = {
					name:"Scruffy",
					occupation:"Janitor",
					email:"janitor@planetexpress.com"
				};
				expect(validation.isValidContact(contact_with_no_age)).to.be.true;
			});

			it("should return true on a contact with no occupation, because that is optional",function(){
				var contact_with_no_occupation = {
					name:"Scruffy",
					age:25,
					email:"janitor@planetexpress.com"
				};
				expect(validation.isValidContact(contact_with_no_occupation)).to.be.true;
			});
		});
		
		describe("the name validator",function(){
			it("should return false if the name is not a string.",function(){
				assert.notOk(validation.isValidName(0x0dedde))
				assert.notOk(validation.isValidName({}))
				assert.notOk(validation.isValidName([]))
			});

			it("should return false on names of less than two letters",function(){
				assert.isFalse(validation.isValidName('N'));
			});

			it("should return true on a string of two or more characters",function(){
				assert.ok(validation.isValidName('Eddard'));
				assert.ok(validation.isValidName('Roose Bolton'));
				assert.ok(validation.isValidName('Robert Baratheon, King of The Andals'));
			});
		});
		
		describe("the age validator",function(){
			it ("should return true on any number 18 or greater",function(){
				assert(validation.isValidAge(18));
				assert(validation.isValidAge(23));
				assert(validation.isValidAge(66.5));
				assert(validation.isValidAge(9000));
			});
			
			it("should return false if the age is not a number",function(){
				assert.isFalse(validation.isValidAge("Grey Wind"));
				assert.isFalse(validation.isValidAge("Blinky"));
				assert.isFalse(validation.isValidAge("23"));
			});
			
			it("should return false if the age is less than 18",function(){
				expect(validation.isValidAge(17)).not.to.be.ok;
				expect(validation.isValidAge(5)).not.to.be.ok;
				expect(validation.isValidAge(-4)).not.to.be.ok;
				expect(validation.isValidAge(0)).not.to.be.ok;
			});
		});
		
		describe("the email validator",function(){
			it("should return true on a valid, normal email address",function(){
				expect(validation.isValidEmail("info@danielstern.ca")).to.be.true;
				expect(validation.isValidEmail("chairperson@board.com")).to.be.ok;
				expect(validation.isValidEmail("lester@gov.co.uk")).to.be.ok;
			});
			it("should return false on anything that's not an email address",function(){
				assert.isFalse(validation.isValidEmail(12578));
				assert(!validation.isValidEmail("Hermione Granger"));
			})
		});
	})