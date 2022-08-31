import { Result, Ok, Err } from './result';
interface BaseOption<T> extends Iterable<T extends Iterable<infer U> ? U : never> {
    /** `true` when the Option is Some */ readonly some: boolean;
    /** `true` when the Option is None */ readonly none: boolean;
    /**
     * Returns the contained `Some` value, if exists.  Throws an error if not.
     * @param msg the message to throw if no Some value.
     */
    expect(msg: string): T;
    /**
     * Returns the contained `Some` value.
     * Because this function may throw, its use is generally discouraged.
     * Instead, prefer to handle the `None` case explicitly.
     *
     * Throws if the value is `None`.
     */
    unwrap(): T;
    /**
     * Returns the contained `Some` value or a provided default.
     *
     *  (This is the `unwrap_or` in rust)
     */
    unwrapOr<T2>(val: T2): T | T2;
    /**
     * Calls `mapper` if the Option is `Some`, otherwise returns `None`.
     * This function can be used for control flow based on `Option` values.
     */
    andThen<T2>(mapper: (val: T) => Option<T2>): Option<T2>;
    /**
     * Maps an `Option<T>` to `Option<U>` by applying a function to a contained `Some` value,
     * leaving a `None` value untouched.
     *
     * This function can be used to compose the Options of two functions.
     */
    map<U>(mapper: (val: T) => U): Option<U>;
    /**
     * Maps an `Option<T>` to a `Result<T, E>`.
     */
    toResult<E>(error: E): Result<T, E>;
}
/**
 * Contains the None value
 */
declare class NoneImpl implements BaseOption<never> {
    readonly some = false;
    readonly none = true;
    [Symbol.iterator](): Iterator<never, never, any>;
    unwrapOr<T2>(val: T2): T2;
    expect(msg: string): never;
    unwrap(): never;
    map<T2>(_mapper: unknown): None;
    andThen<T2>(op: unknown): None;
    toResult<E>(error: E): Err<E>;
    toString(): string;
}
export declare const None: NoneImpl;
export declare type None = NoneImpl;
/**
 * Contains the success value
 */
declare class SomeImpl<T> implements BaseOption<T> {
    static readonly EMPTY: SomeImpl<void>;
    readonly some: true;
    readonly none: false;
    readonly val: T;
    /**
     * Helper function if you know you have an Some<T> and T is iterable
     */
    [Symbol.iterator](): Iterator<T extends Iterable<infer U> ? U : never>;
    constructor(val: T);
    unwrapOr(_val: unknown): T;
    expect(_msg: string): T;
    unwrap(): T;
    map<T2>(mapper: (val: T) => T2): Some<T2>;
    andThen<T2>(mapper: (val: T) => Option<T2>): Option<T2>;
    toResult<E>(error: E): Ok<T>;
    /**
     * Returns the contained `Some` value, but never throws.
     * Unlike `unwrap()`, this method doesn't throw and is only callable on an Some<T>
     *
     * Therefore, it can be used instead of `unwrap()` as a maintainability safeguard
     * that will fail to compile if the type of the Option is later changed to a None that can actually occur.
     *
     * (this is the `into_Some()` in rust)
     */
    safeUnwrap(): T;
    toString(): string;
}
export declare const Some: typeof SomeImpl & (<T>(val: T) => SomeImpl<T>);
export declare type Some<T> = SomeImpl<T>;
export declare type Option<T> = Some<T> | None;
export declare type OptionSomeType<T extends Option<any>> = T extends Some<infer U> ? U : never;
export declare type OptionSomeTypes<T extends Option<any>[]> = {
    [key in keyof T]: T[key] extends Option<any> ? OptionSomeType<T[key]> : never;
};
export declare namespace Option {
    /**
     * Parse a set of `Option`s, returning an array of all `Some` values.
     * Short circuits with the first `None` found, if any
     */
    function all<T extends Option<any>[]>(...options: T): Option<OptionSomeTypes<T>>;
    /**
     * Parse a set of `Option`s, short-circuits when an input value is `Some`.
     * If no `Some` is found, returns `None`.
     */
    function any<T extends Option<any>[]>(...options: T): Option<OptionSomeTypes<T>[number]>;
    function isOption<T = any>(value: unknown): value is Option<T>;
}
export {};
//# sourceMappingURL=option.d.ts.map