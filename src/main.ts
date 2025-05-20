import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = configService.get('app.server.port', 3000);
  const appName: string = configService.get('app.server.name', 'appName');

  await app.listen(port);
  logger.log(`应用 "${appName}" 已启动，监听端口: ${port}`);
}

bootstrap();
