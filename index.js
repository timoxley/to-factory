const _global = typeof window !== 'undefined' ? window : global;
function toFactory(Class) {
  const Factory = function(...args) {
    let result;
    if (typeof this !== 'undefined' && this !== (_global)) {
      result = Class.call(this, ...args);
    } else {
      result = new Class(...args)
    }
    return result;
  }
  Factory.__proto__ = Class
  Factory.prototype = Class.prototype
  return Factory
}

module.exports = toFactory
