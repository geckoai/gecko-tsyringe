import { Injectable, Module } from '../src';

@Injectable
export class Export2Service {
  constructor() {
    console.log('Export2Service constructor');
  }
}

@Module({
  providers: [Export2Service],
  exports: [Export2Service],
})
export class Export2Module {
  constructor() {
    console.log('Export2Module constructor');
  }
}
