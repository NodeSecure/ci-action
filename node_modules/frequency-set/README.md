# FrequencySet
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/FrequencySet/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fraxken/FrequencySet/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/fraxken/FrequencySet)
![size](https://img.shields.io/github/languages/code-size/fraxken/FrequencySet)

A Set structure that keeps the frequency of occurrences.

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i frequency-set
# or
$ yarn add frequency-set
```

## Usage example

```js
const FrequencySet = require("frequency-set");

const MySet = new FrequencySet(["foo", "bar"]);
MySet.add("foo");
MySet.add("foo");
MySet.add("bar");

console.log([...MySet.entries()]); // [["foo", 3], ["bar", 2]]

const clone = new FrequencySet(MySet);
console.log(clone);
```

## API
FrequencySet implements exactly the same interfaces as an ES6 [Set](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set). Except for the **@@ Iteration Symbol** and the **entries()**. Instead of returning the unique value as key and value, FrequencySet return the unique value as key and the count as value.

```js
const mySet = new FrequencySet(["foo", "foo", "bar"]);

for (const [uniqueValue, count] of mySet) {
    console.log([uniqueValue, count]); // [foo, 2] and [bar, 1]
}
```

Also the add method has been extended with a additional `count` argument witch take a number.
```js
const mySet = new FrequencySet().add("foo", 10);

console.log(mySet.toJSON()); // ["foo", 10]
```

### toJSON()
FrequencySet implement a custom toJSON() method which will allow an automatic transformation into JSON.

```js
const mySet = new FrequencySet(["foo", "foo", "bar"]);

console.log(mySet.toJSON()); // [foo, 2] and [bar, 1];
```

The toJSON method does not take into account **functions** and **objects**.

## License
MIT
