// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-dot');
    
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
            startAutoSlide(); // Redémarre l'auto-slide après interaction
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
