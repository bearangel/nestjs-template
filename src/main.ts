import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigUtil } from './config/config.util';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const port = ConfigUtil.getNumber('app.server.port', 3000);
  const appName: string = ConfigUtil.getString('app.server.name', 'appName');

  // 设置Swagger
  SwaggerConfig.setup(app);

  await app.listen(port);
  logger.log(`应用 "${appName}" 已启动，监听端口: ${port}`);
}

bootstrap();
