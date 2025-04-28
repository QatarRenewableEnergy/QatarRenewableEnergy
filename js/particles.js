document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll(".particles-container");

    if (!containers.length) return;

    const particleCount = 50; // Number of particles per container
    const particleBaseSize = 2;
    const particleSpeedFactor = 0.5;

    containers.forEach(container => {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");

            const size = Math.random() * particleBaseSize + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation properties
            const animationDuration = Math.random() * 15 + 10; // 10-25 seconds
            const animationDelay = Math.random() * 10; // 0-10 seconds delay
            const xMovement = (Math.random() - 0.5) * 100 * particleSpeedFactor;
            const yMovement = (Math.random() - 0.5) * 100 * particleSpeedFactor;
            const rotation = (Math.random() - 0.5) * 720; // Random rotation

            // Create unique animation name to avoid conflicts if needed, though unlikely here
            const animationName = `particle-move-${i}-${Date.now()}`;

            // Define the keyframes dynamically
            const styleSheet = document.styleSheets[0]; // Assuming at least one stylesheet exists
            const keyframes = 
            `@keyframes ${animationName} {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
                50% { opacity: 0.3; }
                100% { transform: translate(${xMovement}px, ${yMovement}px) rotate(${rotation}deg); opacity: 0; }
            }`;
            
            try {
                styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
            } catch (e) {
                console.warn("Could not insert keyframe rule: ", e);
                // Fallback or alternative method might be needed for complex scenarios
            }

            particle.style.animation = `${animationName} ${animationDuration}s ${animationDelay}s linear infinite alternate`;

            container.appendChild(particle);
        }
    });
});

