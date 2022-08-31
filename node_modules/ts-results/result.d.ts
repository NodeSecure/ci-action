import { Option } from './option';
interface BaseResult<T, E> extends Iterable<T extends Iterable<infer U> ? U : never> {
    /** `true` when the result is Ok */ readonly ok: boolean;
    /** `true` when the result is Err */ readonly err: boolean;
    /**
     * Returns the contained `Ok` value, if exists.  Throws an error if not.
     * @param msg the message to throw if no Ok value.
     */
    expect(msg: string): T;
    /**
     * Returns the contained `Ok` value.
     * Because this function may throw, its use is generally discouraged.
     * Instead, prefer to handle the `Err` case explicitly.
     *
     * Throws if the value is an `Err`, with a message provided by the `Err`'s value.
     */
    unwrap(): T;
    /**
     * Returns the contained `Ok` value or a provided default.
     *
     *  @see unwrapOr
     *  @deprecated in favor of unwrapOr
     */
    else<T2>(val: T2): T | T2;
    /**
     * Returns the contained `Ok` value or a provided default.
     *
     *  (This is the `unwrap_or` in rust)
     */
    unwrapOr<T2>(val: T2): T | T2;
    /**
     * Calls `mapper` if the result is `Ok`, otherwise returns the `Err` value of self.
     * This function can be used for control flow based on `Result` values.
     */
    andThen<T2>(mapper: (val: T) => Ok<T2>): Result<T2, E>;
    andThen<E2>(mapper: (val: T) => Err<E2>): Result<T, E | E2>;
    andThen<T2, E2>(mapper: (val: T) => Result<T2, E2>): Result<T2, E | E2>;
    andThen<T2, E2>(mapper: (val: T) => Result<T2, E2>): Result<T2, E | E2>;
    /**
     * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value,
     * leaving an `Err` value untouched.
     *
     * This function can be used to compose the results of two functions.
     */
    map<U>(mapper: (val: T) => U): Result<U, E>;
    /**
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value,
     * leaving an `Ok` value untouched.
     *
     * This function can be used to pass through a successful result while handling an error.
     */
    mapErr<F>(mapper: (val: E) => F): Result<T, F>;
    /**
     *  Converts from `Result<T, E>` to `Option<T>`, discarding the error if any
     *
     *  Similar to rust's `ok` method
     */
    toOption(): Option<T>;
}
/**
 * Contains the error value
 */
export declare class ErrImpl<E> implements BaseResult<never, E> {
    /** An empty Err */
    static readonly EMPTY: ErrImpl<void>;
    readonly ok: false;
    readonly err: true;
    readonly val: E;
    private readonly _stack;
    [Symbol.iterator](): Iterator<never, never, any>;
    constructor(val: E);
    /**
     * @deprecated in favor of unwrapOr
     * @see unwrapOr
     */
    else<T2>(val: T2): T2;
    unwrapOr<T2>(val: T2): T2;
    expect(msg: string): never;
    unwrap(): never;
    map(_mapper: unknown): Err<E>;
    andThen(op: unknown): Err<E>;
    mapErr<E2>(mapper: (err: E) => E2): Err<E2>;
    toOption(): Option<never>;
    toString(): string;
    get stack(): string | undefined;
}
export declare const Err: typeof ErrImpl & (<E>(err: E) => Err<E>);
export declare type Err<E> = ErrImpl<E>;
/**
 * Contains the success value
 */
export declare class OkImpl<T> implements BaseResult<T, never> {
    static readonly EMPTY: OkImpl<void>;
    readonly ok: true;
    readonly err: false;
    readonly val: T;
    /**
     * Helper function if you know you have an Ok<T> and T is iterable
     */
    [Symbol.iterator](): Iterator<T extends Iterable<infer U> ? U : never>;
    constructor(val: T);
    /**
     * @see unwrapOr
     * @deprecated in favor of unwrapOr
     */
    else(_val: unknown): T;
    unwrapOr(_val: unknown): T;
    expect(_msg: string): T;
    unwrap(): T;
    map<T2>(mapper: (val: T) => T2): Ok<T2>;
    andThen<T2>(mapper: (val: T) => Ok<T2>): Ok<T2>;
    andThen<E2>(mapper: (val: T) => Err<E2>): Result<T, E2>;
    andThen<T2, E2>(mapper: (val: T) => Result<T2, E2>): Result<T2, E2>;
    mapErr(_mapper: unknown): Ok<T>;
    toOption(): Option<T>;
    /**
     * Returns the contained `Ok` value, but never throws.
     * Unlike `unwrap()`, this method doesn't throw and is only callable on an Ok<T>
     *
     * Therefore, it can be used instead of `unwrap()` as a maintainability safeguard
     * that will fail to compile if the error type of the Result is later changed to an error that can actually occur.
     *
     * (this is the `into_ok()` in rust)
     */
    safeUnwrap(): T;
    toString(): string;
}
export declare const Ok: typeof OkImpl & (<T>(val: T) => Ok<T>);
export declare type Ok<T> = OkImpl<T>;
export declare type Result<T, E> = Ok<T> | Err<E>;
export declare type ResultOkType<T extends Result<any, any>> = T extends Ok<infer U> ? U : never;
export declare type ResultErrType<T> = T extends Err<infer U> ? U : never;
export declare type ResultOkTypes<T extends Result<any, any>[]> = {
    [key in keyof T]: T[key] extends Result<infer U, any> ? ResultOkType<T[key]> : never;
};
export declare type ResultErrTypes<T extends Result<any, any>[]> = {
    [key in keyof T]: T[key] extends Result<infer U, any> ? ResultErrType<T[key]> : never;
};
export declare namespace Result {
    /**
     * Parse a set of `Result`s, returning an array of all `Ok` values.
     * Short circuits with the first `Err` found, if any
     */
    function all<T extends Result<any, any>[]>(...results: T): Result<ResultOkTypes<T>, ResultErrTypes<T>[number]>;
    /**
     * Parse a set of `Result`s, short-circuits when an input value is `Ok`.
     * If no `Ok` is found, returns an `Err` containing the collected error values
     */
    function any<T extends Result<any, any>[]>(...results: T): Result<ResultOkTypes<T>[number], ResultErrTypes<T>>;
    /**
     * Wrap an operation that may throw an Error (`try-catch` style) into checked exception style
     * @param op The operation function
     */
    function wrap<T, E = unknown>(op: () => T): Result<T, E>;
    /**
     * Wrap an async operation that may throw an Error (`try-catch` style) into checked exception style
     * @param op The operation function
     */
    function wrapAsync<T, E = unknown>(op: () => Promise<T>): Promise<Result<T, E>>;
    function isResult<T = any, E = any>(val: unknown): val is Result<T, E>;
}
export {};
//# sourceMappingURL=result.d.ts.map