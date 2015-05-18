var assert = chai.assert;
var expect = chai.expect;

describe("The proper filter...",function(){

	beforeEach(function(){
		module('AddressBook.Global');
		inject(function($injector){
			proper = $injector.get("$filter")("proper");
		});
	})

	it("should take any string and return that string in proper case (first letter of each word uppercase)",function(){
		expect(proper('danaerys')).to.equal("Danaerys");
		expect(proper('sour alyn')).to.equal("Sour Alyn");
	});

	it("should coerce a number into a string",function(){
			expect(proper(5323)).to.equal('5323');
			expect(proper(1236910)).to.equal('1236910');
			expect(proper(0x0eabbe)).to.equal('961470'); // no way that is so cool
	})

	it("should throw an error on any other value",function(){
		/* this is how to test for an error */;
		assert.throws(function(){ 	proper(undefined);  })
		assert.throws(function(){ 	proper({});  })
		assert.throws(function(){ 	proper([]);  })
	})
});