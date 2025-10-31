var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./auto-injectable", "./inject", "./injectable", "./registry", "./singleton", "./inject-all", "./inject-all-with-transform", "./inject-with-transform", "./scoped"], function (require, exports, auto_injectable_1, inject_1, injectable_1, registry_1, singleton_1, inject_all_1, inject_all_with_transform_1, inject_with_transform_1, scoped_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scoped = exports.injectWithTransform = exports.injectAllWithTransform = exports.injectAll = exports.singleton = exports.registry = exports.injectable = exports.inject = exports.autoInjectable = void 0;
    Object.defineProperty(exports, "autoInjectable", { enumerable: true, get: function () { return __importDefault(auto_injectable_1).default; } });
    Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return __importDefault(inject_1).default; } });
    Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return __importDefault(injectable_1).default; } });
    Object.defineProperty(exports, "registry", { enumerable: true, get: function () { return __importDefault(registry_1).default; } });
    Object.defineProperty(exports, "singleton", { enumerable: true, get: function () { return __importDefault(singleton_1).default; } });
    Object.defineProperty(exports, "injectAll", { enumerable: true, get: function () { return __importDefault(inject_all_1).default; } });
    Object.defineProperty(exports, "injectAllWithTransform", { enumerable: true, get: function () { return __importDefault(inject_all_with_transform_1).default; } });
    Object.defineProperty(exports, "injectWithTransform", { enumerable: true, get: function () { return __importDefault(inject_with_transform_1).default; } });
    Object.defineProperty(exports, "scoped", { enumerable: true, get: function () { return __importDefault(scoped_1).default; } });
});
