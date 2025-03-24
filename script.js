// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.backgroundColor = '#fff';
            link.style.color = '#2575fc';
        }
    });

    // Setup each slideshow
    function setupSlideshow(slideshowContainer) {
        let slides = slideshowContainer.getElementsByClassName('slide');
        let dots = slideshowContainer.getElementsByClassName('dot');
        let slideIndex = 0;
        let timeoutId;

        function showSlides() {
            // Hide all slides and deactivate dots
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                dots[i].classList.remove('active');
            }

            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            // Show current slide and activate dot
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            timeoutId = setTimeout(showSlides, 9000); // Change every 12 seconds
        }

        // Manual dot navigation
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', () => {
                clearTimeout(timeoutId);
                slideIndex = parseInt(dots[i].getAttribute('data-slide')) - 1;
                showSlides();
            });
        }

        // Start with first slide
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        showSlides();

        // Pause on hover
        slideshowContainer.addEventListener('mouseenter', () => clearTimeout(timeoutId));
        slideshowContainer.addEventListener('mouseleave', () => showSlides());
    }

    // Initialize all slideshows
    let slideshows = document.getElementsByClassName('slideshow-container');
    for (let i = 0; i < slideshows.length; i++) {
        setupSlideshow(slideshows[i]);
    }
});