(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils", "./result"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Option = exports.Some = exports.None = void 0;
    var utils_1 = require("./utils");
    var result_1 = require("./result");
    /**
     * Contains the None value
     */
    var NoneImpl = /** @class */ (function () {
        function NoneImpl() {
            this.some = false;
            this.none = true;
        }
        NoneImpl.prototype[Symbol.iterator] = function () {
            return {
                next: function () {
                    return { done: true, value: undefined };
                },
            };
        };
        NoneImpl.prototype.unwrapOr = function (val) {
            return val;
        };
        NoneImpl.prototype.expect = function (msg) {
            throw new Error("" + msg);
        };
        NoneImpl.prototype.unwrap = function () {
            throw new Error("Tried to unwrap None");
        };
        NoneImpl.prototype.map = function (_mapper) {
            return this;
        };
        NoneImpl.prototype.andThen = function (op) {
            return this;
        };
        NoneImpl.prototype.toResult = function (error) {
            return result_1.Err(error);
        };
        NoneImpl.prototype.toString = function () {
            return 'None';
        };
        return NoneImpl;
    }());
    // Export None as a singleton, then freeze it so it can't be modified
    exports.None = new NoneImpl();
    Object.freeze(exports.None);
    /**
     * Contains the success value
     */
    var SomeImpl = /** @class */ (function () {
        function SomeImpl(val) {
            if (!(this instanceof SomeImpl)) {
                return new SomeImpl(val);
            }
            this.some = true;
            this.none = false;
            this.val = val;
        }
        /**
         * Helper function if you know you have an Some<T> and T is iterable
         */
        SomeImpl.prototype[Symbol.iterator] = function () {
            var obj = Object(this.val);
            return Symbol.iterator in obj
                ? obj[Symbol.iterator]()
                : {
                    next: function () {
                        return { done: true, value: undefined };
                    },
                };
        };
        SomeImpl.prototype.unwrapOr = function (_val) {
            return this.val;
        };
        SomeImpl.prototype.expect = function (_msg) {
            return this.val;
        };
        SomeImpl.prototype.unwrap = function () {
            return this.val;
        };
        SomeImpl.prototype.map = function (mapper) {
            return exports.Some(mapper(this.val));
        };
        SomeImpl.prototype.andThen = function (mapper) {
            return mapper(this.val);
        };
        SomeImpl.prototype.toResult = function (error) {
            return result_1.Ok(this.val);
        };
        /**
         * Returns the contained `Some` value, but never throws.
         * Unlike `unwrap()`, this method doesn't throw and is only callable on an Some<T>
         *
         * Therefore, it can be used instead of `unwrap()` as a maintainability safeguard
         * that will fail to compile if the type of the Option is later changed to a None that can actually occur.
         *
         * (this is the `into_Some()` in rust)
         */
        SomeImpl.prototype.safeUnwrap = function () {
            return this.val;
        };
        SomeImpl.prototype.toString = function () {
            return "Some(" + utils_1.toString(this.val) + ")";
        };
        SomeImpl.EMPTY = new SomeImpl(undefined);
        return SomeImpl;
    }());
    // This allows Some to be callable - possible because of the es5 compilation target
    exports.Some = SomeImpl;
    var Option;
    (function (Option) {
        /**
         * Parse a set of `Option`s, returning an array of all `Some` values.
         * Short circuits with the first `None` found, if any
         */
        function all() {
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            var someOption = [];
            for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
                var option = options_1[_a];
                if (option.some) {
                    someOption.push(option.val);
                }
                else {
                    return option;
                }
            }
            return exports.Some(someOption);
        }
        Option.all = all;
        /**
         * Parse a set of `Option`s, short-circuits when an input value is `Some`.
         * If no `Some` is found, returns `None`.
         */
        function any() {
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            // short-circuits
            for (var _a = 0, options_2 = options; _a < options_2.length; _a++) {
                var option = options_2[_a];
                if (option.some) {
                    return option;
                }
                else {
                    return option;
                }
            }
            // it must be None
            return exports.None;
        }
        Option.any = any;
        function isOption(value) {
            return value instanceof exports.Some || value === exports.None;
        }
        Option.isOption = isOption;
    })(Option = exports.Option || (exports.Option = {}));
});
//# sourceMappingURL=option.js.map