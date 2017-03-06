var assert = require('chai').assert;
var operators = require('../lib/operators');

describe('MongoDB Operators Lib Tests', function () {
  it('should provide an array of unique mongodb operators', function () {
    var operatorsCount = operators.operators.length;
    var ops = [];

    operators.operators.forEach(function checkOperatorName (operator) {
      if (ops.indexOf(operator) === -1) {
        ops.push(operator);
      }
    });

    chai.equal(ops.length, operatorsCount, 'the operators array contains duplicate operator-names');
  });

  it('should detect a mongodb operator string',function () {
    chai.isTrue(operators.isOperator('$where'), 'the $where operator was not detected!');
  });

  it('should reject a "false-positive" string which just starts with a "$"-sign', function () {
    chai.isNotTrue(operators.isOperator('$test'), 'the $test operator is a false positive!');
  });

  it('should reject operator names which don\'t start with a "$"-sign', function () {
    chai.isNotTrue(operators.isOperator('in'), 'the word "in" is a false positive!');
  });
});