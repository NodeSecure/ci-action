# NodeSecure CI Action

@nodesecure/ci brings together a set of tools to identify dependencies vulnerabilities 
and track most common malicious code and patterns.

Please refer to the [@nodesecure/ci](https://github.com/NodeSecure/ci) documentation to see more about the project.

## Usage
### Add to an existing Workflow

Simply add this action to your workflow

```yaml
uses: NodeSecure/ci-action@v1.0
```

### Add a new dedicated Workflow

Here's a sample complete workflow you can add to your repositories:

**`.github/workflows/nodesecure.yml`**
```yaml
name: "NodeSecure Continuous Integration"
on: [push]

jobs:
  validation:
    name: "Validation"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: NodeSecure/ci-action@v1.0
        with:
            strategy: npm
            vulnerabilities: medium
            warnings: off
            reporters: console
```

