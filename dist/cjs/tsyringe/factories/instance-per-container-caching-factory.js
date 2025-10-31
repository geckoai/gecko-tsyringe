"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function instancePerContainerCachingFactory(factoryFunc) {
    var cache = new WeakMap();
    return function (dependencyContainer) {
        var instance = cache.get(dependencyContainer);
        if (instance == undefined) {
            instance = factoryFunc(dependencyContainer);
            cache.set(dependencyContainer, instance);
        }
        return instance;
    };
}
exports.default = instancePerContainerCachingFactory;
