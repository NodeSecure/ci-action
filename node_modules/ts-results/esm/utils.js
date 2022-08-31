export function toString(val) {
    var value = String(val);
    if (value === '[object Object]') {
        try {
            value = JSON.stringify(val);
        }
        catch (_a) { }
    }
    return value;
}
//# sourceMappingURL=utils.js.map