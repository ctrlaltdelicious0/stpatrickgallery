// ==================== CHECK

// Check if JavaScript is loaded
console.log('messages.js loaded');

gsap.from(".message_a", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: {
        each: 0.2,
        from: "start"
    },
    ease: "power2.out"
});