// ========== TITLE ANIMATION ========== 
const titleWords = [
    ['전시', '공간을', '만드는'],
    ['감정을', '표현하는', '기획자'],
    ['스토리를', '전하는', '큐레이터']
];

let currentIndex = 0;

function updateTitle() {
    const words = titleWords[currentIndex];
    const titleWordsElements = document.querySelectorAll('.title-word');
    titleWordsElements.forEach((word, index) => {
        word.style.animation = 'none';
        word.offsetHeight;
        word.textContent = words[index];
        word.style.animation = `fadeInUp 1s ease-out ${index * 0.3}s forwards`;
    });
    currentIndex = (currentIndex + 1) % titleWords.length;
}

setInterval(updateTitle, 4000);

// ========== SMOOTH SCROLL ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PARALLAX EFFECT ========== 
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const trees = document.querySelectorAll('.tree');
    trees.forEach((tree, index) => {
        const speed = 0.5 + (index * 0.1);
        tree.style.transform = `translateY(${scrollTop * speed}px)`;
    });
});

// ========== MOUSE TRACKING FOR FLOATING PLANT ========== 
document.addEventListener('mousemove', (e) => {
    const floatingPlant = document.querySelector('.floating-plant');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (floatingPlant) {
        floatingPlant.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// ========== FORM SUBMISSION ========== 
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '전송 완료! ✓';
    submitBtn.style.background = 'var(--secondary-green)';
    
    this.reset();
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'var(--accent-green)';
    }, 2000);
});

// ========== ACTIVE NAV LINK ========== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .skill-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== FILTER FUNCTIONALITY ========== 
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.animation = 'fadeInUp 0.8s ease-out forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ========== LIGHTBOX FUNCTIONALITY ========== 
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryImages = document.querySelectorAll('[data-lightbox]');

let currentImageIndex = 0;
const imageUrls = [];

// Collect all image SVGs
galleryImages.forEach((img, index) => {
    imageUrls.push(img.innerHTML);
});

// Open lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxModal.classList.add('active');
    const svgContent = imageUrls[currentImageIndex];
    lightboxImage.innerHTML = `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">${svgContent.replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>`;
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
}

// Close on X button
lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Next image
lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    openLightbox();
});

// Previous image
lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    openLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightboxModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            lightboxNext.click();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// ========== CONSOLE MESSAGE ========== 
console.log('%c전시의 숲', 'color: #4A9D3A; font-size: 20px; font-weight: bold;');
console.log('%c전시기획자의 포트폴리오에 오신 것을 환영합니다 🌿', 'color: #2D5016; font-size: 14px;');
console.log('%c막연한 감동을 데이터로 구조화하여 정성스러운 경험을 만들어갑니다.', 'color: #3D7D2E; font-size: 12px;');

console.log('%c✨ 모든 기능이 로드되었습니다!', 'color: #4A9D3A; font-size: 12px; font-weight: bold;');
