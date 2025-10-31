define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isConstructorToken = exports.isModuleWithProviders = exports.isTokenWithProvider = void 0;
    function isTokenWithProvider(provider) {
        return provider.token !== undefined;
    }
    exports.isTokenWithProvider = isTokenWithProvider;
    function isModuleWithProviders(target) {
        return target.module !== undefined;
    }
    exports.isModuleWithProviders = isModuleWithProviders;
    function isConstructorToken(token) {
        return typeof token === 'function';
    }
    exports.isConstructorToken = isConstructorToken;
});
