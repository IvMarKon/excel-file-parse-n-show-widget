var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var Excel = require('exceljs');

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
      var workbook = null;

      if (err) throw err;

      fs.rename(oldpath, newpath, err => {
        if (err) throw err;

        workbook = new Excel.Workbook();
        workbook.xlsx.readFile(newpath).then(function () {
          var worksheet = workbook.getWorksheet(1);

          worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            console.log(
              'Row ' + rowNumber + ' = ' + JSON.stringify(row.values)
            );
          });
        });

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
