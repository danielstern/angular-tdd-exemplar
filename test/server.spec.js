var request = require('supertest');
var app = require('../server.js');

var server = app.server;
var listener = app.listener;

var chai = require('chai');
var expect = chai.expect;

describe("The Server",function(){
	describe("The contacts route",function(){
		it("should return a 200 when requesting contacts",function(done){
			request(server)
				.get('/contacts')
				.expect(200)
				.end(done);
		});
		it("should return an array when requesting contacts",function(done){
			request(server)
				.get('/contacts')
				.end(function(req,res){
					expect(res.body).to.be.an('array');
					done();
				});
		});
		
		describe("Each contact",function(){	
			
			it('should have a name that is a string',	function(done){
				request(server)
				.get('/contacts')
				.end(function(req,res){
					var contacts = res.body;
					contacts.forEach(function(contact){
						expect(contact).to.have.property('name');
						expect(contact.name).to.be.a('string');
					});
					done();
				})			
			});					

//		it('should have a numeric age property',function(done){
//			contactService.getContacts()
//			.then(function(contacts){
//				contacts.forEach(function(contact){
//					expect(contact).to.have.property('age');
//					expect(contact.age).to.be.a('number');
//					done();
//				});
//			});
//			setTimeout($httpBackend.flush);
//		});
	})

	})
});


setTimeout(function(){
	listener.close();
	server.stop();
},1200)