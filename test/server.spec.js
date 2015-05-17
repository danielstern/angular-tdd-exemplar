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
				.expect(200)
				.end(function(req,res){
					expect(res.body).to.be.an('array');
					done();
				});
		});
	})
});

setTimeout(function(){
	listener.close();
	server.stop();
},1200)