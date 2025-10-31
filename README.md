# gecko-tsyringe

一个强大的TypeScript依赖注入容器，基于tsyringe扩展，提供模块化的依赖管理解决方案。

## Installing

使用npm安装：

```bash
npm install @geckoai/gecko-tsyringe
```

使用yarn安装：

```bash
yarn add @geckoai/gecko-tsyringe
```

使用pnpm安装：

```bash
pnpm add @geckoai/gecko-tsyringe
```

## Example Usage

### 基本使用

```typescript
import { injectable, Module, Lifecycle } from '@geckoai/gecko-tsyringe';

// 定义可注入的服务
@injectable
export class UserService {
  sayHello() {
    return 'Hello from UserService';
  }
}

// 定义模块
@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
  constructor(private userService: UserService) {}
}

// 定义应用主模块
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

### 模块嵌套和依赖注入

```typescript
// 服务定义
@injectable
export class DatabaseService {
  connect() {
    return 'Database connected';
  }
}

// 导出模块
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}

// 导入模块
@Module({
  imports: [DatabaseModule],
  providers: []
})
export class ApiModule {
  constructor(private databaseService: DatabaseService) {}
}
```

## About

gecko-tsyringe 是一个基于tsyringe的依赖注入容器扩展，增加了模块化功能，使依赖管理更加清晰和结构化。它适用于中小型到大型TypeScript应用，尤其是需要良好组织结构的应用程序。

## Issues

如有任何问题或建议，请在GitHub上提交issue：
[issues](https://github.com/geckoai/gecko-tsyringe/issues) 

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