// Page transition handler
function initializePageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #fce4ec 0%, #e0c3fc 100%);
        pointer-events: none;
        opacity: 0;
        z-index: 9999;
        transition: opacity 0.5s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(overlay);

    // Create hearts container for transition
    const heartsContainer = document.createElement('div');
    heartsContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    `;
    overlay.appendChild(heartsContainer);

    // Handle all navigation links
    document.addEventListener('click', (e) => {
        // Find closest anchor tag if clicked element is inside one
        const link = e.target.closest('a');
        if (!link) return;

        // Don't handle external links or non-HTML links
        if (link.hostname !== window.location.hostname || !link.href.endsWith('.html')) return;

        // Prevent default navigation
        e.preventDefault();

        // Create transition hearts
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = `<svg viewBox="0 0 32 29.6" fill="#ff80ab" width="24" height="24">
                <path d="M23.6,0c-2.6,0-5,1.3-6.6,3.3C15.4,1.3,13,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.1,10.2,13.2,15.1,18.7c0.6,0.7,1.7,0.7,2.3,0
                C21.8,23.6,32,17.5,32,10.4C32,4.7,27.3,0,23.6,0z"/>
            </svg>`;
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: scale(0);
                animation: transitionHeart 0.5s ease-out forwards;
            `;
            heartsContainer.appendChild(heart);
        }

        // Fade in overlay
        overlay.style.opacity = '1';

        // Navigate after transition
        setTimeout(() => {
            window.location.href = link.href;
        }, 500);
    });
}

// Special button handler for elements that need custom animations before transition
function handleCustomTransition(buttonElement, customAction, nextPage) {
    if (!buttonElement) return;
    
    buttonElement.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Run custom animation/action
        if (customAction) customAction(e);
        
        // Start page transition after custom animation
        setTimeout(() => {
            const overlay = document.getElementById('page-transition-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                setTimeout(() => {
                    window.location.href = nextPage;
                }, 500);
            } else {
                window.location.href = nextPage;
            }
        }, 700); // Adjust timing based on custom animation duration
    });
}

// Add to global scope
window.handleCustomTransition = handleCustomTransition;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePageTransitions();
    
    // Add transition styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes transitionHeart {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(1) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
