var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./instance-caching-factory", "./instance-per-container-caching-factory", "./predicate-aware-class-factory"], function (require, exports, instance_caching_factory_1, instance_per_container_caching_factory_1, predicate_aware_class_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.predicateAwareClassFactory = exports.instancePerContainerCachingFactory = exports.instanceCachingFactory = void 0;
    Object.defineProperty(exports, "instanceCachingFactory", { enumerable: true, get: function () { return __importDefault(instance_caching_factory_1).default; } });
    Object.defineProperty(exports, "instancePerContainerCachingFactory", { enumerable: true, get: function () { return __importDefault(instance_per_container_caching_factory_1).default; } });
    Object.defineProperty(exports, "predicateAwareClassFactory", { enumerable: true, get: function () { return __importDefault(predicate_aware_class_factory_1).default; } });
});
