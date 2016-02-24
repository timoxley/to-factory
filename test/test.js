'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _tape2.default)('class instatiation', function (t) {
  var A = (0, _2.default)(function A(name) {
    _classCallCheck(this, A);

    this.name = name;
  });
  var withNew = new A('withNew');
  var withoutNew = A('withoutNew');
  t.ok(withNew, 'withNew is sane');
  t.ok(withNew instanceof A, 'withNew is instance of A');
  t.equal(withNew.name, 'withNew', 'withNew has instance property');

  t.ok(withoutNew, 'withoutNew is sane');
  t.ok(withoutNew instanceof A, 'withoutNew is instance of A');
  t.ok(withoutNew.name, 'withoutNew', 'withoutNew has instance property');
  t.end();
});

(0, _tape2.default)('proto methods', function (t) {
  var expected = Symbol();
  var A = (0, _2.default)(function () {
    function A() {
      _classCallCheck(this, A);
    }

    _createClass(A, [{
      key: 'test',
      value: function test() {
        return expected;
      }
    }]);

    return A;
  }());

  var withNew = new A();
  var withoutNew = A();
  t.equal(withNew.test(), expected, 'proto method with new');
  t.equal(withoutNew.test(), expected, 'proto method without new');
  t.end();
});

(0, _tape2.default)('static properties', function (t) {
  var expected = Symbol();

  var A = function A() {
    _classCallCheck(this, A);
  };

  A.property = expected;
  var B = (0, _2.default)(A);

  t.equal(B.property, expected, 'static property exists');
  t.end();
});

(0, _tape2.default)('direct inheritance', function (t) {
  var expected = Symbol();

  var A = function () {
    function A(name) {
      _classCallCheck(this, A);

      this.name = name;
    }

    _createClass(A, [{
      key: 'test',
      value: function test() {
        return expected;
      }
    }]);

    return A;
  }();

  A.property = expected;

  var B = (0, _2.default)(A);

  var C = (0, _2.default)(function (_A) {
    _inherits(C, _A);

    function C(name) {
      _classCallCheck(this, C);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(C).call(this, name.toUpperCase()));
    }

    _createClass(C, [{
      key: 'test2',
      value: function test2() {
        return _get(Object.getPrototypeOf(C.prototype), 'test', this).call(this);
      }
    }]);

    return C;
  }(A));

  t.equal(B.property, expected, 'static property exists');

  var withNew = new C('withNew');
  var withoutNew = C('withoutNew');

  t.equal(withNew.name, 'WITHNEW', 'withNew has instance property');
  t.equal(withoutNew.name, 'WITHOUTNEW', 'withoutNew has instance property');

  t.equal(withNew.test(), expected, 'withNew inherited proto method call');
  t.equal(withoutNew.test(), expected, 'withoutNew inherited proto method call');
  t.equal(withNew.test2(), expected, 'withNew inherited proto method call');
  t.equal(withoutNew.test2(), expected, 'withoutNew inherited proto method call');
  t.end();
});

(0, _tape2.default)('factory inheritance', function (t) {
  var expected = Symbol();

  var A = function () {
    function A(name) {
      _classCallCheck(this, A);

      this.name = name;
    }

    _createClass(A, [{
      key: 'test',
      value: function test() {
        return expected;
      }
    }]);

    return A;
  }();

  A.property = expected;

  var B = (0, _2.default)(A);

  var C = function (_B) {
    _inherits(C, _B);

    function C(name) {
      _classCallCheck(this, C);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(C).call(this, name.toUpperCase()));
    }

    _createClass(C, [{
      key: 'test2',
      value: function test2() {
        return _get(Object.getPrototypeOf(C.prototype), 'test', this).call(this);
      }
    }]);

    return C;
  }(B);

  var D = (0, _2.default)(C);

  var withNew = new D('withNew');
  var withoutNew = D('withoutNew');

  t.equal(withNew.constructor, C, 'withNew has the correct constructor');
  t.equal(withoutNew.constructor, C, 'withoutNew has the correct constructor');

  t.equal(withNew.name, 'WITHNEW', 'withNew has instance property');
  t.equal(withoutNew.name, 'WITHOUTNEW', 'withoutNew has instance property');

  t.equal(withNew.test(), expected, 'withNew inherited proto method call from A');
  t.equal(withoutNew.test(), expected, 'withoutNew inherited proto method call from A');
  t.equal(withNew.test2(), expected, 'withNew inherited proto method call from C');
  t.equal(withoutNew.test2(), expected, 'withoutNew inherited proto method call from C');
  t.end();
});

