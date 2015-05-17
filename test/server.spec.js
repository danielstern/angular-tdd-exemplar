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
		
		describe("Adding contacts",function(){	
			it("should return 403 if the contact is not valid",function(){
				debugger;
				request(server)
					.post('/contacts/new')
					.data({})
					.end(function(req,res){
				
					})
			});			
			it("should return some other kind of error if there is already a contact with the same name");			
			it("should add the contact to the database if it is valid");			
		});
		
		describe("deleting contacts",function(){	
			it('should return 404 if there is no such contact.');
			it("delete the contact from the database if its valid");			
		});
	});					
})


setTimeout(function(){
	listener.close();
	server.stop();
},1200)