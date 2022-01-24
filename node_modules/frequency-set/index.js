"use strict";

// Require Internal Dependencies
const { isIterable, isValidStringPrimitive, isKeyValueArray } = require("./src/utils.js");

class FrequencySet {
    #data = new Map();

    constructor(iterable = []) {
        if (iterable === null || iterable === undefined) {
            return;
        }
        if (!isIterable(iterable)) {
            throw new TypeError("object is not iterable (cannot read property Symbol(Symbol.iterator))");
        }

        for (const value of iterable) {
            if (isKeyValueArray(value)) {
                this.add(...value);
            }
            else {
                this.add(value);
            }
        }
    }

    add(value, count = 1) {
        if (typeof count !== "number") {
            throw new TypeError("count must be a number");
        }

        if (this.#data.has(value)) {
            this.#data.get(value).count += count;
        }
        else {
            this.#data.set(value, { count });
        }

        return this;
    }

    clear() {
        this.#data.clear();
    }

    delete(value) {
        return this.#data.delete(value);
    }

    * entries() {
        for (const [value, { count }] of this.#data.entries()) {
            yield [value, count];
        }
    }

    * [Symbol.iterator]() {
        yield* this.entries();
    }

    forEach(callback, thisArg) {
        for (const [value, count] of this.entries()) {
            callback.call(thisArg, value, count, this);
        }
    }

    has(value) {
        return this.#data.has(value);
    }

    values() {
        return this.#data.keys();
    }

    toJSON() {
        const payload = [];
        for (const [value, count] of this.entries()) {
            if (isValidStringPrimitive(value)) {
                payload.push([String(value), count]);
            }
        }

        return payload;
    }
}

module.exports = FrequencySet;
