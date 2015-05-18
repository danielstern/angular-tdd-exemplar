describe('adding a contact', function() {
	
	it('should add a contact and not throw an error',function(){
		browser.get('http://localhost:8080');
		element(by.model('contact.name')).sendKeys('Davos Seaworth');
		browser.sleep(1000);
		element(by.model('contact.email')).sendKeys('davos@onionknig.ht');
		browser.sleep(1000);
		element(by.id('submitNewContact')).click();	
		browser.sleep(1000);
		// to do... assert all is well?
	});
	
  it('should display the contacts name correctly', function(done) {		
		element.all(by.repeater('contact in contacts'))
		.then(function(contacts){
			browser.sleep(200);
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
			browser.sleep(200);
			var newest = contacts[contacts.length-1];
			var avatar = newest.element(by.tagName('h4'))
				.element(by.tagName('avatar'));
			expect(avatar.getText()).toEqual("");
			
			done();
		});
  });
	
	it("should throw an error if I try to add the same contact again");
});