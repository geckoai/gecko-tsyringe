var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
define(["require", "exports", "@geckoai/class-mirror", "./decorates", "./tsyringe/dependency-container", "./tsyringe/reflection-helpers", "./tsyringe/decorators"], function (require, exports, class_mirror_1, decorates_1, dependency_container_1, reflection_helpers_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.injectable = exports.Injectable = exports.Module = exports.applyClassDecorators = exports.InjectWithTransform = exports.InjectAllWithTransform = exports.InjectAll = exports.Inject = exports.inject = void 0;
    Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return decorators_1.inject; } });
    Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return decorators_1.inject; } });
    Object.defineProperty(exports, "InjectAll", { enumerable: true, get: function () { return decorators_1.injectAll; } });
    Object.defineProperty(exports, "InjectAllWithTransform", { enumerable: true, get: function () { return decorators_1.injectAllWithTransform; } });
    Object.defineProperty(exports, "InjectWithTransform", { enumerable: true, get: function () { return decorators_1.injectWithTransform; } });
    function applyClassDecorators() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (target) { return args.forEach(function (arg) { return arg(target); }); };
    }
    exports.applyClassDecorators = applyClassDecorators;
    function Module() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var arg = args[0];
        if (typeof arg === 'function') {
            dependency_container_1.typeInfo.set(arg, (0, reflection_helpers_1.getParamInfo)(arg));
            return class_mirror_1.ClassMirror.createDecorator(new decorates_1.ModuleDecorate(null))(arg);
        }
        return function (target) {
            dependency_container_1.typeInfo.set(target, (0, reflection_helpers_1.getParamInfo)(target));
            var _a = __read(args, 2), metadata = _a[0], scope = _a[1];
            return applyClassDecorators(class_mirror_1.ClassMirror.createDecorator(new decorates_1.ModuleDecorate(metadata)), class_mirror_1.ClassMirror.createDecorator(new decorates_1.LifecycleDecorate(scope)))(target);
        };
    }
    exports.Module = Module;
    function Injectable() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var arg = args[0];
        if (typeof arg === 'function') {
            dependency_container_1.typeInfo.set(arg, (0, reflection_helpers_1.getParamInfo)(arg));
            return arg;
        }
        return function (target) {
            dependency_container_1.typeInfo.set(target, (0, reflection_helpers_1.getParamInfo)(target));
            return class_mirror_1.ClassMirror.createDecorator(new decorates_1.LifecycleDecorate(arg))(target);
        };
    }
    exports.Injectable = Injectable;
    exports.injectable = Injectable;
});
