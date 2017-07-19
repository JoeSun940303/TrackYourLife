var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var os = require('os');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  var infor = "Your account: "+ req.body.accountname
  + "\nyour password: " + req.body.password
  + "\nyour email: " + req.body.email
  + "\nyour firstname: " + req.body.firstname
  + "\nyour lastname: " + req.body.lastname
  + "\nyour birthday: " + req.body.birthday
  + "\nyour first question: " + req.body.Q1
  + "\nyour first answer: " + req.body.A1
  +"\n We have received your info and will register it for you sonn";
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(infor);
  res.end();
});

app.listen(8080, function() {
  console.log('Server running ');
});
