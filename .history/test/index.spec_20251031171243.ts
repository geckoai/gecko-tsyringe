import 'reflect-metadata';
import { assert } from 'chai';
import { EnvironmentInjector } from '../src';
import { Application } from '../sample/Application';
import { ExportModule, ExportService } from '../sample/ExportModule';
import { Export2Module, Export2Service } from '../sample/Export2Module';
import { ImportModule } from '../sample/ImportModule';

describe('Application', () => {
  it('container.get(Application) instanceOf Application', () => {
    const instance = EnvironmentInjector.execute(Application);
    assert.instanceOf(instance, Application);
    console.log(instance.user);
  });

  it('container.get(ExportService) instanceOf ExportService', () => {
    const injector = EnvironmentInjector.run(Application);
    const instance = injector.container.resolve(ExportService);
    assert.instanceOf(instance, ExportService);
  });

  it('container.get(ExportModule) instanceOf ExportModule', () => {
    const injector = EnvironmentInjector.run(Application);
    const instance = injector.container.resolve(ExportModule);
    assert.instanceOf(instance, ExportModule);
  });

  it('container.get(Export2Service) instanceOf Export2Service', () => {
    const injector = EnvironmentInjector.run(Application);
    const instance = injector.container.resolve(Export2Service);
    assert.instanceOf(instance, Export2Service);
  });

  it('container.get(Export2Module) instanceOf Export2Module', () => {
    const injector = EnvironmentInjector.run(Application);
    const instance = injector.container.resolve(Export2Module);
    assert.instanceOf(instance, Export2Module);
  });

  it('container.get(ImportModule) instanceOf ImportModule', () => {
    const injector = EnvironmentInjector.run(Application);
    const instance = injector.container.resolve(ImportModule);
    assert.instanceOf(instance.service, Export2Service);
  });
});
