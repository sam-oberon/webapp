const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoRotateInterval;


function updateCarousel() {
  const cardWidth = 250;
  const containerWidth = document.querySelector('.carousel-container').offsetWidth;
  const centerOffset = (containerWidth - cardWidth) / 2;

  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next');
    if (index === currentIndex) {
      card.classList.add('active');
    } else if (index === (currentIndex + 1) % cards.length) {
      card.classList.add('next');
    } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
      card.classList.add('prev');
    }
  });


  const offset = -currentIndex * cardWidth + centerOffset;
  carousel.style.transform = `translateX(${offset}px)`;
}


function autoRotate() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}


function startAutoRotate() {
  autoRotateInterval = setInterval(autoRotate, 3000);
}


function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}


cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    stopAutoRotate();
    currentIndex = index;
    updateCarousel();
    startAutoRotate();
  });
});


carousel.addEventListener('mousedown', (e) => {
  stopAutoRotate();
  isDragging = true;
  startX = e.pageX;
  prevTranslate = currentTranslate;
  animationID = requestAnimationFrame(animation);
});

carousel.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);

    
    const cardWidth = 250;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) {
      currentIndex = (currentIndex + 1) % cards.length;
    } else if (movedBy > 50) {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    updateCarousel();
    startAutoRotate();
  }
});

carousel.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);
    updateCarousel();
    startAutoRotate();
  }
});

carousel.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.pageX - startX;
    currentTranslate = prevTranslate + dx;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }
});


function animation() {
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

// inicio carrusel
updateCarousel();
startAutoRotate();

