// ==================== CHECK

// Check if JavaScript is loaded
console.log('message.js loaded');

// ==================== ANIMATIONS

gsap.from(".arrow_container", {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: "power3.out"
});

window.addEventListener('load', () => {
    gsap.fromTo(".preloader",
        {
            y: 0,
            opacity: 1
        },
        {
            y: "-100%",
            opacity: 1,
            duration: 1.5,
            ease: "power2.in",
            onComplete: () => {
                document.querySelector(".preloader").style.display = "none";
            }
        }
    );
});