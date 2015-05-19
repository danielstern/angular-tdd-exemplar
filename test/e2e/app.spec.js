describe('adding a contact', function() {
	
	it('should add a contact and not throw an error',function(done){
		browser.get('http://localhost:8080');
		element(by.model('contact.name')).sendKeys('davos seaworth');
		element(by.model('contact.email')).sendKeys('davos@onionknig.ht');
		element(by.id('submitNewContact')).click();	
		browser.sleep(1000);
		element.all(by.repeater('contact in contacts'))
		.then(function(contacts){
			expect(contacts.length).toEqual(4);
			done();	
		});
	});
	
  it('should display the contacts name correctly', function(done) {		
		element.all(by.repeater('contact in contacts'))
		.then(function(contacts){
			var newest = contacts[contacts.length-1];
			var name = newest.element(by.tagName('h4'))
				.element(by.className('contact-name'));
			expect(name.getText()).toEqual("Davos Seaworth");
			done();
		});
  });
	
	it('should display the contacts avatar properly', function(done) {		
		element.all(by.repeater('contact in contacts'))
		.then(function(contacts){
			var newest = contacts[contacts.length-1];
			var avatar = newest.element(by.tagName('h4'))
				.element(by.className('avatar'));
			expect(avatar.getText()).toEqual("D");			
		});
		done();
  });
	
	it("should throw an error if I try to add the same contact again",function(){
	
	});
});