var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('./index.html', function(error, page) {
      if (error) {
        res.writeHead(404);
        res.write('404. Page Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(page);
      }
      res.end();
    });
  } else if (req.url === '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './upload/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function(err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('404. Page Not Found');
    res.end();
  }
});

server.listen(3000);
