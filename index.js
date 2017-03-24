var version = require('./package.json').version;
var interceptor = require('./lib/interceptor');

module.exports = {
    VERSION: version,

    check: interceptor.check,

    setReplacer: interceptor.setOperatorReplacer
};
