"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflection_helpers_1 = require("../reflection-helpers");
var dependency_container_1 = require("../dependency-container");
var dependency_container_2 = require("../dependency-container");
function injectable(options) {
    return function (target) {
        dependency_container_1.typeInfo.set(target, (0, reflection_helpers_1.getParamInfo)(target));
        if (options && options.token) {
            if (!Array.isArray(options.token)) {
                dependency_container_2.instance.register(options.token, target);
            }
            else {
                options.token.forEach(function (token) {
                    dependency_container_2.instance.register(token, target);
                });
            }
        }
    };
}
exports.default = injectable;
