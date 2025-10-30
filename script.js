// ===================================
// KSTP PREMIUM - JAVASCRIPT
// W2K-DIGITAL 
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ====== MOBILE MENU ======
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // ====== NAVBAR SCROLL ======
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ====== ACTIVE NAV LINK ======
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // ====== SMOOTH SCROLL ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ====== SCROLL REVEAL ANIMATION ======
    const revealElements = document.querySelectorAll('.service-card, .fleet-card, .about-item, .vineyard-feature, .contact-item');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    // ====== LAZY LOADING IMAGES ======
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
    
    // ====== FORM HANDLING ======
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                depart: document.getElementById('depart').value,
                arrivee: document.getElementById('arrivee').value,
                passagers: document.getElementById('passagers').value,
                bagages: document.getElementById('bagages').value,
                vehicule: document.getElementById('vehicule').value,
                date: document.getElementById('date').value,
                heure: document.getElementById('heure').value,
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                message: document.getElementById('message').value
            };
            
            // Validate required fields
            const requiredFields = ['depart', 'arrivee', 'passagers', 'vehicule', 'date', 'heure', 'nom', 'email', 'telephone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Create email body
            const emailBody = `
NOUVELLE DEMANDE DE RÉSERVATION - KSTP PREMIUM
═══════════════════════════════════════

DÉTAILS DU TRAJET
─────────────────
• Départ: ${formData.depart}
• Arrivée: ${formData.arrivee}
• Passagers: ${formData.passagers}
• Bagages: ${formData.bagages}
• Véhicule: ${formData.vehicule}
• Date: ${formData.date}
• Heure: ${formData.heure}

COORDONNÉES CLIENT
──────────────────
• Nom: ${formData.nom}
• Email: ${formData.email}
• Téléphone: ${formData.telephone}

MESSAGE COMPLÉMENTAIRE
──────────────────────
${formData.message || 'Aucun message'}

═══════════════════════════════════════
Demande reçue le: ${new Date().toLocaleString('fr-FR')}
            `.trim();
            
            // Create mailto link
            const subject = `Réservation KSTP Premium - ${formData.nom}`;
            const mailtoLink = `mailto:kstp.premium@dr.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert('Votre demande a été préparée ! Veuillez envoyer l\'email depuis votre client de messagerie.\n\nNous vous répondrons sous 24h.');
                reservationForm.reset();
            }, 500);
        });
        
        // Real-time validation
        const inputs = reservationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // ====== DATE INPUT MIN DATE ======
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // ====== HERO SCROLL BUTTON ======
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ====== PERFORMANCE - Defer non-critical scripts ======
    function deferLoadingHelper() {
        // Add any additional performance optimizations here
        console.log('KSTP Premium - Site loaded successfully! 🚀');
    }
    
    if (document.readyState === 'complete') {
        deferLoadingHelper();
    } else {
        window.addEventListener('load', deferLoadingHelper);
    }
    
    // ====== WHATSAPP ANALYTICS (optional) ======
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp contact initiated');
            // Add analytics tracking here if needed
        });
    });
    
    // ====== PHONE CALL ANALYTICS (optional) ======
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.getAttribute('href'));
            // Add analytics tracking here if needed
        });
    });
});

// ====== PERFORMANCE MONITORING ======
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});
