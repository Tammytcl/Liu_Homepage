console.log('%cCopyright © 2024 Caleb XXY', 'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');


// 改进的导航脚本
document.addEventListener('DOMContentLoaded', function() {
    // 为各个部分添加ID
    setupSectionIds();

    // 为论文条目添加ID以支持子导航
    setupPublicationIds();

    // 处理菜单展开/折叠
    setupExpandableMenu();

    // 添加滚动监听以高亮当前部分
    window.addEventListener('scroll', highlightCurrentSection);

    // 初始高亮
    highlightCurrentSection();

    // 平滑滚动设置
    setupSmoothScrolling();
});

// 设置主要部分ID
function setupSectionIds() {
    const sections = document.querySelectorAll('.title');
    sections.forEach(section => {
        const sectionText = section.textContent.trim();

        if (sectionText.includes('Brief Intro')) {
            section.id = 'brief-intro';
        } else if (sectionText.includes('Award Experience')) {
            section.id = 'award-experience';
        } else if (sectionText.includes('Intern Experience')) {
            section.id = 'intern-experience';
        } else if (sectionText.includes('Publication')) {
            section.id = 'publication';
        }
    });
}

// 设置论文条目ID
function setupPublicationIds() {
    const publications = document.querySelectorAll('.publications ol li');
    publications.forEach((pub, index) => {
        pub.id = `publication-${index + 1}`;
    });
}

// 设置可展开菜单功能
function setupExpandableMenu() {
    const pubLink = document.getElementById('pub-link');
    const pubSubmenu = document.querySelector('.pub-submenu');

    // 初始状态 - 如果当前在论文部分，自动展开子菜单
    if (isInViewport(document.getElementById('publication'))) {
        pubLink.classList.add('expanded');
    }

    // 点击事件 - 切换子菜单展开状态
    pubLink.addEventListener('click', function(e) {
        // 阻止默认行为以不跳转到publication部分
        // 仅在点击主链接时触发(不是图标)
        const rect = pubLink.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        // 如果点击在链接左侧2/3处，切换展开状态
        if (clickX < rect.width * 0.67) {
            e.preventDefault();
            pubLink.classList.toggle('expanded');
        }
    });
}

