var express = require('express');
var app = express();
var fs = require("fs");
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
app.use(bodyParser.json());

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
	
	contacts.push(contact);
	res.status(201).json(contact);
})

var listener = app.listen(3000);

/* Export the server for testing with Supertest. */
module.exports.server = app;

/* Export the listener so that it can be closed by a file importing this file. */
module.exports.listener = listener;