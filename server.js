var express = require('express');
var app = express();
var fs = require("fs");

app.get('/',function(req,res){
	var data = JSON.parse(
		fs.readFileSync('db.json',"utf8")
	);
	
	res.json(data);
})

app.listen(3000);