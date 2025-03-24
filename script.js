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
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 3000);
        }

        slides[0].style.display = "block"; // Ensure first slide is visible
        showSlides();
    }

    // Apply slideshow function to each container
    document.querySelectorAll(".slideshow-container").forEach(container => {
        setupSlideshow(container);
    });
});