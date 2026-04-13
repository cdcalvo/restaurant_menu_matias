// ================================================================
// CARRUSEL — agrega aquí tus imágenes promocionales
// Usa { image: 'ruta' } para imágenes reales
// ================================================================
const PROMO_ITEMS = [
    { image: 'assets/img/promos/bienvenida.webp' },
    { image: 'assets/img/promos/paletas.webp' }
];

let carouselIndex = 0;
let carouselTimer;

function carouselInit() {
    const track = document.getElementById('carouselTrack');
    const dots  = document.getElementById('carouselDots');
    if (!track || !dots) return;

    track.innerHTML = PROMO_ITEMS.map(item => `
        <div class="carousel-slide" style="--slide-bg: url('${item.image}')">
            <img src="${item.image}" alt="Promoción Don Matías">
        </div>
    `).join('');

    dots.innerHTML = PROMO_ITEMS.map((_, i) =>
        `<button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="carouselGoTo(${i})"></button>`
    ).join('');

    // Ocultar botones si solo hay 1 imagen
    if (PROMO_ITEMS.length <= 1) {
        document.querySelectorAll('.carousel-btn').forEach(b => b.style.display = 'none');
        dots.style.display = 'none';
    }

    carouselAutoPlay();
}

function carouselGoTo(index) {
    carouselIndex = (index + PROMO_ITEMS.length) % PROMO_ITEMS.length;
    document.getElementById('carouselTrack').style.transform = `translateX(-${carouselIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === carouselIndex));
    clearInterval(carouselTimer);
    carouselAutoPlay();
}

function carouselMove(dir) { carouselGoTo(carouselIndex + dir); }

function carouselAutoPlay() {
    if (PROMO_ITEMS.length > 1) {
        carouselTimer = setInterval(() => carouselMove(1), 10000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carouselInit();

    // Pulso periódico en el botón CTA
    const btn = document.querySelector('.cta-button');
    if (btn) {
        setInterval(() => {
            btn.style.transform = 'scale(1.03)';
            setTimeout(() => { btn.style.transform = ''; }, 220);
        }, 5000);
    }
});