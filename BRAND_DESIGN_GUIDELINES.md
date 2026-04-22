# 🎨 OpenClaw 品牌设计规范

**编制部门**: 礼部（品牌与设计部）  
**编制时间**: 2026-04-22 00:40 UTC  
**版本**: v1.0  

---

## 🏮 品牌核心理念

### 品牌名称
**OpenClaw** - 开放之爪，掌控万物

### 品牌口号
**"连接一切，掌控未来"**

### 品牌定位
- **技术定位**: 下一代远程控制与自动化平台
- **情感定位**: 强大而不失优雅，专业而不失亲和
- **视觉定位**: 现代极简主义 + 东方美学元素

---

## 🎨 主视觉系统

### 1. 品牌色板

#### 主品牌色
```css
/* 主品牌色 - 深空蓝 */
--primary-color: #1A237E;      /* 深空蓝 */
--primary-light: #534BAE;      /* 亮蓝 */
--primary-dark: #000051;       /* 深夜蓝 */

/* 辅助色 - 朱砂红 */
--accent-color: #D32F2F;       /* 朱砂红 */
--accent-light: #FF6659;       /* 亮朱红 */
--accent-dark: #9A0007;        /* 暗朱红 */
```

#### 中性色系
```css
/* 中性色 */
--neutral-900: #212121;        /* 墨黑 */
--neutral-700: #616161;        /* 石墨灰 */
--neutral-500: #9E9E9E;        /* 中灰 */
--neutral-300: #E0E0E0;        /* 浅灰 */
--neutral-100: #F5F5F5;        /* 背景白 */

/* 功能色 */
--success-color: #388E3C;      /* 竹绿 */
--warning-color: #F57C00;      /* 琥珀橙 */
--error-color: #D32F2F;        /* 朱砂红 */
--info-color: #1976D2;         /* 青蓝 */
```

### 2. 品牌标志

#### 标志构成
```
┌─────────────────────────────┐
│          OpenClaw           │
│    ┌──────────────┐         │
│    │  爪形图案    │         │
│    └──────────────┘         │
│  连接一切，掌控未来         │
└─────────────────────────────┘
```

#### 标志使用规范
- **完整标志**: 用于网站头部、文档封面
- **简化标志**: 用于应用图标、小尺寸展示
- **单色标志**: 用于黑白印刷、背景复杂场景

---

## 📐 UI 组件设计规范

### 1. 按钮系统

#### 主要按钮 (Primary)
```css
.btn-primary {
  background: linear-gradient(135deg, #1A237E, #534BAE);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #534BAE, #1A237E);
  box-shadow: 0 6px 16px rgba(26, 35, 126, 0.4);
  transform: translateY(-2px);
}
```

#### 次要按钮 (Secondary)
```css
.btn-secondary {
  background: transparent;
  color: #1A237E;
  border: 2px solid #1A237E;
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(26, 35, 126, 0.1);
  border-color: #534BAE;
}
```

### 2. 卡片设计

```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #E0E0E0;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  background: linear-gradient(90deg, #1A237E, #534BAE);
  color: white;
  padding: 16px 24px;
  font-weight: 600;
}

.card-body {
  padding: 24px;
}
```

### 3. 输入框设计

```css
.input-field {
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.input-field:focus {
  border-color: #1A237E;
  box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
  outline: none;
}

.input-field.error {
  border-color: #D32F2F;
  background: rgba(211, 47, 47, 0.05);
}
```

---

## 🖼️ 页面布局设计

### 1. 仪表盘页面

```
┌─────────────────────────────────────────┐
│ 头部导航栏                              │
├─────────────────────────────────────────┤
│ 侧边栏 │ 主内容区                        │
│        │                                │
│        │  ┌─────────┐ ┌─────────┐      │
│        │  │ 卡片1   │ │ 卡片2   │      │
│        │  └─────────┘ └─────────┘      │
│        │                                │
│        │  ┌─────────────────────┐      │
│        │  │     数据表格        │      │
│        │  └─────────────────────┘      │
│        │                                │
├─────────────────────────────────────────┤
│ 底部状态栏                              │
└─────────────────────────────────────────┘
```

### 2. 登录页面设计

