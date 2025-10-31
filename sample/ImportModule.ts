import { Module } from '../src';
import { Export2Module, Export2Service } from './Export2Module';
import { ExportModule } from './ExportModule';

@Module({
  imports: [ExportModule, Export2Module],
  exports: [ExportModule],
})
export class ImportModule {
  constructor(public service: Export2Service) {
    console.log('ImportModule constructor');
  }
}
