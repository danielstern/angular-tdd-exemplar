var express = require('express');
var app = express();
var fs = require("fs");

app.get('/contacts',function(req,res){
	var data = JSON.parse(
		fs.readFileSync('db.json',"utf8")
	);
	
	res.header('Access-Control-Allow-Origin', '*');
	res.json(data.contacts);
})

app.listen(3000);