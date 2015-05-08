'use strict';

var _ = require('lodash');
var constants = require('./constants');
var firstFileContents = require('./first-file-contents');
var path = require('path');
var debug = require('debug')('implicit:get-ignore');

module.exports = function(startDirectory, callback) {
  firstFileContents([
    path.join(startDirectory, constants.ignoreFileName),
    path.join(__dirname, constants.defaultIgnoreFileName)
  ], function(err, contents){
    if(err) {
      return callback(err);
    }

    debug(typeof contents);
    debug('contents: %o', contents);
    // _.remove:
    // Removes all elements from array that predicate returns
    // truthy for and returns an array of the removed elements.
    var ignores = _.remove(contents.split('\n'), function(line){
      return line && line.length > 0;
    });

    return callback(null, ignores);
  });
};
