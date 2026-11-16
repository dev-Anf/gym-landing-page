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