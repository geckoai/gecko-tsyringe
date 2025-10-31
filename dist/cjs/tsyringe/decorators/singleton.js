"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var injectable_1 = __importDefault(require("./injectable"));
var dependency_container_1 = require("../dependency-container");
function singleton() {
    return function (target) {
        (0, injectable_1.default)()(target);
        dependency_container_1.instance.registerSingleton(target);
    };
}
exports.default = singleton;
