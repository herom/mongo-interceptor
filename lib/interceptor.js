var mongoOperators = require('./operators');
var operatorRegEx = new RegExp(/(\$\w+)/g);
var replacer = '_';

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
    replacer = str;
  }
};