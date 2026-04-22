// 芝加哥旅行网站 - 后端API服务器
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 芝加哥景点数据API
const attractions = [
    {
        id: 1,
        name: "千禧公园",
        nameEn: "Millennium Park",
        category: "公园/艺术",
        price: "免费",
        hours: "6:00-23:00",
        rating: 4.8,
        description: "芝加哥标志性艺术公园，以云门（The Bean）和皇冠喷泉闻名，是城市的文化心脏。每年吸引超过500万游客。",
        highlights: ["云门雕塑", "皇冠喷泉", "卢里花园", "杰·普利兹克音乐厅"],
        address: "201 E Randolph St, Chicago, IL 60602",
        coordinates: { lat: 41.8827, lng: -87.6233 },
        image: "https://images.unsplash.com/photo-1494522358652-c549345d2c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "海军码头",
        nameEn: "Navy Pier",
        category: "娱乐/码头",
        price: "进入免费，项目收费",
        hours: "10:00-24:00（夏季延长）",
        rating: 4.5,
        description: "芝加哥港口综合娱乐地标，百年轮、儿童博物馆、餐厅酒吧和夏季烟火秀，适合家庭游玩。",
        highlights: ["百年轮观景", "FlyOver Chicago 4D体验", "儿童博物馆", "夏季烟火秀"],
        address: "600 E Grand Ave, Chicago, IL 60611",
        coordinates: { lat: 41.8919, lng: -87.6076 },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    // ... 更多景点数据（共15个）
    {
        id: 3,
        name: "威利斯塔观景台",
        nameEn: "Willis Tower Skydeck",
        category: "观景/建筑",
        price: "$26-36",
        hours: "9:00-22:00",
        rating: 4.6,
        description: "103层高楼观景，The Ledge悬空玻璃盒子体验，俯瞰整个芝加哥，晴天可看4州美景。",
        highlights: ["The Ledge玻璃盒子", "103层观景", "芝加哥全景", "惊险体验"],
        address: "233 S Wacker Dr, Chicago, IL 60606",
        coordinates: { lat: 41.8789, lng: -87.6359 },
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// API路由
app.get('/api/attractions', (req, res) => {
    res.json({
        success: true,
        data: attractions,
        count: attractions.length,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/attractions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const attraction = attractions.find(a => a.id === id);
    
    if (attraction) {
        res.json({
            success: true,
            data: attraction,
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(404).json({
            success: false,
            message: '景点未找到',
            id: id
        });
    }
});

app.post('/api/attractions/search', (req, res) => {
    const { category, minRating, maxPrice } = req.body;
    let filtered = [...attractions];
    
    if (category) {
        filtered = filtered.filter(a => a.category.includes(category));
    }
    
    if (minRating) {
        filtered = filtered.filter(a => a.rating >= minRating);
    }
    
    if (maxPrice) {
        filtered = filtered.filter(a => {
            const price = a.price.replace('$', '').split('-')[0];
            return parseFloat(price) <= maxPrice || a.price === '免费';
        });
    }
    
    res.json({
        success: true,
        data: filtered,
        count: filtered.length,
        filters: { category, minRating, maxPrice }
    });
});

// 行程规划API
app.get('/api/itineraries', (req, res) => {
    const itineraries = [
        {
            id: 1,
            name: "3天精华游",
            duration: "3天2夜",
            budget: "$400-600",
            description: "适合时间紧张的游客，体验芝加哥核心景点。",
            attractions: [1, 2, 3, 4],
            dailyPlan: [
                { day: 1, activities: ["千禧公园", "芝加哥美术馆", "深盘披萨晚餐"] },
                { day: 2, activities: ["海军码头", "建筑游船", "华丽一英里购物"] },
                { day: 3, activities: ["威利斯塔观景台", "芝加哥文化中心", "返程"] }
            ]
        },
        {
            id: 2,
            name: "5天深度游",
            duration: "5天4夜",
            budget: "$700-1000",
            description: "推荐选择，充分体验芝加哥多元文化。",
            attractions: [1, 2, 3, 4, 5, 6, 7],
            dailyPlan: [
                { day: 1, activities: ["千禧公园", "皇冠喷泉", "卢里花园"] },
                { day: 2, activities: ["海军码头", "百年轮", "夏季烟火秀"] },
                { day: 3, activities: ["威利斯塔观景台", "芝加哥河步道"] },
                { day: 4, activities: ["芝加哥美术馆", "华丽一英里"] },
                { day: 5, activities: ["建筑游船", "购物", "返程"] }
            ]
        }
    ];
    
    res.json({
        success: true,
        data: itineraries,
        count: itineraries.length
    });
});

// 用户反馈API
app.post('/api/feedback', (req, res) => {
    const { name, email, message, rating } = req.body;
    
    // 模拟保存到数据库
    console.log('收到用户反馈:', { name, email, message, rating, timestamp: new Date() });
    
    res.json({
        success: true,
        message: '感谢您的反馈！',
        data: { name, email, rating },
        timestamp: new Date().toISOString()
    });
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Chicago Travel API',
        version: '1.0.0',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 芝加哥旅行API服务器运行在 http://localhost:${PORT}`);
    console.log(`📚 API文档: http://localhost:${PORT}/api/health`);
    console.log(`🏙️ 景点API: http://localhost:${PORT}/api/attractions`);
    console.log(`🗺️ 前端页面: http://localhost:${PORT}/index.html`);
});

module.exports = app;