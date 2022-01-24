// Require Internal Dependencies
const { getObjectType, isTypeOf, isObjectOfType } = require("./src/utils");

/**
 * @const Primitives
 * @desc All JavaScript Primitives
 * @type {Set<String>}
 */
const Primitives = new Set(["string", "number", "boolean", "undefined", "symbol", "bigint"]);

/**
 * @const TypedArrayTypes
 * @desc All JavaScript Typed Array Types
 * @type {Set<String>}
 */
const TypedArrayTypes = new Set([
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array"
]);

function nullOrUndefined(value) {
    return value === null || typeof value === "undefined";
}

// Export all methods
module.exports = {
    undefined: isTypeOf("undefined"),
    void: isTypeOf("undefined"),
    string: isTypeOf("string"),
    number(value) {
        return !Number.isNaN(value) && isTypeOf("number")(value);
    },
    boolean: isTypeOf("boolean"),
    bool: isTypeOf("boolean"),
    symbol: isTypeOf("symbol"),
    bigint: isTypeOf("bigint"),
    func: isTypeOf("function"),
    nullValue: (value) => value === null,
    nullOrUndefined,
    array: Array.isArray,
    buffer: Buffer.isBuffer,
    primitive(value) {
        return value === null || Primitives.has(typeof value);
    },
    promise: isObjectOfType("Promise"),
    generatorFunction: isObjectOfType("GeneratorFunction"),
    asyncFunction: isObjectOfType("AsyncFunction"),
    boundFunction(value) {
        // eslint-disable-next-line no-prototype-builtins
        return isTypeOf("function")(value) && !value.hasOwnProperty("prototype");
    },
    regExp: isObjectOfType("RegExp"),
    date: isObjectOfType("Date"),
    error: isObjectOfType("Error"),
    map: isObjectOfType("Map"),
    set: isObjectOfType("Set"),
    weakMap: isObjectOfType("WeakMap"),
    weakSet: isObjectOfType("WeakSet"),
    int8Array: isObjectOfType("Int8Array"),
    uint8Array: isObjectOfType("Uint8Array"),
    uint8ClampedArray: isObjectOfType("uint8ClampedArray"),
    int16Array: isObjectOfType("int16Array"),
    uint16Array: isObjectOfType("uint16Array"),
    int32Array: isObjectOfType("int32Array"),
    uint32Array: isObjectOfType("uint32Array"),
    float32Array: isObjectOfType("float32Array"),
    float64Array: isObjectOfType("float64Array"),
    arrayBuffer: isObjectOfType("ArrayBuffer"),
    sharedArrayBuffer: isObjectOfType("SharedArrayBuffer"),
    dataView: isObjectOfType("DataView"),
    nan: (value) => Number.isNaN(value),
    integer: (value) => Number.isInteger(value),
    truthy: (value) => Boolean(value),
    falsy: (value) => !value,
    emptyString(value) {
        return typeof value === "string" && value === "";
    },
    plainObject(value) {
        if (getObjectType(value) !== "Object") {
            return false;
        }
        const prototype = Object.getPrototypeOf(value);

        return prototype === null || prototype === Object.getPrototypeOf({});
    },
    typedArray(value) {
        return TypedArrayTypes.has(getObjectType(value));
    },
    directInstanceOf(instance, focusClass) {
        return Object.getPrototypeOf(instance) === focusClass.prototype;
    },
    classObject(value) {
        return isTypeOf("function")(value) && value.toString().startsWith("class ");
    },
    object(value) {
        return !nullOrUndefined(value) && (isTypeOf("function")(value) || typeof value === "object");
    },
    iterable(value) {
        return !nullOrUndefined(value) && isTypeOf("function")(value[Symbol.iterator]);
    },
    asyncIterable(value) {
        return !nullOrUndefined(value) && isTypeOf("function")(value[Symbol.asyncIterator]);
    },
    generator(value) {
        const isFn = isTypeOf("function");

        return !nullOrUndefined(value) && isFn(value[Symbol.iterator]) && isFn(value.next) && isFn(value.throw);
    },
    utils: { getObjectType }
};
