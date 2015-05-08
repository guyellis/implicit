'use strict';

var walker = require('walker');

// options:
// - directory: The directory to start the search from
// - excludeDir: An array of directories to exclude
// - includeFiles: An array of file patterns to include
// callback(err, files):
// - err - an error
// - an array of files
module.exports = function checkFiles(options, callback) {
  var files = [];
  var errors = [];
  walker(options.directory)
  .filterDir(function(dir) {
    if(options.filter && options.filter.indexOf(dir) >= 0) {
      console.warn('Skipping ' + dir + ' and children');
      return false;
    }
    return true;
  })
  .on('entry', function(entry /*, stat*/) {
    console.log('Got entry: ' + entry);
  })
  .on('dir', function(dir /*, stat*/) {
    console.log('Got directory: ' + dir);
  })
  .on('file', function(file) {
    console.log('Got file: ' + file);
    files.push(file);
  })
  .on('symlink', function(symlink /*, stat*/) {
    console.log('Got symlink: ' + symlink);
  })
  .on('blockDevice', function(blockDevice /*, stat*/) {
    console.log('Got blockDevice: ' + blockDevice);
  })
  .on('fifo', function(fifo /*, stat*/) {
    console.log('Got fifo: ' + fifo);
  })
  .on('socket', function(socket /*, stat*/) {
    console.log('Got socket: ' + socket);
  })
  .on('characterDevice', function(characterDevice /*, stat*/) {
    console.log('Got characterDevice: ' + characterDevice);
  })
  .on('error', function(er, entry /*, stat*/) {
    console.log('Got error ' + er + ' on entry ' + entry);
    errors.push({
      err: er,
      entry: entry
    });
  })
  .on('end', function() {
    console.log('All files traversed.');
    if(errors.length > 0) {
      callback(errors, files);
    } else {
      callback(null, files);
    }
  });
};
