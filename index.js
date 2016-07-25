'use strict'

var invariant = require('invariant')

var lodashFunctions = [
  'isMap', 'isNaN', 'isNil', 'isSet', 'isDate', 'isNull', 'isArray', 'isEmpty', 'isEqual', 'isError',
  'isMatch', 'isBuffer', 'isFinite', 'isLength', 'isNative', 'isNumber', 'isObject', 'isRegExp',
  'isString', 'isSymbol', 'isBoolean', 'isElement', 'isInteger', 'isWeakMap', 'isWeakSet', 'isFunction',
  'isArguments', 'isArrayLike', 'isEqualWith', 'isMatchWith', 'isUndefined', 'isObjectLike',
  'isTypedArray', 'isArrayBuffer', 'isPlainObject', 'isSafeInteger', 'isArrayLikeObject'
]

var messages = {}

messages._default = 'Expecting %s to be %s, got %s.'
messages.isEqual = messages.isEqualWith = 'Expecting %s to be equal to %s, got %s.'
messages.isMatch = messages.isMatchWith = 'Expecting %s to match %s.'

var fns = lodashFunctions.reduce(function (obj, fn) {
  var is = require('lodash.' + fn.toLowerCase())
  var expectation = fn.replace('is', '').split(/(?=[A-Z])/).join(' ').toLowerCase()
  var message = messages[fn] || messages._default

  obj[fn] = function (name, two, three, four) {
    return invariant.apply(invariant, [
      is.apply(is, [two, three]),
      message,
      name,
      expectation,
      three ? String(two).toString() : typeof two,
      four
    ])
  }

  return obj
}, {})

module.exports = fns

// Export for tests
module.exports.messages = messages
module.exports.fns = lodashFunctions
