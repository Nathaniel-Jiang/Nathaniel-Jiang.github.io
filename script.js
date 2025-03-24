// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Slideshow class with manual and hover control
    class Slideshow {
        constructor(container) {
            this.container = container;
            this.slidesData = JSON.parse(container.dataset.slides);
            this.currentIndex = 0;
            this.init();
        }

        init() {
            this.renderSlides();
            this.setupEventListeners();
            this.showSlide(); // Show first slide by default
        }

        renderSlides() {
            this.container.innerHTML = `
                <div class="slides">
                    ${this.slidesData.map((slide, index) => `
                        <div class="slide fade ${index === 0 ? 'active' : ''}">
                            <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
                <div class="dot-container">
                    ${this.slidesData.map((_, index) => `
                        <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
                    `).join('')}
                </div>
            `;
            this.slides = this.container.querySelectorAll('.slide');
            this.dots = this.container.querySelectorAll('.dot');
        }

        setupEventListeners() {
            // Add click event listeners to dots
            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    this.currentIndex = parseInt(dot.dataset.slide);
                    this.showSlide();
                });
            });

            // Add hover event listeners to dots
            this.dots.forEach(dot => {
                dot.addEventListener('mouseenter', () => {
                    this.currentIndex = parseInt(dot.dataset.slide);
                    this.showSlide();
                });
            });
        }

        showSlide() {
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
                this.dots[index].classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    // Initialize slideshows
    document.querySelectorAll('.slideshow-container').forEach(container => {
        new Slideshow(container);
    });
});