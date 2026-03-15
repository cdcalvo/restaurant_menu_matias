/* ============================================================
 *  ⚙️  CONFIGURACIÓN DE CATEGORÍAS DEL MENÚ
 *  Agrega, elimina o edita objetos en este array para
 *  controlar qué botones aparecen en la pantalla.
 *
 *  Propiedades de cada categoría:
 *  - icono    : emoji del ícono
 *  - titulo   : nombre principal del botón
 *  - subtitulo: texto secundario (traducción o descripción)
 *  - color    : acento en formato "R, G, B"  (opcional,
 *               si se omite usa el dorado colombiano)
 *  - accion   : función que se ejecuta al hacer tap/click
 * ============================================================ */
const MENU_CONFIG = [
    {
        icono: '🌅',
        titulo: 'Desayunos',
        subtitulo: 'Breakfast',
        color: '255, 215, 0',
        accion: () => window.location.href = 'breakfast.html'
    },
    {
        icono: '🥟',
        titulo: 'Aperitivos',
        subtitulo: 'Appetizers',
        color: '80, 200, 120',
        accion: () => window.location.href = 'appetizers.html'
    },
    {
        icono: '🥩',
        titulo: 'Picada',
        subtitulo: 'Meat Mix',
        color: '206, 17, 38',
        accion: () => window.location.href = 'meat_mix.html'
    },
    {
        icono: '🦐',
        titulo: 'Mariscos',
        subtitulo: 'Seafood',
        color: '0, 51, 160',
        accion: () => window.location.href = 'seafood.html'
    },
    {
        icono: '🥗',
        titulo: 'Ensaladas y Sopas',
        subtitulo: 'Soups & Salads',
        color: '50, 205, 50',
        accion: () => window.location.href = 'salads_soups.html'
    },
    {
        icono: '⭐',
        titulo: 'Especialidades de la Casa',
        subtitulo: 'House Specialties',
        color: '255, 215, 0',
        accion: () => window.location.href = 'specialties.html'
    },
    {
        icono: '🍰',
        titulo: 'Postres',
        subtitulo: 'Desserts',
        color: '210, 105, 30',
        accion: () => window.location.href = 'desserts.html'
    },
    {
        icono: '☕',
        titulo: 'Bebidas',
        subtitulo: 'Beverages',
        color: '107, 68, 35',
        accion: () => window.location.href = 'drinks.html'
    },
    {
        icono: '🧒',
        titulo: 'Menú Infantil y Acompañantes',
        subtitulo: 'Kids & Sides',
        color: '255, 179, 71',
        accion: () => window.location.href = 'kids.html'
    }
];
/* ============================================================
 *  🔧  MOTOR DE RENDERIZADO — no necesitas editar desde aquí
 * ============================================================ */
function renderMenuCategories(config) {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';

    config.forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card loading';
        card.style.animationDelay = `${(index + 1) * 0.1}s`;

        // Aplicar color de acento vía CSS custom property
        if (cat.color) {
            card.style.setProperty('--card-color', cat.color);
        }

        card.innerHTML = `
            <div class="category-content">
                <div class="category-icon">${cat.icono}</div>
                <div class="category-text">
                    <h3>${cat.titulo}</h3>
                    <p>${cat.subtitulo}</p>
                </div>
                <div class="category-arrow">→</div>
            </div>`;

        card.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => { this.style.transform = ''; }, 200);
            if (typeof cat.accion === 'function') cat.accion(cat.titulo);
        });

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        grid.appendChild(card);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    grid.querySelectorAll('.loading').forEach(el => observer.observe(el));
}

// Renderizar al cargar la página
renderMenuCategories(MENU_CONFIG);

// Parallax del header al hacer scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');
    const logoSection = document.querySelector('.logo-section');
    header.style.transform = `translateY(${scrollY * 0.3}px)`;
    logoSection.style.transform = `translateY(${scrollY * 0.2}px)`;
});

function openQrModal(src, label) {
    document.getElementById('qrModalImage').src = src;
    document.getElementById('qrModalLabel').textContent = label;
    document.getElementById('qrModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQrModal() {
    document.getElementById('qrModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQrModal();
});

// ============================================================
// CARRUSEL — agrega tus imágenes aquí
// Usa { image: 'url' } para imágenes o { emoji: '🥘' } para emojis
// ============================================================
const CAROUSEL_ITEMS = [
    { image: 'assets/img/main_slide/almuerzo.webp' },
    { image: 'assets/img/main_slide/calentado_arepa_chicharron.webp' },
    { image: 'assets/img/main_slide/cazuela_mariscos_arroz.webp' },
    { image: 'assets/img/main_slide/churrasco_camarones.webp' },
    { image: 'assets/img/main_slide/empanadas.webp' },
    { image: 'assets/img/main_slide/limonada.webp' },
    { image: 'assets/img/main_slide/picada_personal.webp' },
    { image: 'assets/img/main_slide/hamburguesa.webp' },
];

let carouselIndex = 0;
let carouselTimer;

function carouselInit() {
    const track = document.getElementById('carouselTrack');
    const dots  = document.getElementById('carouselDots');
    if (!track || !dots) return;

    track.innerHTML = CAROUSEL_ITEMS.map(item => `
        <div class="carousel-slide">
            ${item.image
                ? `<img src="${item.image}" alt="carousel">`
                : `<div class="carousel-emoji">${item.emoji}</div>`}
        </div>
    `).join('');

    dots.innerHTML = CAROUSEL_ITEMS.map((_, i) =>
        `<div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="carouselGoTo(${i})"></div>`
    ).join('');

    carouselAutoPlay();
}

function carouselGoTo(index) {
    carouselIndex = (index + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    document.getElementById('carouselTrack').style.transform = `translateX(-${carouselIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === carouselIndex));
    clearInterval(carouselTimer);
    carouselAutoPlay();
}

function carouselMove(dir) { carouselGoTo(carouselIndex + dir); }

function carouselAutoPlay() {
    carouselTimer = setInterval(() => carouselMove(1), 4000);
}

document.addEventListener('DOMContentLoaded', carouselInit);