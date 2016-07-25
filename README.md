# lodash-invariants

> Invariants for lodash.is* methods

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/lodash-invariants"><img alt="npm version" src="https://badge.fury.io/js/lodash-invariants.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

```sh
import invariants from 'lodash-invariants'
```

## Import

```js
// ES2015
import invariants from 'lodash-invariants'

// CommonJS
var invariants = require('lodash-invariants')
```

## API

### `invariants.is*(name, ...args)`

- __name__ {String} Name of what is being inspected 
- __...args__ {\*} Arguments to pass to the `lodash.is*` method

Throws an Invariant Exception if the `lodash.is*` method returns false.

## Example

```js
import invariants from 'lodash-invariants'

function application (options) {
  invariants.isString('options.url', options.url)
}

application({ url: 123 }) //=> Invariant Exception: Expecting options.url to be string, got number.
```

If you have your own invariants, merge `lodash-invariants` into them:

```js
// ./invariants.js
import invariant from 'invariant'
import lodashInvariants from 'lodash-invariants'

export default Object.assign({}, {
  customInvariant: (...args) => {
    invariant(...args)
  }
}, lodashInvariants)
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`lodash-invariants` was created by [Sam Gluck](https://twitter.com/sdgluck) and is released under the MIT license.
