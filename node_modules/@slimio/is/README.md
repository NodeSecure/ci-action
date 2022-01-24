# SlimIO IS
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/is/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/is.svg?style=flat)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/is/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/is?targetFile=package.json)
![dep](https://img.shields.io/david/SlimIO/is.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/is.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/SlimIO/is.svg?branch=master)](https://travis-ci.com/SlimIO/is)

Node.js JavaScript Type checker (Primitives, Objects, etc..)

Package heavily inspired by `@sindresorhus/is`. This package aims to work on Node.js (no browser support).

## Why

- Focus on type checking (no fancy feature).
- Focus on Node.js support.
- Come with a TypeScript definition (which works).
- Is concerned about being stable.

## Requirements
- Node.js v10 or higher.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/is
# or
$ yarn add @slimio/is
```

## Usage example

```js
const { strictEqual } = require("assert");
const is = require("@slimio/is");

strictEqual(is.bool(true), true);
strictEqual(is.string("hello"), true);
strictEqual(is.map(new Map()), true);
strictEqual(is.func(() => {}), true);
```

The `is` const namespace is a Plain JavaScript Object with a lot of exported methods (check the below API Documentation).

## API

All methods can be called as follow: `is.{methodName}`. All methods return a `boolean` value.

### Primitives

| method | example |
| --- | --- |
| string | `is.string("hello")` |
| number | `is.number(10)` |
| boolean | `is.boolean(true)` |
| bool | `is.bool(false)` |
| symbol | `is.symbol(Symbol("foo"))` |
| undefined | `is.undefined(undefined)` |
| bigint | `is.bigint(50n)` |
| nullValue | `is.nullValue(null)` |
| nullOrUndefined | `is.nullOrUndefined(null)` |
| primitive | `is.primitive("hello")` |

> is.null is not available because of a name restriction.

### Objects

| method | example |
| --- | --- |
| promise | `is.promise(new Promise())` |
| classObject | `is.classObject(new Class{})` |
| array | `is.array([])` |
| object | `is.object({})` |
| plainObject | `is.plainObject(Object.create(null))` |
| set | `is.set(new Set())` |
| map | `is.map(new Map())` |
| weakMap | `is.weakMap(new WeakMap())` |
| weakSet | `is.weakSet(new WeakSet())` |
| error | `is.error(new Error("ooppss!"))` |
| date | `is.date(new Date())` |
| regExp | `is.regExp(/^hello world$/)` |
| buffer | `is.buffer(Buffer.from("hello"))` |

> is.class is not available because of a name restriction.

### Functions & Iterators

| method | example |
| --- | --- |
| func | `is.func(new Function())` |
| generatorFunction | N/A |
| asyncFunction | `is.asyncFunction(async function() {})` |
| boundFunction | `is.boundFunction((function(){}).bind(null))` |
| iterable | `is.iterable([1, 2])` |
| asyncIterable | N/A |
| generator | N/A |

> is.function has been reduced to is.func because of a name restriction.

### Typed Arrays

| method | example |
| --- | --- |
| typedArray | `is.typedArray(new int8Array())` |
| int8Array | `is.int8Array(new int8Array())` |
| uint8Array | `is.uint8Array(new uint8Array())` |
| uint8ClampedArray | `is.uint8ClampedArray(new uint8ClampedArray())` |
| int16Array | `is.int16Array(new int16Array())` |
| uint16Array | `is.uint16Array(new uint16Array())` |
| int32Array | `is.int32Array(new int32Array())` |
| uint32Array | `is.uint32Array(new uint32Array())` |
| float32Array | `is.float32Array(new float32Array())` |
| float64Array | `is.float64Array(new float64Array())` |
| arrayBuffer | `is.arrayBuffer(new ArrayBuffer())` |
| sharedArrayBuffer | `is.sharedArrayBuffer(new SharedArrayBuffer())` |
| dataView | `is.dataView(new DataView(new ArrayBuffer(8)))` |

### Misc

| method | example |
| --- | --- |
| nan | `is.nan(Number("booom!"))` |
| integer | `is.integer(5 / 10)` |
| directInstanceOf | `is.directInstanceOf(Object, {})` |
| truthy | `is.truthy(true)` |
| falsy | `is.falsy("")` |
| emptyString | `is.emptyString("")` |

## Dependencies

This project have no dependencies.

## License
MIT
