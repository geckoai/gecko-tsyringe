/**
 * MIT License
 * Copyright (c) 2021 RanYunLong<549510622@qq.com> @geckoai/gecko-tsyringe
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { ClassConstructor, ClassMirror } from '@geckoai/class-mirror';
import { LifecycleDecorate, ModuleDecorate } from './decorates';
import {
  ModuleMetadata,
  ModuleWithProviders,
  TokenWithProvider,
} from './interfaces';

import {
  isConstructorToken,
  isModuleWithProviders,
  isTokenWithProvider,
} from './utils';
import {
  DependencyContainer,
  InjectionToken,
  isClassProvider,
  isFactoryProvider,
  isNormalToken,
  isTokenProvider,
  isValueProvider,
} from './tsyringe';
import { InternalDependencyContainer } from './tsyringe/dependency-container';

/**
 * Environment injector
 */
export class EnvironmentInjector<T extends ClassConstructor> {
  private _imports = new Set<ClassConstructor | ModuleWithProviders>();
  private _providers = new Set<TokenWithProvider | InjectionToken>();
  private _exports = new Set<
    TokenWithProvider | InjectionToken | ModuleWithProviders
  >();
  public readonly container: DependencyContainer;
  public static readonly PARENT_CONTAINER = Symbol('PARENT_CONTAINER');
  public static readonly ROOT_CONTAINER = Symbol('ROOT_CONTAINER');
  public static readonly IMPORT_INJECTORS = Symbol('IMPORT_INJECTORS');
  public static readonly CONTAINER = Symbol('CONTAINER');

  public static createRootContainer(): DependencyContainer {
    const root = new InternalDependencyContainer();
    // Register root container
    root.registerInstance(EnvironmentInjector.ROOT_CONTAINER, root);
    return root;
  }

  // The origin module
  private _origin?: any;

  /**
   * @param target The class to be decorated
   * @param parent The parent container
   */
  private constructor(
    private target: T,
    private parent?: EnvironmentInjector<any>,
    metadata?: Partial<ModuleMetadata>,
  ) {
    this._origin = target;
    const mirror = ClassMirror.reflect(this.target);
    const decorates = mirror.getAllDecorates(ModuleDecorate);
    this.container =
      parent?.container.createChildContainer() ||
      EnvironmentInjector.createRootContainer();
    // Register parent container
    this.container.registerInstance(EnvironmentInjector.PARENT_CONTAINER, this);

    this.container.registerInstance(EnvironmentInjector.IMPORT_INJECTORS, []);
    // Register class mirror
    this.container.registerInstance(ClassMirror, mirror);

    const { _imports, _providers, _exports, container } = this;
    // Register container
    this.container.registerInstance(EnvironmentInjector.CONTAINER, container);

    // Set metadata defaults
    if (metadata) {
      metadata.imports?.forEach((item) => _imports.add(item));
      metadata.providers?.forEach((item) => _providers.add(item));
      metadata.exports?.forEach((item) => _exports.add(item));
    }

    // Handle decorates
    decorates.forEach((decorate) => {
      decorate.metadata?.imports?.forEach((item) => _imports.add(item));
      decorate.metadata?.providers?.forEach((item) => _providers.add(item));
      decorate.metadata?.exports?.forEach((item) => _exports.add(item));
    });

    // Handle providers
    _providers.forEach((it) => {
      if (isTokenWithProvider(it)) {
        if (isClassProvider(it)) {
          const { token, useClass } = it;
          const mirror = ClassMirror.reflect(useClass as Function);
          const decorates = mirror.getAllDecorates(LifecycleDecorate);
          if (decorates.length) {
            decorates.forEach((d) =>
              container.register(token, it, {
                lifecycle: d.metadata,
              }),
            );
          } else {
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
        const mirror = ClassMirror.reflect(it as Function);
        const decorates = mirror.getAllDecorates(LifecycleDecorate);
        if (decorates.length) {
          decorates.forEach((d) =>
            container.register(
              it,
              { useClass: it },
              {
                lifecycle: d.metadata,
              },
            ),
          );
        } else {
          container.register(it, { useClass: it });
        }
        return;
      }
      if (isNormalToken(it)) {
        container.register(it, { useValue: it });
        return;
      }
    });

    // Handle imports
    const injectors = Array.from(_imports).map((imp) => {
      if (isModuleWithProviders(imp)) {
        const injector = new EnvironmentInjector(imp.module, this, {
          providers: imp.providers,
          exports: imp.exports,
          imports: imp.imports,
        });
        injector._origin = imp;
        container.register(imp.module, {
          useFactory: () => injector.container.resolve(imp.module),
        });
        return injector;
      }
      const injector = new EnvironmentInjector(imp, this);
      injector._origin = imp;
      container.register(imp, {
        useFactory: () => injector.container.resolve(imp),
      });
      return injector;
    });

    container.register(EnvironmentInjector.IMPORT_INJECTORS, {
      useValue: injectors,
    });

    // Handle exports
    if (parent) {
      _exports.forEach((it) => {
        // Export legacy module with providers
        if (isModuleWithProviders(it)) {
          parent.acceptChildrenExport(it.module, this);
          return;
        }

        // Export token with provider
        if (isTokenWithProvider(it)) {
          parent.acceptChildrenExport(it.token, this);
          return;
        }

        // Export constructor provider
        if (isConstructorToken(it) || isNormalToken(it)) {
          parent.acceptChildrenExport(it, this);
          return;
        }
      });
    }

    const lifecycleDecorates = mirror.getAllDecorates(LifecycleDecorate);
    if (lifecycleDecorates.length) {
      lifecycleDecorates.forEach((d) =>
        container.register(target, target, {
          lifecycle: d.metadata,
        }),
      );
    } else {
      container.register(target, target);
    }
  }

  /**
   * Accept from children export
   * @param token
   * @param injector
   */
  private acceptChildrenExport(
    token: InjectionToken<any>,
    injector: EnvironmentInjector<any>,
  ) {
    const { container, parent, _exports } = this;
    if (!container.isRegistered(token)) {
      container.register(token, {
        useFactory: () => injector.container.resolve(token),
      });
    }

    // If the children exports the token and current export children, then the token is shared parent.
    if (_exports.has(injector._origin))
      parent?.acceptChildrenExport(token, this);
  }

  /**
   * Run the environment injector
   * @param target The class to be decorated
   */
  public static run<T extends ClassConstructor>(
    target: T,
    metadata?: Partial<ModuleMetadata>,
  ) {
    return new EnvironmentInjector<T>(target, undefined, metadata);
  }

  /**
   * Execute the environment injector and resolve the target class
   * @param target The class to be decorated
   */
  public static execute<T extends ClassConstructor>(
    target: T,
    metadata?: Partial<ModuleMetadata>,
  ) {
    return new EnvironmentInjector<T>(
      target,
      undefined,
      metadata,
    ).container.resolve(target);
  }
}
