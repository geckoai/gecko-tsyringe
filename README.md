# gecko-tsyringe

A powerful TypeScript dependency injection container extended from tsyringe, providing a modular dependency management solution.

## Installing

Install using npm:

```bash
npm install @geckoai/gecko-tsyringe
```

Install using yarn:

```bash
yarn add @geckoai/gecko-tsyringe
```

Install using pnpm:

```bash
pnpm add @geckoai/gecko-tsyringe
```

## Example Usage

### Basic Usage

```typescript
import { injectable, Module, Lifecycle } from '@geckoai/gecko-tsyringe';

// Define an injectable service
@injectable
export class UserService {
  sayHello() {
    return 'Hello from UserService';
  }
}

// Define a module
@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
  constructor(private userService: UserService) {}
}

// Define the application main module
@Module(
  {
    imports: [UserModule],
    providers: []
  },
  Lifecycle.Singleton
)
export class Application {
  constructor(private userModule: UserModule) {}
}
```

### Module Nesting and Dependency Injection

```typescript
// Service definition
@injectable
export class DatabaseService {
  connect() {
    return 'Database connected';
  }
}

// Export module
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}

// Import module
@Module({
  imports: [DatabaseModule],
  providers: []
})
export class ApiModule {
  constructor(private databaseService: DatabaseService) {}
}
```

## About

gecko-tsyringe is a dependency injection container extension based on tsyringe, adding modularization capabilities to make dependency management clearer and more structured. It is suitable for small to large TypeScript applications, especially those that require good organizational structure.

## Issues

If you have any questions or suggestions, please submit an [issue](https://github.com/geckoai/gecko-tsyringe/issues)  on GitHub:


## License

MIT License

Copyright (c) 2021 @geckoai/gecko-tsyringe RanYunLong<549510622@qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.