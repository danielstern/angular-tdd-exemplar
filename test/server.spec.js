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
			it("should return 400 if the contact is not valid",function(done){
				request(server)
					.post('/contacts/new')
					.send({
						name:"Gary",
						email: undefined
					})
					.expect(400)
					.end(done);
			});			
			it("should return a 409 conflict if there is already a contact with the same name",function(done){
				request(server)
					.post('/contacts/new')
					.send({
						"name":"Jon Snow",
						"age":18,
						"occupation":"Lord Commander of the Wall",
						"email":"jon@nightswatch.wl"
					})
					.expect(409)
					.end(done);
			
			});			
			it("should add the contact to the database if it is valid");			
		});
		
		describe("deleting contacts",function(){	
			it('should return 404 if there is no such contact.');
			it("delete the contact from the database if its valid");			
		});
		
		describe("getting a single contact",function(){
			it("should return a contact if a valid name is provided",function(done){
				request(server)
				.get('/contacts/Jon Snow')
				.expect(200)
				.end(function(req,res){
					expect(res.body).to.deep.equal({
						"name":"Jon Snow",
						"age":15,
						"occupation":"Lord Commander of the Wall",
						"email":"jon@nightswatch.wl"
					});
					done();
				});
			});
			
			it("should return a 404 status if there is no such contact",function(done){
				request(server)
				.get('/contacts/Robb Stark')
				.expect(404)
				.end(done);
			})
		})
	});					
})


setTimeout(function(){
	listener.close();
	server.stop();
},1200)