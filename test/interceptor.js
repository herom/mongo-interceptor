var assert = require('chai').assert;
var interceptor = require('../lib/interceptor');

describe('MongoDB Interceptor (Intrusion Detection) Tests', function () {
    it('should replace mongodb operators in strings', function () {
        var info = interceptor.check('username[$gt]=&password[$lt]=');

        assert.isTrue(info.isIntrusion, 'could not detect the intrusion!');
        assert.equal(info.injections.length, 2, 'could not detect all of the injections!');
        assert.equal(info.escaped.indexOf('$'), -1, 'did not replace the injections!');
    });

    it('should replace mongodb operators in an array of strings', function () {
        var intrusionStrings = ['username[$gt]=&password[$lt]=', '{$elemMatch: {$gt: {id: 0}}}'];
        var info = interceptor.check(intrusionStrings);

        assert.isArray(info, 'an array is not processed as expected');
        assert.equal(info.length, intrusionStrings.length, 'not all strings were checked');
        assert.isTrue(info[1].isIntrusion, 'the second intrusion was not detected');
    });

    it('should replace mongodb operators in object values - keys should not be processed', function () {
        var info = interceptor.check({
            a: 'username[$gt]=&password[$lt]=',
            b: '{$elemMatch: {$gt: {id: 0}}}',
            $gt: 27
        });

        assert.isObject(info.a, 'the object properties are not processed as expected');
        assert.isObject(info.b, 'the object properties are not processed as expected');
        assert.isDefined(info.$gt, 'the object keys are processed even if they should not be');
    });

    it('should replace mongodb operators even if they are deep-nested in objects', function () {
        var intrusionObj = {
            valid: {
                $or: [{'address.zip': {$gte: 18, $lte: 50}}]
            },
            intrusion: {
                a: {
                    b: {
                        c: ['username[$gt]=&password[$lt]=', '{$elemMatch: {$gt: {id: 0}}}'],
                        d: 3
                    }
                }
            }
        };
        var info = interceptor.check(intrusionObj);

        assert.isObject(info.valid, 'the object properties are not processed as expected');
        assert.isArray(info.valid.$or, 'the object keys are processed even if they should not be');
        assert.isArray(info.intrusion.a.b.c, 'deep-nested object properties are not processed as expected');
        assert.isTrue(info.intrusion.a.b.c.every(function (result) {
            return result.isIntrusion;
        }), 'deep-nested intrusions are not detected!');
    });

    it('combines the "separator" with a counter, so that it\'s easier to follow on big intrusion strings', function () {
        var longStr = 'I wonder $lte if $regex any intrusion $exists within this $text, $where $this is hard';
        var info = interceptor.check(longStr);

        assert.equal(info.injections.length, 5, 'not all intrusions where detected');
        assert.isTrue(info.escaped.indexOf('_4') !== -1, 'the intrusion was not detected');
        assert.isTrue(info.escaped.indexOf('_5') === -1, 'the $this is a false positive!');
        assert.isTrue(info.escaped.indexOf('$this') !== -1, 'the $this is a false positive!')
    });

    it('setOperatorReplacer() should accept a "valid" custom replacer string', function () {
        interceptor.setOperatorReplacer('#');

        var info = interceptor._checkStr('this is a $comment replacer');

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