// taken from https://docs.mongodb.com/manual/reference/operator/query/
var MONGO_OPERATORS = {
  comparison: ['eq', 'gt', 'gte', 'lt', 'lte', 'ne', 'in', 'nin'],
  logical: ['or', 'and', 'not', 'nor'],
  element: ['exists', 'type'],
  evaluation: ['mod', 'regex', 'text', 'where'],
  geospatial: ['geoWithin', 'geoIntersects', 'near', 'nearSphere'],
  array: ['all', 'elemMatch', 'size'],
  bitwise: ['bitsAllSet', 'bitsAnySet', 'bitsAllClear', 'bitsAnyClear'],
  comments: ['comment'],
  projection: ['elemMatch', 'meta', 'slice']
};

var MONGO_OPERATOR_LIST = [];

for (var type in MONGO_OPERATORS) {
  if (MONGO_OPERATORS.hasOwnProperty(type)) {
    var operators = MONGO_OPERATORS[type] || [];

    operators.forEach(function (operator) {
      var combinedOperator = '$' + operator;

      if (MONGO_OPERATOR_LIST.indexOf(combinedOperator) === -1) {
        MONGO_OPERATOR_LIST.push(combinedOperator);
      }
    });
  }
}

module.exports = {
  operators: MONGO_OPERATOR_LIST,

  isOperator: function checkOperatorStr (str) {
    // dumb string conversion
    str = str + '';

    return MONGO_OPERATOR_LIST.indexOf(str.toLowerCase()) !== -1;
  }
};