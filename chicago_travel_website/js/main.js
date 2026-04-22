/**
 * 芝加哥旅行网站 - 主JavaScript文件
 * 包含网站核心功能和交互
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('芝加哥旅行网站已加载');
    
    // 初始化功能
    initNavigation();
    initSmoothScroll();
    initModalClose();
    initAttractionFilters();
    initMobileMenu();
    
    // 加载景点数据
    if (typeof loadAllAttractions === 'function') {
        loadAllAttractions();
    }
    
    // 显示欢迎消息
    showWelcomeMessage();
});

// 初始化导航
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 高亮当前活动导航
    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前active类
            this.classList.add('active');
            
            // 平滑滚动到目标
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化模态框关闭
function initModalClose() {
    // 点击模态框外部关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.remove();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.remove();
            }
        }
    });
}

// 初始化景点筛选
function initAttractionFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选景点
            filterAttractions(filter);
        });
    });
}

// 筛选景点
function filterAttractions(filter) {
    const attractions = document.querySelectorAll('.attraction-card');
    
    attractions.forEach(card => {
        const category = card.querySelector('.card-badge').textContent;
        
        if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 初始化移动端菜单
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 点击菜单外关闭
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
            if (mainNav) mainNav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
}

// 显示欢迎消息
function showWelcomeMessage() {
    // 检查是否第一次访问
    if (!localStorage.getItem('chicago_welcome_shown')) {
        setTimeout(() => {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'fixed bottom-4 right-4 bg-chicago-blue text-white p-4 rounded-lg shadow-xl max-w-sm z-50 animate-fade-in-up';
            welcomeMsg.innerHTML = `
                <div class="flex items-start gap-3">
                    <i class="fas fa-hand-wave text-2xl text-chicago-accent"></i>
                    <div>
                        <h4 class="font-bold mb-1">欢迎来到芝加哥旅行指南！</h4>
                        <p class="text-sm opacity-90">探索风城魅力，发现无限可能。祝您浏览愉快！</p>
                    </div>
                    <button class="close-welcome ml-2 text-lg opacity-70 hover:opacity-100">&times;</button>
                </div>
            `;
            
            document.body.appendChild(welcomeMsg);
            
            // 关闭按钮
            welcomeMsg.querySelector('.close-welcome').addEventListener('click', function() {
                welcomeMsg.remove();
                localStorage.setItem('chicago_welcome_shown', 'true');
            });
            
            // 5秒后自动关闭
            setTimeout(() => {
                if (welcomeMsg.parentNode) {
                    welcomeMsg.remove();
                    localStorage.setItem('chicago_welcome_shown', 'true');
                }
            }, 5000);
        }, 1000);
    }
}

// 工具函数：格式化价格
function formatPrice(price) {
    if (price === '免费') return '<span class="text-green-600 font-bold">免费</span>';
    if (price.includes('$')) {
        const amount = price.replace('$', '').split('-')[0];
        return `<span class="text-chicago-purple font-bold">${price}</span>`;
    }
    return price;
}

// 工具函数：获取当前时间
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// 工具函数：检查景点是否开放
function isAttractionOpen(hours) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // 简单解析时间范围，如 "9:00-17:00"
    const match = hours.match(/(\d+):(\d+)-(\d+):(\d+)/);
    if (match) {
        const openHour = parseInt(match[1]);
        const openMinute = parseInt(match[2]);
        const closeHour = parseInt(match[3]);
        const closeMinute = parseInt(match[4]);
        
        const currentTime = currentHour * 60 + currentMinute;
        const openTime = openHour * 60 + openMinute;
        const closeTime = closeHour * 60 + closeMinute;
        
        return currentTime >= openTime && currentTime <= closeTime;
    }
    
    return true; // 如果无法解析，默认开放
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in-up {
        animation: fade-in-up 0.5s ease-out;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .animate-pulse {
        animation: pulse 2s infinite;
    }
    
    /* 移动端菜单样式 */
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        .main-nav ul {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--chicago-dark);
            padding: 1rem;
            box-shadow: var(--shadow-xl);
        }
        
        .main-nav.active ul {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// 导出函数供其他文件使用
window.chicagoTravel = {
    formatPrice,
    getCurrentTime,
    isAttractionOpen,
    showAttractionDetails: function(id) {
        if (typeof showAttractionDetails === 'function') {
            showAttractionDetails(id);
        }
    }
};