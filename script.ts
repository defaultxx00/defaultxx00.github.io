declare const gsap: any;
declare const ScrollTrigger: any;

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    initCustomCursor();
    initNavbar();
    initHeroAnimation();
    initScrollAnimations();
    initSkillBars();
    initStatsCounter();
    initSkillFilters();
    initContactForm();
    initMenuToggle();
    initHoverEffects();
});

function initCustomCursor(): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const follower = document.querySelector('.cursor-follower') as HTMLElement;
    
    if (!cursor || !follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX - 4}px`;
        cursor.style.top = `${mouseY - 4}px`;
    });
    
    const animateFollower = (): void => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = `${followerX - 20}px`;
        follower.style.top = `${followerY - 20}px`;
        
        requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(1.5)';
            follower.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.opacity = '0.5';
        });
    });
}

function initNavbar(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initHeroAnimation(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-tag', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: 0.3
    })
    .from('.title-line', {
        y: 50,
        opacity: 0,
        duration: 0.5
    }, '-=0.4')
    .from('.title-name', {
        y: 50,
        opacity: 0,
        duration: 0.5
    }, '-=0.4')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.5
    }, '-=0.3')
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.5
    }, '-=0.3')
    .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.4
    }, '-=0.2');
    
    gsap.to('.gradient-orb', {
        y: -50,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

function initScrollAnimations(): void {
    const sections = document.querySelectorAll('.section-header, .skill-card, .project-card, .contact-card');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });
    });
    
    gsap.from('.about-visual', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%'
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%'
        },
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.5');
}

function initSkillBars(): void {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar as HTMLElement;
        const value = progress.dataset.progress;
        
        gsap.to(progress, {
            scrollTrigger: {
                trigger: progress,
                start: 'top 85%'
            },
            width: `${value}%`,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
        });
    });
}

function initStatsCounter(): void {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const element = stat as HTMLElement;
        const target = parseFloat(element.dataset.target || '0');
        const isDecimal = target % 1 !== 0;
        
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%'
            },
            innerHTML: target,
            duration: 1.5,
            snap: { innerHTML: 0.1 },
            ease: 'power2.out',
            onUpdate: function(): void {
                const value = this.targets()[0] as unknown as number;
                element.textContent = isDecimal ? value.toFixed(1) : Math.ceil(value).toString();
            }
        });
    });
}

function initSkillFilters(): void {
    const buttons = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.skill-card');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = (btn as HTMLElement).dataset.category;
            
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            cards.forEach(card => {
                const cardEl = card as HTMLElement;
                const cardCategory = cardEl.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    gsap.to(cardEl, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.2,
                        display: 'block'
                    });
                } else {
                    gsap.to(cardEl, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.2,
                        display: 'none'
                    });
                }
            });
        });
    });
}

function initContactForm(): void {
    const form = document.getElementById('contactForm');
    if (!form) return;

    (form as HTMLFormElement).addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const formData = new FormData(form as HTMLFormElement);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        console.log('Form submitted:', data);

        gsap.to('.contact-form', {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        (form as HTMLFormElement).reset();
        
        alert('Mensagem enviada com sucesso!');
    });
}

function initMenuToggle(): void {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            gsap.from('.nav-links li', {
                opacity: 0,
                x: -20,
                stagger: 0.1,
                duration: 0.3
            });
        }
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

function initHoverEffects(): void {
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.02, duration: 0.2 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.2 });
        });
    });
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.02, duration: 0.2 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.2 });
        });
    });
}
