var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/accountmanage';
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.post('/register', function(req, res) {
  // Use connect method to connect to the Server
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
              var infor = "Your account: "+ req.body.accountname
              + "\nyour password: " + req.body.password
              + "\nyour email: " + req.body.email
              + "\nyour firstname: " + req.body.firstname
              + "\nyour lastname: " + req.body.lastname
              + "\nyour birthday: " + req.body.birthday
              + "\nyour first question: " + req.body.Q1
              + "\nyour first answer: " + req.body.A1
              + "\nyour second question: " + req.body.Q1
              + "\nyour second answer: " + req.body.A1
              + "\nyour third question: " + req.body.Q1
              + "\nyour third answer: " + req.body.A1
              +"\nWe have received your info now you can log in";
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.write(infor);
              res.end();
          });
        });
  });
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
            db.close();
            assert.equal(err,null);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("we are seeking");
            res.end();

          });
  });
});

app.listen(8080, function() {
  console.log('Server running ');
});
