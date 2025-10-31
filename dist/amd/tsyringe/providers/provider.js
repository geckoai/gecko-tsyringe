define(["require", "exports", "./class-provider", "./value-provider", "./token-provider", "./factory-provider"], function (require, exports, class_provider_1, value_provider_1, token_provider_1, factory_provider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isProvider = void 0;
    function isProvider(provider) {
        return ((0, class_provider_1.isClassProvider)(provider) ||
            (0, value_provider_1.isValueProvider)(provider) ||
            (0, token_provider_1.isTokenProvider)(provider) ||
            (0, factory_provider_1.isFactoryProvider)(provider));
    }
    exports.isProvider = isProvider;
});
