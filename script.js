document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for fade-in effect
    document.body.classList.add('loaded');
    
    // Handle page transitions for all internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="."], a[href^="../"], a[href*="Awards_and_Certification"], a[href*="Key_projects"]');
    
    internalLinks.forEach(link => {
        // Skip if it's a link to an anchor on the same page or mailto: links
        if (link.getAttribute('href').startsWith('#') || link.getAttribute('href').startsWith('mailto:')) return;
        
        link.addEventListener('click', function(e) {
            // Don't prevent default for external links or links that open in new tabs
            if (this.target === '_blank' || this.hostname !== window.location.hostname) {
                return true;
            }
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Show transition overlay
            const transition = document.getElementById('page-transition');
            transition.classList.add('active');
            
            // Navigate after the transition completes
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});
