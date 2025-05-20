import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

export interface ConfigModuleOptions {
  /**
   * 存储配置文件的目录
   * @default 'config'
   */
  configDir?: string;

  /**
   * 活动配置文件（例如，'development'，'production'，'test'）
   * @default process.env.NODE_ENV || 'development'
   */
  profile?: string;

  /**
   * 是否加载环境变量
   * @default true
   */
  useEnv?: boolean;
}

@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions = {}): DynamicModule {
    const {
      configDir = 'config',
      profile = process.env.NODE_ENV || 'development',
      useEnv = true,
    } = options;

    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [() => ConfigService.loadConfig(configDir, profile)],
          envFilePath: useEnv ? ['.env', `.env.${profile}`] : [],
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
      global: true,
    };
  }
}
