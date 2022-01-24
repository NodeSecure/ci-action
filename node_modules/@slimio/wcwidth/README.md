# wcwidth
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/wcwidth/master/package.json?token=AOgWw3vrgQuu-U4fz1c7yYZyc7XJPNtrks5catjdwA%3D%3D&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/wcwidth/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/wcwidth)
[![Known Vulnerabilities](https://snyk.io//test/github/SlimIO/wcwidth/badge.svg?targetFile=package.json)](https://snyk.io//test/github/SlimIO/wcwidth?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/wcwidth.svg?branch=master)](https://travis-ci.com/SlimIO/wcwidth)

Determine columns needed for a fixed-size wide-character string

> wcwidth is a simple JavaScript port of [wcwidth](http://man7.org/linux/man-pages/man3/wcswidth.3.html) implemented in C by Markus Kuhn.
>
> JavaScript port [originally](https://github.com/mycoboco/wcwidth.js) written by Woong Jun <woong.jun@gmail.com> (http://code.woong.org/)

## Why

This package is a fork of [wcwidth](https://github.com/timoxley/wcwidth#readme).

- Drop old Node.js version support.
- Drop useless `defaults` package wich introduce an indirect dependencies.
- Cleanup npm tarball (only ship required files).
- Supported by the SlimIO Team.

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/wcwidth
# or
$ yarn add @slimio/wcwidth
```

## Usage example

```js
const wcwidth = require("@slimio/wcwidth");

'한'.length    // => 1
wcwidth('한');   // => 2

'한글'.length    // => 2
wcwidth('한글'); // => 4
```

`wcwidth()` and its string version, `wcswidth()` are defined by IEEE Std
1002.1-2001, a.k.a. POSIX.1-2001, and return the number of columns used
to represent the given wide character and string.

Markus's implementation assumes the wide character given to those
functions to be encoded in ISO 10646, which is almost true for
JavaScript's characters.

[Further explaination here](https://github.com/timoxley/wcwidth/tree/master/docs)

## API
TBC

## Dependencies
This project have no dependencies.

## License
MIT
