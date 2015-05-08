'use strict';
var o = {
  a: 1
};

if(Object.keys(o) === 1) {
  console.log(o);
}

// Expected errors
module.exports = [{
  line: 6,
  character: 4,
  message: 'Operator \'===\' cannot be applied to types \'string[]\' and \'number\'.'
}];
