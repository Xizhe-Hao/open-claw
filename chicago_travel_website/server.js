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

// 芝加哥景点数据API（完整15个景点）
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
    },
    {
        id: 4,
        name: "芝加哥美术馆",
        nameEn: "Art Institute of Chicago",
        category: "博物馆/艺术",
        price: "$25（含建议捐赠）",
        hours: "10:30-17:00（周五至20:00）",
        rating: 4.9,
        description: "美国第二大美术馆，收藏26万+件艺术作品，包括《美国哥特式》等世界名画。",
        highlights: ["美国哥特式", "印象派大师作品", "亚洲艺术珍藏", "现代艺术"],
        address: "111 S Michigan Ave, Chicago, IL 60603",
        coordinates: { lat: 41.8796, lng: -87.6237 },
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "建筑游船",
        nameEn: "Chicago Architecture Boat Cruise",
        category: "游船/建筑",
        price: "$40-50",
        hours: "1.5-2小时游程",
        rating: 4.9,
        description: "沿芝加哥河欣赏建筑杰作，专业讲解历史建筑与设计故事，最佳摄影机会。",
        highlights: ["建筑历史讲解", "芝加哥河美景", "摄影绝佳位置", "夕阳游船"],
        address: "从多个码头出发",
        coordinates: { lat: 41.8877, lng: -87.6276 },
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "谢德水族馆",
        nameEn: "Shedd Aquarium",
        category: "水族馆/海洋",
        price: "$40",
        hours: "9:00-18:00（冬季至17:00）",
        rating: 4.7,
        description: "世界级水族馆，海豚秀、海狮表演、海洋生物展览，适合家庭和海洋爱好者。",
        highlights: ["海豚表演", "海狮表演", "海洋生物展览", "儿童互动区"],
        address: "1200 S DuSable Lake Shore Dr, Chicago, IL 60605",
        coordinates: { lat: 41.8676, lng: -87.6137 },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "360 Chicago观景台",
        nameEn: "360 Chicago Observation Deck",
        category: "观景/建筑",
        price: "$30-35",
        hours: "9:00-23:00",
        rating: 4.5,
        description: "94层高楼观景台，人少于威利斯塔，TILT倾斜体验刺激，360度全景。",
        highlights: ["TILT倾斜体验", "94层观景", "360度全景", "相对人少"],
        address: "875 N Michigan Ave, Chicago, IL 60611",
        coordinates: { lat: 41.8978, lng: -87.6241 },
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "科学与工业博物馆",
        nameEn: "Museum of Science and Industry",
        category: "博物馆/科学",
        price: "$25-30",
        hours: "9:00-16:00",
        rating: 4.7,
        description: "美国最大的科学博物馆，真实德国U-艇、飞机展览、航空模拟器，适合科技爱好者。",
        highlights: ["真实U-艇", "飞机展览", "航空模拟器", "科学实验"],
        address: "5700 S DuSable Lake Shore Dr, Chicago, IL 60637",
        coordinates: { lat: 41.7908, lng: -87.5832 },
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "林肯公园动物园",
        nameEn: "Lincoln Park Zoo",
        category: "动物园/公园",
        price: "免费",
        hours: "10:00-17:00（冬季至16:30）",
        rating: 4.6,
        description: "美国最古老的动物园之一，动物种类丰富，园林设计优美，亲子游首选。",
        highlights: ["免费入场", "动物种类多", "园林设计美", "亲子活动"],
        address: "2001 N Clark St, Chicago, IL 60614",
        coordinates: { lat: 41.9217, lng: -87.6337 },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "华丽一英里",
        nameEn: "Magnificent Mile",
        category: "购物/街区",
        price: "免费漫步",
        hours: "全天开放",
        rating: 4.4,
        description: "芝加哥著名购物街区，高端品牌聚集，美食餐厅众多，建筑风格多样。",
        highlights: ["高端购物", "美食餐厅", "建筑欣赏", "城市漫步"],
        address: "N Michigan Ave, Chicago, IL",
        coordinates: { lat: 41.8958, lng: -87.6241 },
        image: "https://images.unsplash.com/photo-1494522358652-c549345d2c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "芝加哥文化中心",
        nameEn: "Chicago Cultural Center",
        category: "文化/建筑",
        price: "免费",
        hours: "10:00-18:00",
        rating: 4.7,
        description: "历史建筑，Tiffany穹顶天花板超美，免费展览和音乐会，建筑爱好者必去。",
        highlights: ["Tiffany穹顶", "免费展览", "历史建筑", "音乐会"],
        address: "78 E Washington St, Chicago, IL 60602",
        coordinates: { lat: 41.8835, lng: -87.6247 },
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "菲尔德自然历史博物馆",
        nameEn: "Field Museum",
        category: "博物馆/自然",
        price: "$24-38",
        hours: "9:00-17:00",
        rating: 4.6,
        description: "世界级自然历史博物馆，恐龙化石、古埃及木乃伊、宝石展览，知识丰富。",
        highlights: ["恐龙化石", "古埃及木乃伊", "宝石展览", "自然历史"],
        address: "1400 S DuSable Lake Shore Dr, Chicago, IL 60605",
        coordinates: { lat: 41.8664, lng: -87.6170 },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        name: "阿德勒天文馆",
        nameEn: "Adler Planetarium",
        category: "天文馆/科学",
        price: "$12-35",
        hours: "9:00-18:00",
        rating: 4.5,
        description: "美国第一个天文馆，星空表演、太空展览、天文望远镜，天文爱好者天堂。",
        highlights: ["星空表演", "太空展览", "天文望远镜", "天文历史"],
        address: "1300 S DuSable Lake Shore Dr, Chicago, IL 60605",
        coordinates: { lat: 41.8663, lng: -87.6072 },
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 14,
        name: "林肯公园",
        nameEn: "Lincoln Park",
        category: "公园/自然",
        price: "免费",
        hours: "全天开放",
        rating: 4.5,
        description: "芝加哥最大公园，湖景优美，散步、骑行、野餐好去处，城市中的绿洲。",
        highlights: ["湖景优美", "散步骑行", "野餐区域", "城市绿洲"],
        address: "Lincoln Park, Chicago, IL",
        coordinates: { lat: 41.9214, lng: -87.6351 },
        image: "https://images.unsplash.com/photo-1494522358652-c549345d2c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 15,
        name: "芝加哥河步道",
        nameEn: "Chicago Riverwalk",
        category: "步道/城市",
        price: "免费",
        hours: "全天开放",
        rating: 4.6,
        description: "沿芝加哥河的步行道，欣赏城市建筑，餐厅酒吧众多，傍晚最美。",
        highlights: ["河景步道", "建筑欣赏", "餐厅酒吧", "傍晚美景"],
        address: "Chicago Riverwalk, Chicago, IL",
        coordinates: { lat: 41.8877, lng: -87.6289 },
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