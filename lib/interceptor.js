var mongoOperators = require('./operators');
var operatorRegEx = new RegExp(/(\$\w+)/g);
var replacer = '_';
var invalidReplaceChars = ['$'];

module.exports = {
  checkStr: function checkStr (str) {
    var strType = typeof str;
    var injections = [];
    var escaped;

    if (strType === 'string') {
      escaped = str.replace(operatorRegEx, function (match) {
        if (mongoOperators.isOperator(match)) {
          injections.push(match);
          return replacer;
        }

        return match;
      });
    } else if (strType === 'number') {
      escaped = str;
    } else {
      throw new Error('<mongo-interceptor> Trying to escape a "' + strType + '"!', str);
    }

    return {
      escaped: escaped,
      injections: injections,
      isIntrusion: injections.length > 0
    }
  },

  setOperatorReplacer: function setOperatorReplacer (str) {
    if (typeof str !== 'string') {
      throw new Error('The operator replacer must be of type "string" - got "' + typeof str + '" instead!');
    }

    var strLength = str.length;


    if (strLength > 1) {
      str = str.trim();
    }

    if (invalidReplaceChars.indexOf(str) !== -1) {
      throw new Error('The replacement character "' + str + '" is invalid as it could harm the db safety!');
    } else if (mongoOperators.isOperator(str)) {
      throw new Error('The replacement string "' + str + '" is a mongodb-operator itself!');
    }

    replacer = str;
  }
};