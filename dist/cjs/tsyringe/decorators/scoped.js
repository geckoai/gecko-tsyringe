"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var injectable_1 = __importDefault(require("./injectable"));
var dependency_container_1 = require("../dependency-container");
function scoped(lifecycle, token) {
    return function (target) {
        (0, injectable_1.default)()(target);
        dependency_container_1.instance.register(token || target, target, {
            lifecycle: lifecycle,
        });
    };
}
exports.default = scoped;
