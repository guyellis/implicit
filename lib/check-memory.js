'use strict';

var fs = require('fs');
var path = require('path');
var ts = require('typescript');

function transform(contents, libSource, compilerOptions) {
  compilerOptions = compilerOptions || {};
  // Generated outputs
  var outputs = [];
  // Create a compilerHost object to allow the compiler to read and write files
  var compilerHost = {
      getSourceFile: function (filename) {
        if (filename === 'file.ts') {
          return ts.createSourceFile(filename, contents, compilerOptions.target, '0');
        }
        if (filename === 'lib.d.ts') {
          return ts.createSourceFile(filename, libSource, compilerOptions.target, '0');
        }
        return undefined;
      },
      writeFile: function (name, text, writeByteOrderMark) {
        outputs.push({ name: name, text: text, writeByteOrderMark: writeByteOrderMark });
      },
      getDefaultLibFilename: function () { return 'lib.d.ts'; },
      useCaseSensitiveFileNames: function () { return false; },
      getCanonicalFileName: function (filename) { return filename; },
      getCurrentDirectory: function () { return ''; },
      getNewLine: function () { return '\n'; }
  };
  // Create a program from inputs
  var program = ts.createProgram(['file.ts'], compilerOptions, compilerHost);
  // Query for early errors
  var errors = program.getDiagnostics();
  // Do not generate code in the presence of early errors
  if (!errors.length) {
    // Type check and get semantic errors
    var checker = program.getTypeChecker(true);
    errors = checker.getDiagnostics();
    // Generate output
    checker.emitFiles();
  }

  return errors.map(function (e) {
    var lineAndCharacter = e.file.getLineAndCharacterFromPosition(e.start);
    return {
      line: lineAndCharacter.line,
      character: lineAndCharacter.character,
      message: e.messageText,
      code: e.code
    };
  });
}

// Calling our transform function using a simple TypeScript variable declarations,
// and loading the default library like:
var libFile = path.join(path.dirname(require.resolve('typescript')), 'lib.d.ts');
var libSource = fs.readFileSync(libFile).toString();

module.exports = function checkMemory(source) {
  return transform(source, libSource, {});
};
