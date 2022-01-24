# Sec-literal
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/sec-literal/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/sec-literal/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/sec-literal/blob/master/LICENSE)
![build](https://img.shields.io/github/workflow/status/NodeSecure/sec-literal/Node.js%20CI)

This package is a security utilities library created to analyze [ESTree Literal](https://github.com/estree/estree/blob/master/es5.md#literal) and JavaScript string primitive. This project was originally created to simplify and better test the functionalities required for the SAST Scanner [JS-X-Ray](https://github.com/fraxken/js-x-ray).

## Features

- Detect Hexadecimal, Base64, Hexa and Unicode sequences.
- Detect patterns (prefix, suffix) on groups of identifiers.
- Detect suspicious string and return advanced metrics on it (char diversity etc).

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/sec-literal
# or
$ yarn add @nodesecure/sec-literal
```

## API

## Hex

### isHex(anyValue): boolean
Detect if the given string is an Hexadecimal value

### isSafe(anyValue): boolean
Detect if the given string is a safe Hexadecimal value. The goal of this method is to eliminate false-positive.

```js
Hex.isSafe("1234"); // true
Hex.isSafe("abcdef"); // true
```

## Literal

### isLiteral(anyValue): boolean
### toValue(anyValue): string
### toRaw(anyValue): string
### defaultAnalysis(literalValue)

## Utils

### isSvg(strValue): boolean

### isSvgPath(strValue): boolean
Detect if a given string is a svg path or not.

### stringCharDiversity(str): number
Get the number of unique chars in a given string

### stringSuspicionScore(str): number
Analyze a given string an give it a suspicion score (higher than 1 or 2 mean that the string is highly suspect).

## Patterns

### commonStringPrefix(leftStr, rightStr): string | null
### commonStringSuffix(leftStr, rightStr): string | null
### commonHexadecimalPrefix(identifiersArray: string[])


## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/sec-literal/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/sec-literal/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/sec-literal/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/sec-literal/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/sec-literal/commits?author=Rossb0b" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
