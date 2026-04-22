# 🔐 用户登录 API 文档

## 📋 概述

这是一个现代化的用户认证系统，提供登录、注册、Token验证等功能。

**技术栈**: Node.js + Express + JWT + bcrypt  
**安全级别**: ⭐⭐⭐⭐ (生产级别)  
**API版本**: v1.0

---

## 🚀 快速开始

### 安装依赖
```bash
npm install express jwt bcrypt cors dotenv
```

### 启动服务
```bash
node login_api.js
```

**输出:**
```
🚀 用户登录API服务已启动
📍 服务地址: http://localhost:3001

测试用户:
  邮箱: user1@example.com | 密码: password123
  邮箱: admin@example.com | 密码: admin123
```

---

## 📡 API 端点

### 1️⃣ 用户登录

**端点**: `POST /api/auth/login`

**请求头**:
```
Content-Type: application/json
```

**请求体**:
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user1",
    "email": "user1@example.com",
    "name": "张三",
    "role": "user"
  }
}
```

**失败响应** (401):
```json
{
  "success": false,
  "message": "邮箱或密码错误"
}
```

**cURL示例**:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"password123"}'
```

**JavaScript示例**:
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user1@example.com',
    password: 'password123'
  })
});
const data = await response.json();
console.log(data.token); // 保存Token用于后续请求
```

---

### 2️⃣ 用户注册

**端点**: `POST /api/auth/register`

**请求体**:
```json
{
  "email": "newuser@example.com",
  "password": "secure123",
  "name": "李四"
}
```

**成功响应** (201):
```json
{
  "success": true,
  "message": "注册成功，请登录"
}
```

**失败响应** (409):
```json
{
  "success": false,
  "message": "该邮箱已被注册"
}
```

**JavaScript示例**:
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'newuser@example.com',
    password: 'secure123',
    name: '李四'
  })
});
const data = await response.json();
if (data.success) {
  // 注册成功，跳转到登录页面
  window.location.href = '/login';
}
```

---

### 3️⃣ 获取当前用户信息

**端点**: `GET /api/auth/me`

**请求头**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**成功响应** (200):
```json
{
  "success": true,
  "user": {
    "id": "user1",
    "email": "user1@example.com",
    "name": "张三",
    "role": "user"
  }
}
```

**失败响应** (401):
```json
{
  "success": false,
  "message": "Token无效或已过期"
}
```

**JavaScript示例**:
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
if (data.success) {
  console.log('当前用户:', data.user.name);
} else {
  // Token过期，需要重新登录
  window.location.href = '/login';
}
```

---

### 4️⃣ 修改密码

**端点**: `POST /api/auth/change-password`

**请求头**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求体**:
```json
{
  "oldPassword": "password123",
  "newPassword": "newPassword456"
}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "密码修改成功"
}
```

**JavaScript示例**:
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('/api/auth/change-password', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    oldPassword: 'password123',
    newPassword: 'newPassword456'
  })
});
const data = await response.json();
alert(data.message);
```

---

### 5️⃣ 用户登出

**端点**: `POST /api/auth/logout`

**成功响应** (200):
```json
{
  "success": true,
  "message": "登出成功，请删除本地Token"
}
```

**JavaScript示例**:
```javascript
async function logout() {
  const token = localStorage.getItem('authToken');
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  // 删除本地Token
  localStorage.removeItem('authToken');
  // 重定向到登录页
  window.location.href = '/login';
}
```

---

### 6️⃣ 健康检查

**端点**: `GET /api/health`

**响应**:
```json
{
  "status": "ok",
  "message": "服务运行正常",
  "timestamp": "2026-04-21T23:20:00.000Z"
}
```

---

## 🔑 Token 管理

### Token格式
JWT Token由三部分组成:
```
header.payload.signature
```

**示例**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM5MDAwMDAwLCJleHAiOjE2Mzk2MDQ4MDB9.signature
```

### Token有效期
- **有效期**: 7天
- **过期后**: 需要重新登录获取新Token

### 存储Token
**推荐**: localStorage (前端存储)
```javascript
// 登录后保存Token
localStorage.setItem('authToken', response.token);

// 发送请求时使用Token
fetch('/api/protected', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
});

// 登出时删除Token
localStorage.removeItem('authToken');
```

---

## 🔒 安全特性

### 密码加密
- **算法**: bcrypt
- **盐轮数**: 10
- **强度**: 密码长度至少6位

### Token安全
- **签名**: HMAC-SHA256
- **有效期**: 7天自动过期
- **防护**: CORS跨域保护

### 最佳实践
1. ✅ 始终使用HTTPS传输
2. ✅ Token存储在localStorage（不要存在Cookie或全局变量）
3. ✅ 定期检查Token有效期
4. ✅ Token过期时自动重定向到登录页
5. ✅ 敏感操作前重新验证用户身份

---

## 📊 错误代码

| 代码 | 说明 | 原因 |
|------|------|------|
| 200 | 成功 | 请求成功 |
| 201 | 创建成功 | 资源已创建 |
| 400 | 请求错误 | 参数缺失或无效 |
| 401 | 未授权 | 密码错误或Token失效 |
| 404 | 未找到 | 用户不存在 |
| 409 | 冲突 | 邮箱已被注册 |
| 500 | 服务器错误 | 服务端错误 |

---

## 🧪 测试用户

### 普通用户
```
邮箱: user1@example.com
密码: password123
角色: user
```

### 管理员
```
邮箱: admin@example.com
密码: admin123
角色: admin
```

---

## 📚 集成示例

### React 登录组件
```javascript
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // 保存Token
        localStorage.setItem('authToken', data.token);
        // 重定向到首页
        window.location.href = '/dashboard';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="邮箱"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
```

---

## 🔄 完整的认证流程

```
用户 → 输入邮箱密码
   ↓
   → POST /api/auth/login
   ↓
   → 服务器验证密码
   ↓
   → 生成JWT Token (7天有效期)
   ↓
用户 → 保存Token到localStorage
   ↓
   → 发送受保护的请求（在Authorization头带Token）
   ↓
   → 服务器验证Token有效性
   ↓
   → 返回受保护资源
   ↓
Token过期 → 自动跳转到登录页
   ↓
用户 → 重新登录，获取新Token
```

---

## 📞 支持

如有问题，请联系开发团队。

**API版本**: v1.0  
**最后更新**: 2026-04-21  
**维护者**: 司礼监编纂

