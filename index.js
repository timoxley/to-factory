function toFactory(Class) {
  const Factory = function(...args) {
    return new Class(...args)
  }
  Object.setPrototypeOf ? Object.setPrototypeOf(Factory, Class) : (Factory.__proto__ = Class)
  Factory.prototype = Class.prototype
  return Factory
}

module.exports = toFactory
