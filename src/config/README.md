# 配置工具类 (ConfigUtil)

ConfigUtil 是一个静态工具类，用于从应用程序配置中获取各种类型的配置值。它基于 ConfigService 实现，提供了一种更便捷的方式来访问配置值。

## 特点

- 所有方法都是静态的，可以在应用程序的任何地方使用
- 提供了获取各种基本数据类型的方法：字符串、数字、布尔值、对象和数组
- 支持默认值，当配置项不存在时返回默认值
- 提供了获取必需配置值的方法，当配置项不存在时抛出错误

## 使用方法

ConfigUtil 在应用程序启动时由 ConfigService 自动初始化，无需手动设置。

### 基本用法

```typescript
import { ConfigUtil } from './config/config.util';

// 获取字符串类型的配置值
const appName = ConfigUtil.getString('app.name', 'Default App');

// 获取数字类型的配置值
const serverPort = ConfigUtil.getNumber('app.server.port', 3000);

// 获取布尔类型的配置值
const isDebug = ConfigUtil.getBoolean('app.debug', false);

// 获取对象类型的配置值
const dbConfig = ConfigUtil.getObject('app.database', { host: 'localhost', port: 5432 });

// 获取数组类型的配置值
const allowedOrigins = ConfigUtil.getArray<string>('app.cors.allowedOrigins', ['http://localhost:3000']);
```

### 获取必需的配置值

当配置项必须存在时，可以使用 `getRequired*` 方法。如果配置项不存在，这些方法会抛出错误。

```typescript
try {
  // 获取必需的字符串类型配置值
  const apiKey = ConfigUtil.getRequiredString('app.apiKey');
  
  // 获取必需的数字类型配置值
  const timeout = ConfigUtil.getRequiredNumber('app.timeout');
  
  // 获取必需的布尔类型配置值
  const isProduction = ConfigUtil.getRequiredBoolean('app.production');
  
  // 获取必需的对象类型配置值
  const authConfig = ConfigUtil.getRequiredObject('app.auth');
  
  // 获取必需的数组类型配置值
  const adminUsers = ConfigUtil.getRequiredArray('app.adminUsers');
} catch (error) {
  console.error('Missing required configuration:', error.message);
}
```

### 泛型支持

对于对象和数组类型，ConfigUtil 支持泛型，可以指定返回值的类型。

```typescript
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

// 获取类型化的对象
const dbConfig = ConfigUtil.getObject<DatabaseConfig>('app.database', {
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password'
});

// 获取类型化的数组
const users = ConfigUtil.getArray<{ id: number; name: string }>('app.users', []);
```

## 可用方法

### 获取配置值（带默认值）

- `getString(key: string, defaultValue: string = ''): string`
- `getNumber(key: string, defaultValue: number = 0): number`
- `getBoolean(key: string, defaultValue: boolean = false): boolean`
- `getObject<T extends object>(key: string, defaultValue: T = {} as T): T`
- `getArray<T>(key: string, defaultValue: T[] = []): T[]`

### 获取必需的配置值

- `getRequired<T>(key: string): T`
- `getRequiredString(key: string): string`
- `getRequiredNumber(key: string): number`
- `getRequiredBoolean(key: string): boolean`
- `getRequiredObject<T extends object>(key: string): T`
- `getRequiredArray<T>(key: string): T[]`