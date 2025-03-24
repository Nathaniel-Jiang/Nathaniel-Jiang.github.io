document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in the navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  
    // Slideshow Class
    class Slideshow {
      constructor(container, descriptionElement) {
        this.container = container;
        this.descriptionElement = descriptionElement;
        this.slidesData = JSON.parse(container.dataset.slides || '[]');
        this.currentIndex = 0;
        this.init();
      }
  
      init() {
        this.renderSlides();
        this.setupDots();
        this.updateSlide();
      }
  
      renderSlides() {
        this.container.innerHTML = `
          <div class="slides">
            ${this.slidesData.map((slide, i) => `
              <div class="slide ${i === 0 ? 'active' : ''}">
                <img src="${slide.src}" alt="${slide.alt}" loading="lazy" />
              </div>
            `).join('')}
          </div>
          <div class="dot-container">
            ${this.slidesData.map((_, i) => `
              <span class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>
            `).join('')}
          </div>
        `;
        this.slides = [...this.container.querySelectorAll('.slide')];
        this.dots = [...this.container.querySelectorAll('.dot')];
      }
  
      setupDots() {
        this.dots.forEach(dot => {
          dot.addEventListener('click', () => {
            this.currentIndex = parseInt(dot.dataset.slide, 10);
            this.updateSlide();
          });
        });
      }
  
      updateSlide() {
        this.slides.forEach((slide, index) => {
          slide.classList.toggle('active', index === this.currentIndex);
        });
        this.dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === this.currentIndex);
        });
        this.descriptionElement.textContent = this.slidesData[this.currentIndex].desc;
      }
    }
  
    // Initialize Slideshow Instances
    document.querySelectorAll('.slideshow-group').forEach((group, idx) => {
      const container = group.querySelector('.slideshow-container');
      const description = group.querySelector(`#desc-${idx + 1}`);
      new Slideshow(container, description);
    });
  });