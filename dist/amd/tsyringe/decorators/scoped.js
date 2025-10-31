var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./injectable", "../dependency-container"], function (require, exports, injectable_1, dependency_container_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    injectable_1 = __importDefault(injectable_1);
    function scoped(lifecycle, token) {
        return function (target) {
            (0, injectable_1.default)()(target);
            dependency_container_1.instance.register(token || target, target, {
                lifecycle: lifecycle,
            });
        };
    }
    exports.default = scoped;
});
