import { ConfigService } from './config.service';

/**
 * 配置工具类，提供静态方法获取配置参数
 */
export class ConfigUtil {
  private static configService: ConfigService;

  /**
   * 设置ConfigService实例
   * @param service ConfigService实例
   */
  static setConfigService(service: ConfigService): void {
    ConfigUtil.configService = service;
  }

  /**
   * 获取字符串类型的配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 字符串类型的配置值
   */
  static getString(key: string, defaultValue: string = ''): string {
    return ConfigUtil.configService.get<string>(key, defaultValue);
  }

  /**
   * 获取数字类型的配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 数字类型的配置值
   */
  static getNumber(key: string, defaultValue: number = 0): number {
    return ConfigUtil.configService.get<number>(key, defaultValue);
  }

  /**
   * 获取布尔类型的配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 布尔类型的配置值
   */
  static getBoolean(key: string, defaultValue: boolean = false): boolean {
    return ConfigUtil.configService.get<boolean>(key, defaultValue);
  }

  /**
   * 获取对象类型的配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 对象类型的配置值
   */
  static getObject<T extends object>(
    key: string,
    defaultValue: T = {} as T,
  ): T {
    return ConfigUtil.configService.get<T>(key, defaultValue);
  }

  /**
   * 获取数组类型的配置值
   * @param key 配置键
   * @param defaultValue 默认值
   * @returns 数组类型的配置值
   */
  static getArray<T>(key: string, defaultValue: T[] = []): T[] {
    return ConfigUtil.configService.get<T[]>(key, defaultValue);
  }

  /**
   * 获取必需的配置值
   * @param key 配置键
   * @returns 配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequired<T>(key: string): T {
    return ConfigUtil.configService.getRequired<T>(key);
  }

  /**
   * 获取必需的字符串类型配置值
   * @param key 配置键
   * @returns 字符串类型的配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequiredString(key: string): string {
    return ConfigUtil.configService.getRequired<string>(key);
  }

  /**
   * 获取必需的数字类型配置值
   * @param key 配置键
   * @returns 数字类型的配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequiredNumber(key: string): number {
    return ConfigUtil.configService.getRequired<number>(key);
  }

  /**
   * 获取必需的布尔类型配置值
   * @param key 配置键
   * @returns 布尔类型的配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequiredBoolean(key: string): boolean {
    return ConfigUtil.configService.getRequired<boolean>(key);
  }

  /**
   * 获取必需的对象类型配置值
   * @param key 配置键
   * @returns 对象类型的配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequiredObject<T extends object>(key: string): T {
    return ConfigUtil.configService.getRequired<T>(key);
  }

  /**
   * 获取必需的数组类型配置值
   * @param key 配置键
   * @returns 数组类型的配置值
   * @throws 如果未找到键则抛出错误
   */
  static getRequiredArray<T>(key: string): T[] {
    return ConfigUtil.configService.getRequired<T[]>(key);
  }
}