// 高亮当前部分
function highlightCurrentSection() {
    const scrollPosition = window.scrollY + 150;
    const sections = ['brief-intro', 'award-experience', 'intern-experience', 'publication'];
    const subSections = ['publication-1', 'publication-2', 'publication-3'];

    // 高亮主菜单
    let activeMainSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`a[href="#${sections[i]}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeMainSection = sections[i];
            }
            break;
        }
    }

    // 如果在论文部分，展开子菜单并高亮小节
    if (activeMainSection === 'publication') {
        document.getElementById('pub-link').classList.add('expanded');

        // 高亮子菜单
        document.querySelectorAll('.toc-sublink').forEach(link => {
            link.classList.remove('active');
        });

        for (let i = subSections.length - 1; i >= 0; i--) {
            const subSection = document.getElementById(subSections[i]);
            if (subSection && subSection.offsetTop <= scrollPosition) {
                const activeSublink = document.querySelector(`a[href="#${subSections[i]}"]`);
                if (activeSublink) {
                    activeSublink.classList.add('active');
                }
                break;
            }
        }
    } else {
        // 不在论文部分时，可以考虑折叠子菜单
        // document.getElementById('pub-link').classList.remove('expanded');
    }
}

// 设置平滑滚动
function setupSmoothScrolling() {
    document.querySelectorAll('.toc-link, .toc-sublink').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // 子菜单切换按钮特殊处理已在setupExpandableMenu中处理
            // 这里只处理实际导航

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // 如果是子菜单项，确保父菜单展开
                if (this.classList.contains('toc-sublink')) {
                    document.getElementById('pub-link').classList.add('expanded');
                }

                // 平滑滚动到目标
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // 在移动端点击后隐藏目录
                if (window.innerWidth <= 1200) {
                    document.querySelector('.toc-navigation').classList.remove('show');
                }
            }
        });
    });
}

// 移动端切换目录显示
function toggleTOC() {
    const toc = document.querySelector('.toc-navigation');
    toc.classList.toggle('show');
}

// 检查元素是否在视口中
function isInViewport(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // 阻止默认的上下文菜单行为
});





function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function PopUp(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");



}


function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");

}


document.addEventListener('DOMContentLoaded', function () {


    var themeState = getCookie("themeState") || "Light";
    const htmlTag = document.querySelector('html');
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");




    function changeSvg(color) {
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }



    function changeTheme(theme) {
        if (theme == "Dark") {
            themeState = "Dark";
            changeSvg("#ffffff");
            tanChiShe.src = "./static/svg/snake-Dark.svg";
            htmlTag.dataset.theme = 'dack';
        } else if (theme == "Light") {
            themeState = "Light";
            changeSvg("#000000");
            tanChiShe.src = "./static/svg/snake-Light.svg";
            htmlTag.dataset.theme = '';
        }
        setCookie("themeState", theme, 365);
    }




    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }


    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }





    const switchCheckbox = document.getElementById('myonoffswitch');
    /*夜间自动打开暗色主题*/
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 20 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme('Dark');
    }


    switchCheckbox.addEventListener('change', function () {
        if (themeState == "Dark") {

            changeTheme("Light");

        } else if (themeState == "Light") {

            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        switchCheckbox.checked = false;
    }
    changeTheme(themeState);




    /*淡入效果*/
    var projectItems = document.querySelectorAll(".projectItem");
    function checkProjectItems() {
        for (var i = 0; i < projectItems.length; i++) {
            var projectItem = projectItems[i];
            var projectItemTop = projectItem.getBoundingClientRect().top;

            if (projectItemTop < window.innerHeight * 1.2) {
                projectItem.classList.add("fade-in-visible");
            }
        }
    }

    window.addEventListener("scroll", checkProjectItems);
    window.addEventListener("resize", checkProjectItems);



    /*加载效果*/
    var pageLoading = document.querySelector("#PageLoading");
    var center = document.getElementById("PageLoading-zyyo-center");
    setTimeout(function () {
        checkProjectItems();
        pageLoading.style.opacity = '0';
        center.style.height = "500px";
        center.style.width = "500px";
        center.style.opacity = "0";
        pageLoading.style.backgroundSize = "200%";
    }, 300);

    // 暂时强制深色模式
    // changeTheme("Dark")



});


class LanguageSwitch {
    constructor(options = {}) {
        this.options = {
            switchId: 'languageSwitch',
            englishPage: 'index_en.html',
            chinesePage: 'index.html',
            enableKeyboard: true,
            enableTouch: true,
            enableTip: true,
            tipDuration: 3000,
            loadingDelay: 300,
            ...options
        };

        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isInitialized = false;

        this.init();
    }

    /**
     * 初始化组件
     */
    init() {
        if (this.isInitialized) return;

        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * 设置组件
     */
    setup() {
        this.languageSwitch = document.getElementById(this.options.switchId);

        if (!this.languageSwitch) {
            console.warn('Language switch element not found');
            return;
        }

        this.bindEvents();
        this.checkCurrentLanguage();

        if (this.options.enableTip) {
            this.showTip();
        }

        this.isInitialized = true;
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 点击事件
        this.languageSwitch.addEventListener('click', (e) => this.handleClick(e));

        // 键盘事件
        if (this.options.enableKeyboard) {
            document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        }

        // 触摸事件
        if (this.options.enableTouch) {
            document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        }

        // 悬停效果
        this.languageSwitch.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.languageSwitch.addEventListener('mouseleave', () => this.handleMouseLeave());

        // 焦点事件
        this.languageSwitch.addEventListener('focus', () => this.handleFocus());
        this.languageSwitch.addEventListener('blur', () => this.handleBlur());
    }

    /**
     * 处理点击事件
     */
    handleClick(event) {
        this.createRipple(event);
        this.toggleLanguage();
    }

    /**
     * 处理键盘事件
     */
    handleKeyboard(event) {
        // Ctrl/Cmd + L 快捷键
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            this.toggleLanguage();
        }

        // Enter键或空格键（当焦点在开关上时）
        if (document.activeElement === this.languageSwitch &&
            (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            this.toggleLanguage();
        }
    }

    /**
     * 处理触摸开始
     */
    handleTouchStart(event) {
        this.touchStartX = event.changedTouches[0].screenX;
    }

    /**
     * 处理触摸结束
     */
    handleTouchEnd(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    }

    /**
     * 处理滑动手势
     */
    handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            const isEnglish = this.languageSwitch.classList.contains('active');

            if (swipeDistance > 0 && isEnglish) {
                // 向右滑动，切换到中文
                this.toggleLanguage();
            } else if (swipeDistance < 0 && !isEnglish) {
                // 向左滑动，切换到英文
                this.toggleLanguage();
            }
        }
    }

    /**
     * 处理鼠标进入
     */
    handleMouseEnter() {
        this.languageSwitch.style.transform = 'scale(1.1)';
    }

    /**
     * 处理鼠标离开
     */
    handleMouseLeave() {
        this.languageSwitch.style.transform = 'scale(1)';
    }

    /**
     * 处理获得焦点
     */
    handleFocus() {
        this.languageSwitch.style.outline = '2px solid #3b82f6';
        this.languageSwitch.style.outlineOffset = '2px';
    }

    /**
     * 处理失去焦点
     */
    handleBlur() {
        this.languageSwitch.style.outline = 'none';
    }

    /**
     * 切换语言
     */
    toggleLanguage() {
        const isEnglish = this.languageSwitch.classList.contains('active');

        // 添加loading状态
        this.languageSwitch.classList.add('loading');

        // 延迟执行以显示loading效果
        setTimeout(() => {
            if (isEnglish) {
                // 切换到中文
                this.switchToChinese();
            } else {
                // 切换到英文
                this.switchToEnglish();
            }

            // 移除loading状态
            this.languageSwitch.classList.remove('loading');
        }, this.options.loadingDelay);
    }

    /**
     * 切换到中文
     */
    switchToChinese() {
        this.languageSwitch.classList.remove('active');
        console.log('切换到中文版本');

        // 触发自定义事件
        this.dispatchEvent('languageChanged', { language: 'zh', target: 'chinese' });

        // 页面跳转（如果需要）
        if (this.options.chinesePage && window.location.pathname.includes('index_en.html')) {
            window.location.href = this.options.chinesePage;
        }
    }

    /**
     * 切换到英文
     */
    switchToEnglish() {
        this.languageSwitch.classList.add('active');
        console.log('切换到英文版本');

        // 触发自定义事件
        this.dispatchEvent('languageChanged', { language: 'en', target: 'english' });

        // 页面跳转
        if (this.options.englishPage) {
            window.location.href = this.options.englishPage;
        }
    }

    /**
     * 检查当前语言状态
     */
    checkCurrentLanguage() {
        // 根据URL判断当前语言
        if (window.location.pathname.includes('index_en.html') ||
            window.location.pathname.includes('/en/')) {
            this.languageSwitch.classList.add('active');
        }

        // 根据HTML lang属性判断
        const htmlLang = document.documentElement.lang;
        if (htmlLang === 'en' || htmlLang === 'en-US') {
            this.languageSwitch.classList.add('active');
        }
    }

    /**
     * 创建波纹效果
     */
    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        // 移除之前的波纹
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        // 清理波纹元素
        setTimeout(() => {
            if (circle.parentNode) {
                circle.parentNode.removeChild(circle);
            }
        }, 600);
    }

    /**
     * 显示提示信息
     */
    showTip() {
        // 延迟显示，避免影响页面加载
        setTimeout(() => {
            const tip = document.createElement('div');
            tip.className = 'language-tip';
            tip.textContent = '快捷键: Ctrl/Cmd + L';

            document.body.appendChild(tip);

            // 显示动画
            requestAnimationFrame(() => {
                tip.classList.add('show');
            });

            // 自动隐藏
            setTimeout(() => {
                tip.classList.remove('show');
                setTimeout(() => {
                    if (tip.parentNode) {
                        tip.parentNode.removeChild(tip);
                    }
                }, 300);
            }, this.options.tipDuration);
        }, 1000);
    }

    /**
     * 派发自定义事件
     */
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            cancelable: true
        });
        this.languageSwitch.dispatchEvent(event);
    }

    /**
     * 获取当前语言
     */
    getCurrentLanguage() {
        return this.languageSwitch.classList.contains('active') ? 'en' : 'zh';
    }

    /**
     * 设置语言
     */
    setLanguage(language) {
        if (language === 'en' || language === 'english') {
            this.languageSwitch.classList.add('active');
        } else if (language === 'zh' || language === 'chinese') {
            this.languageSwitch.classList.remove('active');
        }
    }

    /**
     * 销毁组件
     */
    destroy() {
        if (!this.isInitialized) return;

        // 移除事件监听器
        if (this.languageSwitch) {
            this.languageSwitch.removeEventListener('click', this.handleClick);
            this.languageSwitch.removeEventListener('mouseenter', this.handleMouseEnter);
            this.languageSwitch.removeEventListener('mouseleave', this.handleMouseLeave);
            this.languageSwitch.removeEventListener('focus', this.handleFocus);
            this.languageSwitch.removeEventListener('blur', this.handleBlur);
        }

        if (this.options.enableKeyboard) {
            document.removeEventListener('keydown', this.handleKeyboard);
        }

        if (this.options.enableTouch) {
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchend', this.handleTouchEnd);
        }

        this.isInitialized = false;
    }
}

// 全局便利函数（向后兼容）
function toggleLanguage() {
    if (window.languageSwitchInstance) {
        window.languageSwitchInstance.toggleLanguage();
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
    // 创建全局实例
    window.languageSwitchInstance = new LanguageSwitch();

    // 提供全局访问
    window.LanguageSwitch = LanguageSwitch;
});

// 模块导出（如果支持ES6模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitch;
}

// AMD支持
if (typeof define === 'function' && define.amd) {
    define([], function() {
        return LanguageSwitch;
    });
}
