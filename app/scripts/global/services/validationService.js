angular.module('AddressBook.Global')
.service("validationService",function(){
	
	function isValidContact(contact){
		if (!contact) return null;
		
		var valid = true;
		
		if (!contact.name || contact.name && !isValidName(contact.name)) valid = false;
		if (!contact.email || contact.email && !isValidEmail(contact.email)) valid = false;
		if (contact.age && !isValidAge(contact.age)) valid = false;
		if (contact.occupation && !isValidOccupation(contact.occupation)) valid = false;
		
		return valid;
	}
	
	function isValidName(name){
		return typeof name === 'string' && name.length > 1;
	};
	
	function isValidOccupation(occupation){
		return isValidName(occupation);
	}
	
	function isValidEmail(email){
		/* this is a great function to write tests for, since it certainly isn't clear
		 by reading it if it works correctly. */
		return 	/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
	};
	
	function isValidAge(age){
		return typeof age === 'number' && age >= 18;
	};
	
	return {
		isValidName:isValidName,
		isValidContact:isValidContact,
		isValidAge:isValidAge,
		isValidEmail:isValidEmail,
	}
});