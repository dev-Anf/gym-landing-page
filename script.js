'use strict';

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Hero window opening animation
const heroWindow = document.querySelector('[data-window]');
if (heroWindow) {
    requestAnimationFrame(() => {
        setTimeout(() => heroWindow.classList.add('is-open'), 150);
    });
}

// Stats counters animation
const counters = document.querySelectorAll('[data-count]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (counters.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const animateCount = (el) => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            const value = Math.round(target * eased);
            el.textContent = String(value) + (t < 1 ? '' : suffix);
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = String(target) + suffix;
        };
        requestAnimationFrame(tick);
    };

    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                counterIO.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach((el) => counterIO.observe(el));
} else {
    // Fallback (если выключены анимации или старый браузер)
    counters.forEach((el) => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        el.textContent = String(target) + suffix;
    });
}