var assert = require('chai').assert;
var interceptor = require('../lib/interceptor');

describe('MongoDB Interceptor (Intrusion Detection) Tests', function () {
  it('should replace mongodb operators', function () {
    var info = interceptor.checkStr('username[$gt]=&password[$lt]=');

    assert.isTrue(info.isIntrusion, 'could not detect the intrusion!');
    assert.equal(info.injections.length, 2, 'could not detect all of the injections!');
    assert.equal(info.escaped.indexOf('$'), -1, 'did not replace the injections!');
  });

  it('setOperatorReplacer() should accept a "valid" custom replacer string', function () {
    interceptor.setOperatorReplacer('#');

    var info = interceptor.checkStr('this is a $comment replacer');

    assert.equal(info.escaped.indexOf('#'), 10, 'the previously set operator was not used!');
    assert.equal(info.escaped.indexOf('$'), -1, 'the operator was not removed!');
  });

  it('setOperatorReplacer() should throw an Error if a non-string type of param is provided', function () {
    assert.throws(interceptor.setOperatorReplacer.bind(interceptor, 42, 'must be of type "string"'));
  });

  it('setOperatorReplacer() should throw an Error if the param is in the list of invalid chars', function () {
    assert.throws(interceptor.setOperatorReplacer.bind(interceptor, '$', 'is invalid as it could harm the db safety'));
  });

  it('setOperatorReplacer() should throw an Error if the param is a mongodb-operator', function () {
    assert.throws(interceptor.setOperatorReplacer.bind(interceptor, '$BITSANYSET', 'is a mongodb-operator itself'));
  });
});