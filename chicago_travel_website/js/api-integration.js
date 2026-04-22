/**
 * 芝加哥旅行网站 - API集成模块
 * 连接前端与后端API，实现动态数据加载
 */

const API_BASE_URL = 'http://localhost:3000/api';

// 获取所有景点
async function fetchAllAttractions() {
    try {
        const response = await fetch(`${API_BASE_URL}/attractions`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('获取景点数据失败:', data.message);
            return [];
        }
    } catch (error) {
        console.error('API请求失败:', error);
        // 回退到本地数据
        return window.chicagoAttractions || [];
    }
}

// 获取单个景点详情
async function fetchAttractionDetails(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/attractions/${id}`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('获取景点详情失败:', data.message);
            return null;
        }
    } catch (error) {
        console.error('API请求失败:', error);
        // 回退到本地数据
        const localData = window.chicagoAttractions || [];
        return localData.find(attraction => attraction.id === id) || null;
    }
}

// 搜索景点
async function searchAttractions(filters = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}/attractions/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('搜索景点失败:', data.message);
            return [];
        }
    } catch (error) {
        console.error('API请求失败:', error);
        return [];
    }
}

// 获取行程规划
async function fetchItineraries() {
    try {
        const response = await fetch(`${API_BASE_URL}/itineraries`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('获取行程规划失败:', data.message);
            return [];
        }
    } catch (error) {
        console.error('API请求失败:', error);
        return [];
    }
}

// 提交用户反馈
async function submitFeedback(feedbackData) {
    try {
        const response = await fetch(`${API_BASE_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || '提交失败' };
        }
    } catch (error) {
        console.error('提交反馈失败:', error);
        return { success: false, message: '网络错误，请稍后重试' };
    }
}

// 检查API健康状态
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        return {
            healthy: data.status === 'healthy',
            service: data.service,
            version: data.version,
            uptime: data.uptime
        };
    } catch (error) {
        console.error('API健康检查失败:', error);
        return {
            healthy: false,
            error: error.message
        };
    }
}

// 动态加载景点卡片（使用API数据）
async function loadAttractionsFromAPI() {
    const grid = document.getElementById('attractions-grid');
    if (!grid) return;
    
    // 显示加载状态
    grid.innerHTML = `
        <div class="loading-spinner-container">
            <div class="loading-spinner"></div>
            <p>正在加载芝加哥景点...</p>
        </div>
    `;
    
    try {
        const attractions = await fetchAllAttractions();
        
        if (attractions.length === 0) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>暂时无法加载景点数据</h3>
                    <p>请检查网络连接或稍后重试</p>
                    <button class="btn btn-secondary" onclick="loadAttractionsFromAPI()">
                        重试 <i class="fas fa-redo"></i>
                    </button>
                </div>
            `;
            return;
        }
        
        // 清空并重新填充
        grid.innerHTML = '';
        
        attractions.forEach(attraction => {
            const card = createAttractionCard(attraction);
            grid.appendChild(card);
        });
        
        // 添加点击事件
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', async function() {
                const id = parseInt(this.getAttribute('data-id'));
                await showAttractionDetailsFromAPI(id);
            });
        });
        
        console.log(`成功加载 ${attractions.length} 个景点`);
        
    } catch (error) {
        console.error('加载景点失败:', error);
        grid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i>
                <h3>加载失败</h3>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="loadAttractionsFromAPI()">
                    重新加载 <i class="fas fa-sync-alt"></i>
                </button>
            </div>
        `;
    }
}

// 从API获取并显示景点详情
async function showAttractionDetailsFromAPI(id) {
    try {
        const attraction = await fetchAttractionDetails(id);
        
        if (!attraction) {
            alert('无法加载景点详情，请稍后重试');
            return;
        }
        
        showAttractionDetails(attraction);
        
    } catch (error) {
        console.error('显示景点详情失败:', error);
        alert('加载详情时发生错误: ' + error.message);
    }
}

// 初始化API集成
async function initAPI() {
    console.log('初始化API集成...');
    
    // 检查API健康状态
    const health = await checkAPIHealth();
    
    if (health.healthy) {
        console.log(`✅ API服务正常: ${health.service} v${health.version}`);
        
        // 替换原有的景点加载函数
        if (typeof loadAllAttractions === 'function') {
            window.originalLoadAllAttractions = loadAllAttractions;
        }
        
        window.loadAllAttractions = loadAttractionsFromAPI;
        
        // 如果页面已加载，立即重新加载数据
        if (document.readyState === 'complete') {
            await loadAttractionsFromAPI();
        }
        
    } else {
        console.warn('⚠️ API服务不可用，使用本地数据');
        // 保持原有的本地数据加载
    }
    
    // 添加API状态指示器
    addAPIStatusIndicator(health);
}

// 添加API状态指示器到页面
function addAPIStatusIndicator(health) {
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'api-status-indicator';
    statusIndicator.innerHTML = `
        <div class="status-dot ${health.healthy ? 'healthy' : 'unhealthy'}"></div>
        <span class="status-text">${health.healthy ? 'API在线' : 'API离线'}</span>
    `;
    
    statusIndicator.title = health.healthy ? 
        `服务: ${health.service}\n版本: ${health.version}\n运行时间: ${Math.floor(health.uptime)}秒` :
        '后端API服务不可用，使用本地数据';
    
    // 添加到页面右下角
    statusIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${health.healthy ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1000;
        cursor: help;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    const statusDot = statusIndicator.querySelector('.status-dot');
    statusDot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${health.healthy ? '#2ecc71' : '#e74c3c'};
        animation: ${health.healthy ? 'pulse 2s infinite' : 'none'};
    `;
    
    document.body.appendChild(statusIndicator);
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .loading-spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        grid-column: 1 / -1;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(30, 60, 114, 0.1);
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: chicagoWindmill 1s linear infinite;
        margin-bottom: 16px;
    }
    
    .no-data-message, .error-message {
        text-align: center;
        padding: 40px;
        grid-column: 1 / -1;
        color: #7f8c8d;
    }
    
    .no-data-message i, .error-message i {
        font-size: 48px;
        margin-bottom: 16px;
        color: #f39c12;
    }
    
    .error-message i {
        color: #e74c3c;
    }
`;

document.head.appendChild(style);

// 页面加载完成后初始化API
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAPI);
} else {
    initAPI();
}

// 导出API函数供其他模块使用
window.ChicagoTravelAPI = {
    fetchAllAttractions,
    fetchAttractionDetails,
    searchAttractions,
    fetchItineraries,
    submitFeedback,
    checkAPIHealth,
    loadAttractionsFromAPI,
    showAttractionDetailsFromAPI,
    initAPI
};