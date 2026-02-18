// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Sticky Header Transparency Effect


const nav = document.getElementById('navbar');
// const menuBtn = document.getElementById('menu-btn');

// Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Mobile Menu Toggle (Basic)
menuBtn.addEventListener('click', () => {
    // You can implement a Tailwind drawer here
    alert("Mobile menu clicked! In a full build, this would open a side-drawer.");
});

const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('dots-container');

let currentSlide = 0;
const slideInterval = 6000; // 6 Seconds

// Create Dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `w-2 h-2 rounded-full cursor-pointer transition-all ${i === 0 ? 'bg-amber-500 w-8' : 'bg-white/30'}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function updateSlides() {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === currentSlide ? '1' : '0';
        slide.style.zIndex = i === currentSlide ? '10' : '0';
        
        // Reset and trigger animations for active slide text
        const content = slide.querySelector('div');
        if (i === currentSlide) {
            content.classList.remove('hidden');
        }
    });

    // Update Dots
    const dots = dotsContainer.querySelectorAll('div');
    dots.forEach((dot, i) => {
        dot.className = `h-1.5 rounded-full cursor-pointer transition-all ${i === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/30 w-4'}`;
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
}

// Controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto Play
setInterval(nextSlide, slideInterval);