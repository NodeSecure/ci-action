"use strict";

function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}

function isValidStringPrimitive(value) {
    const vT = typeof value;

    return !(vT === "function" || (vT === "object" && value !== null));
}

function isKeyValueArray(array) {
    return Array.isArray(array) && array.length === 2 && typeof array[1] === "number";
}

module.exports = { isIterable, isValidStringPrimitive, isKeyValueArray };
