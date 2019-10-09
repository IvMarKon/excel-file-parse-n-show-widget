var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

var server = http.createServer((req, res) => {
  var form = new formidable.IncomingForm();

  if (req.url === '/') {
    fs.readFile('./index.html', (error, page) => {
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
    form.parse(req, (err, fields, files) => {
      var oldpath = files.filetoupload.path;
      var newpath = `./upload/${files.filetoupload.name}`;

      if (err) throw err;

      fs.rename(oldpath, newpath, err => {
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
