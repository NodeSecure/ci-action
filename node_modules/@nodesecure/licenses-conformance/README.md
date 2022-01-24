# NodeSecure Licenses conformance
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/flags/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/flags/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/flags/blob/master/LICENSE)

NodeSecure licenses conformance.

## Requirements
- [Node.js](https://nodejs.org/en/) v16 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

This repository is inspired by [cutenode/conformance](https://github.com/cutenode/conformance.git)

```bash
$ npm i @nodesecure/licenses-conformance
# or
$ yarn add @nodesecure/licenses-conformance
```

## Usage example

```js
import conformance from "@nodesecure/licenses-conformance";

const mitLicense = licenseConformance("MIT");
/*  
  {
    uniqueLicenseIds: ["MIT"],
    spdxLicenseLinks: ["https://spdx.org/licenses/MIT.html#licenseText"],
    spdx: {
      osi: true,
      fsf: true,
      fsfAndOsi: true,
      includesDeprecated: false
    }
  }
*/

const errorLicense = licenseConformance("notalicense");
/*
should throw an Error like

Passed license expression was not a valid license expression. Error from spdx-expression-parse: Error: `u` at offset 0
*/
```

## API

See TypeScript definition file.


## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):


## License
MIT
This repository is inspired by [cutenode/conformance](https://github.com/cutenode/conformance.git)
