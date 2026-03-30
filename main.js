// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Setup RAF and sync with GSAP ScrollTrigger
function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Component Scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // ── URGENCY BANNER ──
    const urgencyBanner = document.getElementById('urgency-banner');
    const urgencyCloseBtn = document.querySelector('.urgency-close');
    
    if (urgencyCloseBtn && urgencyBanner) {
        urgencyCloseBtn.addEventListener('click', () => {
            urgencyBanner.classList.add('urgency-hidden');
        });
    }

    // ── STICKY NAVIGATION ──
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── MOBILE MENU TOGGLE ──
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (mobileMenuToggle && mobileMenuClose && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            lenis.stop(); // Prevent scrolling when menu is open
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            lenis.start(); // Re-enable scrolling
        });

        // Close menu when a link is clicked
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                lenis.start();
            });
        });
    }

    // ── HERO GSAP ANIMATIONS ──
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-label", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2
    })
    .from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 0.8
    }, "-=0.4")
    .from(".hero-subtext", {
        opacity: 0,
        duration: 0.8
    }, "-=0.4")
    .from(".hero-actions > *", {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.2
    }, "-=0.2");

    // ── COFFEE MENU CAROUSEL ──
    const coffeeTrackWrapper = document.getElementById('coffee-track-wrapper');
    const coffeePrevBtn = document.querySelector('#coffee-menu .prev-btn');
    const coffeeNextBtn = document.querySelector('#coffee-menu .next-btn');

    if (coffeeTrackWrapper && coffeePrevBtn && coffeeNextBtn) {
        // Calculate scroll amount based on card width + gap
        const getScrollAmount = () => {
            const card = coffeeTrackWrapper.querySelector('.product-card');
            if (!card) return 0;
            const style = window.getComputedStyle(card);
            const gap = parseInt(window.getComputedStyle(document.querySelector('.carousel-track')).gap) || 0;
            return card.offsetWidth + gap;
        };

        coffeePrevBtn.addEventListener('click', () => {
            coffeeTrackWrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        coffeeNextBtn.addEventListener('click', () => {
            coffeeTrackWrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // ── COFFEE MENU SCROLL ANIMATION ──
    // Use opacity-only fade (no y offset) to keep cards in their correct row alignment
    gsap.from("#coffee-menu .product-card", {
        scrollTrigger: {
            trigger: "#coffee-menu",
            start: "top 85%",
        },
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
    });

    // ── DESSERT MENU CAROUSEL ──
    const dessertTrackWrapper = document.getElementById('dessert-track-wrapper');
    const dessertPrevBtn = document.querySelector('#desserts .prev-btn');
    const dessertNextBtn = document.querySelector('#desserts .next-btn');

    if (dessertTrackWrapper && dessertPrevBtn && dessertNextBtn) {
        const getScrollAmountDessert = () => {
            const card = dessertTrackWrapper.querySelector('.product-card');
            if (!card) return 0;
            const style = window.getComputedStyle(card);
            const gap = parseInt(window.getComputedStyle(document.querySelector('.carousel-track')).gap) || 0;
            return card.offsetWidth + gap;
        };

        dessertPrevBtn.addEventListener('click', () => {
            dessertTrackWrapper.scrollBy({ left: -getScrollAmountDessert(), behavior: 'smooth' });
        });

        dessertNextBtn.addEventListener('click', () => {
            dessertTrackWrapper.scrollBy({ left: getScrollAmountDessert(), behavior: 'smooth' });
        });
    }

    // ── DESSERTS SCROLL ANIMATION ──
    // Use opacity-only fade (no y offset) to keep cards in their correct row alignment
    gsap.from("#desserts .product-card", {
        scrollTrigger: {
            trigger: "#desserts",
            start: "top 85%",
        },
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
    });

    // ── PROMO BANNER SCROLL ANIMATION ──
    const promoTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#promo-banner",
            start: "top 75%",
        }
    });

    promoTl.from(".promo-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".promo-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4")
    .from(".promo-bean-left", {
        x: -100,
        opacity: 0,
        rotation: -45,
        duration: 1.2,
        ease: "power2.out"
    }, 0)
    .from(".promo-bean-right", {
        x: 100,
        opacity: 0,
        rotation: 45,
        duration: 1.2,
        ease: "power2.out"
    }, 0);

    // ── TESTIMONIALS CAROUSEL & ANIMATION ──
    const testimonialsWrapper = document.getElementById('testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');

    if (testimonialsWrapper && testimonialCards.length > 0) {
        let currentIndex = 0;
        let autoScrollInterval;

        const updateDots = (index) => {
            dots.forEach((dot, i) => {
                if (i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });
            
            testimonialCards.forEach((card, i) => {
                if (i === index) card.classList.add('active');
                else card.classList.remove('active');
            });
        };

        const scrollToCard = (index) => {
            if (!testimonialCards[index]) return;
            const cardLeft = testimonialCards[index].offsetLeft;
            const wrapperWidth = testimonialsWrapper.offsetWidth;
            const cardWidth = testimonialCards[index].offsetWidth;
            
            // Center the card in the wrapper
            const scrollPos = cardLeft - (wrapperWidth / 2) + (cardWidth / 2);
            
            testimonialsWrapper.scrollTo({ left: scrollPos, behavior: 'smooth' });
            updateDots(index);
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            scrollToCard(currentIndex);
        };

        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        };

        // Initialize first active state
        updateDots(0);
        startAutoScroll();

        // Pause on interaction
        testimonialsWrapper.addEventListener('mouseenter', stopAutoScroll);
        testimonialsWrapper.addEventListener('touchstart', stopAutoScroll);
        testimonialsWrapper.addEventListener('mouseleave', startAutoScroll);
        testimonialsWrapper.addEventListener('touchend', startAutoScroll);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                scrollToCard(currentIndex);
                startAutoScroll(); // restart timer
            });
        });

        // Update dots based on native manual scroll
        testimonialsWrapper.addEventListener('scroll', () => {
            let closestIndex = 0;
            let minDistance = Infinity;
            const wrapperCenter = testimonialsWrapper.scrollLeft + (testimonialsWrapper.offsetWidth / 2);
            
            testimonialCards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(wrapperCenter - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });
            
            if (currentIndex !== closestIndex) {
                currentIndex = closestIndex;
                updateDots(currentIndex);
            }
        });
    }

    gsap.from("#testimonials .testimonial-card", {
        scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // ── NEWSLETTER FORM SUBMIT ──
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm && newsletterSuccess) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input').value;
            if (emailInput) {
                newsletterForm.style.display = 'none';
                newsletterSuccess.classList.remove('hidden');
                
                gsap.from(newsletterSuccess, {
                    y: 10,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    }

    // ── ORDER NOW SMALL BUTTONS SCROLL ──
    const orderButtons = document.querySelectorAll('.btn-order-small');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
             lenis.scrollTo('#hero');
        });
    });

    // ── FOOTER "COMING SOON" LINKS ──
    const footerLinks = document.querySelectorAll('.footer-list a');
    const toast = document.createElement('div');
    toast.textContent = "Coming Soon";
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '99px',
        fontSize: '14px',
        zIndex: '9999',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(toast);
    
    let toastTimeout;
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toast.style.opacity = '1';
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.style.opacity = '0';
            }, 2000);
        });
    });
});
