import { Injectable, Module } from '../src';

@Injectable
export class ExportService {}

@Module({
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {}
