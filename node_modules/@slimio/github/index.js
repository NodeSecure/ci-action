"use strict";

// Require Node.js Dependencies
const { promisify } = require("util");
const { createWriteStream, createReadStream, promises: { unlink } } = require("fs");
const { join } = require("path");
const { createGunzip } = require("zlib");
const stream = require("stream");

// Require Third-party Dependencies
const tar = require("tar-fs");
const is = require("@slimio/is");
const httpie = require("@myunisoft/httpie");

// CONSTANTS
const GITHUB_URL = new URL("https://github.com/");

// ASYNC
const pipeline = promisify(stream.pipeline);

/**
 * @async
 * @function download
 * @param {*} repository repository
 * @param {*} options options
 * @param {string} [options.branch=master] branch to download
 * @param {string} [options.dest] destination to transfert file
 * @param {boolean} [options.extract] Enable .zip extraction!
 * @param {boolean} [options.unlink] Unlink tar.gz file on extraction
 * @param {string} [options.auth] auth for private repository
 * @returns {Promise<string>}
 *
 * @throws {TypeError}
 */
async function download(repository, options = Object.create(null)) {
    if (typeof repository !== "string") {
        throw new TypeError("repository must be a string!");
    }
    if (!is.plainObject(options)) {
        throw new TypeError("options must be a plain javascript object!");
    }

    // Retrieve options
    const { branch = "master", dest = process.cwd(), extract = false, unlink: ulk = true, auth } = options;

    // Create URL!
    const [org, repo] = repository.split(".");
    const repositoryURL = new URL(`${org}/${repo}/archive/${branch}.tar.gz`, GITHUB_URL);
    const fileDestination = join(dest, `${repo}-${branch}.tar.gz`);

    await httpie.stream("GET", repositoryURL, {
        headers: {
            "User-Agent": "SlimIO",
            "Accept-Encoding": "gzip, deflate",
            Authorization: typeof auth === "string" ? `token ${auth}` : void 0
        },
        maxRedirections: 10
    })(createWriteStream(fileDestination));

    // Extract .tar.gz archive
    if (extract) {
        await pipeline(
            createReadStream(fileDestination),
            createGunzip(),
            tar.extract(dest)
        );
        if (ulk) {
            await unlink(fileDestination);
        }

        return join(dest, `${repo}-${branch}`);
    }

    return fileDestination;
}

module.exports = download;
