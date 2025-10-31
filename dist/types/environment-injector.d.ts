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
import { ClassConstructor } from '@geckoai/class-mirror';
import { ModuleMetadata } from './interfaces';
import { DependencyContainer } from './tsyringe';
/**
 * Environment injector
 */
export declare class EnvironmentInjector<T extends ClassConstructor> {
    private target;
    private parent?;
    private _imports;
    private _providers;
    private _exports;
    readonly container: DependencyContainer;
    static readonly PARENT_CONTAINER: unique symbol;
    static readonly ROOT_CONTAINER: unique symbol;
    static createRootContainer(): DependencyContainer;
    private _origin?;
    /**
     * @param target The class to be decorated
     * @param parent The parent container
     */
    private constructor();
    /**
     * Accept from children export
     * @param token
     * @param injector
     */
    private acceptChildrenExport;
    /**
     * Run the environment injector
     * @param target The class to be decorated
     */
    static run<T extends ClassConstructor>(target: T, metadata?: Partial<ModuleMetadata>): EnvironmentInjector<T>;
    /**
     * Execute the environment injector and resolve the target class
     * @param target The class to be decorated
     */
    static execlute<T extends ClassConstructor>(target: T, metadata?: Partial<ModuleMetadata>): any;
}
