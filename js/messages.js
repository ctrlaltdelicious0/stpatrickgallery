// ==================== CHECK

// Check if JavaScript is loaded
console.log('messages.js loaded');

// ==================== ANIMATIONS

gsap.fromTo(".message_a", 
    {
        opacity: 0,
        y: 50
    }, 
    {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: {
            each: 0.2,
            from: "start"
        },
        ease: "power2.out"
    }
);