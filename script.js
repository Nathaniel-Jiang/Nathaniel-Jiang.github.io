// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Slideshow class for better encapsulation
    class Slideshow {
        constructor(container) {
            this.container = container;
            this.slidesData = JSON.parse(container.dataset.slides);
            this.currentIndex = 0;
            this.timeoutId = null;
            this.init();
        }

        init() {
            this.renderSlides();
            this.setupEventListeners();
            this.start();
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
            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    this.pause();
                    this.currentIndex = parseInt(dot.dataset.slide);
                    this.showSlide();
                    this.start();
                });
            });

            this.container.addEventListener('mouseenter', () => this.pause());
            this.container.addEventListener('mouseleave', () => this.start());
        }

        showSlide() {
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
                this.dots[index].classList.toggle('active', index === this.currentIndex);
            });
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.slidesData.length;
            this.showSlide();
        }

        start() {
            this.timeoutId = setInterval(() => this.nextSlide(), 12000);
        }

        pause() {
            clearInterval(this.timeoutId);
        }
    }

    // Initialize slideshows
    document.querySelectorAll('.slideshow-container').forEach(container => {
        new Slideshow(container);
    });
});