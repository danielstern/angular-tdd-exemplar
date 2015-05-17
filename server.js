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

app.use(cors());

app.get('/contacts',function(req,res,next){
	res.json(contacts);
	next();
});

app.use(bodyParser.json());
//app.use(express.json());

app.post('/contacts/new',function(req,res,next){
	
	res.header('Access-Control-Allow-Methods', '*');
	res
		.status(403)
		.send(req.body);
	console.log(req.body);
//	console.log(req.data);
//	console.log(req.params);
	next();
	return;
//	var contact = req.body;
//	if (!validation.isValidContact(contact)){
//		res
//			.status(403)
//			.send("This is not a valid contact.",JSON.stringify(req.body));
//		return;
//	}
//	console.log("added contact.",req.body);
//	res.header('Access-Control-Allow-Origin', '*');
//	contacts.push(req.body);
//	fs.writeFileSync('db.json',contacts,"utf8")
//	res.json(contacts);
})

var port = app.listen(3000);

module.exports.server = app;
module.exports.listener = port;