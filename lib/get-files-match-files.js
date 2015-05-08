'use strict';

var _ = require('lodash');
var matchFiles = require('match-files');

// options:
// - directory: The directory to start the search from
// - excludeDir: An array of directories to exclude
// - includeFiles: An array of file patterns to include
// callback(err, files):
// - err - an error
// - an array of files
module.exports = function checkFiles(options, callback) {
  //You can filter by file and by directory.
  //If a directory is filtered files and directories under the
  //filtered directory will *not* be searched.

  function matchIncludeFiles(path){
    //paths are relative to the 'basepath' which is the initial
    //path set or the .basepath option given
    var result = false;
    options.includeFiles.forEach(function(pattern){
      if(_.endsWith(path, pattern)){
        result = true;
      }
    });
    if(_.startsWith(path, '.')) {
      result = false;
    }
    return result;
  }

  function excludeModuleDir(path){
    //Exclude all directories named module (and their children)
    // return !path.match(/\/module/);
    var result = true;
    options.excludeDir.forEach(function(pattern){
      if(_.endsWith(path, pattern)){
        result = false;
      }
      if(_.startsWith(path, '.')) {
        result = false;
      }
    });
    return result;
  }

  matchFiles.find(options.directory, {
    fileFilters: [matchIncludeFiles], //always an array of functions
    directoryFilters: [excludeModuleDir]
  }, function(err, files){
    callback(err, files);
  });
};
