import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { ConfigUtil } from './config.util';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {
    // 初始化ConfigUtil
    ConfigUtil.setConfigService(this);
  }

  /**
   * 通过键获取配置值
   * @param key 配置键
   * @param defaultValue 如果未找到键则返回的默认值
   */
  get<T = unknown>(key: string, defaultValue: T): T {
    return this.configService.get<T>(key, defaultValue);
  }

  /**
   * 通过键获取必需的配置值
   * @param key 配置键
   * @throws 如果未找到键则抛出错误
   */
  getRequired<T = unknown>(key: string): T {
    const value = this.configService.get<T>(key);
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" is required but not found`);
    }
    return value;
  }

  /**
   * 从文件加载配置
   * @param configDir 存储配置文件的目录
   * @param profile 活动配置文件
   */
  static loadConfig(
    configDir: string,
    profile: string,
  ): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // 确保配置目录存在
    const configPath = path.resolve(process.cwd(), configDir);
    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath, { recursive: true });
    }

    // 首先加载基本配置文件
    this.loadConfigFiles(configPath, config, null);

    // 然后加载特定配置文件（它们将覆盖基本配置）
    if (profile) {
      this.loadConfigFiles(configPath, config, profile);
    }

    return config;
  }

  /**
   * 深度合并两个对象
   * @param target 目标对象
   * @param source 源对象
   * @returns 合并后的对象
   */
  private static deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result = { ...target };

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (
          typeof source[key] === 'object' &&
          source[key] !== null &&
          !Array.isArray(source[key]) &&
          typeof target[key] === 'object' &&
          target[key] !== null &&
          !Array.isArray(target[key])
        ) {
          // 如果两者都是对象，递归合并
          result[key] = this.deepMerge(
            target[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        } else if (source[key] !== undefined) {
          // 只有当源对象中的值存在时才覆盖目标对象中的值
          result[key] = source[key];
        }
      }
    }

    return result;
  }

  /**
   * 从目录加载所有配置文件
   * @param dirPath 目录路径
   * @param config 要更新的配置对象
   * @param profile 配置文件名称（null表示基本配置）
   */
  private static loadConfigFiles(
    dirPath: string,
    config: Record<string, unknown>,
    profile: string | null,
  ): void {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        const fileNameWithoutExt = path.basename(file, ext);

        // 跳过不匹配配置文件模式的文件
        if (profile === null) {
          // 对于基本配置，跳过任何带有配置文件后缀的文件（包含点）
          if (fileNameWithoutExt.includes('.')) {
            continue;
          }
        } else {
          // 对于特定配置文件，只处理与配置文件后缀匹配的文件
          const profileSuffix = `.${profile}`;
          if (!fileNameWithoutExt.endsWith(profileSuffix)) {
            continue;
          }
        }

        // 提取基本配置名称（如果存在，则删除配置文件后缀）
        let baseName = fileNameWithoutExt;
        if (profile !== null && baseName.endsWith(`.${profile}`)) {
          baseName = baseName.substring(
            0,
            baseName.length - profile.length - 1,
          );
        }

        try {
          let fileContent: Record<string, unknown>;

          if (ext === '.json') {
            // 解析JSON文件
            const content = fs.readFileSync(filePath, 'utf8');
            fileContent = JSON.parse(content) as Record<string, unknown>;
          } else if (ext === '.yml' || ext === '.yaml') {
            // 解析YAML文件
            const content = fs.readFileSync(filePath, 'utf8');
            fileContent = yaml.load(content) as Record<string, unknown>;
          } else {
            // 跳过其他文件类型
            continue;
          }

          // 合并配置
          if (fileContent) {
            if (profile === null) {
              // 对于基本配置，直接设置
              config[baseName] = fileContent;
            } else {
              // 对于环境特定配置，使用深度合并，保留基本配置中存在但环境配置中不存在的值
              config[baseName] = this.deepMerge(
                (config[baseName] as Record<string, unknown>) || {},
                fileContent,
              );
            }
          }
        } catch (error) {
          console.error(`Error loading configuration file ${filePath}:`, error);
        }
      }
    }
  }
}
