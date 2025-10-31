var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatErrorCtor = void 0;
    function formatDependency(params, idx) {
        if (params === null) {
            return "at position #".concat(idx);
        }
        var argName = params.split(',')[idx].trim();
        return "\"".concat(argName, "\" at position #").concat(idx);
    }
    function composeErrorMessage(msg, e, indent) {
        if (indent === void 0) { indent = '    '; }
        return __spreadArray([msg], __read(e.message.split('\n').map(function (l) { return indent + l; })), false).join('\n');
    }
    function formatErrorCtor(ctor, paramIdx, error) {
        var _a = __read(ctor.toString().match(/constructor\(([\w, ]+)\)/) || [], 2), _b = _a[1], params = _b === void 0 ? null : _b;
        var dep = formatDependency(params, paramIdx);
        return composeErrorMessage("Cannot inject the dependency ".concat(dep, " of \"").concat(ctor.name, "\" constructor. Reason:"), error);
    }
    exports.formatErrorCtor = formatErrorCtor;
});
