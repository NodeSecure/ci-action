# Github API

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/github/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/github/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/github.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/github.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/github/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/github?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/github.svg?branch=master)](https://travis-ci.com/SlimIO/github)

Download and (optionaly) extract github repository archive.

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/github
# or
$ yarn add @slimio/github
```

## Usage example
```js
const download = require("@slimio/github");

async function main() {
    const tarGZPath = await download("SlimIO.is");
    console.log(tarGZPath);
}
main().catch(console.error);
```

## API

### download(repo: String, options?): Promise< String >
Download a given "public" repository ! Return the name of the .tar.gz file (or the name of the extracted directory).

Repository should be formatted like that:
```
(org|username).repository_fullname
```

Available options are:

| name | type | default | description |
| --- | --- | --- | --- |
| branch | string | master | Git branch to download |
| dest | string | `process.cwd()` | Tar/Directory destination |
| extract | boolean | `false` | Extract .tar.gz file |
| unlink | boolean | `true` | Remove .tar.gz file on extraction |
| auth | string | `undefined` | Basic Authentication for private repository |

## Env
To be able to work on the project, please create a root `.env` file with these:
```
GIT_TOKEN=token_here
```

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/is](https://github.com/SlimIO/is#readme)|Minor|Low|Type Checker|
|[follow-redirects](https://github.com/follow-redirects/follow-redirects)|Minor|Low|HTTP Request with URL redirection support|
|[tar-fs](https://github.com/mafintosh/tar-fs)|⚠️Major|High|Extract tar archive|

## License
MIT
