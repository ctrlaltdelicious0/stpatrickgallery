// ==================== CHECK

// Check if JavaScript is loaded
console.log('index.js loaded');

// ==================== LENIS

// Initialize
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ==================== FLEXMASONRY

FlexMasonry.init('.grid', {
    responsive: true,
    numCols: 4,
});

// ==================== LIGHTBOX

// Create lightbox elements
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&larr;</button>
            <button class="lightbox-next">&rarr;</button>
            <div class="lightbox-image-container">
                <img src="" alt="" class="lightbox-image">
            </div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    return {
        lightbox: lightbox,
        image: lightbox.querySelector('.lightbox-image'),
        closeBtn: lightbox.querySelector('.lightbox-close'),
        prevBtn: lightbox.querySelector('.lightbox-prev'),
        nextBtn: lightbox.querySelector('.lightbox-next'),
        counter: lightbox.querySelector('.lightbox-counter')
    };
}

// Initialize lightbox functionality
function initLightbox() {
    const elements = createLightbox();
    const galleryImages = document.querySelectorAll('.grid-item img');
    let currentIndex = 0;
    
    // Update lightbox with current image
    function updateLightbox(index) {
        currentIndex = index;
        elements.image.src = galleryImages[index].src;
        elements.counter.textContent = `${index + 1} / ${galleryImages.length}`;
        
        // Enable/disable navigation buttons based on current position
        elements.prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        elements.nextBtn.style.visibility = index === galleryImages.length - 1 ? 'hidden' : 'visible';
    }
    
    // Open lightbox with clicked image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            elements.lightbox.classList.add('active');
            lenis.stop(); // Disable smooth scrolling when lightbox is open
            updateLightbox(index);
        });
    });
    
    // Close lightbox
    elements.closeBtn.addEventListener('click', () => {
        elements.lightbox.classList.remove('active');
        lenis.start(); // Re-enable smooth scrolling
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!elements.lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            elements.lightbox.classList.remove('active');
            lenis.start();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            updateLightbox(currentIndex + 1);
        }
    });
    
    // Previous image button
    elements.prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        }
    });
    
    // Next image button
    elements.nextBtn.addEventListener('click', () => {
        if (currentIndex < galleryImages.length - 1) {
            updateLightbox(currentIndex + 1);
        }
    });
    
    // Close when clicking outside the image
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) {
            elements.lightbox.classList.remove('active');
            lenis.start();
        }
    });
}

// Initialize lightbox when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initLightbox);