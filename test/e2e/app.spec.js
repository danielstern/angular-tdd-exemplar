describe('adding a contact', function() {
  it('should add the appropriate contact', function(done) {

		browser.get('http://localhost:8080');

    element(by.model('contact.name')).sendKeys('Davos');
		browser.sleep(3000);
    element(by.model('contact.email')).sendKeys('davos@onionknig.ht');
		element(by.id('submitNewContact')).click();
		
		
//		browser.sleep(3,function(){
			/* handy!*/

//    		expect(newest.getText()).toEqual('Hello Julie!');
//		});
		
		var contacts = element.all(by.repeater('contact in contacts'));
		var newest = contacts[contacts.length-1];


		
  });
});