//var express = require("express");
//var app = express();

var fs = require("fs");
var multer = require("multer");
var upload = multer({dest: "./uploads"});

var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/images");
//var conn = mongoose.connection;
var conn = mongoose.createConnection('mongodb://localhost:27017/images');

var gfs;
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/dishes';

module.exports = function(app) {
  //console.log('Enter meal.js successfully');
  conn.once("open", function(){
    gfs = Grid(conn.db);
/**
    app.get("/", function(req,res){
      //renders a multipart/form-data form
      res.render("home");
    });
**/

  //second parameter is multer middleware.
  app.post("/fileupload", upload.single("avatar"), function(req, res, next){
    //console.log('Post /fileupload successfully');

    //Create a gridfs-stream into which we pipe multer's temporary file saved in uploads.
    //After which we delete multer's temp file.
    //Save the images into database images and table fs.files.
    var writestream = gfs.createWriteStream({
        filename: req.file.originalname,
    });

    //Save the relevant dish info into database dishes and table dish.
    MongoClient.connect(url, function (err, db) {
        assert.equal(err,null);
        var collection = db.collection("dish");
        collection.insertOne(
          {
          filename: req.file.originalname,
          dishdate: req.body.date,
          dishname: req.body.dishname,
          calories: req.body.calories,
          feedback: req.body.feedback
          },
          function(err,result){
            assert.equal(err,null);
          }
        );
    });

    //pipe multer's temp file /uploads/filename into the stream we created above.
    //On end deletes the temporary file.
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
  });

  //sends the image we saved by filename.
  app.get("/fileupload/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  //deletes the image
  app.get("/fileupload/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });

});

//app.set("view engine", "ejs");
//app.set("views", "./views");

/**
app.listen(8080, function() {
  console.log('Server running');
});
**/
};
