document.addEventListener('DOMContentLoaded', () => {
    // Utility function for active page highlighting
    const highlightCurrentPage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPage);
        });
    };

    // Enhanced Slideshow class with improved performance and error handling
    class Slideshow {
        constructor(container, descriptionElement, allSlideshows) {
            try {
                this.container = container;
                this.descriptionElement = descriptionElement;
                this.slidesData = JSON.parse(container.dataset.slides || '[]');
                this.currentIndex = 0;
                this.allSlideshows = allSlideshows;
                this.isActive = false;

                if (this.slidesData.length === 0) {
                    console.warn('No slides data found for slideshow');
                    return;
                }

                this.init();
            } catch (error) {
                console.error('Slideshow initialization error:', error);
            }
        }

        init() {
            this.renderSlides();
            this.setupEventListeners();
            this.showSlide();
        }

        renderSlides() {
            // Use document fragment for more efficient DOM manipulation
            const fragment = document.createDocumentFragment();
            const slidesContainer = document.createElement('div');
            slidesContainer.className = 'slides';

            this.slidesData.forEach((slide, index) => {
                const slideElement = document.createElement('div');
                slideElement.className = `slide fade ${index === 0 ? 'active' : ''}`;
                
                const img = document.createElement('img');
                img.src = slide.src;
                img.alt = slide.alt;
                img.loading = 'lazy';
                
                slideElement.appendChild(img);
                slidesContainer.appendChild(slideElement);
            });

            const dotContainer = document.createElement('div');
            dotContainer.className = 'dot-container';
            
            this.slidesData.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.slide = index;
                dotContainer.appendChild(dot);
            });

            const navigation = document.createElement('div');
            navigation.className = 'navigation';
            navigation.innerHTML = `
                <button class="nav-button left">❮</button>
                <button class="nav-button right">❯</button>
            `;

            fragment.appendChild(slidesContainer);
            fragment.appendChild(dotContainer);
            fragment.appendChild(navigation);

            this.container.innerHTML = '';
            this.container.appendChild(fragment);

            this.slides = this.container.querySelectorAll('.slide');
            this.dots = this.container.querySelectorAll('.dot');
            this.leftButton = this.container.querySelector('.nav-button.left');
            this.rightButton = this.container.querySelector('.nav-button.right');
        }

        setupEventListeners() {
            const debouncedResetSlideshows = this.debounce(this.resetOtherSlideshows.bind(this), 200);

            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    this.currentIndex = parseInt(dot.dataset.slide);
                    this.showSlide();
                    debouncedResetSlideshows();
                });
            });

            this.leftButton.addEventListener('click', () => {
                this.prevSlide();
                debouncedResetSlideshows();
            });

            this.rightButton.addEventListener('click', () => {
                this.nextSlide();
                debouncedResetSlideshows();
            });

            this.container.addEventListener('mouseenter', () => {
                this.isActive = true;
                this.container.querySelector('.navigation').style.opacity = '1';
            });

            this.container.addEventListener('mouseleave', () => {
                this.isActive = false;
                this.container.querySelector('.navigation').style.opacity = '0';
            });

            // Delegated keyboard event listener
            document.addEventListener('keydown', (e) => {
                if (this.isActive) {
                    switch(e.key) {
                        case 'ArrowLeft':
                            this.prevSlide();
                            debouncedResetSlideshows();
                            break;
                        case 'ArrowRight':
                            this.nextSlide();
                            debouncedResetSlideshows();
                            break;
                    }
                }
            });
        }

        // Debounce utility method
        debounce(func, delay) {
            let timeoutId;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(context, args), delay);
            };
        }

        showSlide() {
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
                this.dots[index].classList.toggle('active', index === this.currentIndex);
            });
            this.descriptionElement.textContent = this.slidesData[this.currentIndex].desc;
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.showSlide();
        }

        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.showSlide();
        }

        resetOtherSlideshows() {
            this.allSlideshows.forEach(slideshow => {
                if (slideshow !== this) {
                    slideshow.currentIndex = 0;
                    slideshow.showSlide();
                }
            });
        }
    }

    // Main initialization function
    const initSlideshows = () => {
        const slideshowGroups = document.querySelectorAll('.slideshow-group');
        const allSlideshows = [];

        slideshowGroups.forEach((group, index) => {
            const container = group.querySelector('.slideshow-container');
            const description = group.querySelector(`#desc-${index + 1}`);
            
            if (container && description) {
                const slideshow = new Slideshow(container, description, allSlideshows);
                allSlideshows.push(slideshow);
            }
        });
    };

    // Initialize everything
    highlightCurrentPage();
    initSlideshows();
});