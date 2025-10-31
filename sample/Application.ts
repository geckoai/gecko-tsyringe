import { Module } from '../src';
import { Lifecycle } from '../src/tsyringe';
import { ImportModule } from './ImportModule';
import { UserModule } from './UserModule';

export class TestService {}

@Module(
  {
    imports: [UserModule, ImportModule],
    providers: [TestService],
  },
  Lifecycle.Singleton,
)
export class Application {
  constructor(
    public user: UserModule,
    private test: TestService,
  ) {}
}
