declare namespace is {
    export type typeOf = (value: any) => boolean;

    // Primitives
    export function string(value: any): boolean;
    export function number(value: any): boolean;
    export function undefined(value: any): boolean;
    export function boolean(value: any): boolean;
    export function bool(value: any): boolean;
    export function nullValue(value: any): boolean;
    export function symbol(value: any): boolean;
    export function bigint(value: any): boolean;
    export function nullOrUndefined(value: any): boolean;
    export function primitive(value: any): boolean;

    // Functions
    export function func(value: any): boolean;
    export function generatorFunction(value: any): boolean;
    export function asyncFunction(value: any): boolean;
    export function boundFunction(value: any): boolean;

    // Iterable & Generator
    export function iterable(value: any): boolean;
    export function asyncIterable(value: any): boolean;
    export function generator(value: any): boolean;

    // Objects
    export function promise(value: any): boolean;
    export function classObject(value: any): boolean;
    export function array(value: any): boolean;
    export function object(value: any): boolean;
    export function plainObject(value: any): boolean;
    export function set(value: any): boolean;
    export function map(value: any): boolean;
    export function set(value: any): boolean;
    export function weakMap(value: any): boolean;
    export function weakSet(value: any): boolean;
    export function error(value: any): boolean;
    export function date(value: any): boolean;
    export function regExp(value: any): boolean;

    // TypedArray & Buffers
    export function typedArray(value: any): boolean;
    export function buffer(value: any): boolean;
    export function int8Array(value: any): boolean;
    export function uint8Array(value: any): boolean;
    export function uint8ClampedArray(value: any): boolean;
    export function int16Array(value: any): boolean;
    export function uint16Array(value: any): boolean;
    export function int32Array(value: any): boolean;
    export function uint32Array(value: any): boolean;
    export function float32Array(value: any): boolean;
    export function float64Array(value: any): boolean;
    export function arrayBuffer(value: any): boolean;
    export function sharedArrayBuffer(value: any): boolean;
    export function dataView(value: any): boolean;

    // Misc
    export function falsy(value: any): boolean;
    export function truthy(value: any): boolean;
    export function nan(value: any): boolean;
    export function integer(value: any): boolean;
    export function directInstanceOf(instance: any, focus: any): boolean;
    export function emptyString(value: string): boolean;

    export namespace utils {
        export function getObjectType(value: any): string;
    }
}

export as namespace is;
export = is;
