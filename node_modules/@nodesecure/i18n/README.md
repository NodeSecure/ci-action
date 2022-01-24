# NodeSecure i18n
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/i18n/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/i18n/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/i18n/blob/master/LICENSE)
![build](https://img.shields.io/github/workflow/status/NodeSecure/i18n/Node.js%20CI)

Internationalization utilities for NodeSecure Scanner and CLI.

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/i18n
# or
$ yarn add @nodesecure/i18n
```

## Usage example

```js
import * as i18n from "@nodesecure/i18n";

await i18n.setLocalLang("french");

console.log(i18n.getToken("cli.executing_at"));

// Using parameters
console.log(i18n.getToken("cli.min_nodejs_version", "14"));
```

## API

See TypeScript definition file.

```ts
type languages = "french" | "english";

export function getLocalLang(): languages;
export function setLocalLang(newLanguage: languages): Promise<void>;
export function getToken(token: string, ...parameters);
export function getLanguages(): languages[];
export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/i18n/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/i18n/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/i18n/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=Rossb0b" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/QuentinLpy"><img src="https://avatars.githubusercontent.com/u/31780359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Quentin Lepateley</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=QuentinLpy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://antoineneff.me"><img src="https://avatars.githubusercontent.com/u/9216777?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antoine Neff</b></sub></a><br /><a href="#translation-antoineneff" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.linkedin.com/in/kvoyer"><img src="https://avatars.githubusercontent.com/u/33313541?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kévin VOYER</b></sub></a><br /><a href="#translation-kecsou" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/AlexandreMalaj"><img src="https://avatars.githubusercontent.com/u/32218832?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexandre Malaj</b></sub></a><br /><a href="#translation-AlexandreMalaj" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Kawacrepe"><img src="https://avatars.githubusercontent.com/u/40260517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vincent Dhennin</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=Kawacrepe" title="Code">💻</a> <a href="https://github.com/NodeSecure/i18n/commits?author=Kawacrepe" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
