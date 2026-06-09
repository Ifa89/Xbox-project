/* ═══════════════════════════════════════════════════════════════
   XBOX WEBSITE — JavaScript
   Features: Particle system, cursor, scroll reveal, counters,
             filter tabs, navbar, mobile menu
   ═══════════════════════════════════════════════════════════════ */

/* ─── Custom Cursor ──────────────────────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .game-card, .gp-card, .console-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width  = '52px';
        cursor.style.height = '52px';
        cursor.style.background = 'rgba(82,176,67,0.15)';
        cursor.style.borderColor = '#52B043';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width  = '36px';
        cursor.style.height = '36px';
        cursor.style.background = 'transparent';
        cursor.style.borderColor = '#52B043';
    });
});

/* ─── Particle System ────────────────────────────────────────── */
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset(true);
    }

    reset(initial = false) {
        this.x  = Math.random() * this.canvas.width;
        this.y  = initial ? Math.random() * this.canvas.height : this.canvas.height + 10;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 0.55 + 0.15);
        this.radius  = Math.random() * 1.8 + 0.4;
        this.opacity = Math.random() * 0.55 + 0.1;
        this.life    = 0;
        this.maxLife = Math.random() * 400 + 250;
        this.drift   = Math.random() * 0.015;

        const r = Math.random();
        if      (r < 0.35) this.color = '82,176,67';
        else if (r < 0.60) this.color = '16,124,16';
        else if (r < 0.78) this.color = '0,212,255';
        else               this.color = '255,255,255';
    }

    update() {
        this.vx += Math.sin(this.life * this.drift) * 0.008;
        this.x  += this.vx;
        this.y  += this.vy;
        this.life++;
        if (this.y < -10 || this.life > this.maxLife) this.reset();
        if (this.x < 0)                  this.x = this.canvas.width;
        if (this.x > this.canvas.width)  this.x = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowBlur  = 8;
        ctx.shadowColor = `rgba(${this.color},0.7)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.count = 110;
        this.resize();
        for (let i = 0; i < this.count; i++) this.particles.push(new Particle(this.canvas));
        window.addEventListener('resize', () => this.resize());
        this.draw();
    }

    resize() {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    drawConnections() {
        const pts = this.particles;
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx   = pts[i].x - pts[j].x;
                const dy   = pts[i].y - pts[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.18;
                    this.ctx.beginPath();
                    this.ctx.moveTo(pts[i].x, pts[i].y);
                    this.ctx.lineTo(pts[j].x, pts[j].y);
                    this.ctx.strokeStyle = `rgba(82,176,67,${alpha})`;
                    this.ctx.lineWidth   = 0.6;
                    this.ctx.stroke();
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConnections();
        this.particles.forEach(p => { p.update(); p.draw(this.ctx); });
        requestAnimationFrame(() => this.draw());
    }
}

new ParticleSystem('particleCanvas');

/* ─── Navbar scroll ──────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile Menu ────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

/* ─── Smooth anchor scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ─── Scroll Reveal (Intersection Observer) ──────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add('visible'), delay * 1000);
            revealObserver.unobserve(el);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
    if (el.classList.contains('game-card')) {
        const idx = [...document.querySelectorAll('.game-card')].indexOf(el);
        el.style.transitionDelay = `${idx * 0.07}s`;
    }
    revealObserver.observe(el);
});

/* ─── Counter Animation ──────────────────────────────────────── */
function animateCounter(el, target, duration = 2000) {
    const start     = performance.now();
    const isLarge   = target >= 1000;
    const easeOut   = t => 1 - Math.pow(1 - t, 3);

    function step(now) {
        const elapsed  = Math.min((now - start) / duration, 1);
        const current  = Math.round(easeOut(elapsed) * target);
        el.textContent = isLarge ? current.toLocaleString() : current;
        if (elapsed < 1) requestAnimationFrame(step);
        else el.textContent = isLarge ? target.toLocaleString() : target;
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.counter').forEach(counter => {
                animateCounter(counter, parseInt(counter.dataset.target));
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ─── Filter Tabs ────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const gameCards  = document.querySelectorAll('.game-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        gameCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !match);
        });
    });
});

/* ─── Hero line-by-line entry animation ──────────────────────── */
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : i * 0.12;
        setTimeout(() => el.classList.add('visible'), delay * 1000 + 200);
    });
});

/* ─── Parallax tilt on game cards ───────────────────────────── */
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `scale(1.04) translateY(-6px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
