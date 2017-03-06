var assert = require('chai').assert;
var interceptor = require('../lib/interceptor');

describe('MongoDB Interceptor (Intrusion Detection) Tests', function () {
  it('should replace mongodb operators', function () {
    var info = interceptor.checkStr('username[$gt]=&password[$lt]=');

    assert.isTrue(info.isIntrusion, 'could not detect the intrusion!');
    assert.isEqual(info.injections.length, 2, 'could not detect all of the injections!');
    assert.isEqual(info.escaped.indexOf('$'), -1, 'did not replace the injections!');
  });

  it('should use the custom replacer if it is set', function () {
    interceptor.setOperatorReplacer('#');

    var info = interceptor.checkStr('this is a $comment replacer');

    assert.isEqual(info.escaped.indexOf('#'), 10, 'the previously set operator was not used!');
    assert.isEqual(info.escaped.indexOf('$'), -1, 'the operator was not removed!');
  });
});