// ==================== CHECK

// Check if JavaScript is loaded
console.log('message.js loaded');

// ==================== ANIMATIONS

gsap.from(".arrow_container", {
    opacity: 0,
    x: -100,
    duration: 1.5,
    ease: "power3.out"
});