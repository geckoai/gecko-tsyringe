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
import { ClassMirror } from '@geckoai/class-mirror';
import { LifecycleDecorate, ModuleDecorate } from './decorates';
import { typeInfo } from './tsyringe/dependency-container';
import { getParamInfo } from './tsyringe/reflection-helpers';
export { inject, inject as Inject, injectAll as InjectAll, injectAllWithTransform as InjectAllWithTransform, injectWithTransform as InjectWithTransform, } from './tsyringe/decorators';
export function applyClassDecorators() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (target) { return args.forEach(function (arg) { return arg(target); }); };
}
export function Module() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var arg = args[0];
    if (typeof arg === 'function') {
        typeInfo.set(arg, getParamInfo(arg));
        return ClassMirror.createDecorator(new ModuleDecorate(null))(arg);
    }
    return function (target) {
        typeInfo.set(target, getParamInfo(target));
        var _a = __read(args, 2), metadata = _a[0], scope = _a[1];
        return applyClassDecorators(ClassMirror.createDecorator(new ModuleDecorate(metadata)), ClassMirror.createDecorator(new LifecycleDecorate(scope)))(target);
    };
}
export function Injectable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var arg = args[0];
    if (typeof arg === 'function') {
        typeInfo.set(arg, getParamInfo(arg));
        return arg;
    }
    return function (target) {
        typeInfo.set(target, getParamInfo(target));
        return ClassMirror.createDecorator(new LifecycleDecorate(arg))(target);
    };
}
export var injectable = Injectable;
