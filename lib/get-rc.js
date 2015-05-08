'use strict';

var constants = require('./constants');
var firstFileContents = require('./first-file-contents');
var path = require('path');
var debug = require('debug')('implicit:get-rc');

module.exports = function(startDirectory, callback) {
  firstFileContents([
    path.join(startDirectory, constants.rcFileName),
    path.join(__dirname, constants.defaultRCFileName)
  ], function(err, contents){
    debug('typeof contents: %s', typeof contents);
    debug('contents: %s', contents);

    return callback(err, JSON.parse(contents));
  });

};
