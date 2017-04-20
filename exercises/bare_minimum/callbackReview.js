/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
var https = require('https');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, cb) {
  fs.readFile(filePath, 'utf8', function(err, results) {
    if (err) {
      cb(err);
    }
    cb(null, results.split('\n')[0]);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, cb) {
  let req = https.request(url, function (resp) {
    resp.on('data', function (data) {
      console.log(data);
    });
    cb(null, resp.statusCode);
  });
  req.on('error', function (e) {
    e.message = 'Invalid URI';
    cb(e);
  });

  req.end();
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
