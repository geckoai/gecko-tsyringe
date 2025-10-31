import { injectable, Module } from '../src';

@injectable
export class UserTestService {}

@injectable
export class UserService {
  constructor(private userTestService: UserTestService) {}
}

@Module({
  providers: [UserService, UserTestService],
})
export class UserModule {
  constructor(private userService: UserService) {}
}
