define(["require", "exports", "./class-provider", "./factory-provider", "./injection-token", "./token-provider", "./value-provider"], function (require, exports, class_provider_1, factory_provider_1, injection_token_1, token_provider_1, value_provider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isValueProvider = exports.isTokenProvider = exports.isNormalToken = exports.isFactoryProvider = exports.isClassProvider = void 0;
    Object.defineProperty(exports, "isClassProvider", { enumerable: true, get: function () { return class_provider_1.isClassProvider; } });
    Object.defineProperty(exports, "isFactoryProvider", { enumerable: true, get: function () { return factory_provider_1.isFactoryProvider; } });
    Object.defineProperty(exports, "isNormalToken", { enumerable: true, get: function () { return injection_token_1.isNormalToken; } });
    Object.defineProperty(exports, "isTokenProvider", { enumerable: true, get: function () { return token_provider_1.isTokenProvider; } });
    Object.defineProperty(exports, "isValueProvider", { enumerable: true, get: function () { return value_provider_1.isValueProvider; } });
});
