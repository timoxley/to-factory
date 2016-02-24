'use strict';

var _global = typeof window !== 'undefined' ? window : global;
function toFactory(Class) {
  var Factory = function Factory() {
    var result = undefined;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof this !== 'undefined' && this !== _global) {
      result = Class.call.apply(Class, [this].concat(args));
    } else {
      result = new (Function.prototype.bind.apply(Class, [null].concat(args)))();
    }
    return result;
  };
  Factory.__proto__ = Class;
  Factory.prototype = Class.prototype;
  return Factory;
}

module.exports = toFactory;

