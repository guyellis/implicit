'use strict';

var _ = require('lodash');
var assert = require('assert');
var checkMemory = require('../../lib/check-memory');

describe('In memory checking', function() {

  it('should have an error #1', function(done){
    var source = 'var s = "string"\nvar x = 20 / s;';
    var result = checkMemory(source);
    assert(_.isArray(result));
    assert.equal(1, result.length);
    assert.equal(2, result[0].line);
    assert.equal(14, result[0].character);
    assert.equal('The right-hand side of an arithmetic operation ' +
    'must be of type \'any\', \'number\' or an enum type.', result[0].message);
    done();
  });

  it('should have an error #2', function(done){
    var source = 'var o = {a:1};\nif(Object.keys(o) === 1) {\nconsole.log(o);\n}';
    var result = checkMemory(source);
    assert(_.isArray(result));
    assert.equal(1, result.length);
    assert.equal(2, result[0].line);
    assert.equal(4, result[0].character);
    assert.equal('Operator \'===\' cannot be applied to types ' +
    '\'string[]\' and \'number\'.', result[0].message);
    done();
  });

});