```html
<!-- 登录页面设计稿 -->
<div class="login-container">
  <div class="login-card">
    <!-- 品牌标志区域 -->
    <div class="brand-section">
      <div class="logo">🦅</div>
      <h1>OpenClaw</h1>
      <p class="tagline">连接一切，掌控未来</p>
    </div>
    
    <!-- 登录表单 -->
    <form class="login-form">
      <div class="input-group">
        <label for="email">邮箱地址</label>
        <input type="email" id="email" placeholder="user@example.com">
      </div>
      
      <div class="input-group">
        <label for="password">密码</label>
        <input type="password" id="password" placeholder="••••••••">
      </div>
      
      <button type="submit" class="btn-primary">登录系统</button>
    </form>
    
    <!-- 辅助链接 -->
    <div class="login-footer">
      <a href="#">忘记密码？</a>
      <a href="#">创建新账户</a>
    </div>
  </div>
</div>
```

---

## 🎯 图标系统

### 1. 功能图标集

```
🦅 - 品牌标志 (鹰/爪)
⚙️ - 设置
📊 - 数据分析
🔗 - 连接
🛡️ - 安全
📱 - 移动端
💻 - 桌面端
🌐 - 网络
📈 - 增长
🔔 - 通知
```

### 2. 状态图标

```
✅ - 成功/完成
⚠️ - 警告/注意
❌ - 错误/失败
⏳ - 加载中
🔒 - 锁定/安全
🔓 - 解锁
```

---

## 📱 响应式设计规范

### 断点设置
```css
/* 移动端优先 */
@media (min-width: 640px) { /* 平板 */ }
@media (min-width: 768px) { /* 小桌面 */ }
@media (min-width: 1024px) { /* 桌面 */ }
@media (min-width: 1280px) { /* 大桌面 */ }
```

### 移动端适配
- 导航栏变为汉堡菜单
- 卡片垂直堆叠
- 按钮全宽度显示
- 字体大小适当调整

---

## 🎨 视觉元素库

### 1. 背景图案
```css
/* 渐变背景 */
.gradient-bg {
  background: linear-gradient(135deg, #1A237E 0%, #534BAE 50%, #1A237E 100%);
}

/* 网格背景 */
.grid-bg {
  background-image: 
    linear-gradient(rgba(26, 35, 126, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 126, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### 2. 动画效果
```css
/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* 滑动动画 */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

---

## 📄 文档设计规范

### 1. 文档排版
- **标题字体**: 思源黑体 / Noto Sans SC
- **正文字体**: 思源宋体 / Noto Serif SC
- **代码字体**: JetBrains Mono / Fira Code
- **行高**: 1.6 (正文), 1.4 (代码)
- **段落间距**: 1.5em

### 2. 文档配色
```css
/* 文档配色 */
.doc-title { color: #1A237E; }
.doc-subtitle { color: #534BAE; }
.doc-body { color: #212121; }
.doc-code { background: #F5F5F5; color: #D32F2F; }
.doc-note { background: #FFF3E0; border-left: 4px solid #F57C00; }
```

---

## ✅ 设计检查清单

### 品牌一致性检查
- [ ] 是否使用品牌主色 (#1A237E)
- [ ] 是否包含品牌标志
- [ ] 是否体现品牌口号
- [ ] 是否符合品牌调性

### UI 可用性检查
- [ ] 按钮大小是否合适 (最小44×44px)
- [ ] 文字对比度是否达标 (WCAG AA)
- [ ] 交互反馈是否明确
- [ ] 错误提示是否清晰

### 响应式检查
- [ ] 移动端布局是否合理
- [ ] 触控目标是否足够大
- [ ] 横屏/竖屏适配
- [ ] 字体大小可读性

---

## 📋 设计资产清单

### 已创建文件
1. `BRAND_DESIGN_GUIDELINES.md` - 本文件
2. `brand-colors.css` - 品牌色板CSS文件
3. `ui-components.figma` - Figma设计文件
4. `icon-set.svg` - SVG图标集

### 待创建文件
1. 登录页面完整设计稿
2. 仪表盘组件库
3. 移动端适配方案
4. 暗色主题设计

---

## 🎯 下一步设计计划

### 短期目标 (1周内)
1. 完成登录页面完整设计
2. 创建仪表盘组件库
3. 设计移动端导航方案

### 中期目标 (1月内)
1. 建立完整设计系统
2. 创建交互原型
3. 设计暗色主题

### 长期目标 (3月内)
1. 建立设计资产库
2. 创建设计文档网站
3. 建立设计评审流程

---

**礼部尚书 谨呈**  
*设计创造价值，美学赋能技术*