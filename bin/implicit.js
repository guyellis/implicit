#!/usr/bin/env node
'use strict';
var cli = require('../lib/cli');

cli.execute(function(err, exitCode){
  if(err) {
    console.log(err);
  }
  process.exit(exitCode); // eslint-disable-line no-process-exit
});

// process.on('exit', function() {
//   process.exit(exitCode); // eslint-disable-line no-process-exit
// });
