# fs-walk
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/fs-walk/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/fs-walk/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/fs-walk/blob/master/LICENSE)
![dep](https://img.shields.io/david/NodeSecure/fs-walk)

Modern FileSystem (fs) utilities to lazy walk directories Asynchronously (but also Synchronously). Under the hood the code has been created using ES6 Generators.

## Features

- Lazy walk by using [fs.opendir](https://nodejs.org/api/fs.html#fs_fspromises_opendir_path_options).
- Zero dependencies.
- Enforce usage of Symbols for CONSTANTS.
- Synchronous API.

> Performance over some of the features is a non-goal.

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/fs-walk
# or
$ yarn add @nodesecure/fs-walk
```

## Usage example

```js
import path from "path";
import { walk } from "@nodesecure/fs-walk";

for await (const [dirent, absoluteFileLocation] of walk(".")) {
  if (dirent.isFile()) {
    console.log(absoluteFileLocation);
    console.log(path.extname(absoluteFileLocation));
  }
}
```

## API

```ts
export interface WalkOptions {
  extensions?: Set<string>;
}

export type WalkResult = [dirent: fs.Dirent, absoluteFileLocation: string];
```

### walk(directory: string, options?: WalkOptions): AsyncIterableIterator< WalkResult >
Asynchronous walk.

### walkSync(directory: string, options?: WalkOptions): IterableIterator< WalkResult >
Synchronous walk (using readdirSync under the hood instead of opendir).

For example fetching JavaScript files for a given location:
```js
import { walkSync } from "@nodesecure/fs-walk";

const javascriptFiles = [...walkSync("./someDirectory", { extensions: new Set([".js"]) }))]
    .filter(([dirent]) => dirent.isFile())
    .map(([, absoluteFileLocation]) => absoluteFileLocation);

console.log(javascriptFiles);
```

## License
MIT
