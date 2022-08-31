(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils", "./option"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Result = exports.Ok = exports.OkImpl = exports.Err = exports.ErrImpl = void 0;
    var utils_1 = require("./utils");
    var option_1 = require("./option");
    /**
     * Contains the error value
     */
    var ErrImpl = /** @class */ (function () {
        function ErrImpl(val) {
            if (!(this instanceof ErrImpl)) {
                return new ErrImpl(val);
            }
            this.ok = false;
            this.err = true;
            this.val = val;
            var stackLines = new Error().stack.split('\n').slice(2);
            if (stackLines && stackLines.length > 0 && stackLines[0].includes('ErrImpl')) {
                stackLines.shift();
            }
            this._stack = stackLines.join('\n');
        }
        ErrImpl.prototype[Symbol.iterator] = function () {
            return {
                next: function () {
                    return { done: true, value: undefined };
                },
            };
        };
        /**
         * @deprecated in favor of unwrapOr
         * @see unwrapOr
         */
        ErrImpl.prototype.else = function (val) {
            return val;
        };
        ErrImpl.prototype.unwrapOr = function (val) {
            return val;
        };
        ErrImpl.prototype.expect = function (msg) {
            throw new Error(msg + " - Error: " + utils_1.toString(this.val) + "\n" + this._stack);
        };
        ErrImpl.prototype.unwrap = function () {
            throw new Error("Tried to unwrap Error: " + utils_1.toString(this.val) + "\n" + this._stack);
        };
        ErrImpl.prototype.map = function (_mapper) {
            return this;
        };
        ErrImpl.prototype.andThen = function (op) {
            return this;
        };
        ErrImpl.prototype.mapErr = function (mapper) {
            return new exports.Err(mapper(this.val));
        };
        ErrImpl.prototype.toOption = function () {
            return option_1.None;
        };
        ErrImpl.prototype.toString = function () {
            return "Err(" + utils_1.toString(this.val) + ")";
        };
        Object.defineProperty(ErrImpl.prototype, "stack", {
            get: function () {
                return this + "\n" + this._stack;
            },
            enumerable: false,
            configurable: true
        });
        /** An empty Err */
        ErrImpl.EMPTY = new ErrImpl(undefined);
        return ErrImpl;
    }());
    exports.ErrImpl = ErrImpl;
    // This allows Err to be callable - possible because of the es5 compilation target
    exports.Err = ErrImpl;
    /**
     * Contains the success value
     */
    var OkImpl = /** @class */ (function () {
        function OkImpl(val) {
            if (!(this instanceof OkImpl)) {
                return new OkImpl(val);
            }
            this.ok = true;
            this.err = false;
            this.val = val;
        }
        /**
         * Helper function if you know you have an Ok<T> and T is iterable
         */
        OkImpl.prototype[Symbol.iterator] = function () {
            var obj = Object(this.val);
            return Symbol.iterator in obj
                ? obj[Symbol.iterator]()
                : {
                    next: function () {
                        return { done: true, value: undefined };
                    },
                };
        };
        /**
         * @see unwrapOr
         * @deprecated in favor of unwrapOr
         */
        OkImpl.prototype.else = function (_val) {
            return this.val;
        };
        OkImpl.prototype.unwrapOr = function (_val) {
            return this.val;
        };
        OkImpl.prototype.expect = function (_msg) {
            return this.val;
        };
        OkImpl.prototype.unwrap = function () {
            return this.val;
        };
        OkImpl.prototype.map = function (mapper) {
            return new exports.Ok(mapper(this.val));
        };
        OkImpl.prototype.andThen = function (mapper) {
            return mapper(this.val);
        };
        OkImpl.prototype.mapErr = function (_mapper) {
            return this;
        };
        OkImpl.prototype.toOption = function () {
            return option_1.Some(this.val);
        };
        /**
         * Returns the contained `Ok` value, but never throws.
         * Unlike `unwrap()`, this method doesn't throw and is only callable on an Ok<T>
         *
         * Therefore, it can be used instead of `unwrap()` as a maintainability safeguard
         * that will fail to compile if the error type of the Result is later changed to an error that can actually occur.
         *
         * (this is the `into_ok()` in rust)
         */
        OkImpl.prototype.safeUnwrap = function () {
            return this.val;
        };
        OkImpl.prototype.toString = function () {
            return "Ok(" + utils_1.toString(this.val) + ")";
        };
        OkImpl.EMPTY = new OkImpl(undefined);
        return OkImpl;
    }());
    exports.OkImpl = OkImpl;
    // This allows Ok to be callable - possible because of the es5 compilation target
    exports.Ok = OkImpl;
    var Result;
    (function (Result) {
        /**
         * Parse a set of `Result`s, returning an array of all `Ok` values.
         * Short circuits with the first `Err` found, if any
         */
        function all() {
            var results = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                results[_i] = arguments[_i];
            }
            var okResult = [];
            for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
                var result = results_1[_a];
                if (result.ok) {
                    okResult.push(result.val);
                }
                else {
                    return result;
                }
            }
            return new exports.Ok(okResult);
        }
        Result.all = all;
        /**
         * Parse a set of `Result`s, short-circuits when an input value is `Ok`.
         * If no `Ok` is found, returns an `Err` containing the collected error values
         */
        function any() {
            var results = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                results[_i] = arguments[_i];
            }
            var errResult = [];
            // short-circuits
            for (var _a = 0, results_2 = results; _a < results_2.length; _a++) {
                var result = results_2[_a];
                if (result.ok) {
                    return result;
                }
                else {
                    errResult.push(result.val);
                }
            }
            // it must be a Err
            return new exports.Err(errResult);
        }
        Result.any = any;
        /**
         * Wrap an operation that may throw an Error (`try-catch` style) into checked exception style
         * @param op The operation function
         */
        function wrap(op) {
            try {
                return new exports.Ok(op());
            }
            catch (e) {
                return new exports.Err(e);
            }
        }
        Result.wrap = wrap;
        /**
         * Wrap an async operation that may throw an Error (`try-catch` style) into checked exception style
         * @param op The operation function
         */
        function wrapAsync(op) {
            try {
                return op()
                    .then(function (val) { return new exports.Ok(val); })
                    .catch(function (e) { return new exports.Err(e); });
            }
            catch (e) {
                return Promise.resolve(new exports.Err(e));
            }
        }
        Result.wrapAsync = wrapAsync;
        function isResult(val) {
            return val instanceof exports.Err || val instanceof exports.Ok;
        }
        Result.isResult = isResult;
    })(Result = exports.Result || (exports.Result = {}));
});
//# sourceMappingURL=result.js.map