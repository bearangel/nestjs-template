<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">一个渐进式的<a href="http://nodejs.org" target="_blank">Node.js</a>框架，用于构建高效且可扩展的服务器端应用程序。</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 项目描述

[Nest](https://github.com/nestjs/nest) 框架 TypeScript 启动仓库，具有增强的配置支持。

## 配置

本项目包含一个自定义配置工具，扩展了 NestJS Config 模块，支持：

- 从 JSON 和 YAML 文件加载配置
- 支持不同的环境配置（开发环境、生产环境、测试环境等）
- 具有特定环境覆盖的分层配置

### 目录结构

```
config/
  ├── app.json                # 基础配置（适用于所有环境）
  ├── database.json           # 更多基础配置
  ├── app.development.yml     # 开发环境的应用配置
  ├── database.development.yml # 开发环境的数据库配置
  ├── app.production.yml      # 生产环境的应用配置
  ├── database.production.yml # 生产环境的数据库配置
  ├── app.test.yml            # 测试环境的应用配置
  └── database.test.yml       # 测试环境的数据库配置
```

### 使用方法

1. 在应用程序中注册 ConfigModule：

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.register({
      configDir: 'config',
      profile: process.env.NODE_ENV || 'development',
    }),
  ],
})
export class AppModule {}
```

2. 在组件中注入并使用 ConfigService：

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getConfig(): Record<string, any> {
    // 获取配置值，带默认回退值
    const serverPort = this.configService.get('app.server.port', 3000);

    // 获取必需的配置值（如果未找到则抛出错误）
    const appName = this.configService.getRequired('app.name');

    // 获取所有配置
    const allConfig = this.configService.getAll();

    return allConfig;
  }
}
```

## 项目安装

```bash
$ pnpm install
```

## 编译和运行项目

```bash
# 开发环境
$ pnpm run start

# 监视模式
$ pnpm run start:dev

# 生产环境
$ pnpm run start:prod
```

## 运行测试

```bash
# 单元测试
$ pnpm run test

# 端到端测试
$ pnpm run test:e2e

# 测试覆盖率
$ pnpm run test:cov
```

## 部署

当您准备将 NestJS 应用程序部署到生产环境时，可以采取一些关键步骤确保其尽可能高效运行。查看[部署文档](https://docs.nestjs.com/deployment)获取更多信息。

如果您正在寻找一个基于云的平台来部署 NestJS 应用程序，请查看 [Mau](https://mau.nestjs.com)，这是我们在 AWS 上部署 NestJS 应用程序的官方平台。Mau 使部署变得简单快捷，只需几个简单的步骤：

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

使用 Mau，您只需点击几下即可部署应用程序，让您可以专注于构建功能而不是管理基础设施。

## 资源

以下是一些在使用 NestJS 时可能会派上用场的资源：

- 访问 [NestJS 文档](https://docs.nestjs.com) 了解更多关于框架的信息。
- 如有问题和支持，请访问我们的 [Discord 频道](https://discord.gg/G7Qnnhy)。
- 要深入了解并获得更多实践经验，请查看我们的官方视频[课程](https://courses.nestjs.com/)。
- 使用 [NestJS Mau](https://mau.nestjs.com) 只需点击几下即可将应用程序部署到 AWS。
- 使用 [NestJS Devtools](https://devtools.nestjs.com) 可视化您的应用程序图表并实时与 NestJS 应用程序交互。
- 需要项目帮助（兼职到全职）？查看我们的官方[企业支持](https://enterprise.nestjs.com)。
- 要了解最新动态和更新，请在 [X](https://x.com/nestframework) 和 [LinkedIn](https://linkedin.com/company/nestjs) 上关注我们。
- 正在寻找工作，或有工作机会提供？查看我们的官方[招聘板](https://jobs.nestjs.com)。

## 支持

Nest 是一个 MIT 许可的开源项目。它的成长得益于赞助商和支持者的支持。如果您想加入他们，请[在此了解更多](https://docs.nestjs.com/support)。

## 联系我们

- 作者 - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- 网站 - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## 许可证

Nest 使用 [MIT 许可证](https://github.com/nestjs/nest/blob/master/LICENSE)。
