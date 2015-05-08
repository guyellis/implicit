'use strict';

var async = require('async');
var checkMemory = require('./check-memory');
var debug = require('debug')('implicit:cli');
var fs = require('fs');
var getFiles = require('./get-files');
var processParams = require('./process-params');

var cli = {
  execute: function(callback) {
    debug('Executing CLI');
    processParams(function(err, options){
      if(err) {
        return callback(err, 1);
      }
      if(options.done) {
        return callback(null, 0);
      }

      getFiles(options, function(err, files){
        if(err) {
          throw err;
        }
        var errors = false;
        // 2339: Property '<x>' does not exist on type '<y>'.
        // 2304: Cannot find name '<name>'.
        // 2346: Supplied parameters do not match any signature of call target.
        // 2350: Only a void function can be called with the 'new' keyword.
        var excludeCodes = [2339, 2304, 2346, 2350];
        async.each(files, function(file, cb) {
          var contents = fs.readFileSync(file, {encoding: 'utf-8'});
          var results = checkMemory(contents);
          if(results.length > 0) {
            results.forEach(function(result){
              // TODO: Exclude below from compiler options
              if(excludeCodes.indexOf(result.code) === -1) {
                errors = true;
                var log = file.replace(options.directory + '/', '') + '(' + result.line +
                  ':' + result.character + ') : error TS' + result.code + ' : ' + result.message;
                console.log(log);
              }
            });
          }
          cb();
        }, function(err){
          if(err) {
            throw err;
          }
        });

        return callback(null, errors ? 1 : 0);
      });
    });
  }
};

module.exports = cli;
