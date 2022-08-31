(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toString = void 0;
    function toString(val) {
        var value = String(val);
        if (value === '[object Object]') {
            try {
                value = JSON.stringify(val);
            }
            catch (_a) { }
        }
        return value;
    }
    exports.toString = toString;
});
//# sourceMappingURL=utils.js.map