"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var reflection_helpers_1 = require("../reflection-helpers");
var dependency_container_1 = require("../dependency-container");
var injection_token_1 = require("../providers/injection-token");
var error_helpers_1 = require("../error-helpers");
function autoInjectable() {
    return function (target) {
        var paramInfo = (0, reflection_helpers_1.getParamInfo)(target);
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, __spreadArray([], __read(args.concat(paramInfo.slice(args.length).map(function (type, index) {
                    var _a, _b, _c;
                    try {
                        if ((0, injection_token_1.isTokenDescriptor)(type)) {
                            if ((0, injection_token_1.isTransformDescriptor)(type)) {
                                return type.multiple
                                    ? (_a = dependency_container_1.instance
                                        .resolve(type.transform))
                                        .transform.apply(_a, __spreadArray([dependency_container_1.instance.resolveAll(type.token)], __read(type.transformArgs), false)) : (_b = dependency_container_1.instance
                                    .resolve(type.transform))
                                    .transform.apply(_b, __spreadArray([dependency_container_1.instance.resolve(type.token)], __read(type.transformArgs), false));
                            }
                            else {
                                return type.multiple
                                    ? dependency_container_1.instance.resolveAll(type.token)
                                    : dependency_container_1.instance.resolve(type.token);
                            }
                        }
                        else if ((0, injection_token_1.isTransformDescriptor)(type)) {
                            return (_c = dependency_container_1.instance
                                .resolve(type.transform))
                                .transform.apply(_c, __spreadArray([dependency_container_1.instance.resolve(type.token)], __read(type.transformArgs), false));
                        }
                        return dependency_container_1.instance.resolve(type);
                    }
                    catch (e) {
                        var argIndex = index + args.length;
                        throw new Error((0, error_helpers_1.formatErrorCtor)(target, argIndex, e));
                    }
                }))), false)) || this;
            }
            return class_1;
        }(target));
    };
}
exports.default = autoInjectable;
