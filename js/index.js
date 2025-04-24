// ==================== CHECK

// Check if JavaScript is loaded
console.log('index.js loaded');

// ==================== FLEXMASONRY

FlexMasonry.init('.grid', {
    responsive: true,
});

// ==================== ANIMATIONS

if (window.innerWidth > 768) { // Adjust the width breakpoint as needed
    gsap.from(".grid-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: {
            each: 0.03,
            from: "start"
        },
        ease: "power2.out"
    });
}

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
                <img src="" alt="" class="lightbox-image" data-tilt data-tilt-max="5" data-tilt-scale="1.05" data-tilt-speed="400">
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
        counter: lightbox.querySelector('.lightbox-counter'),
        imageContainer: lightbox.querySelector('.lightbox-image-container')
    };
}

// Variable to store the tilt instance
let tiltInstance = null;

// Initialize lightbox functionality
function initLightbox() {
    const elements = createLightbox();
    const galleryImages = document.querySelectorAll('.grid-item img');
    let currentIndex = 0;

    // Initialize tilt effect
    function initTiltEffect() {
        // Destroy any existing tilt instance first
        if (tiltInstance) {
            tiltInstance.destroy();
            tiltInstance = null;
        }

        // Initialize new tilt on the current image
        tiltInstance = VanillaTilt.init(elements.image, {
            max: 5,          // max tilt rotation (degrees)
            perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets
            scale: 1.05,        // 2 = 200%, 1.5 = 150%, etc.
            speed: 400,        // Speed of the enter/exit transition
            glare: true,      // if it should have a "glare" effect
            "max-glare": 0.3,  // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
            gyroscope: true,   // if the tilt effect should be affected by device orientation (mobile only)
            gyroscopeMinAngleX: -10,   // this is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element
            gyroscopeMaxAngleX: 10,    // this is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element
            gyroscopeMinAngleY: -10,   // this is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element
            gyroscopeMaxAngleY: 10     // this is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element
        });
    }

    // Update lightbox with current image
    function updateLightbox(index) {
        currentIndex = index;
        elements.image.src = galleryImages[index].src;
        elements.image.alt = galleryImages[index].alt || `Gallery image ${index + 1}`;
        elements.counter.textContent = `${index + 1} / ${galleryImages.length}`;

        // Enable/disable navigation buttons based on current position
        elements.prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        elements.nextBtn.style.visibility = index === galleryImages.length - 1 ? 'hidden' : 'visible';

        // Add a small delay before initializing tilt to ensure the image has loaded
        setTimeout(initTiltEffect, 100);
    }

    // Open lightbox with clicked image
    galleryImages.forEach((img, index) => {
        // Add loading="lazy" to all gallery images for better performance
        img.loading = 'lazy';

        img.addEventListener('click', () => {
            elements.lightbox.classList.add('active');
            lenis.stop(); // Disable smooth scrolling when lightbox is open
            updateLightbox(index);
        });
    });

    // Close lightbox
    elements.closeBtn.addEventListener('click', () => {
        closeLightbox();
    });

    // Function to close lightbox and clean up
    function closeLightbox() {
        elements.lightbox.classList.remove('active');
        lenis.start(); // Re-enable smooth scrolling

        // Destroy tilt instance when closing lightbox
        if (tiltInstance) {
            tiltInstance.destroy();
            tiltInstance = null;
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!elements.lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
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
            closeLightbox();
        }
    });
}

// Initialize lightbox when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initLightbox);