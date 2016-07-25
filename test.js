const test = require('tape')

const invariants = require('./index')

const fns = invariants.fns
const messages = invariants.messages

fns.forEach((fn) => {
  test(fn, (t) => {
    const message = messages[fn] || messages._default
    const expectation = fn.replace('is', '').split(/(?=[A-Z])/).join(' ').toLowerCase()
    const args = ['name', 1, 2]

    if (fn === 'isNumber') {
      args[1] = ''
    } else if (fn === 'isEmpty') {
      args[1] = [1]
    } else if (fn === 'isMatch') {
      args[1] = { name: 'sam' }
      args[2] = { name: 'tom' }
    } else if (fn === 'isFinite' || fn === 'isSafeInteger') {
      args[1] = Infinity
    } else if (fn === 'isLength') {
      args[1] = null
    } else if (fn === 'isInteger') {
      args[1] = 1.337
    } else if (fn === 'isMatchWith') {
      args[1] = { name: 'sam' }
      args[2] = { name: 'tom' }
      args[3] = () => false
    }

    const expect = ['name', expectation, args[1]]

    try {
      invariants[fn](...args)
    } catch (err) {
      t.equal(err.message, message.replace(/%s/g, () => expect.shift()))
      t.end()
    }
  })
})
