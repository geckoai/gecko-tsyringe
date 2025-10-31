import { ClassMirror } from '@geckoai/class-mirror';
import { LifecycleDecorate, ModuleDecorate } from './decorates';
import { isConstructorToken, isModuleWithProviders, isTokenWithProvider, } from './utils';
import { isClassProvider, isFactoryProvider, isNormalToken, isTokenProvider, isValueProvider, } from './tsyringe';
import { InternalDependencyContainer } from './tsyringe/dependency-container';
var EnvironmentInjector = (function () {
    function EnvironmentInjector(target, parent, metadata) {
        var _this = this;
        var _a, _b, _c;
        this.target = target;
        this.parent = parent;
        this._imports = new Set();
        this._providers = new Set();
        this._exports = new Set();
        this._origin = target;
        var mirror = ClassMirror.reflect(this.target);
        var decorates = mirror.getAllDecorates(ModuleDecorate);
        this.container =
            (parent === null || parent === void 0 ? void 0 : parent.container.createChildContainer()) ||
                EnvironmentInjector.createRootContainer();
        this.container.registerInstance(EnvironmentInjector.PARENT_CONTAINER, this);
        this.container.registerInstance(ClassMirror, mirror);
        var _d = this, _imports = _d._imports, _providers = _d._providers, _exports = _d._exports, container = _d.container;
        if (metadata) {
            (_a = metadata.imports) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return _imports.add(item); });
            (_b = metadata.providers) === null || _b === void 0 ? void 0 : _b.forEach(function (item) { return _providers.add(item); });
            (_c = metadata.exports) === null || _c === void 0 ? void 0 : _c.forEach(function (item) { return _exports.add(item); });
        }
        decorates.forEach(function (decorate) {
            var _a, _b, _c, _d, _e, _f;
            (_b = (_a = decorate.metadata) === null || _a === void 0 ? void 0 : _a.imports) === null || _b === void 0 ? void 0 : _b.forEach(function (item) { return _imports.add(item); });
            (_d = (_c = decorate.metadata) === null || _c === void 0 ? void 0 : _c.providers) === null || _d === void 0 ? void 0 : _d.forEach(function (item) { return _providers.add(item); });
            (_f = (_e = decorate.metadata) === null || _e === void 0 ? void 0 : _e.exports) === null || _f === void 0 ? void 0 : _f.forEach(function (item) { return _exports.add(item); });
        });
        _providers.forEach(function (it) {
            if (isTokenWithProvider(it)) {
                if (isClassProvider(it)) {
                    var token_1 = it.token, useClass = it.useClass;
                    var mirror_1 = ClassMirror.reflect(useClass);
                    var decorates_1 = mirror_1.getAllDecorates(LifecycleDecorate);
                    if (decorates_1.length) {
                        decorates_1.forEach(function (d) {
                            return container.register(token_1, it, {
                                lifecycle: d.metadata,
                            });
                        });
                    }
                    else {
                        container.register(it.token, it);
                    }
                    return;
                }
                if (isValueProvider(it)) {
                    container.register(it.token, it);
                    return;
                }
                if (isFactoryProvider(it)) {
                    container.register(it.token, it);
                    return;
                }
                if (isTokenProvider(it)) {
                    container.register(it.token, it);
                    return;
                }
            }
            if (isConstructorToken(it)) {
                var mirror_2 = ClassMirror.reflect(it);
                var decorates_2 = mirror_2.getAllDecorates(LifecycleDecorate);
                if (decorates_2.length) {
                    decorates_2.forEach(function (d) {
                        return container.register(it, { useClass: it }, {
                            lifecycle: d.metadata,
                        });
                    });
                }
                else {
                    container.register(it, { useClass: it });
                }
                return;
            }
            if (isNormalToken(it)) {
                container.register(it, { useValue: it });
                return;
            }
        });
        _imports.forEach(function (imp) {
            if (isModuleWithProviders(imp)) {
                var injector_1 = new EnvironmentInjector(imp.module, _this, {
                    providers: imp.providers,
                    exports: imp.exports,
                    imports: imp.imports,
                });
                injector_1._origin = imp;
                container.register(imp.module, {
                    useFactory: function () { return injector_1.container.resolve(imp.module); },
                });
                return injector_1;
            }
            var injector = new EnvironmentInjector(imp, _this);
            injector._origin = imp;
            container.register(imp, {
                useFactory: function () { return injector.container.resolve(imp); },
            });
            return injector;
        });
        if (parent) {
            _exports.forEach(function (it) {
                if (isModuleWithProviders(it)) {
                    parent.acceptChildrenExport(it.module, _this);
                    return;
                }
                if (isTokenWithProvider(it)) {
                    parent.acceptChildrenExport(it.token, _this);
                    return;
                }
                if (isConstructorToken(it) || isNormalToken(it)) {
                    parent.acceptChildrenExport(it, _this);
                    return;
                }
            });
        }
        var lifecycles = mirror.getAllDecorates(LifecycleDecorate);
        if (lifecycles.length) {
            lifecycles.forEach(function (d) {
                return container.register(target, target, {
                    lifecycle: d.metadata,
                });
            });
        }
        else {
            container.register(target, target);
        }
    }
    EnvironmentInjector.createRootContainer = function () {
        var root = new InternalDependencyContainer();
        root.registerInstance(EnvironmentInjector.ROOT_CONTAINER, root);
        return root;
    };
    EnvironmentInjector.prototype.acceptChildrenExport = function (token, injector) {
        var _a = this, container = _a.container, parent = _a.parent, _exports = _a._exports;
        if (!container.isRegistered(token)) {
            container.register(token, {
                useFactory: function () { return injector.container.resolve(token); },
            });
        }
        if (_exports.has(injector._origin))
            parent === null || parent === void 0 ? void 0 : parent.acceptChildrenExport(token, this);
    };
    EnvironmentInjector.run = function (target, metadata) {
        return new EnvironmentInjector(target, undefined, metadata);
    };
    EnvironmentInjector.execute = function (target, metadata) {
        return new EnvironmentInjector(target, undefined, metadata).container.resolve(target);
    };
    EnvironmentInjector.PARENT_CONTAINER = Symbol('PARENT_CONTAINER');
    EnvironmentInjector.ROOT_CONTAINER = Symbol('ROOT_CONTAINER');
    return EnvironmentInjector;
}());
export { EnvironmentInjector };
