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

// Form validation and submission
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
        
        const mailtoLink = `mailto:kstp.premium@dr.com?subject=${subject}&body=${body}`;
        
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
    // Add any deferred functionality here
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
// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Vérifier que les éléments existent
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Fonction pour mettre à jour le carousel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Bouton suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        });
    }
    
    // Bouton précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }
    
    // Indicateurs cliquables
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-play (optionnel - défilement automatique toutes les 5 secondes)
    let autoplayInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
    
    // Pause auto-play au survol
    if (track) {
        track.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        
        track.addEventListener('mouseleave', function() {
            autoplayInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            }, 5000);
        });
    }
    
    // Initialiser le carousel
    updateCarousel();
});
