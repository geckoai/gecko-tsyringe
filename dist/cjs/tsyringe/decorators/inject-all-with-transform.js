"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflection_helpers_1 = require("../reflection-helpers");
function injectAllWithTransform(token, transformer) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var data = {
        token: token,
        multiple: true,
        transform: transformer,
        transformArgs: args,
    };
    return (0, reflection_helpers_1.defineInjectionTokenMetadata)(data);
}
exports.default = injectAllWithTransform;
