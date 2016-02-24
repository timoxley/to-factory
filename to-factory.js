"use strict";

function toFactory(Class) {
  var Factory = function Factory() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
  };
  Factory.__proto__ = Class;
  Factory.prototype = Class.prototype;
  return Factory;
}

module.exports = toFactory;

