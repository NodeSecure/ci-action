# NodeSecure CI Action

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/ci-action/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/ci-action/commit-activity)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg?style=for-the-badge)](https://github.com/NodeSecure/ci-action/blob/master/LICENSE)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/ci-action/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/ci-action)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/ci-action/node.js.yml?style=for-the-badge)

@nodesecure/ci brings together a set of tools to identify dependencies vulnerabilities
and track most common malicious code and patterns.

Please refer to the [@nodesecure/ci](https://github.com/NodeSecure/ci-action) documentation to see more about the project.

## Usage

### Add to an existing Workflow

Simply add this action to your workflow

```yaml
uses: NodeSecure/ci-action@v1
```

### Add a new dedicated Workflow

Here's a sample complete workflow you can add to your repositories:

**`.github/workflows/nodesecure.yml`**

```yaml
name: "NodeSecure Continuous Integration"
on: [push]

jobs:
  validation:
    name: "Analysis"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: NodeSecure/ci-action@v1
        with:
          strategy: npm
          vulnerabilities: medium
          warnings: off
          reporters: console
```

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
    <td align="center"><a href="https://github.com/antoine-coulon"><img src="https://avatars.githubusercontent.com/u/43391199?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antoine</b></sub></a><br /><a href="https://github.com/NodeSecure/ci-action/commits?author=antoine-coulon" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="#maintenance-fraxken" title="Maintenance">🚧</a> <a href="https://github.com/NodeSecure/ci-action/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
