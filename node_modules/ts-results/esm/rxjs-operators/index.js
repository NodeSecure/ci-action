import { of } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Ok, Result } from '../index';
export function resultMap(mapper) {
    return function (source) {
        return source.pipe(map(function (result) { return result.map(mapper); }));
    };
}
export function resultMapErr(mapper) {
    return function (source) {
        return source.pipe(map(function (result) { return result.mapErr(mapper); }));
    };
}
export function resultMapTo(value) {
    return function (source) {
        return source.pipe(map(function (result) { return result.map(function () { return value; }); }));
    };
}
export function resultMapErrTo(value) {
    return function (source) {
        return source.pipe(map(function (result) { return result.mapErr(function () { return value; }); }));
    };
}
export function elseMap(mapper) {
    return function (source) {
        return source.pipe(map(function (result) {
            if (result.err) {
                return mapper(result.val);
            }
            else {
                return result.val;
            }
        }));
    };
}
export function elseMapTo(value) {
    return function (source) {
        return source.pipe(map(function (result) {
            if (result.err) {
                return value;
            }
            else {
                return result.val;
            }
        }));
    };
}
export function resultSwitchMap(mapper) {
    return function (source) {
        return source.pipe(switchMap(function (result) {
            if (result.ok) {
                return mapper(result.val);
            }
            else {
                return of(result);
            }
        }), map(function (result) {
            if (Result.isResult(result)) {
                return result;
            }
            else {
                return new Ok(result);
            }
        }));
    };
}
export function resultMergeMap(mapper) {
    return function (source) {
        return source.pipe(mergeMap(function (result) {
            if (result.ok) {
                return mapper(result.val);
            }
            else {
                return of(result);
            }
        }), map(function (result) {
            if (Result.isResult(result)) {
                return result;
            }
            else {
                return new Ok(result);
            }
        }));
    };
}
export function filterResultOk() {
    return function (source) {
        return source.pipe(filter(function (result) { return result.ok; }), map(function (result) { return result.val; }));
    };
}
export function filterResultErr() {
    return function (source) {
        return source.pipe(filter(function (result) { return result.err; }), map(function (result) { return result.val; }));
    };
}
export function tapResultErr(tapFn) {
    return function (source) {
        return source.pipe(tap(function (r) {
            if (!r.ok) {
                tapFn(r.val);
            }
        }));
    };
}
export function tapResultOk(tapFn) {
    return function (source) {
        return source.pipe(tap(function (r) {
            if (r.ok) {
                tapFn(r.val);
            }
        }));
    };
}
//# sourceMappingURL=index.js.map