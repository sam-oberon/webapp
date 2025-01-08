const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoRotateInterval;

// Función para actualizar el carrusel
function updateCarousel() {
  const cardWidth = 250; // Ancho de cada tarjeta
  const containerWidth = document.querySelector('.carousel-container').offsetWidth;
  const centerOffset = (containerWidth - cardWidth) / 2; // Calcular el desplazamiento al centro

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

  // Ajustar la posición del carrusel para centrar la tarjeta activa
  const offset = -currentIndex * cardWidth + centerOffset;
  carousel.style.transform = `translateX(${offset}px)`;
}

// Función para la auto-rotación
function autoRotate() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

// Función para iniciar la auto-rotación
function startAutoRotate() {
  autoRotateInterval = setInterval(autoRotate, 3000); // Rota automáticamente cada 3 segundos
}

// Función para detener la auto-rotación
function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Hacer clic en las tarjetas para seleccionarlas
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    stopAutoRotate();
    currentIndex = index;
    updateCarousel();
    startAutoRotate(); // Reiniciar la auto-rotación después de la interacción
  });
});

// Funcionalidad de arrastre
carousel.addEventListener('mousedown', (e) => {
  stopAutoRotate(); // Detener la auto-rotación mientras se arrastra
  isDragging = true;
  startX = e.pageX;
  prevTranslate = currentTranslate;
  animationID = requestAnimationFrame(animation);
});

carousel.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);

    // Determinar el índice más cercano al soltar
    const cardWidth = 250;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) {
      currentIndex = (currentIndex + 1) % cards.length;
    } else if (movedBy > 50) {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    updateCarousel();
    startAutoRotate(); // Reiniciar la auto-rotación después del arrastre
  }
});

carousel.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);
    updateCarousel();
    startAutoRotate(); // Reiniciar la auto-rotación después de salir del carrusel
  }
});

carousel.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const dx = e.pageX - startX;
    currentTranslate = prevTranslate + dx;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }
});

// Función para animar mientras se arrastra
function animation() {
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

// Inicializar el carrusel
updateCarousel();
startAutoRotate(); // Iniciar la auto-rotación al cargar la página

