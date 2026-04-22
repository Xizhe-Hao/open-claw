# 🚀 芝加哥旅行网站 - 后端API服务

> **完整前后端解决方案，提供动态数据API**

## 📋 后端功能概述

### ✅ **已实现的后端功能**：
1. **景点数据API** - RESTful接口，支持CRUD操作
2. **行程规划API** - 智能行程推荐
3. **用户反馈API** - 收集用户意见
4. **健康检查API** - 服务状态监控
5. **静态文件服务** - 前端资源托管

### 🔧 **技术栈**：
- **Node.js** + **Express.js** - 后端框架
- **RESTful API** - 标准接口设计
- **CORS支持** - 跨域请求
- **JSON数据格式** - 标准化响应

## 🚀 快速启动后端

### 方案一：Node.js后端（完整功能）
```bash
# 1. 进入项目目录
cd chicago_travel_website

# 2. 安装依赖
npm install

# 3. 启动后端服务器
npm start
# 或开发模式
npm run dev

# 4. 访问API
# 后端: http://localhost:3000
# 前端: http://localhost:3000/index.html
# API文档: http://localhost:3000/api/health
```

### 方案二：纯前端模式（无后端）
```bash
# 如果只需要前端，使用Python静态服务器
python -m http.server 8080
# 访问: http://localhost:8080
```

## 📡 API接口文档

### 1. 健康检查
```
GET /api/health
```
**响应**:
```json
{
  "status": "healthy",
  "service": "Chicago Travel API",
  "version": "1.0.0",
  "uptime": 123.45,
  "timestamp": "2026-04-22T02:20:00Z"
}
```

### 2. 获取所有景点
```
GET /api/attractions
```
**响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "千禧公园",
      "nameEn": "Millennium Park",
      "category": "公园/艺术",
      "price": "免费",
      "hours": "6:00-23:00",
      "rating": 4.8,
      "description": "芝加哥标志性艺术公园...",
      "highlights": ["云门雕塑", "皇冠喷泉"],
      "address": "201 E Randolph St, Chicago, IL 60602",
      "coordinates": { "lat": 41.8827, "lng": -87.6233 },
      "image": "https://images.unsplash.com/..."
    }
  ],
  "count": 15,
  "timestamp": "2026-04-22T02:20:00Z"
}
```

### 3. 获取单个景点
```
GET /api/attractions/:id
```
**示例**: `GET /api/attractions/1`

### 4. 搜索景点
```
POST /api/attractions/search
```
**请求体**:
```json
{
  "category": "公园",
  "minRating": 4.5,
  "maxPrice": 50
}
```

### 5. 获取行程规划
```
GET /api/itineraries
```
**响应**: 3天/5天/7天行程方案

### 6. 提交用户反馈
```
POST /api/feedback
```
**请求体**:
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "message": "网站很好用！",
  "rating": 5
}
```

## 🏗️ 项目结构

```
chicago_travel_website/
├── server.js              # 后端主文件
├── package.json          # Node.js依赖配置
├── index.html            # 前端主页面
├── css/
│   └── style.css        # 样式表
├── js/
│   ├── main.js          # 前端核心逻辑
│   ├── attractions.js   # 景点数据（本地回退）
│   └── api-integration.js # API集成模块
└── README.md            # 主文档
```

## 🔌 前端API集成

### 自动API检测
前端会自动检测后端API是否可用：
- ✅ **API在线**: 使用动态数据加载
- ⚠️ **API离线**: 自动回退到本地数据
- 🔄 **实时重试**: 网络恢复后自动切换

### API状态指示器
页面右下角显示API状态：
- 🟢 **绿色**: API在线，使用动态数据
- 🔴 **红色**: API离线，使用本地数据

## 🎯 部署选项

### 1. 本地开发
```bash
# 后端 + 前端
npm start
# 访问: http://localhost:3000
```

### 2. 生产部署
```bash
# 安装PM2进程管理
npm install -g pm2

# 启动生产服务
pm2 start server.js --name "chicago-travel"

# 设置开机自启
pm2 startup
pm2 save
```

### 3. Docker部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# 构建和运行
docker build -t chicago-travel .
docker run -p 3000:3000 chicago-travel
```

### 4. 云平台部署
- **Vercel**: 支持Node.js函数
- **Railway**: 一键部署
- **Heroku**: 传统PaaS
- **AWS EC2**: 自托管

## 🛠️ 开发指南

### 环境要求
- **Node.js**: 14.0.0 或更高
- **npm**: 6.0.0 或更高

### 开发命令
```bash
# 安装依赖
npm install

# 开发模式（自动重启）
npm run dev

# 生产模式
npm start

# 测试API
curl http://localhost:3000/api/health
```

### 添加新API端点
1. 在 `server.js` 中添加新路由
2. 在 `api-integration.js` 中添加对应的前端函数
3. 更新API文档

## 🔧 故障排除

### 常见问题

**1. 端口被占用**
```bash
# 查找占用进程
lsof -i :3000
# 或使用其他端口
PORT=3001 npm start
```

**2. Node.js版本问题**
```bash
# 检查Node版本
node --version

# 使用nvm管理版本
nvm install 18
nvm use 18
```

**3. 依赖安装失败**
```bash
# 清除缓存重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**4. CORS问题**
- 确保前端访问正确的API地址
- 检查 `server.js` 中的CORS配置
- 开发时可以使用浏览器插件禁用CORS

### 调试工具
```bash
# 查看日志
npm run dev  # 开发模式显示详细日志

# 测试API
curl -v http://localhost:3000/api/health

# 检查网络请求
# 浏览器开发者工具 → Network
```

## 📊 性能优化

### 生产优化
```javascript
// server.js 生产配置
app.use(compression());  // 启用Gzip压缩
app.use(helmet());       // 安全头部
app.use(rateLimit({      // 限流
  windowMs: 15 * 60 * 1000,
  max: 100
}));
```

### 缓存策略
- **静态文件**: 长期缓存
- **API响应**: 适当缓存头
- **CDN加速**: 推荐使用Cloudflare

## 🔐 安全建议

### 生产环境配置
1. **环境变量** - 不要硬编码敏感信息
2. **HTTPS** - 启用SSL/TLS
3. **输入验证** - 所有API请求验证
4. **速率限制** - 防止滥用
5. **日志记录** - 监控异常请求

### 安全中间件
```bash
npm install helmet cors
```

## 🤝 贡献指南

### 后端开发流程
1. Fork仓库
2. 创建功能分支
3. 实现API端点
4. 添加测试
5. 提交Pull Request

### 代码规范
- **路由命名**: RESTful风格
- **错误处理**: 统一错误响应格式
- **日志记录**: 结构化日志
- **文档**: 每个API端点都有文档

## 📞 支持与联系

### 问题反馈
- **GitHub Issues**: API相关问题
- **Discord**: 实时技术支持
- **Email**: 紧急问题

### 监控与告警
建议设置：
- **Uptime监控**: Pingdom, UptimeRobot
- **错误追踪**: Sentry, Rollbar
- **性能监控**: New Relic, Datadog

---

**后端状态**: ✅ 生产就绪  
**API版本**: v1.0.0  
**最后更新**: 2026年4月22日  

**启动命令**: `npm start`  
**默认端口**: 3000  
**健康检查**: `GET /api/health`