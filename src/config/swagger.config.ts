import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigUtil } from './config.util';

/**
 * Swagger配置类
 * 用于设置和初始化Swagger文档
 */
export class SwaggerConfig {
  private static readonly logger = new Logger(SwaggerConfig.name);

  /**
   * 设置Swagger文档
   * @param app NestJS应用实例
   */
  static setup(app: INestApplication): void {
    // 根据配置决定是否启用Swagger
    const swaggerEnabled = ConfigUtil.getBoolean('app.swagger.enabled', false);
    if (!swaggerEnabled) {
      return;
    }

    // 从配置中获取Swagger设置
    const swaggerTitle = ConfigUtil.getString(
      'app.swagger.title',
      'NestJS API',
    );
    const swaggerDescription = ConfigUtil.getString(
      'app.swagger.description',
      'NestJS API Documentation',
    );
    const swaggerVersion = ConfigUtil.getString('app.swagger.version', '1.0');
    const swaggerPath = ConfigUtil.getString('app.swagger.path', 'api-docs');

    // 创建Swagger配置
    const config = new DocumentBuilder()
      .setTitle(swaggerTitle)
      .setDescription(swaggerDescription)
      .setVersion(swaggerVersion)
      .build();

    // 创建Swagger文档并设置
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, document);

    this.logger.log(`Swagger UI 已启用，访问路径: /${swaggerPath}`);
  }
}
