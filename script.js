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

let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none")); // Hide all slides
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1; // Loop back to the first slide
    slides[slideIndex - 1].style.display = "block"; // Show the current slide
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

// Start the slideshow
document.addEventListener("DOMContentLoaded", showSlides);