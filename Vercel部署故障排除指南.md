# Vercel 部署故障排除指南

## 🚨 404 错误解决方案

如果你遇到 404 错误，请按照以下步骤进行排查和修复：

### 1. 检查 Vercel 项目状态

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com/dashboard
   - 找到你的 `convenience-store-system` 项目

2. **查看部署状态**
   - 点击项目名称进入详情页
   - 查看 "Deployments" 标签
   - 确认最新部署是否成功（绿色 ✅）

### 2. 重新部署项目

如果部署失败或有问题：

1. **触发重新部署**
   - 在 Deployments 页面
   - 点击最新部署右侧的三个点 "..."
   - 选择 "Redeploy"

2. **或者推送新代码触发部署**
   ```bash
   git add .
   git commit -m "触发重新部署"
   git push
   ```

### 3. 检查构建日志

1. **查看构建过程**
   - 在 Deployments 页面点击具体的部署
   - 查看 "Build Logs" 
   - 寻找错误信息

2. **常见构建错误**
   - 依赖安装失败
   - 构建脚本错误
   - 环境变量缺失

### 4. 验证配置文件

确保以下配置正确：

#### ✅ vercel.json 配置
```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/index.html"
    }
  ],
  "functions": {
    "backend/server.js": {
      "maxDuration": 30
    }
  }
}
```

#### ✅ 前端 package.json 脚本
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "vercel-build": "vite build",
    "preview": "vite preview"
  }
}
```

### 5. 环境变量检查

确保在 Vercel 中配置了以下环境变量：

1. **MONGODB_URI**
   ```
   mongodb+srv://用户名:密码@cluster0.xxxxx.mongodb.net/convenience_store?retryWrites=true&w=majority
   ```

2. **JWT_SECRET**
   ```
   MyApp2024SecretKey!@#RandomString123456789
   ```

3. **NODE_ENV**
   ```
   production
   ```

### 6. 域名和路由检查

1. **检查项目 URL**
   - 确认你访问的是正确的 Vercel 项目 URL
   - 格式通常是：`https://项目名-用户名.vercel.app`

2. **路由测试**
   - 访问根路径：`https://你的域名.vercel.app/`
   - 测试 API：`https://你的域名.vercel.app/api/health`

### 7. 本地测试

在部署前先本地测试：

```bash
# 安装依赖
cd frontend && npm install
cd ../backend && npm install

# 构建前端
cd ../frontend && npm run build

# 启动后端
cd ../backend && npm start
```

### 8. 常见问题解决

#### 问题 1：构建失败
**解决方案：**
- 检查 Node.js 版本兼容性
- 确保所有依赖都在 package.json 中
- 检查构建脚本是否正确

#### 问题 2：API 路由不工作
**解决方案：**
- 确认后端 server.js 路径正确
- 检查 API 路由配置
- 验证环境变量设置

#### 问题 3：前端页面空白
**解决方案：**
- 检查前端构建输出目录
- 确认 index.html 文件存在
- 查看浏览器控制台错误

### 9. 获取帮助

如果问题仍然存在：

1. **查看 Vercel 文档**
   - https://vercel.com/docs

2. **检查构建日志**
   - 在 Vercel Dashboard 中查看详细错误信息

3. **联系支持**
   - Vercel 社区论坛
   - GitHub Issues

### 10. 预防措施

为避免未来的部署问题：

1. **定期测试部署**
   - 在本地环境测试构建
   - 使用 Vercel CLI 进行本地测试

2. **监控部署状态**
   - 设置 Vercel 通知
   - 定期检查应用状态

3. **备份配置**
   - 保存重要的配置文件
   - 记录环境变量设置

---

## 🎯 快速修复步骤

如果遇到 404 错误，按以下顺序快速尝试：

1. ✅ 重新部署项目
2. ✅ 检查环境变量
3. ✅ 验证构建日志
4. ✅ 确认配置文件
5. ✅ 测试本地构建

大多数 404 错误都可以通过重新部署解决！