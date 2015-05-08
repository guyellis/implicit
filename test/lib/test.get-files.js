'use strict';

var _ = require('lodash');
var assert = require('assert');
var getFiles = require('../../lib/get-files');
var path = require('path');

describe('File checking', function() {

  it('should get a list of .js files in this project', function(done){
    var options = {
      directory: path.join(__dirname, '../..'),
      excludeDir: ['node_modules', 'coverage'],
      includeFiles: ['.js']
    };

    getFiles(options, function(err, files){
      assert(!err);
      assert(_.isArray(files));
      assert(files.length > 0);

      // Check that none of the files or folders are hidden
      files.forEach(function(file){
        var parts = file.split('/');
        parts.forEach(function(part){
          assert(!_.startsWith(part, '.'));
        });
      });

      // Check that all files end in .js
      files.forEach(function(file){
        assert(_.endsWith(file, '.js'));
      });

      assert(files.length > 10);

      done();
    });

  });

});
