# to-factory

Convert classes into factory functions.

Allows ES6 classes to be instantiated with or without `new`.

## Example

### without `to-factory`

Must call a class with `new`, cannot call class as a function:

```js
class Person {
  constructor(name) {
    this.name = name
  }
}

new Person('alice') // ok
Person('bob') // TypeError: Cannot call a class as a function
```

### with `to-factory`

Call a class with `new` or as a function:

```js
// exact same Person class as above example

Person = toFactory(Person)

const personA = new Person('created with new')
console.log(personA.name) // => 'created with new'

const personB = Person('created without new')
console.log(personB.name) // => 'created without new'
```

Inheritance, etc all works as expected

```js
// Inheritance works as expected
class BigPerson extends Person {
  constructor(name) {
    super(name.toUpperCase())
  }
})

BigPerson = toFactory(BigPerson)

const bigPersonA = new BigPerson('created with new')
console.log(bigPersonA.name) // => 'CREATED WITH NEW'

const bigPersonB = BigPerson('created without new')
console.log(bigPersonB.name) // => 'CREATED WITHOUT NEW'
```

## License

MIT
