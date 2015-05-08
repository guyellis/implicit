'use strict';

var _ = require('lodash');
var async = require('async');
var constants = require('./constants');
var debug = require('debug')('implicit:process-params');
var fs = require('fs');
var getIgnore = require('./get-ignore');
var getRC = require('./get-rc');
var help = require('./help');
var path = require('path');

var options = {
  done: true
};

module.exports = function(callback) {
  var argv = require('minimist')(process.argv.slice(2));
  debug('args: %o', argv);
  var directory = process.cwd();
  debug('directory: %s', directory);

  if(argv.help || argv.h) {
    debug('Help wanted');
    help();
    return callback(null, options);
  }

  if(argv.version || argv.v) {
    debug('Version wanted');
    console.log(require('../package.json').version);
    return callback(null, options);
  }

  if(argv.directory || argv.d) {
    directory = argv.directory || argv.d;
    if(!_.startsWith(directory, '/')) {
      directory = path.join(process.cwd(), directory);
    }
    debug('directory changed: %s', directory);
  }

  if(argv._.indexOf('init') >= 0) {
    debug('Initialize ignore and rc files');

    var files = [{
      target: constants.ignoreFileName,
      source: constants.defaultIgnoreFileName
    }, {
      target: constants.rcFileName,
      source: constants.defaultRCFileName
    }];

    async.each(files, function(file, cb){
      var fullTarget = path.join(directory, file.target);
      if (fs.existsSync(fullTarget)) {
        console.log('Not creating ' + file.target + ' because it already exists.');
      } else {
        var defaultContents = fs.readFileSync(path.join(__dirname, file.source));
        fs.writeFileSync(fullTarget, defaultContents);
        console.log('Created ' + file.target + ' with default contents.');
      }
      cb();
    }, function(err){
      if(err) {
        console.log(err);
      }
    });
    return callback(null, options);
  }

  getIgnore(directory, function(err, ignores){
    if(err) {
      return callback(err);
    }
    getRC(directory, function(err, rc){
      if(err) {
        return callback(err);
      }
      var options = {
        done: false,
        directory: directory,
        excludeDir: ignores.map(function(item){ return _.trim(item, '/'); }),
        includeFiles: rc.fileEnds
      };
      return callback(err, options);
    });
  });
};
