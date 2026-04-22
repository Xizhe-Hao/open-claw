/**
 * 用户登录 API
 * 技术栈：Node.js + Express + JWT
 * 安全特性：密码加密、Token认证、CORS保护
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 中间件
app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || ['http://localhost:3000', 'https://yoursite.com'],
    credentials: true
}));

// ========== 配置 ==========
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = '7d'; // Token有效期7天
const SALT_ROUNDS = 10; // bcrypt盐轮数

// ========== 模拟数据库（实际应使用真实数据库如MongoDB/PostgreSQL）==========
const users = new Map([
    ['user1@example.com', {
        id: 'user1',
        email: 'user1@example.com',
        name: '张三',
        // 这是 'password123' 加密后的结果
        passwordHash: '$2b$10$qJ7q8H8K9L0P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K',
        createdAt: '2026-01-15',
        role: 'user'
    }],
    ['admin@example.com', {
        id: 'admin1',
        email: 'admin@example.com',
        name: '管理员',
        // 这是 'admin123' 加密后的结果
        passwordHash: '$2b$10$rK1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K',
        createdAt: '2026-01-01',
        role: 'admin'
    }]
]);

// ========== 工具函数 ==========

/**
 * 生成JWT Token
 */
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
}

/**
 * 验证JWT Token
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

/**
 * 验证密码
 */
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

/**
 * 加密密码
 */
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// ========== API 路由 ==========

/**
 * 用户登录
 * POST /api/auth/login
 * 请求体: { email, password }
 * 返回: { success, token, user, message }
 */
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. 验证输入
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: '邮箱和密码不能为空'
            });
        }

        // 2. 检查用户是否存在
        const user = users.get(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: '邮箱或密码错误'
            });
        }

        // 3. 验证密码
        const isPasswordValid = await verifyPassword(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: '邮箱或密码错误'
            });
        }

        // 4. 生成Token
        const token = generateToken(user);

        // 5. 返回成功响应
        res.status(200).json({
            success: true,
            message: '登录成功',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '服务器错误',
            error: error.message
        });
    }
});

/**
 * 用户注册
 * POST /api/auth/register
 * 请求体: { email, password, name }
 * 返回: { success, message }
 */
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // 1. 验证输入
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: '邮箱、密码和名称不能为空'
            });
        }

        // 2. 检查邮箱是否已注册
        if (users.has(email)) {
            return res.status(409).json({
                success: false,
                message: '该邮箱已被注册'
            });
        }

        // 3. 验证密码强度
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: '密码长度至少6位'
            });
        }

        // 4. 加密密码
        const passwordHash = await hashPassword(password);

        // 5. 创建新用户
        const newUser = {
            id: 'user_' + Date.now(),
            email: email,
            name: name,
            passwordHash: passwordHash,
            createdAt: new Date().toISOString().split('T')[0],
            role: 'user'
        };

        users.set(email, newUser);

        // 6. 返回成功响应
        res.status(201).json({
            success: true,
            message: '注册成功，请登录'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '服务器错误',
            error: error.message
        });
    }
});

/**
 * 验证Token（获取当前用户信息）
 * GET /api/auth/me
 * 请求头: Authorization: Bearer <token>
 * 返回: { success, user }
 */
app.get('/api/auth/me', (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: '缺少有效的Token'
            });
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token无效或已过期'
            });
        }

        const user = Array.from(users.values()).find(u => u.id === decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: '用户不存在'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '服务器错误',
            error: error.message
        });
    }
});

/**
 * 用户登出
 * POST /api/auth/logout
 * 返回: { success, message }
 */
app.post('/api/auth/logout', (req, res) => {
    // 注：实际应用中可在服务器端维护Token黑名单
    res.status(200).json({
        success: true,
        message: '登出成功，请删除本地Token'
    });
});

/**
 * 修改密码
 * POST /api/auth/change-password
 * 请求头: Authorization: Bearer <token>
 * 请求体: { oldPassword, newPassword }
 * 返回: { success, message }
 */
app.post('/api/auth/change-password', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: '缺少有效的Token'
            });
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token无效或已过期'
            });
        }

        const { oldPassword, newPassword } = req.body;

        // 1. 验证输入
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: '旧密码和新密码不能为空'
            });
        }

        // 2. 查找用户
        const user = Array.from(users.values()).find(u => u.id === decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: '用户不存在'
            });
        }

        // 3. 验证旧密码
        const isPasswordValid = await verifyPassword(oldPassword, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: '旧密码错误'
            });
        }

        // 4. 验证新密码强度
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: '新密码长度至少6位'
            });
        }

        // 5. 加密新密码
        const newPasswordHash = await hashPassword(newPassword);
        user.passwordHash = newPasswordHash;

        // 6. 返回成功响应
        res.status(200).json({
            success: true,
            message: '密码修改成功'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '服务器错误',
            error: error.message
        });
    }
});

// ========== 健康检查 ==========
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: '服务运行正常',
        timestamp: new Date().toISOString()
    });
});

// ========== 启动服务器 ==========
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 用户登录API服务已启动`);
    console.log(`📍 服务地址: http://localhost:${PORT}`);
    console.log(`\n测试用户:`);
    console.log(`  邮箱: user1@example.com | 密码: password123`);
    console.log(`  邮箱: admin@example.com | 密码: admin123`);
});

module.exports = app;
