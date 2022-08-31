"use strict";

/**
 * @namespace utils
 */

// Require third-party NPM package(s)
const is = require("@slimio/is");

/**
 * @exports utils/formatAjvErrors
 * @function formatAjvErrors
 * @memberof utils#
 * @description format ajv errors
 * @param {ajv.ErrorObject[]} ajvErrors Array of ajv error Object
 * @returns {string}
 */
function formatAjvErrors(ajvErrors) {
    if (!is.array(ajvErrors)) {
        return "";
    }
    const stdout = [];
    for (const oErr of ajvErrors) {
        const isProperty = oErr.instancePath === "" ? "" : `property ${oErr.instancePath} `;

        stdout.push(`${isProperty}${oErr.message}\n`);
    }

    return stdout.join("");
}

/**
 * @exports utils/limitObjectDepth
 * @function limitObjectDepth
 * @memberof utils#
 * @description Limit an given object depth!
 * @param {!object} obj obj
 * @param {number} [depth=0] depth
 * @returns {object | Array}
 */
function limitObjectDepth(obj, depth = 0) {
    if (!is.plainObject(obj)) {
        return obj;
    }

    if (depth === 0) {
        return Object.keys(obj);
    }

    // eslint-disable-next-line
    const subDepth = --depth;
    for (const [key, value] of Object.entries(obj)) {
        Reflect.set(obj, key, limitObjectDepth(value, subDepth));
    }

    return obj;
}

module.exports = {
    formatAjvErrors,
    limitObjectDepth
};
