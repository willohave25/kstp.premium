// Navigation scroll effect
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateOnScroll = document.querySelectorAll('.about-item, .service-card, .fleet-card, .contact-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoplayInterval;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Pause autoplay on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Start autoplay on load
    startAutoplay();
}

// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================

const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Basic validation
        if (!data.nom || !data.email || !data.telephone) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Phone validation (French format)
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(data.telephone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent('Nouvelle demande de réservation - ' + data.nom);
        const body = encodeURIComponent(`
NOUVELLE DEMANDE DE RÉSERVATION

DÉTAILS DU TRAJET:
─────────────────────────────
Lieu de départ: ${data.depart || 'Non spécifié'}
Lieu d'arrivée: ${data.arrivee || 'Non spécifié'}
Nombre de passagers: ${data.passagers || 'Non spécifié'}
Nombre de bagages: ${data.bagages || 'Non spécifié'}
Type de véhicule: ${data.vehicule || 'Non spécifié'}
Date: ${data.date || 'Non spécifiée'}
Heure: ${data.heure || 'Non spécifiée'}

COORDONNÉES CLIENT:
─────────────────────────────
Nom: ${data.nom}
Email: ${data.email}
Téléphone: ${data.telephone}

MESSAGE:
─────────────────────────────
${data.message || 'Aucun message'}

─────────────────────────────
Demande envoyée depuis le site KSTP PREMIUM
        `);
        
        const mailtoLink = `mailto:contact@kstp-premium.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Votre demande de réservation va être envoyée par email. Nous vous répondrons dans les plus brefs délais !');
        
        // Reset form
        this.reset();
    });
    
    // Real-time validation feedback
    const requiredFields = reservationForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#C9A961';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#C9A961';
            }
        });
    });
}

// Lazy loading images
const images = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Current year in footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// WhatsApp floating button animation on scroll
const whatsappFloat = document.querySelector('.whatsapp-float');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        whatsappFloat.style.transform = 'scale(0.8)';
    } else {
        // Scrolling up
        whatsappFloat.style.transform = 'scale(1)';
    }
    
    lastScrollTop = scrollTop;
}, false);

// Add hover effect to cards
const cards = document.querySelectorAll('.service-card, .fleet-card, .about-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Performance: Defer non-critical scripts
window.addEventListener('load', () => {
    console.log('KSTP Premium website loaded successfully');
});

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#accueil';
skipLink.className = 'skip-link';
skipLink.textContent = 'Passer au contenu principal';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--gold);
    color: var(--black);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);
