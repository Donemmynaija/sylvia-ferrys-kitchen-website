document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle Logic ---
        const menuToggle = document.getElementById('menu-toggle');
        const headerContent = document.getElementById('header-content');

        menuToggle.addEventListener('click', () => {
            headerContent.classList.toggle('active');
        });

        // --- Animated Stats Counter Logic ---
        const stats = document.querySelectorAll('.stat-number');
        let hasCounted = false;

        const animateCounters = () => {
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix');
                const duration = 2000; 
                const increment = target / (duration / 16); 

                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target + suffix;
                    }
                };
                
                updateCounter();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    animateCounters();
                    hasCounted = true; 
                }
            });
        }, { threshold: 0.2 }); 

        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            observer.observe(statsContainer);
        }

        // --- Sticky Horizontal Scroll Logic for Featured Menus ---
        const section = document.getElementById('sticky-menu-section');
        const container = document.getElementById('sticky-menu-right');

        window.addEventListener('scroll', () => {
            if (window.innerWidth > 1100) {
                const rect = section.getBoundingClientRect();
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;

                if (rect.top <= 0 && rect.bottom >= windowHeight) {
                    const scrollProgress = -rect.top / (sectionHeight - windowHeight);
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    container.scrollLeft = scrollProgress * maxScroll;
                }
            }
        });
    });