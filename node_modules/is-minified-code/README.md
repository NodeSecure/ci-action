# is-minified-code

Check if a piece of JS/CSS code is minified. Tested on the 10k most popular [jsDelivr](https://www.jsdelivr.com) packages.

## Installation

```bash
$ npm install is-minified-code
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/is-minified-code@1.1.0"></script>
```

## Usage

```js
const isMinified = require('is-minified-code'); // or window.isMinified

isMinified('/* code */'); // => true/false
```

## License
Copyright (c) 2017 Martin Kolárik. Released under the MIT license.
