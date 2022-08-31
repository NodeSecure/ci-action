# Config

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Config/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Config/commit-activity)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/SlimIO/Config/blob/master/LICENSE)
![dep](https://img.shields.io/david/SlimIO/Config)
![size](https://img.shields.io/bundlephobia/min/@slimio/config.svg?style=flat)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/Config/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/Config?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Config.svg?branch=master)](https://travis-ci.com/SlimIO/Config)

SlimIO - Reactive JSON Configuration loader. This package is used in SlimIO core and addons to safely hot reload configuration upon [JSON Schema](https://json-schema.org/).

## Features

- Hot-reloading of configuration
- Reactive with observable key(s)
- Safe with [JSON Schema](https://json-schema.org/) validation
- Support [TOML](https://github.com/toml-lang/toml) as input (enable the parser when the file extension end with **.toml**)
- Read configuration with no extension that start with a dot (like `.nodesecurerc` for example).

## Requirements
[Node.js](https://nodejs.org/en/) version 12 and upper are required to run this project. **We do not provide support** for previous versions.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/config
# or
$ yarn add @slimio/config
```

## Usage example

Create a simple json file for your project (As below)

```json
{
    "loglevel": 5,
    "logsize": 4048,
    "login": "administrator"
}
```

Now, create a new Configuration instance and read it

```js
const Config = require("@slimio/config");

async function main() {
    const cfg = new Config("./path/to/config.json");
    await cfg.read();
    console.log(cfg.get("loglevel")); // stdout: 5

    // Observe (with an Observable Like) the update made to login property
    cfg.observableOf("login").subscribe(console.log);
    cfg.set("login", "admin");

    // Payload getter will return a deepClone with all configuration properties
    console.log(cfg.payload);

    await cfg.close();
}
main().catch(console.error);
```

> **Note:** config.json should exist (if not, it will throw an Error). Look at `createOnNoEntry` option for more information !

## Events
Configuration class is extended by a [Node.js EventEmitter](https://nodejs.org/api/events.html). The class can trigger several events:

| event name | description |
| --- | --- |
| configWritten | The configuration payload has been written on the local disk |
| watcherInitialized | The file watcher has been initialized (it will hot reload the configuration on modification) |
| reload | The configuration has been hot reloaded successfully |
| close | Event triggered when the configuration is asked to be closed |

## API
This section describe how works the methods of **Config** class. For a complete definition, take a look at `index.d.ts` !

<details><summary>constructor< T > (configFilePath: string, options?: Config.Options)</summary>
<br />

Create a new Config Object:
```js
const cfg = new Config("./path/to/file.json", {
    createOnNoEntry: true,
    autoReload: true
});
```

Available options are:

| name | type | default value | description |
| --- | --- | --- | --- |
| createOnNoEntry | boolean | false | Create the file with default payload value if he doesn't exist on the local disk |
| writeOnSet | boolean | false | Write the file on the disk after each time .set() is called |
| autoReload | boolean | false | Setup hot reload of the configuration file |
| reloadDelay | number | 500ms | The delay to wait before hot reloading the configuration, it's a security to avoid event spamming |
| defaultSchema | plainObject | null | The default JSON Schema for the configuration |

> **Note**: When no schema is provided, it will search for a file prefixed by `.schema` with the same config name.

</details>

<details><summary>read (defaultPayload?: T): Promise< this ></summary>
<br />

Will trigger and read the local configuration (on disk). A default `payload` value can be provided in case the file doesn't exist !

```js
const { strictEqual } = require("assert");

const cfg = new Config("./path/to/file.json");
strictEqual(cfg.configHasBeenRead, false); // true
await cfg.read();
strictEqual(cfg.configHasBeenRead, true); // true
```

Retriggering the method will made an hot-reload of all properties. For a cold reload you will have to close the configuration before.

> **Warning** When the file doesn't exist, the configuration is written at the next loop iteration (with lazyWriteOnDisk).

<p align="center"><img src="https://i.imgur.com/uMY4DZV.png" height="500"></p>

</details>

<details><summary>setupAutoReload (): void</summary>
<br />

Setup hot reload (with a file watcher). This method is automatically triggered if the Configuration has been created with the option `autoReload` set to true.

We use the package [node-watch](https://www.npmjs.com/package/node-watch) to achieve the hot reload.
</details>

<details><summary>get< H > (fieldPath: string, depth?: number): H</summary>
<br />

Get a value from a key (fieldPath). For example, let take a json payload with a root `foo` field.
```js
const cfg = new Config("./path/to/file.json");
await cfg.read();
const fooValue = cfg.get("foo");
```

> Under the hood the method work with `lodash.get` function.

If the retrieved value is a JavaScript object, you can limit the depth by setting `depth` option.
</details>

<details><summary>set< H > (fieldPath: string, fieldValue: H): void</summary>
<br />

Set a given field in the configuration.

```js
const cfg = new Config("./config.json", {
    createOnNoEntry: true
});

await cfg.read({ foo: "bar" });
cfg.set("foo", "hello world!");
await cfg.writeOnDisk();
```

> Under the hood the method work with `lodash.set` function.

</details>

<details><summary>observableOf (fieldPath: string, depth?: number): ObservableLike</summary>
<br />

Observe a given configuration key with an Observable Like object!

```js
const { writeFile } = require("fs").promises;
const cfg = new Config("./config.json", {
    autoReload: true,
    createOnNoEntry: true
});
await cfg.read({ foo: "bar" });

// Observe initial and next value(s) of foo
cfg.observableOf("foo").subscribe(console.log);

// Re-write local config file
const newPayload = { foo: "world" };
await writeFile("./config.json", JSON.stringify(newPayload, null, 4));
```
</details>

<details><summary>writeOnDisk (): Promise< void ></summary>
<br />

Write the configuration on the disk.
</details>

<details><summary>lazyWriteOnDisk (): void</summary>
<br />

Write the configuration on the disk (only at the next event-loop iteration). Use the event `configWritten` to known when the configuration will be written.

```js
const cfg = new Config("./config.json", {
    createOnNoEntry: true
});
await cfg.read();
cfg.once("configWritten", () => {
    console.log("Configuration written!");
});
cfg.lazyWriteOnDisk();
```

</details>

<details><summary>close (): Promise< void ></summary>
<br />

Close (and write on disk) the configuration (it will close the watcher and complete/clean all active observers subscribers).
</details>

### Properties
Following properties are **static** members of **Config** class.

<details><summary>STRINGIFY_SPACE</summary>
<br />

The `STRINGIFY_SPACE` property allow you to redine the espace used internaly for `JSON.stringify` method. The default value is **4**.
</details>

<details><summary>DEFAULTSchema</summary>
<br />

The `DEFAULTSchema` property allow you to redefine the default schema that should be applied if no schema is provided when constructor is triggered!

The default value is the following Object:
```js
{
    title: "CONFIG",
    additionalProperties: true
}
```
</details>

<details><summary>DEFAULT_EXTENSION</summary>
<br />

The `DEFAULT_EXTENSION` property allow you to redefine the default extension when there is no extension detected in the constructor filePath. The extension can be either `.json` or `.toml`.

</details>

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@iarna/toml](https://github.com/iarna/iarna-toml#readme)|Minor|Low|Better TOML parsing and stringifying all in that familiar JSON interface.|
|[@slimio/is](https://github.com/SlimIO/is)|Minor|Low|JavaScript Type checker|
|[ajv](https://github.com/epoberezkin/ajv)|Minor|High|The fastest JSON Schema Validator|
|[lodash.clonedeep](https://github.com/lodash/lodash)|Minor|Low|Clone deep an Object|
|[lodash.get](https://github.com/lodash/lodash)|Minor|Low|Get deep a value|
|[lodash.set](https://github.com/lodash/lodash)|Minor|Low|Set deep a value|
|[node-watch](https://github.com/yuanchuan/node-watch#readme)|Minor|Low|A wrapper and enhancements for fs.watch|
|[zen-observable](https://github.com/zenparsing/zen-observable)|Minor|Low|ECMAScript Observable implementation|

## Contributions Guidelines
TBC

## License
MIT

