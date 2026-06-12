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
        word.offsetHeight; // Trigger reflow
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
    
    // Get form values
    const formData = new FormData(this);
    
    // Show success message
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '전송 완료! ✓';
    submitBtn.style.background = 'var(--secondary-green)';
    
    // Reset form
    this.reset();
    
    // Restore button after 2 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'var(--accent-green)';
    }, 2000);
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe project cards, tech items, and contact items
document.querySelectorAll('.project-card, .tech-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== CONSOLE MESSAGE ========== 
console.log('%c전시의 숲', 'color: #4A9D3A; font-size: 20px; font-weight: bold;');
console.log('%c전시기획자의 포트폴리오에 오신 것을 환영합니다 🌿', 'color: #2D5016; font-size: 14px;');
console.log('%c전시를 통해 감정을 전달하고 공간을 통해 이야기를 나눕니다.', 'color: #3D7D2E; font-size: 12px;');

// ========== ACTIVE NAV LINK ========== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
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
            link.style.color = 'var(--accent-green)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ========== DYNAMIC LEAF FALLING ========== 
function createFallingLeaf() {
    const leaf = document.createElement('div');
    leaf.textContent = '🍃';
    leaf.style.position = 'fixed';
    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.top = '-20px';
    leaf.style.fontSize = '2rem';
    leaf.style.opacity = '0.7';
    leaf.style.pointerEvents = 'none';
    leaf.style.zIndex = '1';
    
    const duration = Math.random() * 3 + 4; // 4-7 seconds
    const distance = Math.random() * 100 - 50; // -50 to 50px
    
    leaf.animate([
        { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '1' },
        { transform: `translateY(${window.innerHeight + 20}px) translateX(${distance}px) rotate(360deg)`, opacity: '0' }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    }).onfinish = () => leaf.remove();
    
    document.body.appendChild(leaf);
}

// ========== LAZY LOADING FOR IMAGES ========== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                };
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.project-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== SKILL BAR ANIMATION ========== 
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-fill');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transition = 'width 0.8s ease';
                    bar.style.width = bar.style.width;
                }, index * 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-grid')?.forEach(grid => {
    skillObserver.observe(grid);
});

console.log('%c🌿 All scripts loaded successfully!', 'color: #4A9D3A; font-size: 12px;');
