import { MonoTypeOperatorFunction, ObservableInput, OperatorFunction } from 'rxjs';
import { Result } from '../index';
export declare function resultMap<T, T2, E>(mapper: (val: T) => T2): OperatorFunction<Result<T, E>, Result<T2, E>>;
export declare function resultMapErr<T, E, E2>(mapper: (val: E) => E2): OperatorFunction<Result<T, E>, Result<T, E2>>;
export declare function resultMapTo<T, T2, E>(value: T2): OperatorFunction<Result<T, E>, Result<T2, E>>;
export declare function resultMapErrTo<T, E, E2>(value: E2): OperatorFunction<Result<T, E>, Result<T, E2>>;
export declare function elseMap<T, E, E2>(mapper: (val: E) => E2): OperatorFunction<Result<T, E>, T | E2>;
export declare function elseMapTo<T, E, E2>(value: E2): OperatorFunction<Result<T, E>, T | E2>;
export declare function resultSwitchMap<T, E, T2, E2>(mapper: (val: T) => ObservableInput<Result<T2, E2>>): OperatorFunction<Result<T, E>, Result<T2, E | E2>>;
export declare function resultSwitchMap<T, T2, E>(mapper: (val: T) => ObservableInput<T2>): OperatorFunction<Result<T, E>, Result<T2, E>>;
export declare function resultMergeMap<T, E, T2, E2>(mapper: (val: T) => ObservableInput<Result<T2, E2>>): OperatorFunction<Result<T, E>, Result<T2, E | E2>>;
export declare function resultMergeMap<T, T2, E>(mapper: (val: T) => ObservableInput<T2>): OperatorFunction<Result<T, E>, Result<T2, E>>;
export declare function filterResultOk<T, E>(): OperatorFunction<Result<T, E>, T>;
export declare function filterResultErr<T, E>(): OperatorFunction<Result<T, E>, E>;
export declare function tapResultErr<T, E>(tapFn: (err: E) => void): MonoTypeOperatorFunction<Result<T, E>>;
export declare function tapResultOk<T, E>(tapFn: (val: T) => void): MonoTypeOperatorFunction<Result<T, E>>;
//# sourceMappingURL=index.d.ts.map