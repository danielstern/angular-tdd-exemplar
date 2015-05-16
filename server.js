var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());

app.get('/',function(req,res){
	res.send("HI");
})

app.listen(3000);