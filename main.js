// --- Navigation & Drawer Logic ---
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-drawer');
const drawer = document.getElementById('mobile-drawer');

// Toggle Drawer
menuBtn.addEventListener('click', () => drawer.classList.remove('translate-x-full'));
closeBtn.addEventListener('click', () => drawer.classList.add('translate-x-full'));

// Close drawer on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => drawer.classList.add('translate-x-full'));
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// --- Hero Slider Logic ---
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
let currentSlide = 0;

// Create Pagination Dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `h-1.5 rounded-full cursor-pointer transition-all ${i === 0 ? 'bg-amber-500 w-8' : 'bg-white/30 w-4'}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
});

function updateSlides() {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === currentSlide ? '1' : '0';
        slide.style.zIndex = i === currentSlide ? '10' : '0';
    });
    
    const dots = dotsContainer.querySelectorAll('div');
    dots.forEach((dot, i) => {
        dot.className = `h-1.5 rounded-full cursor-pointer transition-all ${i === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/30 w-4'}`;
    });
}

const nextSlide = () => { currentSlide = (currentSlide + 1) % slides.length; updateSlides(); };
const prevSlide = () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlides(); };
const goToSlide = (index) => { currentSlide = index; updateSlides(); };

document.getElementById('nextSlide').onclick = nextSlide;
document.getElementById('prevSlide').onclick = prevSlide;
setInterval(nextSlide, 6000);

// --- Mobile Scroll Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.isIntersecting ? entry.target.classList.add('mobile-active') : entry.target.classList.remove('mobile-active');
    });
}, { threshold: 0.6 });

document.querySelectorAll('.service-card').forEach(card => observer.observe(card));

const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mobile-active');
        } else {
            // Optional: remove if you want it to stay highlighted once seen
            entry.target.classList.remove('mobile-active');
        }
    });
}, { threshold: 0.4 }); // Trigger when 40% of the card is visible on the phone

document.querySelectorAll('.service-card').forEach(card => {
    mobileObserver.observe(card);
});

// --- Service Detail Logic ---
const exploreButtons = document.querySelectorAll('.explore-trigger');
const closeDetailButtons = document.querySelectorAll('.close-detail');

exploreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceType = btn.getAttribute('data-service');
        const targetDetail = document.getElementById(`detail-${serviceType}`);
        
        if (targetDetail) {
            targetDetail.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        }
    });
});

closeDetailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the parent detail overlay and hide it
        const parentOverlay = btn.closest('.service-detail-overlay');
        parentOverlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    });
});

// --- Preloader Logic ---
document.body.classList.add('loading'); // Lock scroll

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Set a small delay (e.g., 2 seconds) to match the reference video's pacing
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('loading'); // Unlock scroll
    }, 2000); 
});

