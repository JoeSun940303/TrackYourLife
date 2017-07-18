var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Your request is received");
    res.end();
}).listen(8080);
