"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflection_helpers_1 = require("../reflection-helpers");
function injectAll(token, options) {
    var data = {
        token: token,
        multiple: true,
        isOptional: options && options.isOptional,
    };
    return (0, reflection_helpers_1.defineInjectionTokenMetadata)(data);
}
exports.default = injectAll;
