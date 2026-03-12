// Bidirectional scroll animations
let lastScrollY = window.scrollY;

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const scrollingDown = window.scrollY > lastScrollY;
        if (entry.isIntersecting) {
            entry.target.classList.remove('exit-up', 'exit-down');
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
            if (scrollingDown) {
                entry.target.classList.add('exit-up');
            } else {
                entry.target.classList.add('exit-down');
            }
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
});

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
}, { passive: true });

document.querySelectorAll('.scroll-animate').forEach((el) => {
    scrollObserver.observe(el);
});

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// Mouse parallax on circuit background
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// Animate skill bars when they scroll into view
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fill').forEach(fill => {
                fill.style.width = fill.style.getPropertyValue('--pct') || fill.style.width;
                fill.classList.add('animated');
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach(el => barObserver.observe(el));

// Simple Typewriter effect for hero
const typeEffect = document.querySelector('.type-effect');
const words = ['a Computer Engineering Student.', 'an AI Enthusiast.', 'a Robotics Lover.'];
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typeEffect) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
        typeEffect.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeEffect.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Initialize type effect
setTimeout(type, 1000);

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved user preference, if any
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
});

// Project category filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            if (match) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.display = '';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    if (btn.classList.contains('active') && card.dataset.category !== btn.dataset.filter && btn.dataset.filter !== 'all') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// CV button notification (placeholder until real CV is ready)
document.getElementById('cv-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Not available at the moment, work in progress.');
});
