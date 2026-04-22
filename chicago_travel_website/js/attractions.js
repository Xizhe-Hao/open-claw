/**
 * 芝加哥景点数据与动态加载
 * 包含15个芝加哥热门景点的详细信息
 */

// 芝加哥景点数据
const chicagoAttractions = [
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
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// 创建景点卡片HTML
function createAttractionCard(attraction) {
    return `
        <div class="attraction-card" data-id="${attraction.id}">
            <div class="card-image">
                <div class="card-badge">${attraction.category}</div>
                <div class="image-placeholder" style="background: linear-gradient(45deg, #2c3e50, #34495e); display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255,255,255,0.3); font-size: 20px; font-weight: bold;">
                    ${attraction.name}
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${attraction.name}</h3>
                <p class="card-description">${attraction.description}</p>
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${attraction.price}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${attraction.hours}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-star"></i>
                        <span>${attraction.rating}/5.0</span>
                    </div>
                </div>
                <button class="btn btn-primary w-full view-details" data-id="${attraction.id}">
                    查看详情 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// 加载所有景点
function loadAllAttractions() {
    const grid = document.getElementById('attractions-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    chicagoAttractions.forEach(attraction => {
        grid.innerHTML += createAttractionCard(attraction);
    });
    
    // 添加查看详情事件
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showAttractionDetails(id);
        });
    });
}

// 显示景点详情
function showAttractionDetails(idOrAttraction) {
    let attraction;
    
    // 支持两种调用方式：传入ID或完整对象
    if (typeof idOrAttraction === 'number') {
        attraction = chicagoAttractions.find(a => a.id === idOrAttraction);
    } else if (typeof idOrAttraction === 'object' && idOrAttraction.id) {
        attraction = idOrAttraction;
    } else {
        console.error('无效的景点参数');
        return;
    }
    
    if (!attraction) {
        console.error('未找到景点');
        return;
    }
    
    // 创建详情模态框
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="modal-content bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="modal-header p-6 border-b flex justify-between items-center">
                <h3 class="text-2xl font-bold text-chicago-blue">${attraction.name}</h3>
                <button class="close-modal text-2xl text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div class="modal-body p-6">
                <div class="mb-6">
                    <div class="image-placeholder h-48 rounded-lg mb-4" style="background: linear-gradient(45deg, #2c3e50, #34495e); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); font-size: 24px; font-weight: bold;">
                        ${attraction.name}
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 class="text-lg font-semibold text-chicago-dark mb-2">基本信息</h4>
                        <ul class="space-y-2">
                            <li class="flex justify-between">
                                <span class="text-gray-600">英文名称:</span>
                                <span class="font-medium">${attraction.nameEn}</span>
                            </li>
                            <li class="flex justify-between">
                                <span class="text-gray-600">分类:</span>
                                <span class="font-medium">${attraction.category}</span>
                            </li>
                            <li class="flex justify-between">
                                <span class="text-gray-600">门票价格:</span>
                                <span class="font-medium text-chicago-purple">${attraction.price}</span>
                            </li>
                            <li class="flex justify-between">
                                <span class="text-gray-600">开放时间:</span>
                                <span class="font-medium">${attraction.hours}</span>
                            </li>
                            <li class="flex justify-between">
                                <span class="text-gray-600">评分:</span>
                                <span class="font-medium text-yellow-600">${attraction.rating}/5.0</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold text-chicago-dark mb-2">地址</h4>
                        <p class="text-gray-700 mb-4">${attraction.address}</p>
                        
                        <h4 class="text-lg font-semibold text-chicago-dark mb-2">特色亮点</h4>
                        <ul class="space-y-1">
                            ${attraction.highlights.map(highlight => `
                                <li class="flex items-center">
                                    <i class="fas fa-check text-chicago-accent mr-2"></i>
                                    <span>${highlight}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-chicago-dark mb-3">详细介绍</h4>
                    <p class="text-gray-700 leading-relaxed">${attraction.description}</p>
                </div>
                
                <div class="flex gap-3">
                    <button class="btn btn-primary flex-1">预订门票</button>
                    <button class="btn btn-secondary flex-1">分享到社交媒体</button>
                    <button class="close-modal btn btn-outline flex-1">关闭</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加模态框到页面
    document.body.appendChild(modal);
    
    // 模态框事件监听
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.remove();
        });
    });
    
    // 点击背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // ESC键关闭
    function handleEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
}

// 导出数据供其他模块使用
window.chicagoAttractions = chicagoAttractions;
window.showAttractionDetails = showAttractionDetails;
window.loadAllAttractions = loadAllAttractions;