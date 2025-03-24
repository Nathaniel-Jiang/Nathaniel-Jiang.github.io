// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Slideshow class with external description handling
    class Slideshow {
        constructor(container, descriptionElement) {
            this.container = container;
            this.descriptionElement = descriptionElement;
            this.slidesData = JSON.parse(container.dataset.slides);
            this.currentIndex = 0;
            this.init();
        }

        init() {
            this.renderSlides();
            this.setupEventListeners();
            this.showSlide();
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
            // Update description
            this.descriptionElement.textContent = this.slidesData[this.currentIndex].desc;
        }
    }

    // Initialize slideshows with their corresponding description elements
    const slideshowGroups = document.querySelectorAll('.slideshow-group');
    slideshowGroups.forEach((group, index) => {
        const container = group.querySelector('.slideshow-container');
        const description = group.querySelector(`#desc-${index + 1}`);
        new Slideshow(container, description);
    });
});