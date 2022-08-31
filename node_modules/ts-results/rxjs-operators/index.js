(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs", "rxjs/operators", "../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tapResultOk = exports.tapResultErr = exports.filterResultErr = exports.filterResultOk = exports.resultMergeMap = exports.resultSwitchMap = exports.elseMapTo = exports.elseMap = exports.resultMapErrTo = exports.resultMapTo = exports.resultMapErr = exports.resultMap = void 0;
    var rxjs_1 = require("rxjs");
    var operators_1 = require("rxjs/operators");
    var index_1 = require("../index");
    function resultMap(mapper) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) { return result.map(mapper); }));
        };
    }
    exports.resultMap = resultMap;
    function resultMapErr(mapper) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) { return result.mapErr(mapper); }));
        };
    }
    exports.resultMapErr = resultMapErr;
    function resultMapTo(value) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) { return result.map(function () { return value; }); }));
        };
    }
    exports.resultMapTo = resultMapTo;
    function resultMapErrTo(value) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) { return result.mapErr(function () { return value; }); }));
        };
    }
    exports.resultMapErrTo = resultMapErrTo;
    function elseMap(mapper) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) {
                if (result.err) {
                    return mapper(result.val);
                }
                else {
                    return result.val;
                }
            }));
        };
    }
    exports.elseMap = elseMap;
    function elseMapTo(value) {
        return function (source) {
            return source.pipe(operators_1.map(function (result) {
                if (result.err) {
                    return value;
                }
                else {
                    return result.val;
                }
            }));
        };
    }
    exports.elseMapTo = elseMapTo;
    function resultSwitchMap(mapper) {
        return function (source) {
            return source.pipe(operators_1.switchMap(function (result) {
                if (result.ok) {
                    return mapper(result.val);
                }
                else {
                    return rxjs_1.of(result);
                }
            }), operators_1.map(function (result) {
                if (index_1.Result.isResult(result)) {
                    return result;
                }
                else {
                    return new index_1.Ok(result);
                }
            }));
        };
    }
    exports.resultSwitchMap = resultSwitchMap;
    function resultMergeMap(mapper) {
        return function (source) {
            return source.pipe(operators_1.mergeMap(function (result) {
                if (result.ok) {
                    return mapper(result.val);
                }
                else {
                    return rxjs_1.of(result);
                }
            }), operators_1.map(function (result) {
                if (index_1.Result.isResult(result)) {
                    return result;
                }
                else {
                    return new index_1.Ok(result);
                }
            }));
        };
    }
    exports.resultMergeMap = resultMergeMap;
    function filterResultOk() {
        return function (source) {
            return source.pipe(operators_1.filter(function (result) { return result.ok; }), operators_1.map(function (result) { return result.val; }));
        };
    }
    exports.filterResultOk = filterResultOk;
    function filterResultErr() {
        return function (source) {
            return source.pipe(operators_1.filter(function (result) { return result.err; }), operators_1.map(function (result) { return result.val; }));
        };
    }
    exports.filterResultErr = filterResultErr;
    function tapResultErr(tapFn) {
        return function (source) {
            return source.pipe(operators_1.tap(function (r) {
                if (!r.ok) {
                    tapFn(r.val);
                }
            }));
        };
    }
    exports.tapResultErr = tapResultErr;
    function tapResultOk(tapFn) {
        return function (source) {
            return source.pipe(operators_1.tap(function (r) {
                if (r.ok) {
                    tapFn(r.val);
                }
            }));
        };
    }
    exports.tapResultOk = tapResultOk;
});
//# sourceMappingURL=index.js.map