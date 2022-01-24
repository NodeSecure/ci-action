"use strict";

// Require Node.js Dependencies
const EventEmitter = require("events");

// CONSTANTS
const kRejectionMessage = "Lock acquisition rejected!";

// SYMBOLS
const SymMax = Symbol("SymMax");
const SymCurr = Symbol("SymCurr");
const SymWaits = Symbol("SymWaits");
const SymRejected = Symbol("SymRejected");

/**
 * @callback LockHandler
 * @returns {void}
 */

class Lock extends EventEmitter {
    /**
     * @class Lock
     * @memberof Lock#
     * @param {object} options options
     * @param {number} [options.maxConcurrent=5] maximum concurrent lock
     *
     * @throws {TypeError}
     */
    constructor(options = Object.create(null)) {
        super();
        const { maxConcurrent = 5 } = options;
        if (typeof maxConcurrent !== "number") {
            throw new TypeError("maxConcurrent must be a number");
        }

        Object.defineProperty(this, SymRejected, { value: false, writable: true });
        Object.defineProperty(this, SymWaits, { value: [] });
        Object.defineProperty(this, SymMax, { value: maxConcurrent });
        Object.defineProperty(this, SymCurr, { value: 0, writable: true });
    }

    /**
     * @member {number} max
     * @memberof Lock#
     * @returns {number}
     */
    get max() {
        return this[SymMax];
    }

    /**
     * @member {number} running
     * @memberof Lock#
     * @returns {number}
     */
    get running() {
        return this[SymCurr];
    }

    /**
     * @function rejectAll
     * @description reject all running/waiting promises and locks!
     * @param {string} [errorMessage]
     * @memberof Lock#
     * @returns {void}
     */
    rejectAll(errorMessage) {
        this[SymRejected] = true;
        const localErrorMessage = typeof errorMessage === "string" ? errorMessage : kRejectionMessage;

        while (this[SymCurr] > 0) {
            this.freeOne(new Error(localErrorMessage));
        }
    }

    /**
     * @function reset
     * @description reset all locks (will reject active locks and promises).
     * @memberof Lock#
     * @returns {void}
     */
    reset() {
        if (this[SymCurr] > 0) {
            this.rejectAll();
        }
        this[SymRejected] = false;
    }

    /**
     * @async
     * @function acquireOne
     * @description Acquire one spot on the locks pool.
     * @memberof Lock#
     * @returns {Promise<LockHandler>}
     */
    async acquireOne() {
        if (this[SymRejected]) {
            throw new Error(kRejectionMessage);
        }

        if (this[SymCurr] >= this.max) {
            await new Promise((resolve, reject) => this[SymWaits].push([resolve, reject]));
        }
        this[SymCurr]++;

        return () => this.freeOne();
    }

    /**
     * @function freeOne
     * @memberof Lock#
     * @param {Error} [error=null]
     * @returns {void}
     */
    freeOne(error = null) {
        if (this.running > 0) {
            this.emit("freeOne");
            this[SymCurr]--;
            const promiseArg = this[SymWaits].shift();
            if (typeof promiseArg === "undefined") {
                return;
            }

            const [resolve, reject] = promiseArg;
            if (resolve && error === null) {
                resolve();
            }
            else {
                reject(error || new Error(kRejectionMessage));
            }
        }
    }
}

module.exports = Lock;
