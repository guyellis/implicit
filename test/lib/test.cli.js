'use strict';

var assert = require('assert');
var cli = require('../../lib/cli');

describe('CLI', function() {

  it('should run the happy path', function(done){
    this.timeout(5000);
    // The first 2 elements in process.argv are:
    // 1. node
    // 2. script to run
    // So we are faking these for the test and they can be
    // any values. This allows the process-params function
    // to pickup parameters 3 and beyond.
    process.argv = ['dummy', 'dummy', '-d', __dirname];

    cli.execute(function(err, exitCode){
      assert(!err);
      assert.equal(exitCode, 0);
      done();
    });

  });

});
