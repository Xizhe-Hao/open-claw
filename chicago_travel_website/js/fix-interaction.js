/**
 * 芝加哥旅行网站 - 交互修复脚本
 * 确保所有点击和交互功能正常工作
 */

// 等待页面完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 开始修复交互功能...');
    
    // 延迟执行，确保其他脚本已加载
    setTimeout(fixAllInteractions, 500);
});

// 修复所有交互功能
function fixAllInteractions() {
    console.log('🛠️ 修复交互功能...');
    
    // 1. 修复景点卡片点击
    fixAttractionClicks();
    
    // 2. 修复导航菜单
    fixNavigation();
    
    // 3. 修复表单提交
    fixForms();
    
    // 4. 修复按钮点击
    fixButtons();
    
    // 5. 检查API状态
    checkAPIStatus();
    
    console.log('✅ 交互功能修复完成');
}

// 修复景点卡片点击事件
function fixAttractionClicks() {
    const grid = document.getElementById('attractions-grid');
    if (!grid) {
        console.warn('⚠️ 未找到景点网格元素');
        return;
    }
    
    // 监听网格上的点击事件（事件委托）
    grid.addEventListener('click', function(event) {
        const viewDetailsBtn = event.target.closest('.view-details');
        if (viewDetailsBtn) {
            event.preventDefault();
            event.stopPropagation();
            
            const attractionId = viewDetailsBtn.getAttribute('data-id');
            if (attractionId) {
                console.log(`点击景点ID: ${attractionId}`);
                showAttractionDetailsById(attractionId);
            }
        }
    });
    
    console.log(`✅ 景点点击事件已修复，网格元素: ${grid.id}`);
}

// 根据ID显示景点详情
function showAttractionDetailsById(id) {
    console.log(`显示景点详情 ID: ${id}`);
    
    // 尝试使用API
    if (window.ChicagoTravelAPI && typeof window.ChicagoTravelAPI.showAttractionDetailsFromAPI === 'function') {
        window.ChicagoTravelAPI.showAttractionDetailsFromAPI(parseInt(id));
    }
    // 尝试使用本地函数
    else if (typeof showAttractionDetails === 'function') {
        // 从本地数据查找景点
        const attractions = window.chicagoAttractions || [];
        const attraction = attractions.find(a => a.id === parseInt(id));
        if (attraction) {
            showAttractionDetails(attraction);
        } else {
            alert('无法找到景点详情，请稍后重试');
        }
    }
    // 备用方案
    else {
        alert(`景点 #${id} 详情\n\n功能正在加载中，请稍后重试。`);
    }
}

// 修复导航菜单
function fixNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    console.log(`✅ 导航菜单已修复，链接数量: ${navLinks.length}`);
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        console.log(`滚动到: ${sectionId}`);
    }
}

// 修复表单提交
function fixForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('表单提交:', this.id || '未命名表单');
            
            // 简单的表单验证
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                alert('感谢您的提交！我们会尽快处理。');
                this.reset();
            } else {
                alert('请填写所有必填字段');
            }
        });
    });
    console.log(`✅ 表单已修复，数量: ${forms.length}`);
}

// 修复按钮点击
function fixButtons() {
    const buttons = document.querySelectorAll('.btn:not(.view-details)');
    buttons.forEach(button => {
        if (!button.hasAttribute('data-click-fixed')) {
            button.setAttribute('data-click-fixed', 'true');
            button.addEventListener('click', function() {
                console.log(`按钮点击: ${this.textContent.trim()}`);
                
                // 根据按钮类型执行不同操作
                if (this.classList.contains('btn-primary')) {
                    console.log('主按钮被点击');
                } else if (this.classList.contains('btn-secondary')) {
                    console.log('次要按钮被点击');
                }
            });
        }
    });
    console.log(`✅ 按钮点击已修复，数量: ${buttons.length}`);
}

// 检查API状态
function checkAPIStatus() {
    console.log('📡 检查API状态...');
    
    // 检查API集成是否加载
    if (window.ChicagoTravelAPI) {
        console.log('✅ ChicagoTravelAPI 已加载');
        
        // 检查健康状态
        window.ChicagoTravelAPI.checkAPIHealth()
            .then(health => {
                console.log(`API健康状态: ${health.healthy ? '🟢 健康' : '🔴 异常'}`);
                if (health.healthy) {
                    console.log(`服务: ${health.service}, 版本: ${health.version}`);
                }
            })
            .catch(err => {
                console.warn('API健康检查失败:', err.message);
            });
    } else {
        console.warn('⚠️ ChicagoTravelAPI 未加载，使用本地数据');
    }
    
    // 检查景点数据
    if (window.chicagoAttractions && window.chicagoAttractions.length > 0) {
        console.log(`✅ 本地景点数据: ${window.chicagoAttractions.length} 个`);
    } else {
        console.warn('⚠️ 本地景点数据未加载');
    }
}

// 添加CSS样式用于调试
const style = document.createElement('style');
style.textContent = `
    .debug-highlight {
        outline: 2px solid #3498db !important;
        outline-offset: 2px;
    }
    
    .debug-click {
        animation: debug-pulse 0.3s;
    }
    
    @keyframes debug-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(style);

// 导出函数供调试
window.FixInteractions = {
    fixAllInteractions,
    fixAttractionClicks,
    fixNavigation,
    fixForms,
    fixButtons,
    checkAPIStatus
};

console.log('🔧 交互修复脚本加载完成');