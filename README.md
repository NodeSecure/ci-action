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
uses: NodeSecure/ci-action@177c57fe32c75cafabe87f6e4515d277cc37ae6c #1.4.1
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
      - uses: actions/checkout@v3
      - uses: NodeSecure/ci-action@177c57fe32c75cafabe87f6e4515d277cc37ae6c #1.4.1
        with:
          strategy: npm
          vulnerabilities: medium
          warnings: off
          reporters: console
```

In case you don't have a **package-lock.json** file, it will be necessary to install the dependencies with your package manager:

```yaml
name: "NodeSecure Continuous Integration"
on: [push]

jobs:
  validation:
    name: "Analysis"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: install dependencies
        run: npm install
      - uses: NodeSecure/ci-action@177c57fe32c75cafabe87f6e4515d277cc37ae6c #1.4.1
        with:
          strategy: npm
          vulnerabilities: medium
          warnings: off
          reporters: console
```

## Securing your workflow

You probably want to [ensure your GitHub Actions are pinned to a SHA](https://michaelheap.com/ensure-github-actions-pinned-sha/).

Using actions by commit hash reference is a remediation for, when actions are compromised or go under a dependency confusion attack, you are not using the malicious version. This remediation along with using least privilege principle for each action in the workflow, makes it harder for a possible action hijacker to have high access to your repository.

We recommend using [https://app.stepsecurity.io/](https://app.stepsecurity.io/) to secure your workflows (they are able to generate a pull-request and do the heavy lifting for you).

It is also a good practice to enable the update of workflows using dependabot:

```yml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/antoine-coulon"><img src="https://avatars.githubusercontent.com/u/43391199?v=4?s=100" width="100px;" alt="Antoine"/><br /><sub><b>Antoine</b></sub></a><br /><a href="https://github.com/NodeSecure/ci-action/commits?author=antoine-coulon" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="#maintenance-fraxken" title="Maintenance">🚧</a> <a href="https://github.com/NodeSecure/ci-action/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
