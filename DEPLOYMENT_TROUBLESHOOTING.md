# 线上部署问题排查清单

## 1. 环境配置检查

### API 地址配置

- [ ] 检查 `/src/config/env.ts` 中的生产环境 API 地址是否正确
- [ ] 确认 `API_BASE_URL` 指向正确的后端服务地址
- [ ] 验证 `USE_MOCK` 在生产环境是否设置为 `false`

### 代理配置

- [ ] 检查 `.umirc.ts` 中的 proxy 配置是否适用于生产环境
- [ ] 确认生产环境是否需要代理配置

## 2. 网络和 CORS 问题

### 跨域检查

- [ ] 确认后端 API 是否配置了正确的 CORS 设置
- [ ] 检查是否允许前端域名的跨域请求
- [ ] 验证请求头是否被后端接受

### 网络连接

- [ ] 测试 API 地址是否可以直接访问
- [ ] 检查防火墙是否阻止了请求
- [ ] 确认 SSL 证书是否有效（HTTPS）

## 3. API 接口问题

### 接口可用性

- [ ] 使用 Postman 或 curl 测试 API 接口是否正常
- [ ] 检查 API 返回的数据格式是否符合预期
- [ ] 验证 API 的认证和授权是否正确

### 参数格式

- [ ] 确认请求参数格式是否正确
- [ ] 检查 query 参数的嵌套结构是否符合后端要求
- [ ] 验证 comment 字段是否正确处理

## 4. 前端代码问题

### 环境变量

- [ ] 检查 `process.env.NODE_ENV` 是否正确设置为 'production'
- [ ] 确认构建过程中环境变量是否正确传递

### 错误处理

- [ ] 查看浏览器控制台的错误信息
- [ ] 检查 Network 选项卡中的请求状态
- [ ] 确认错误信息是否被正确捕获和显示

## 5. 调试工具使用

### 浏览器调试

在浏览器控制台中执行以下命令进行调试：

\`\`\`javascript // 检查网络状态 ApiDebugger.checkNetworkStatus();

// 查看 API 调用日志 ApiDebugger.exportLogs();

// 清除日志 ApiDebugger.clearLogs(); \`\`\`

### 手动测试 API

\`\`\`javascript // 在控制台手动测试 API 调用 fetch('/api/manual/assessment/1/content?evaluationType=COMPARED&pageNum=1&pageSize=10') .then(response => response.json()) .then(data => console.log('API 响应:', data)) .catch(error => console.error('API 错误:', error)); \`\`\`

## 6. 常见问题解决方案

### 问题 1: "获取数据失败"

**可能原因:**

- API 地址配置错误
- 网络连接问题
- CORS 跨域限制
- 后端服务未启动

**解决方案:**

1. 检查环境配置文件中的 API 地址
2. 使用浏览器直接访问 API 地址测试连通性
3. 联系后端开发者确认 API 状态

### 问题 2: 网络请求超时

**可能原因:**

- 网络延迟高
- 服务器响应慢
- 请求参数错误导致服务器处理时间长

**解决方案:**

1. 增加请求超时时间配置
2. 优化请求参数
3. 联系运维检查服务器性能

### 问题 3: 403 Forbidden

**可能原因:**

- 缺少认证信息
- API 密钥错误
- 访问权限不足

**解决方案:**

1. 检查认证信息是否正确传递
2. 确认用户权限设置
3. 联系管理员检查 API 访问权限

## 7. 紧急处理

如果线上问题无法立即解决，可以临时启用 Mock 数据：

1. 修改 `/src/config/env.ts` 中生产环境的 `USE_MOCK` 为 `true`
2. 重新构建和部署
3. 这样可以暂时解决数据显示问题，但需要尽快修复真实 API 调用

## 8. 联系支持

如果以上步骤都无法解决问题，请提供以下信息：

- [ ] 浏览器控制台的完整错误信息
- [ ] Network 选项卡中的请求详情
- [ ] 当前环境配置
- [ ] API 调试日志 (`ApiDebugger.exportLogs()`)
