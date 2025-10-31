define(["require", "exports", "../reflection-helpers"], function (require, exports, reflection_helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function injectWithTransform(token, transformer) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return (0, reflection_helpers_1.defineInjectionTokenMetadata)(token, {
            transformToken: transformer,
            args: args,
        });
    }
    exports.default = injectWithTransform;
});
