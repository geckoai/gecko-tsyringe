var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { isClassProvider, isFactoryProvider, isNormalToken, isTokenProvider, isValueProvider, } from './providers';
import { isProvider } from './providers/provider';
import { isConstructorToken, isTokenDescriptor, isTransformDescriptor, } from './providers/injection-token';
import Registry from './registry';
import Lifecycle from './types/lifecycle';
import ResolutionContext from './resolution-context';
import { formatErrorCtor } from './error-helpers';
import { DelayedConstructor } from './lazy-helpers';
import { isDisposable } from './types/disposable';
import Interceptors from './interceptors';
export var typeInfo = new Map();
var InternalDependencyContainer = (function () {
    function InternalDependencyContainer(parent) {
        this.parent = parent;
        this._registry = new Registry();
        this.interceptors = new Interceptors();
        this.disposed = false;
        this.disposables = new Set();
    }
    InternalDependencyContainer.prototype.register = function (token, providerOrConstructor, options) {
        if (options === void 0) { options = { lifecycle: Lifecycle.Transient }; }
        this.ensureNotDisposed();
        var provider;
        if (!isProvider(providerOrConstructor)) {
            provider = { useClass: providerOrConstructor };
        }
        else {
            provider = providerOrConstructor;
        }
        if (isTokenProvider(provider)) {
            var path = [token];
            var tokenProvider = provider;
            while (tokenProvider != null) {
                var currentToken = tokenProvider.useToken;
                if (path.includes(currentToken)) {
                    throw new Error("Token registration cycle detected! ".concat(__spreadArray(__spreadArray([], __read(path), false), [currentToken], false).join(' -> ')));
                }
                path.push(currentToken);
                var registration = this._registry.get(currentToken);
                if (registration && isTokenProvider(registration.provider)) {
                    tokenProvider = registration.provider;
                }
                else {
                    tokenProvider = null;
                }
            }
        }
        if (options.lifecycle === Lifecycle.Singleton ||
            options.lifecycle == Lifecycle.ContainerScoped ||
            options.lifecycle == Lifecycle.ResolutionScoped) {
            if (isValueProvider(provider) || isFactoryProvider(provider)) {
                throw new Error("Cannot use lifecycle \"".concat(Lifecycle[options.lifecycle], "\" with ValueProviders or FactoryProviders"));
            }
        }
        this._registry.set(token, { provider: provider, options: options });
        return this;
    };
    InternalDependencyContainer.prototype.registerType = function (from, to) {
        this.ensureNotDisposed();
        if (isNormalToken(to)) {
            return this.register(from, {
                useToken: to,
            });
        }
        return this.register(from, {
            useClass: to,
        });
    };
    InternalDependencyContainer.prototype.registerInstance = function (token, instance) {
        this.ensureNotDisposed();
        return this.register(token, {
            useValue: instance,
        });
    };
    InternalDependencyContainer.prototype.registerSingleton = function (from, to) {
        this.ensureNotDisposed();
        if (isNormalToken(from)) {
            if (isNormalToken(to)) {
                return this.register(from, {
                    useToken: to,
                }, { lifecycle: Lifecycle.Singleton });
            }
            else if (to) {
                return this.register(from, {
                    useClass: to,
                }, { lifecycle: Lifecycle.Singleton });
            }
            throw new Error('Cannot register a type name as a singleton without a "to" token');
        }
        var useClass = from;
        if (to && !isNormalToken(to)) {
            useClass = to;
        }
        return this.register(from, {
            useClass: useClass,
        }, { lifecycle: Lifecycle.Singleton });
    };
    InternalDependencyContainer.prototype.resolve = function (token, context, isOptional) {
        if (context === void 0) { context = new ResolutionContext(); }
        if (isOptional === void 0) { isOptional = false; }
        this.ensureNotDisposed();
        var registration = this.getRegistration(token);
        if (!registration) {
            if (isOptional) {
                return undefined;
            }
            throw new Error("Attempted to resolve unregistered dependency token: \"".concat(token.toString(), "\""));
        }
        this.executePreResolutionInterceptor(token, 'Single');
        if (registration) {
            var result = this.resolveRegistration(registration, context);
            this.executePostResolutionInterceptor(token, result, 'Single');
            return result;
        }
        if (isConstructorToken(token)) {
            var result = this.construct(token, context);
            this.executePostResolutionInterceptor(token, result, 'Single');
            return result;
        }
        throw new Error('Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.');
    };
    InternalDependencyContainer.prototype.executePreResolutionInterceptor = function (token, resolutionType) {
        var e_1, _a;
        if (this.interceptors.preResolution.has(token)) {
            var remainingInterceptors = [];
            try {
                for (var _b = __values(this.interceptors.preResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var interceptor = _c.value;
                    if (interceptor.options.frequency != 'Once') {
                        remainingInterceptors.push(interceptor);
                    }
                    interceptor.callback(token, resolutionType);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.interceptors.preResolution.setAll(token, remainingInterceptors);
        }
    };
    InternalDependencyContainer.prototype.executePostResolutionInterceptor = function (token, result, resolutionType) {
        var e_2, _a;
        if (this.interceptors.postResolution.has(token)) {
            var remainingInterceptors = [];
            try {
                for (var _b = __values(this.interceptors.postResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var interceptor = _c.value;
                    if (interceptor.options.frequency != 'Once') {
                        remainingInterceptors.push(interceptor);
                    }
                    interceptor.callback(token, result, resolutionType);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.interceptors.postResolution.setAll(token, remainingInterceptors);
        }
    };
    InternalDependencyContainer.prototype.resolveRegistration = function (registration, context) {
        this.ensureNotDisposed();
        if (registration.options.lifecycle === Lifecycle.ResolutionScoped &&
            context.scopedResolutions.has(registration)) {
            return context.scopedResolutions.get(registration);
        }
        var isSingleton = registration.options.lifecycle === Lifecycle.Singleton;
        var isContainerScoped = registration.options.lifecycle === Lifecycle.ContainerScoped;
        var returnInstance = isSingleton || isContainerScoped;
        var resolved;
        if (isValueProvider(registration.provider)) {
            resolved = registration.provider.useValue;
        }
        else if (isTokenProvider(registration.provider)) {
            resolved = returnInstance
                ? registration.instance ||
                    (registration.instance = this.resolve(registration.provider.useToken, context))
                : this.resolve(registration.provider.useToken, context);
        }
        else if (isClassProvider(registration.provider)) {
            resolved = returnInstance
                ? registration.instance ||
                    (registration.instance = this.construct(registration.provider.useClass, context))
                : this.construct(registration.provider.useClass, context);
        }
        else if (isFactoryProvider(registration.provider)) {
            resolved = registration.provider.useFactory(this);
        }
        else {
            resolved = this.construct(registration.provider, context);
        }
        if (registration.options.lifecycle === Lifecycle.ResolutionScoped) {
            context.scopedResolutions.set(registration, resolved);
        }
        return resolved;
    };
    InternalDependencyContainer.prototype.resolveAll = function (token, context, isOptional) {
        var _this = this;
        if (context === void 0) { context = new ResolutionContext(); }
        if (isOptional === void 0) { isOptional = false; }
        this.ensureNotDisposed();
        var registrations = this.getAllRegistrations(token);
        if (!registrations) {
            if (isOptional) {
                return [];
            }
            throw new Error("Attempted to resolve unregistered dependency token: \"".concat(token.toString(), "\""));
        }
        this.executePreResolutionInterceptor(token, 'All');
        if (registrations) {
            var result_1 = registrations.map(function (item) {
                return _this.resolveRegistration(item, context);
            });
            this.executePostResolutionInterceptor(token, result_1, 'All');
            return result_1;
        }
        var result = [this.construct(token, context)];
        this.executePostResolutionInterceptor(token, result, 'All');
        return result;
    };
    InternalDependencyContainer.prototype.isRegistered = function (token, recursive) {
        if (recursive === void 0) { recursive = false; }
        this.ensureNotDisposed();
        return (this._registry.has(token) ||
            (recursive &&
                (this.parent || false) &&
                this.parent.isRegistered(token, true)));
    };
    InternalDependencyContainer.prototype.reset = function () {
        this.ensureNotDisposed();
        this._registry.clear();
        this.interceptors.preResolution.clear();
        this.interceptors.postResolution.clear();
    };
    InternalDependencyContainer.prototype.clearInstances = function () {
        var e_3, _a;
        this.ensureNotDisposed();
        try {
            for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
                this._registry.setAll(token, registrations
                    .filter(function (registration) { return !isValueProvider(registration.provider); })
                    .map(function (registration) {
                    registration.instance = undefined;
                    return registration;
                }));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    InternalDependencyContainer.prototype.createChildContainer = function () {
        var e_4, _a;
        this.ensureNotDisposed();
        var childContainer = new InternalDependencyContainer(this);
        try {
            for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
                if (registrations.some(function (_a) {
                    var options = _a.options;
                    return options.lifecycle === Lifecycle.ContainerScoped;
                })) {
                    childContainer._registry.setAll(token, registrations.map(function (registration) {
                        if (registration.options.lifecycle === Lifecycle.ContainerScoped) {
                            return {
                                provider: registration.provider,
                                options: registration.options,
                            };
                        }
                        return registration;
                    }));
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return childContainer;
    };
    InternalDependencyContainer.prototype.beforeResolution = function (token, callback, options) {
        if (options === void 0) { options = { frequency: 'Always' }; }
        this.interceptors.preResolution.set(token, {
            callback: callback,
            options: options,
        });
    };
    InternalDependencyContainer.prototype.afterResolution = function (token, callback, options) {
        if (options === void 0) { options = { frequency: 'Always' }; }
        this.interceptors.postResolution.set(token, {
            callback: callback,
            options: options,
        });
    };
    InternalDependencyContainer.prototype.dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disposed = true;
                        promises = [];
                        this.disposables.forEach(function (disposable) {
                            var maybePromise = disposable.dispose();
                            if (maybePromise) {
                                promises.push(maybePromise);
                            }
                        });
                        return [4, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    InternalDependencyContainer.prototype.getRegistration = function (token) {
        if (this.isRegistered(token)) {
            return this._registry.get(token);
        }
        if (this.parent) {
            return this.parent.getRegistration(token);
        }
        return null;
    };
    InternalDependencyContainer.prototype.getAllRegistrations = function (token) {
        if (this.isRegistered(token)) {
            return this._registry.getAll(token);
        }
        if (this.parent) {
            return this.parent.getAllRegistrations(token);
        }
        return null;
    };
    InternalDependencyContainer.prototype.construct = function (ctor, context) {
        var _this = this;
        if (ctor instanceof DelayedConstructor) {
            return ctor.createProxy(function (target) {
                return _this.resolve(target, context);
            });
        }
        var instance = (function () {
            var paramInfo = typeInfo.get(ctor);
            if (!paramInfo || paramInfo.length === 0) {
                if (ctor.length === 0) {
                    return new ctor();
                }
                else {
                    throw new Error("TypeInfo not known for \"".concat(ctor.name, "\""));
                }
            }
            var params = paramInfo.map(_this.resolveParams(context, ctor));
            return new (ctor.bind.apply(ctor, __spreadArray([void 0], __read(params), false)))();
        })();
        if (isDisposable(instance)) {
            this.disposables.add(instance);
        }
        return instance;
    };
    InternalDependencyContainer.prototype.resolveParams = function (context, ctor) {
        var _this = this;
        return function (param, idx) {
            var _a, _b, _c;
            try {
                if (isTokenDescriptor(param)) {
                    if (isTransformDescriptor(param)) {
                        return param.multiple
                            ? (_a = _this.resolve(param.transform)).transform.apply(_a, __spreadArray([_this.resolveAll(param.token, new ResolutionContext(), param.isOptional)], __read(param.transformArgs), false)) : (_b = _this.resolve(param.transform)).transform.apply(_b, __spreadArray([_this.resolve(param.token, context, param.isOptional)], __read(param.transformArgs), false));
                    }
                    else {
                        return param.multiple
                            ? _this.resolveAll(param.token, new ResolutionContext(), param.isOptional)
                            : _this.resolve(param.token, context, param.isOptional);
                    }
                }
                else if (isTransformDescriptor(param)) {
                    return (_c = _this.resolve(param.transform, context)).transform.apply(_c, __spreadArray([_this.resolve(param.token, context)], __read(param.transformArgs), false));
                }
                return _this.resolve(param, context);
            }
            catch (e) {
                throw new Error(formatErrorCtor(ctor, idx, e));
            }
        };
    };
    InternalDependencyContainer.prototype.ensureNotDisposed = function () {
        if (this.disposed) {
            throw new Error('This container has been disposed, you cannot interact with a disposed container');
        }
    };
    return InternalDependencyContainer;
}());
export { InternalDependencyContainer };
export var instance = new InternalDependencyContainer();
export default instance;
