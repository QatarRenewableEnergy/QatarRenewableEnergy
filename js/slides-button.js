// Slides Button Script
document.addEventListener('DOMContentLoaded', function() {
    // Create slides button
    const slidesButton = document.createElement('button');
    slidesButton.id = 'slides-mode-toggle';
    slidesButton.className = 'btn btn-primary ms-lg-2 mt-2 mt-lg-0';
    slidesButton.setAttribute('type', 'button');
    slidesButton.setAttribute('aria-label', 'Toggle slides mode');
    slidesButton.innerHTML = '<i class="fas fa-presentation"></i>';
    
    // Add Font Awesome icon for presentation if not available
    if (!document.querySelector('i.fa-presentation')) {
        slidesButton.innerHTML = '<i class="fas fa-desktop"></i>';
    }
    
    // Insert after dark mode button
    const darkModeButton = document.getElementById('dark-mode-toggle');
    if (darkModeButton && darkModeButton.parentNode) {
        darkModeButton.parentNode.insertBefore(slidesButton, darkModeButton.nextSibling);
    }
    
    // Add click event
    slidesButton.addEventListener('click', function() {
        window.location.href = 'slides.html';
    });
});
