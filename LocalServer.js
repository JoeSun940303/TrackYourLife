var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port     = process.env.PORT || 8080;


var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/accountmanage';
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
//app.use(express.bodyParser());

app.post('/register', function(req, res) {
  // Use connect method to connect to the Server
  if(req.body.invitecode!="SYFJZTBL19940303"){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Wrong Invatation Code");
    res.end();
  }


  else{
  MongoClient.connect(url, function (err, db) {
      assert.equal(err,null);
      console.log("Connected correctly to server");
          var collection = db.collection("account");
          collection.insertOne({name: req.body.accountname,
                                password: req.body.password,
                                email:req.body.email,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                birthday:req.body.birthday}, function(err,result){
          assert.equal(err,null);
          console.log("After Insert:");
          console.log(result.ops);
                  collection.find({}).toArray(function(err,docs){
              assert.equal(err,null);
              console.log("Found:");
              console.log(docs);
              assert.equal(err,null);
              db.close();
              res.sendFile( path.join( __dirname, '', 'registersuccess.html' ));
          });
        });
  });

}
});


app.post('/signin', function(req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
      assert.equal(err,null);
      console.log("Connected correctly to server");
          var collection = db.collection("account");
          var query = { name: req.body.accountname, password:req.body.password};
          collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result.length==1){
              res.sendFile( path.join( __dirname, '', 'loginsuccess.html' ));
              //res.end();
            }
            else{
              res.sendFile( path.join( __dirname, '', 'loginfail.html' ));
              //res.end();
            }
            db.close();
            assert.equal(err,null);


          });
  });
});


app.listen(port, function() {
  console.log('Server running ');
});
