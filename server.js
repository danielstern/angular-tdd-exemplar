var express = require('express');
var app = express();
var fs = require("fs");
var guid = require("guid");
var Validation = require('./app/scripts/Validation.js');
var validation = new Validation();
var bodyParser = require('body-parser');
var cors = require('cors');

var contacts = JSON.parse(
	fs.readFileSync('db.json',"utf8")
).contacts;

function getContact(name){
	return contacts.filter(function(c){return c.name===name})[0];
}

app.use(cors());

app.get('/contacts',function(req,res,next){
	res.json(contacts);
	next();
});

app.get('/contacts/:name',function(req,res,next){
	var contact = getContact(req.params.name);
	if (contact){
		res.status(200);
	} else {
		res.status(404);
	}
	res.json(contact);
	next();
});

app.use(bodyParser.json());

app.post('/contacts/new',function(req,res,next){
	var contact = req.body;
	
	if (!validation.isValidContact(contact)){
		res.status(400)
			.send("This is not a valid contact.");
		next();
		return;
	};
	
	if (getContact(contact.name)){
		res.status(409)
			.send("Contact already exists.");
		next();
		return;
	}
//	next();
	
	res.status(500).send("Oops. A clown fell in the koi pond.");
//	console.log("added contact.",req.body);
//	res.header('Access-Control-Allow-Origin', '*');
//	contacts.push(req.body);
//	fs.writeFileSync('db.json',contacts,"utf8")
//	res.json(contacts);
})

var port = app.listen(3000);

module.exports.server = app;
module.exports.listener = port;