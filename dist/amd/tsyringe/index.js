var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./types", "./decorators", "./factories", "./providers", "./lazy-helpers", "./dependency-container"], function (require, exports, types_1, decorators_1, factories_1, providers_1, lazy_helpers_1, dependency_container_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.container = exports.delay = exports.Lifecycle = void 0;
    if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
        throw new Error("tsyringe requires a reflect polyfill. Please add 'import \"reflect-metadata\"' to the top of your entry point.");
    }
    Object.defineProperty(exports, "Lifecycle", { enumerable: true, get: function () { return types_1.Lifecycle; } });
    __exportStar(decorators_1, exports);
    __exportStar(factories_1, exports);
    __exportStar(providers_1, exports);
    Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return lazy_helpers_1.delay; } });
    Object.defineProperty(exports, "container", { enumerable: true, get: function () { return dependency_container_1.instance; } });
});
