export function isTokenWithProvider(provider) {
    return provider.token !== undefined;
}
export function isModuleWithProviders(target) {
    return target.module !== undefined;
}
export function isConstructorToken(token) {
    return typeof token === 'function';
}
