/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var https = require('https');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = (filePath) => {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, result) => {
      if (err) { reject(err); }
      resolve(result);
    });
  })
  .then(result => result.split('\n')[0])
  .catch(err => { throw err; });

  return promise;
};

// This function should retrieve the status code of a GET request to `url`


var getStatusCodeAsync = (url) => {
  let promise = new Promise((resolve, reject) => {
    let req = https.request(url, (resp) => {
      resp.on('data', (data) => {
      });
      // console.log(data);
      resolve(resp);
    })
    .on('error', (e) => {
      // console.log(e);
      reject(e);
    });
    req.end();
  })
  .then(result => { console.log('********* '); return result.statusCode })
  .catch(err => { err.message = 'Invalid URI'; throw err; });

  return promise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
