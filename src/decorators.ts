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

import { ModuleMetadata } from './interfaces';
import { ClassMirror } from '@geckoai/class-mirror';
import { LifecycleDecorate, ModuleDecorate } from './decorates';
import { constructor, Lifecycle } from './tsyringe/types';
import { typeInfo } from './tsyringe/dependency-container';
import { getParamInfo } from './tsyringe/reflection-helpers';

export {
  inject,
  inject as Inject,
  injectAll as InjectAll,
  injectAllWithTransform as InjectAllWithTransform,
  injectWithTransform as InjectWithTransform,
} from './tsyringe/decorators';

/**
 * Apply class decorators
 * @param args The class decorators
 * @returns The class decorator
 */
export function applyClassDecorators(
  ...args: Array<(target: constructor<any>) => void>
): (target: constructor<any>) => void {
  return (target) => args.forEach((arg) => arg(target));
}

/**
 * Module decorator
 * @param target The class to be decorated
 * @returns The decorated class
 */
export function Module<TFunction extends Function>(
  target: TFunction,
): TFunction | void;

/**
 * Module decorator
 * @param metadata The module metadata
 * @param scope The scope of the module
 * @returns The class decorator
 */
export function Module(
  metadata: Partial<ModuleMetadata>,
  scope?: Lifecycle,
): ClassDecorator;
/**
 * Module decorator
 * @param args The module metadata and scope
 * @returns The class decorator
 */
export function Module(...args: unknown[]): ClassDecorator | (Function | void) {
  const arg = args[0];
  if (typeof arg === 'function') {
    typeInfo.set(arg as any, getParamInfo(arg as any));
    return ClassMirror.createDecorator(new ModuleDecorate<null>(null))(arg);
  }

  return <TFunction extends Function>(target: TFunction): TFunction | void => {
    typeInfo.set(target as any, getParamInfo(target as any));
    const [metadata, scope] = args as [Partial<ModuleMetadata>, Lifecycle];
    return applyClassDecorators(
      ClassMirror.createDecorator(new ModuleDecorate(metadata)),
      ClassMirror.createDecorator(new LifecycleDecorate(scope)),
    )(target as any);
  };
}

/**
 * Injectable decorator
 * @param target The class to be decorated
 * @returns The decorated class
 */
export function Injectable<TFunction extends Function>(
  target: TFunction,
): TFunction | void;
/**
 * Injectable decorator
 * @param scope The scope of the injectable
 * @returns The class decorator
 */
export function Injectable(scope?: Lifecycle): ClassDecorator;
export function Injectable<TFunction extends Function>(
  ...args: unknown[]
): any {
  const arg = args[0] as TFunction;
  if (typeof arg === 'function') {
    typeInfo.set(arg as any, getParamInfo(arg as any));
    return arg;
  }
  return (target: TFunction): TFunction | void => {
    typeInfo.set(target as any, getParamInfo(target as any));
    return ClassMirror.createDecorator(new LifecycleDecorate(arg))(target);
  };
}

/**
 * alias of Injectable
 */
export const injectable = Injectable;
