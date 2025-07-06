document.addEventListener('DOMContentLoaded', function() {
    // Loading screen functionality
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Add loaded class to body for fade-in effect
    document.body.classList.add('loaded');
    
    // Scroll animation for fade-in elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
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
            }, 800);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Parallax effect for particles
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
