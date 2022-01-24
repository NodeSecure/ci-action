"use strict";

// Require Internal Dependencies
const combining = require("./src/combining");

// CONSTANTS
const DEFAULTS = {
    nul: 0,
    control: 0
};

module.exports = function wcwidth(str) {
    return wcswidth(str, DEFAULTS);
};

module.exports.config = function config(opts = {}) {
    const defaults = Object.assign({}, DEFAULTS, opts);

    return function wcwidth(str) {
        return wcswidth(str, defaults);
    };
};

/**
 * @function wcswidth
 * @param {!string} str
 * @param {*} opts
 * @returns {number}
 *
 *  The following functions define the column width of an ISO 10646
 *  character as follows:
 *  - The null character (U+0000) has a column width of 0.
 *  - Other C0/C1 control characters and DEL will lead to a return value
 *    of -1.
 *  - Non-spacing and enclosing combining characters (general category
 *    code Mn or Me in the
 *    Unicode database) have a column width of 0.
 *  - SOFT HYPHEN (U+00AD) has a column width of 1.
 *  - Other format characters (general category code Cf in the Unicode
 *    database) and ZERO WIDTH
 *    SPACE (U+200B) have a column width of 0.
 *  - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)
 *    have a column width of 0.
 *  - Spacing characters in the East Asian Wide (W) or East Asian
 *    Full-width (F) category as
 *    defined in Unicode Technical Report #11 have a column width of 2.
 *  - All remaining characters (including all printable ISO 8859-1 and
 *    WGL4 characters, Unicode control characters, etc.) have a column
 *    width of 1.
 *  This implementation assumes that characters are encoded in ISO 10646.
 */
function wcswidth(str, opts) {
    if (typeof str !== "string") {
        return wcwidth(str, opts);
    }

    let width = 0;
    for (let id = 0; id < str.length; id++) {
        const charWidth = wcwidth(str.charCodeAt(id), opts);
        if (charWidth < 0) {
            return -1;
        }
        width += charWidth;
    }

    return width;
}

/**
 * @function wcwidth
 * @param {!number} ucs
 * @param {*} opts
 * @returns {number}
 */
function wcwidth(ucs, opts) {
    // test for 8-bit control characters
    if (ucs === 0) {
        return opts.nul;
    }
    if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0)) {
        return opts.control;
    }

    // binary search in table of non-spacing characters
    if (bisearch(ucs)) {
        return 0;
    }

    // if we arrive here, ucs is not a combining or C0/C1 control character
    return 1 +
        (ucs >= 0x1100 &&
            (ucs <= 0x115f ||
                ucs === 0x2329 || ucs === 0x232a ||
                (ucs >= 0x2e80 && ucs <= 0xa4cf &&
                    ucs !== 0x303f) ||
                (ucs >= 0xac00 && ucs <= 0xd7a3) ||
                (ucs >= 0xf900 && ucs <= 0xfaff) ||
                (ucs >= 0xfe10 && ucs <= 0xfe19) ||
                (ucs >= 0xfe30 && ucs <= 0xfe6f) ||
                (ucs >= 0xff00 && ucs <= 0xff60) ||
                (ucs >= 0xffe0 && ucs <= 0xffe6) ||
                (ucs >= 0x20000 && ucs <= 0x2fffd) ||
                (ucs >= 0x30000 && ucs <= 0x3fffd)));
}

/**
 * @function bisearch
 * @param {!number} ucs
 * @returns {boolean}
 */
function bisearch(ucs) {
    let min = 0;
    let max = combining.length - 1;

    if (ucs < combining[0][0] || ucs > combining[max][1]) {
        return false;
    }

    while (max >= min) {
        const mid = Math.floor((min + max) / 2);
        if (ucs > combining[mid][1]) {
            min = mid + 1;
        }
        else if (ucs < combining[mid][0]) {
            max = mid - 1;
        }
        else {
            return true;
        }
    }

    return false;
}
