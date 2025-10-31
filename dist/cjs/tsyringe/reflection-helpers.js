"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineInjectionTokenMetadata = exports.getParamInfo = exports.INJECTION_TOKEN_METADATA_KEY = void 0;
exports.INJECTION_TOKEN_METADATA_KEY = 'injectionTokens';
function getParamInfo(target) {
    var params = Reflect.getMetadata('design:paramtypes', target) || [];
    var injectionTokens = Reflect.getOwnMetadata(exports.INJECTION_TOKEN_METADATA_KEY, target) || {};
    Object.keys(injectionTokens).forEach(function (key) {
        params[+key] = injectionTokens[key];
    });
    return params;
}
exports.getParamInfo = getParamInfo;
function defineInjectionTokenMetadata(data, transform) {
    return function (target, _propertyKey, parameterIndex) {
        var descriptors = Reflect.getOwnMetadata(exports.INJECTION_TOKEN_METADATA_KEY, target) || {};
        descriptors[parameterIndex] = transform
            ? {
                token: data,
                transform: transform.transformToken,
                transformArgs: transform.args || [],
            }
            : data;
        Reflect.defineMetadata(exports.INJECTION_TOKEN_METADATA_KEY, descriptors, target);
    };
}
exports.defineInjectionTokenMetadata = defineInjectionTokenMetadata;
