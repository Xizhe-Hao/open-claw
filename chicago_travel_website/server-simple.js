// 芝加哥旅行网站 - 简化后端API服务器
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 简单景点数据
const attractions = [
    {
        id: 1,
        name: "千禧公园",
        nameEn: "Millennium Park",
        category: "公园/艺术",
        price: "免费",
        hours: "6:00-23:00",
        rating: 4.8,
        description: "芝加哥标志性艺术公园，以云门（The Bean）和皇冠喷泉闻名。",
        highlights: ["云门雕塑", "皇冠喷泉", "卢里花园"],
        address: "201 E Randolph St, Chicago, IL 60602"
    },
    {
        id: 2,
        name: "海军码头",
        nameEn: "Navy Pier",
        category: "娱乐/码头",
        price: "进入免费，项目收费",
        hours: "10:00-24:00",
        rating: 4.5,
        description: "芝加哥港口综合娱乐地标，百年轮、儿童博物馆。",
        highlights: ["百年轮观景", "儿童博物馆", "夏季烟火秀"],
        address: "600 E Grand Ave, Chicago, IL 60611"
    },
    {
        id: 3,
        name: "威利斯塔观景台",
        nameEn: "Willis Tower Skydeck",
        category: "观景/建筑",
        price: "$26-36",
        hours: "9:00-22:00",
        rating: 4.6,
        description: "103层高楼观景，The Ledge悬空玻璃盒子体验。",
        highlights: ["The Ledge玻璃盒子", "103层观景", "芝加哥全景"],
        address: "233 S Wacker Dr, Chicago, IL 60606"
    }
];

// 简单API路由
app.get('/api/attractions', (req, res) => {
    res.json({
        success: true,
        data: attractions,
        count: attractions.length,
        message: '芝加哥景点数据'
    });
});

app.get('/api/attractions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const attraction = attractions.find(a => a.id === id);
    
    if (attraction) {
        res.json({
            success: true,
            data: attraction
        });
    } else {
        res.status(404).json({
            success: false,
            message: '景点未找到'
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Chicago Travel API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// 默认路由 - 提供前端页面
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 芝加哥旅行服务器运行在 http://localhost:${PORT}`);
    console.log(`🏙️ 景点API: http://localhost:${PORT}/api/attractions`);
    console.log(`📊 健康检查: http://localhost:${PORT}/api/health`);
    console.log(`🌐 前端页面: http://localhost:${PORT}`);
});

module.exports = app;