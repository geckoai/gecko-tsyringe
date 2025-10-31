define(["require", "exports", "../reflection-helpers"], function (require, exports, reflection_helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function inject(token, options) {
        var data = {
            token: token,
            multiple: false,
            isOptional: options && options.isOptional,
        };
        return (0, reflection_helpers_1.defineInjectionTokenMetadata)(data);
    }
    exports.default = inject;
});
