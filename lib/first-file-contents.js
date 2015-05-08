'use strict';

var async = require('async');
var fs = require('fs');
var debug = require('debug')('implicit:first-file-contents');

// Reads and returns the contents of the first
// file in the fileNames array that it finds
module.exports = function(fileNames, callback) {
  debug('fileNames: %o', fileNames);
  var contents;
  async.detectSeries(
    fileNames,
    fs.exists,
    function(result){
      debug('result: %s', result);
      contents = fs.readFileSync(result, 'utf8');
      debug('contents: %s', contents);
      return callback(null, contents);
    });
};
