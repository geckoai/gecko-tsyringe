"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.DelayedConstructor = void 0;
var DelayedConstructor = (function () {
    function DelayedConstructor(wrap) {
        this.wrap = wrap;
        this.reflectMethods = [
            'get',
            'getPrototypeOf',
            'setPrototypeOf',
            'getOwnPropertyDescriptor',
            'defineProperty',
            'has',
            'set',
            'deleteProperty',
            'apply',
            'construct',
            'ownKeys',
        ];
    }
    DelayedConstructor.prototype.createProxy = function (createObject) {
        var _this = this;
        var target = {};
        var init = false;
        var value;
        var delayedObject = function () {
            if (!init) {
                value = createObject(_this.wrap());
                init = true;
            }
            return value;
        };
        return new Proxy(target, this.createHandler(delayedObject));
    };
    DelayedConstructor.prototype.createHandler = function (delayedObject) {
        var handler = {};
        var install = function (name) {
            handler[name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                args[0] = delayedObject();
                var method = Reflect[name];
                return method.apply(void 0, __spreadArray([], __read(args), false));
            };
        };
        this.reflectMethods.forEach(install);
        return handler;
    };
    return DelayedConstructor;
}());
exports.DelayedConstructor = DelayedConstructor;
function delay(wrappedConstructor) {
    if (typeof wrappedConstructor === 'undefined') {
        throw new Error('Attempt to `delay` undefined. Constructor must be wrapped in a callback');
    }
    return new DelayedConstructor(wrappedConstructor);
}
exports.delay = delay;
