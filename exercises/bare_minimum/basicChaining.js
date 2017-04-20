/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var getProfiles = require('./promisification.js');
var getGitHubProfileAsync = getProfiles.getGitHubProfileAsync;

var pluckLines = require('./promiseConstructor.js');
var pluckFirstLineFromFileAsync = pluckLines.pluckFirstLineFromFileAsync;

var fetchProfileAndWriteToFile = (readFilePath, writeFilePath) => {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      if (!username) {
        throw new Error('user doesnt exist');
      }
      return username;
    })
    .then((username) => {
      return getGitHubProfileAsync(username);
    })
    .then((profile) => {
      profile = JSON.stringify(profile);
      fs.writeFileSync(writeFilePath, profile);
    });
    //catch the errors?
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
