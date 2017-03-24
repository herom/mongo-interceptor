var assert = require('chai').assert;
var instance = require('../index');
var actualVersion = require('../package.json').version;

describe('Tool (main) function test', function () {
    it('should provide the `check()` function', function () {
        assert.isFunction(instance.check, 'The `check()` function is not provided!');
    });

    it('should be possible to invoke the `check()` function without scoping issues due to recursion, etc.', function () {
        var checkFn = instance.check.bind(instance, {a: 'I am a $elemMatch intrusion'});
        assert.doesNotThrow(checkFn, 'It smells like `this`-usage!');
    });

    it('should provide the `setReplacer()` function', function () {
        assert.isFunction(instance.setReplacer, 'The `setReplacer()` function is not provided!');
    });

    it('should be possible to invoke the `setReplacer()` function without scoping issues due to recursion, etc.', function () {
        var setReplacerFn = instance.setReplacer.bind(instance, '_');
        assert.doesNotThrow(setReplacerFn, 'It smells like `this`-usage');
    });

    it('should provide the `VERSION` property', function () {
        assert.isString(instance.VERSION);
    });

    it('should provide the actual version through it\'s `VERSION` property', function () {
        assert.equal(instance.VERSION, actualVersion, 'The provided `VERSION` doesn\'t correlate with the package.json!');
    });
});
