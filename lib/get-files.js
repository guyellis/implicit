'use strict';

var files = require('./get-files-match-files');
// var files = require('get-files-walker');

// options:
// - directory: The directory to start the search from
// - excludeDir: An array of directories to exclude
// - includeFiles: An array of file patterns to include
// callback(err, files):
// - err - an error
// - an array of files
module.exports = function checkFiles(options, callback) {
  return files(options, callback);
};
