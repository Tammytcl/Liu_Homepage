console.log('%cCopyright © 2024 Caleb XXY', 'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');


// 改进的导航脚本
document.addEventListener('DOMContentLoaded', function () {
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
    pubLink.addEventListener('click', function (e) {
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
        anchor.addEventListener('click', function (e) {
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

document.addEventListener('contextmenu', function (event) {
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


    // 语言切换功能
    function toggleLanguage() {
    const languageSwitch = document.getElementById('languageSwitch');
    const isEnglish = languageSwitch.classList.contains('active');

    if (isEnglish) {
    // 切换到中文
    languageSwitch.classList.remove('active');
    // 这里可以添加页面跳转逻辑
    console.log('切换到中文版本');
    // window.location.href = 'index.html'; // 如果有中文版页面
} else {
    // 切换到英文
    languageSwitch.classList.add('active');
    // 跳转到英文页面
    console.log('切换到英文版本');
    window.location.href = 'index_en.html';
}
}

    // 页面加载时检查当前语言状态
    document.addEventListener('DOMContentLoaded', function() {
    // 如果当前是英文页面，设置为英文状态
    if (window.location.pathname.includes('index_en.html')) {
    document.getElementById('languageSwitch').classList.add('active');
}
});

    // 添加键盘快捷键支持 (Ctrl/Cmd + L)
    document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
    e.preventDefault();
    toggleLanguage();
}
});

    // 添加触摸支持
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

    document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

    function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;

    // 向右滑动切换到中文，向左滑动切换到英文
    if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
    // 向右滑动 - 切换到中文
    if (document.getElementById('languageSwitch').classList.contains('active')) {
    toggleLanguage();
}
} else {
    // 向左滑动 - 切换到英文
    if (!document.getElementById('languageSwitch').classList.contains('active')) {
    toggleLanguage();
}
}
}
}

    // 添加悬停效果增强
    document.querySelector('.languageSwitch').addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

    document.querySelector('.languageSwitch').addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

    // 添加点击波纹效果
    function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
    ripple.remove();
}

    button.appendChild(circle);
}

    document.querySelector('.languageSwitch').addEventListener('click', createRipple);

    // 添加波纹动画样式
    const style = document.createElement('style');
    style.textContent = `
    .languageSwitch {
    position: relative;
    overflow: hidden;
}

    .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

    @keyframes ripple-animation {
    to {
    transform: scale(4);
    opacity: 0;
}
}

    /* 添加焦点样式以提升可访问性 */
    .languageSwitch:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

    /* 添加激活状态的微动画 */
    .languageSwitch.active {
    animation: language-switch-glow 2s ease-in-out;
}

    @keyframes language-switch-glow {
    0 %, 100% {
    box-shadow:
    0 4px 12px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
    50% {
    box-shadow:
    0 4px 20px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 20px rgba(59, 130, 246, 0.3);
}
}

    /* 滑块图标旋转动画 */
    .languageSwitchSlider {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

    .languageSwitch.active .languageSwitchSlider {
    transform: translateX(28px) rotate(180deg);
}

    /* 标签文字的淡入淡出效果 */
    .languageLabels .zh,
    .languageLabels .en {
    transition: all 0.3s ease;
}

    .languageSwitch:not(.active) .languageLabels .zh {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

    .languageSwitch:not(.active) .languageLabels .en {
    color: rgba(255, 255, 255, 0.5);
}

    /* 添加loading状态 */
    .languageSwitch.loading .languageSwitchSlider {
    animation: loading-spin 1s linear infinite;
}

    @keyframes loading-spin {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
    `;
    document.head.appendChild(style);

    // 优化的语言切换函数，添加loading状态
    function toggleLanguage() {
    const languageSwitch = document.getElementById('languageSwitch');
    const isEnglish = languageSwitch.classList.contains('active');

    // 添加loading状态
    languageSwitch.classList.add('loading');

    // 延迟执行以显示loading效果
    setTimeout(() => {
    if (isEnglish) {
    // 切换到中文
    languageSwitch.classList.remove('active');
    console.log('切换到中文版本');
    // 在实际项目中，这里应该跳转到中文页面
    // window.location.href = 'index.html';
} else {
    // 切换到英文
    languageSwitch.classList.add('active');
    console.log('切换到英文版本');
    // 跳转到英文页面
    window.location.href = 'index_en.html';
}

    // 移除loading状态
    languageSwitch.classList.remove('loading');
}, 300);
}

    // 添加提示信息
    function showLanguageTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    tip.textContent = '快捷键: Ctrl/Cmd + L';
    document.body.appendChild(tip);

    // 显示动画
    requestAnimationFrame(() => {
    tip.style.transform = 'translateY(0)';
    tip.style.opacity = '1';
});

    // 3秒后自动消失
    setTimeout(() => {
    tip.style.transform = 'translateY(-20px)';
    tip.style.opacity = '0';
    setTimeout(() => {
    document.body.removeChild(tip);
}, 300);
}, 3000);
}

    // 页面加载完成后显示提示
    window.addEventListener('load', () => {
    setTimeout(showLanguageTip, 1000);
});
