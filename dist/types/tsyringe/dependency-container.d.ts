import DependencyContainer, { PostResolutionInterceptorCallback, PreResolutionInterceptorCallback } from './types/dependency-container';
import Provider from './providers/provider';
import FactoryProvider from './providers/factory-provider';
import InjectionToken, { TokenDescriptor } from './providers/injection-token';
import TokenProvider from './providers/token-provider';
import ValueProvider from './providers/value-provider';
import ClassProvider from './providers/class-provider';
import RegistrationOptions from './types/registration-options';
import constructor from './types/constructor';
import ResolutionContext from './resolution-context';
import InterceptorOptions from './types/interceptor-options';
export type Registration<T = any> = {
    provider: Provider<T>;
    options: RegistrationOptions;
    instance?: T;
};
export type ParamInfo = TokenDescriptor | InjectionToken<any>;
export declare const typeInfo: Map<constructor<any>, ParamInfo[]>;
/** Dependency Container */
export declare class InternalDependencyContainer implements DependencyContainer {
    private parent?;
    private _registry;
    private interceptors;
    private disposed;
    private disposables;
    constructor(parent?: InternalDependencyContainer);
    /**
     * Register a dependency provider.
     *
     * @param provider {Provider} The dependency provider
     */
    register<T>(token: InjectionToken<T>, provider: ValueProvider<T>): InternalDependencyContainer;
    register<T>(token: InjectionToken<T>, provider: FactoryProvider<T>): InternalDependencyContainer;
    register<T>(token: InjectionToken<T>, provider: TokenProvider<T>, options?: RegistrationOptions): InternalDependencyContainer;
    register<T>(token: InjectionToken<T>, provider: ClassProvider<T>, options?: RegistrationOptions): InternalDependencyContainer;
    register<T>(token: InjectionToken<T>, provider: constructor<T>, options?: RegistrationOptions): InternalDependencyContainer;
    registerType<T>(from: InjectionToken<T>, to: InjectionToken<T>): InternalDependencyContainer;
    registerInstance<T>(token: InjectionToken<T>, instance: T): InternalDependencyContainer;
    registerSingleton<T>(from: InjectionToken<T>, to: InjectionToken<T>): InternalDependencyContainer;
    registerSingleton<T>(token: constructor<T>, to?: constructor<any>): InternalDependencyContainer;
    resolve<T>(token: InjectionToken<T>, context?: ResolutionContext, isOptional?: boolean): T;
    private executePreResolutionInterceptor;
    private executePostResolutionInterceptor;
    resolveRegistration<T>(registration: Registration, context: ResolutionContext): T;
    resolveAll<T>(token: InjectionToken<T>, context?: ResolutionContext, isOptional?: boolean): T[];
    isRegistered<T>(token: InjectionToken<T>, recursive?: boolean): boolean;
    reset(): void;
    clearInstances(): void;
    createChildContainer(): DependencyContainer;
    beforeResolution<T>(token: InjectionToken<T>, callback: PreResolutionInterceptorCallback<T>, options?: InterceptorOptions): void;
    afterResolution<T>(token: InjectionToken<T>, callback: PostResolutionInterceptorCallback<T>, options?: InterceptorOptions): void;
    dispose(): Promise<void>;
    private getRegistration;
    private getAllRegistrations;
    private construct;
    private resolveParams;
    private ensureNotDisposed;
}
export declare const instance: DependencyContainer;
export default instance;
