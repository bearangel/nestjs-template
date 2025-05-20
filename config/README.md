# 配置文件使用说明

本目录包含应用程序的配置文件，用于配置应用程序的各种参数。

## 配置文件结构

配置文件使用YAML格式，按照环境分为不同的文件：

- `app.yml` - 基础配置文件
- `app.development.yml` - 开发环境配置文件
- `app.production.yml` - 生产环境配置文件

## 配置文件加载顺序

1. 首先加载基础配置文件（不包含环境后缀的文件，如 `app.yml`）
2. 然后加载特定环境的配置文件（包含环境后缀的文件，如 `app.development.yml`）
3. 特定环境的配置会覆盖基础配置中的相同项

## 环境选择

应用程序通过 `NODE_ENV` 环境变量来确定当前环境：

```bash
# 开发环境
NODE_ENV=development npm run start

# 生产环境
NODE_ENV=production npm run start
```

如果未设置 `NODE_ENV`，则默认使用 `development` 环境。

## 配置项说明

当前配置文件包含以下配置项：

### 服务器配置

```yaml
server:
  port: 3001  # 应用程序监听的端口号
```

## 配置键的结构

配置键的结构遵循以下格式：`<filename>.<property>.<subproperty>`

其中：
- `<filename>` 是配置文件的名称（不包含扩展名和环境后缀）。例如，对于 `app.yml` 或 `app.development.yml` 文件，配置键的前缀是 `app`。
- `<property>` 和 `<subproperty>` 是配置文件中定义的属性路径。

**重要说明：** 配置键的第一部分（如 `app`）是从文件名中获取的，而不是配置内容本身。

## 在代码中使用配置

在应用程序中，可以通过 `ConfigService` 来获取配置值：

```typescript
// 注入 ConfigService
constructor(private configService: ConfigService) {}

// 获取配置值（带默认值）
// 这里的 'app' 来自文件名 'app.yml' 或 'app.development.yml'
const port = this.configService.get('app.server.port', 3000);

// 获取必需的配置值（如果不存在会抛出错误）
const port = this.configService.getRequired('app.server.port');
```

## 添加新的配置文件

如需添加新的配置文件，请遵循以下命名规则：

1. 基础配置文件：`<name>.yml` 或 `<name>.json`
2. 环境特定配置文件：`<name>.<environment>.yml` 或 `<name>.<environment>.json`

其中 `<name>` 是配置的名称，`<environment>` 是环境名称（如 `development`、`production`、`test` 等）。
