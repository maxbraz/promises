/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 * 
 * Given an array of github handles, searchCommonTagsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 * 
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib.js');
var promisify = require('../bare_minimum/promisification.js');
var getProfile = promisify.getGitHubProfileAsync;

// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
lib.setImageTaggerCredentials('xQkkg--DQ_QFMfOBDJErZUVvG3y6SUatm0-ZV_jQ', 'qzCUqqlC9Z1TN0Pynztu3mTPElUppOvCXtuF2XuR');

var searchCommonTagsFromGitHubProfiles = function (githubHandles) {
  return Promise.all(githubHandles.map(user => lib.getGitHubProfile(user)))
    .then(profilesArray => {
      console.log(profilesArray);
      profilesArray.map(profile => profile.avatarUrl);
    })
    .then(avatarUrls => {

      console.log(avatarUrls);

      console.log(avatarUrls.map(avatarUrl => lib.tagImage(avatarUrl, 'VI0OzRtl8kYHXBa4NBzZVfSq0WCQlj')));

      return avatarUrls.map(avatarUrl => lib.tagImage(avatarUrl, 'VI0OzRtl8kYHXBa4NBzZVfSq0WCQlj'));
    })
    .then(tagArrays => {
      console.log(tagArrays);
      lib.getIntersection(tagArrays);
    });
};

// Export these functions so we can unit test them
module.exports = {
  searchCommonTagsFromGitHubProfiles: searchCommonTagsFromGitHubProfiles
};
