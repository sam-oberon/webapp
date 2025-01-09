let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;

    if (index < 0) {
        currentIndex = totalSlides - 1; // ir de la última a la primera
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

// inicio carousel
showSlide(currentIndex);
