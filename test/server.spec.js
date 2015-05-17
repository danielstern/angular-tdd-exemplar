var request = require('supertest');
var server = require('../server.js');

describe("The Server",function(){
	describe("The contacts route",function(){
		it("should return a 200 when requesting contacts",function(done){
			request(server)
				.get('/contacts')
				.expect(200)
				.end(done);
		});
	})
})