// ========================================
// NAVIGATION - MENU BURGER
// ========================================

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle du menu
burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================

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

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// FORMULAIRE DE RÉSERVATION
// ========================================

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            heure: document.getElementById('heure').value,
            depart: document.getElementById('depart').value,
            arrivee: document.getElementById('arrivee').value,
            passagers: document.getElementById('passagers').value,
            message: document.getElementById('message').value
        };
        
        // Simulation d'envoi (à remplacer par une vraie API)
        console.log('Réservation soumise:', formData);
        
        // Message de confirmation
        alert('Merci pour votre réservation ! Nous vous contacterons rapidement pour confirmer.');
        
        // Reset du formulaire
        bookingForm.reset();
    });
}

// ========================================
// VALIDATION DU FORMULAIRE EN TEMPS RÉEL
// ========================================

const emailInput = document.getElementById('email');
const telInput = document.getElementById('telephone');

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#D4AF37';
        }
    });
}

if (telInput) {
    telInput.addEventListener('input', function() {
        // Nettoie l'input pour ne garder que les chiffres
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// ========================================
// DATE MINIMUM POUR LA RÉSERVATION
// ========================================

const dateInput = document.getElementById('date');
if (dateInput) {
    // Définir la date minimum à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ========================================
// ANIMATION AU SCROLL (INTERSECTION OBSERVER)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe 'fade-element'
document.querySelectorAll('.service-card, .vehicle-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || slides.length === 0) return; // Protection si éléments manquants
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
        currentSlide = index;
        const offset = -currentSlide * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Slide suivant
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Slide précédent
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Auto-slide toutes les 5 secondes
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Arrêter l'auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners pour les boutons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause l'auto-slide au survol
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Support du swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
        if (touchEndX - touchStartX > 50) {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // Démarre l'auto-slide au chargement
    startAutoSlide();
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
