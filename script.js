// script.js 可以留空，或者添加其他功能
// 例如，高亮当前页面导航（可选）
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.backgroundColor = '#fff';
            link.style.color = '#2575fc';
        }
    });
});