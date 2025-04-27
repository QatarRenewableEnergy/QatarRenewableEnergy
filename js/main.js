/* Main JavaScript - Consolidated and Optimized */

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading overlay with a 0.5 second delay to ensure users can see it
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        setTimeout(function() {
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 300); // Additional short delay for fade-out effect
        }, 500); // 0.5 second delay as requested
    }

    // Init Dark Mode
    initDarkMode();

    // Init Breadcrumb
    initBreadcrumb();

    // Mobile TOC navigation
    const toc = document.getElementById('toc-select');
    if (toc) toc.addEventListener('change', e => {
        const target = document.querySelector(e.target.value);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize core functionalities (performance focus)
    initScrollAnimations(); // Uses IntersectionObserver
    initCounters();         // Uses IntersectionObserver
    initScrollTopButton();  // Uses IntersectionObserver
    initSmoothScroll();     // Global smooth scroll fix
    initTimelineLayout();   // Handles layout and visibility via IntersectionObserver

    // Initialize visual effects from 3d-effects.js
    initPerspectiveEffects();
    initFloatingElements();
    initParallaxEffect();
    initCustomCursor();
    initMagneticButtons();
    initTiltEffect();
    initParticleBackground();
    initScrollProgress();
    initRippleEffect();

    // Initialize interactive components from interactive-effects.js
    initTimelineInteraction(); // Keep hover/click logic if any
    initHoverEffects();
    initPageTransitions();
    initQuiz();
    initCalculator();
    initAnimatedUnderlines();

    // Enable native smooth scrolling for the whole page (redundant with JS below, but safe fallback)
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Dark Mode setup
function initDarkMode() {
    const mainToggle = document.getElementById('dark-mode-toggle');
    const offcanvasToggle = document.getElementById('dark-mode-toggle-offcanvas');
    const body = document.body;
    
    // Check for stored preference
    if (localStorage.getItem('dark-mode') === 'on') {
        body.classList.add('dark-mode');
        updateDarkModeIcons(true);
    }
    
    // Handle main toggle
    if (mainToggle) {
        mainToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Handle offcanvas toggle
    if (offcanvasToggle) {
        offcanvasToggle.addEventListener('click', toggleDarkMode);
    }
    
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode ? 'on' : 'off');
        updateDarkModeIcons(isDarkMode);
    }
    
    function updateDarkModeIcons(isDarkMode) {
        // Update both toggle icons
        const toggles = [mainToggle, offcanvasToggle];
        toggles.forEach(toggle => {
            if (!toggle) return;
            
            const icon = toggle.querySelector('i');
            if (!icon) return;
            
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// Breadcrumb builder
function initBreadcrumb() {
    const container = document.getElementById('breadcrumb');
    if (!container) return;
    document.querySelectorAll('section[id]').forEach(sec => {
        const li = document.createElement('li');
        li.className = 'breadcrumb-item';
        const a = document.createElement('a');
        a.href = `#${sec.id}`;
        a.textContent = sec.querySelector('h2, h1')?.textContent.trim() || sec.id;
        li.appendChild(a);
        container.appendChild(li);
    });
}

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    if (!scrollElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Remove class if you want animation to reverse on scroll up
                 // entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize counters using Intersection Observer
function initCounters() {
    const counters = document.querySelectorAll('.counter-3d');
    if (!counters.length) return;

    let countingStarted = false; // Ensure counting starts only once

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if intersecting and if counting hasn't started yet
            if (entry.isIntersecting && !countingStarted) {
                countingStarted = true; // Set flag
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) { // Check if already counted
                        const target = +counter.getAttribute('data-count') || 0;
                        const duration = 2000; // 2 seconds
                        let startTimestamp = null;

                        const step = (timestamp) => {
                            if (!startTimestamp) startTimestamp = timestamp;
                            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                            const currentVal = Math.floor(progress * target);

                            // Handle potential float targets
                            if (target % 1 !== 0) {
                                counter.textContent = (progress * target).toFixed(1); // Show one decimal place
                            } else {
                                counter.textContent = currentVal;
                            }


                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                // Ensure final value is accurate, especially for floats
                                counter.textContent = target.toFixed(target % 1 !== 0 ? 1 : 0);
                                counter.classList.add('counted');
                            }
                        };
                        requestAnimationFrame(step);
                    }
                });
                // Optional: Stop observing after counting starts if you don't need it to restart
                // observer.disconnect();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the first counter is visible
    });

    // Observe the first counter element to trigger counting for all
     if (counters.length > 0) {
       observer.observe(counters[0]);
     }
}


// Initialize scroll-to-top button using Intersection Observer
function initScrollTopButton() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;

    // Use a dummy element at the top or the hero section to observe
    const topElement = document.querySelector('#home') || document.body;

    const observer = new IntersectionObserver((entries) => {
        // Check if the top element is NOT intersecting (i.e., scrolled down)
        if (!entries[0].isIntersecting) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, {
        rootMargin: '-300px 0px 0px 0px' // Trigger when scrolled 300px down
    });

    observer.observe(topElement);

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize smooth scroll for ALL anchor links - Robust Version
function initSmoothScroll() {
    // Get all links that have hash references but are not just "#"
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only if target exists

                    // Calculate offset for fixed header
                    const headerOffset = 80; // Adjust this value based on your header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile navbar if open
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                }
                // If targetElement doesn't exist, let the browser handle the click (might be a link to another page)
            } catch (error) {
                console.error("Error finding scroll target:", targetId, error);
                // Let the browser handle the click in case of error
            }
        });
    });

    // Add passive wheel listener for better browser response to manual scrolling
    // window.addEventListener('wheel', () => {}, { passive: true }); // Usually not needed if native smooth scroll works
}

// Initialize timeline layout (Unified) and visibility animation
function initTimelineLayout() {
    const timelineItems = document.querySelectorAll('.timeline-item-interactive');
    if (!timelineItems.length) return;

    // Apply unified layout styles via CSS (see main.css changes)
    // No need for JS to set left/padding/text-align here

    // Use Intersection Observer for visibility animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after visible
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Remove class to re-animate if scrolling up
                 // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% visible
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Resize listener is removed as odd/even logic is gone
}

// --- NOTE: Definitions for functions called here (e.g., initPerspectiveEffects, initQuiz) ---
// ---       should reside ONLY in their respective files (3d-effects.js, interactive-effects.js) ---
// ---       and NOT be redefined in main.js ---