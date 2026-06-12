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

setInterval(updateTitle, 3000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const trees = document.querySelectorAll('.tree');
    trees.forEach((tree, index) => {
        const speed = 0.5 + (index * 0.1);
        tree.style.transform = `translateY(${scrollTop * speed}px)`;
    });
});

document.addEventListener('mousemove', (e) => {
    const floatingPlant = document.querySelector('.floating-plant');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (floatingPlant) {
        floatingPlant.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

console.log('%c전시의 숲', 'color: #4A9D3A; font-size: 20px; font-weight: bold;');
console.log('%c전시기획자의 포트폴리오에 오신 것을 환영합니다 🌿', 'color: #2D5016; font-size: 14px;');
