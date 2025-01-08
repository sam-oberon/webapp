let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;

    if (index < 0) {
        currentIndex = totalSlides - 1; // Wrap around to last slide
    } else if (index >= totalSlides) {
        currentIndex = 0; // Wrap around to first slide
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100; // Calculate offset for the current slide
    slides.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

// Initialize the carousel
showSlide(currentIndex);
