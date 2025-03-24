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

    function setupSlideshow(slideshowContainer) {
        let slides = slideshowContainer.getElementsByClassName("slide");
        let slideIndex = 0;
    
        function showSlides() {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
    
            // Show the current slide
            slides[slideIndex - 1].style.opacity = "1";
            setTimeout(showSlides, 3000); // Change slide every 3 seconds
        }
    
        slides[0].style.opacity = "1"; // Ensure the first slide is visible initially
        showSlides();
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        let slideshows = document.getElementsByClassName("slideshow-container");
        for (let i = 0; i < slideshows.length; i++) {
            setupSlideshow(slideshows[i]);
        }
    });
});