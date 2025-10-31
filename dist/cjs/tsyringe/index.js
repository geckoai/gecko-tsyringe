"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.delay = exports.Lifecycle = void 0;
if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
    throw new Error("tsyringe requires a reflect polyfill. Please add 'import \"reflect-metadata\"' to the top of your entry point.");
}
var types_1 = require("./types");
Object.defineProperty(exports, "Lifecycle", { enumerable: true, get: function () { return types_1.Lifecycle; } });
__exportStar(require("./decorators"), exports);
__exportStar(require("./factories"), exports);
__exportStar(require("./providers"), exports);
var lazy_helpers_1 = require("./lazy-helpers");
Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return lazy_helpers_1.delay; } });
var dependency_container_1 = require("./dependency-container");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return dependency_container_1.instance; } });
