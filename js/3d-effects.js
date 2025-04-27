/* JavaScript for 3D Effects and Visual Enhancements */
/* Called by main.js */

// Initialize perspective effects for 3D cards and elements
function initPerspectiveEffects() {
    const cards = document.querySelectorAll('.card-3d');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Only apply effect on desktop
            if (window.innerWidth <= 768) return;

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduce rotation amount for smoother effect
            const rotateX = (y - centerY) / 15; // Adjusted intensity
            const rotateY = (centerX - x) / 15; // Adjusted intensity

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`; // Reduced Z
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.transition = 'transform 0.5s ease';
        });
    });

    // Image 3D Effect (part of perspective)
    const imageContainers = document.querySelectorAll('.image-3d-container');
    imageContainers.forEach(container => {
        const image = container.querySelector('.image-3d');
        if(!image) return;

        container.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            image.style.transform = `perspective(800px) translateZ(15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', function() {
            image.style.transform = 'perspective(800px) translateZ(0) rotateX(0) rotateY(0)';
            image.style.transition = 'transform 0.5s ease';
        });
    });
}

// Create and animate floating renewable energy elements
function initFloatingElements() {
    const container = document.querySelector('.floating-elements-container'); // Target specific container
    if (!container) {
        console.warn("Floating elements container not found.");
        return;
    }

    const elements = [
        { type: 'solar-panel', count: 2 }, // Reduced count
        { type: 'windmill', count: 1 },    // Reduced count
        { type: 'sun', count: 1 }          // Reduced count
    ];

    elements.forEach(element => {
        for (let i = 0; i < element.count; i++) {
            const floatingEl = document.createElement('div');
            floatingEl.className = `floating-element ${element.type}`;
            floatingEl.style.left = `${Math.random() * 90 + 5}%`; // Avoid edges
            floatingEl.style.top = `${Math.random() * 90 + 5}%`;
            floatingEl.style.animationDelay = `${Math.random() * 10}s`; // Longer delay range
            floatingEl.style.animationDuration = `${Math.random() * 15 + 10}s`; // Slower animation
            container.appendChild(floatingEl);
        }
    });
}

// Initialize parallax effect
function initParallaxEffect() {
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    if (!parallaxContainers.length) return;

    parallaxContainers.forEach(container => {
        const back = container.querySelector('.parallax-layer-back');
        const mid = container.querySelector('.parallax-layer-mid');
        const front = container.querySelector('.parallax-layer-front');

        // Limit update frequency for performance
        let ticking = false;
        let lastX = 0;
        let lastY = 0;

        window.addEventListener('mousemove', (e) => {
            lastX = e.clientX;
            lastY = e.clientY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const xRatio = lastX / window.innerWidth - 0.5; // Center origin
                    const yRatio = lastY / window.innerHeight - 0.5; // Center origin

                    // Adjust multipliers for desired effect intensity
                    const backMove = 20;
                    const midMove = 15;
                    const frontMove = 10;

                    if (back) back.style.transform = `translateZ(-100px) scale(1.15) translate(${xRatio * backMove}px, ${yRatio * backMove}px)`;
                    if (mid) mid.style.transform = `translateZ(-50px) scale(1.1) translate(${xRatio * midMove}px, ${yRatio * midMove}px)`;
                    if (front) front.style.transform = `translateZ(0) translate(${xRatio * frontMove}px, ${yRatio * frontMove}px)`;

                    ticking = false;
                });
                ticking = true;
            }
        });
    });
}

// Initialize custom cursor
function initCustomCursor() {
    if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
       // Hide cursor elements on touch devices or small screens
       const dot = document.querySelector('.custom-cursor-dot');
       const outline = document.querySelector('.custom-cursor-outline');
       if (dot) dot.style.display = 'none';
       if (outline) outline.style.display = 'none';
       return;
    }


    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Dot follows directly
        dotX = mouseX;
        dotY = mouseY;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        // Outline lags slightly
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();


    const interactiveElements = document.querySelectorAll('a, button, .card-3d, .btn-3d, .magnetic-btn, input, textarea, .form-check-input, .accordion-button, .tilt-element');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorOutline.classList.add('hover');
        });
        element.addEventListener('mouseleave', function() {
            cursorOutline.classList.remove('hover');
        });
    });
}

// Initialize magnetic buttons
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (!magneticBtns.length) return;

    magneticBtns.forEach(btn => {
        const content = btn.querySelector('.magnetic-content') || btn; // Target content span or button itself

        btn.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Adjust multiplier for intensity
            const deltaX = (x - centerX) * 0.15; // Less movement
            const deltaY = (y - centerY) * 0.15; // Less movement

            content.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            btn.style.transform = `translate(${deltaX * 0.1}px, ${deltaY * 0.1}px)`; // Slight button move
        });

        btn.addEventListener('mouseleave', function() {
            content.style.transform = 'translate(0, 0)';
            btn.style.transform = 'translate(0, 0)';
            // Add transition back smoothly
            content.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        });
         // Clear transition on mouse enter to avoid conflict
         btn.addEventListener('mouseenter', function() {
            content.style.transition = '';
            btn.style.transition = '';
        });
    });
}

// Initialize tilt effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-element');
    if (!tiltElements.length) return;

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
             if (window.innerWidth <= 768) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Adjust tilt amount
            const tiltX = (y - centerY) / 25; // Less tilt
            const tiltY = (centerX - x) / 25; // Less tilt
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`; // Reduced scale
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
         // Clear transition on mouse enter
         element.addEventListener('mouseenter', function() {
            this.style.transition = '';
        });
    });
}

// Initialize particle background
function initParticleBackground() {
    const containers = document.querySelectorAll('.particle-container');
    if (!containers.length) return;

    containers.forEach(container => {
        const particleCount = 500; // Reduced count for performance

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2; // Smaller size range
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            const duration = Math.random() * 25 + 15; // Slower animation range
            const delay = Math.random() * 10;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            container.appendChild(particle);
        }
    });
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    // Use passive listener for scroll performance
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // Prevent division by zero if scrollHeight is 0
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

// Initialize ripple effect for buttons
function initRippleEffect() {
    const rippleBtns = document.querySelectorAll('.ripple-btn');
    if (!rippleBtns.length) return;

    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent ripple on disabled buttons
             if (this.disabled) return;

            const rect = this.getBoundingClientRect();
            // Calculate click position relative to the button
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Ensure ripple originates from click point
            ripple.style.transformOrigin = 'center';

            this.appendChild(ripple);

            // Clean up ripple element after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

// Note: initScrollAnimations, initCounters, initScrollTopButton are handled in main.js