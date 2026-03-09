//port.js

document.addEventListener('DOMContentLoaded', function () {

    // ── Image fallback ──────────────────────────────────────────────
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        img.onerror = function () {
            this.onerror = null;
            this.src = 'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="#eee"/><text x="60" y="65" font-size="14" text-anchor="middle" fill="#888">Not Found</text></svg>';
            this.style.objectFit = 'contain';
            this.style.background = '#eee';
        };
    });

    // ── Divider toggle ──────────────────────────────────────────────
    const costcoTrigger      = document.querySelector('.costco-card-trigger');
    const tutorCard          = document.querySelector('.tutor-card');
    const edutechfulCard     = document.querySelector('.edutechful-card');
    const costcoDivider      = document.querySelector('.costco-divider');
    const tutorDivider       = document.querySelector('.tutor-divider');
    const edutechfulDivider  = document.querySelector('.edutechful-divider');

    function hideAllDividers() {
        costcoDivider.style.display     = 'none';
        tutorDivider.style.display      = 'none';
        edutechfulDivider.style.display = 'none';
    }

    if (costcoTrigger) {
        costcoTrigger.addEventListener('click', () => {
            hideAllDividers();
            costcoDivider.style.display = 'flex';
            console.log('[toggle] Costco divider shown');
        });
    } else { console.warn('[init] .costco-card-trigger not found in DOM'); }
    
    if (tutorCard) {
        tutorCard.addEventListener('click', () => {
            hideAllDividers();
            tutorDivider.style.display = 'flex';
            console.log('[toggle] Tutor divider shown');
        });
    } else { console.warn('[init] .tutor-card not found in DOM'); }
    
    if (edutechfulCard) {
        edutechfulCard.addEventListener('click', () => {
            hideAllDividers();
            edutechfulDivider.style.display = 'flex';
            console.log('[toggle] EduTechful divider shown');
        });
    } else { console.warn('[init] .edutechful-card not found in DOM'); }

    // ── JS-controlled popup system ──────────────────────────────────
    let activePopup     = null;
    let activeContainer = null;

    function showPopup(container) {
        const popup = container.querySelector('.popup-content');
        if (!popup) return;
        if (activePopup && activePopup !== popup) {
            forceHide(activePopup);
            console.log('[popup] closed previous popup');
        }
        popup.style.display = 'block';
        popup.style.opacity = '1';
        activePopup     = popup;
        activeContainer = container;
        console.log('[popup] opened:', container.querySelector('.bubble-btn')?.textContent.trim());
    }

    function forceHide(popup) {
        if (!popup) return;
        popup.style.display = 'none';
        popup.style.opacity = '0';
        console.log('[popup] hidden');
    }

    function closeActive() {
        if (activePopup) {
            forceHide(activePopup);
            activePopup     = null;
            activeContainer = null;
        }
    }

    document.querySelectorAll('.hover-container').forEach(container => {
        container.addEventListener('mouseenter', () => showPopup(container));
        container.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (activeContainer === container) closeActive();
            }, 120);
        });
    });

    window.addEventListener('blur', () => {
        console.log('[window] blur — closing any open popup');
        closeActive();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hover-container')) {
            if (activePopup) {
                console.log('[click-outside] closing popup');
                closeActive();
            }
        }
    });

    // ── Bubble click handlers ───────────────────────────────────────
    const pdfPath = 'Costco Concept Summary Report.pdf';

    document.querySelectorAll('.costco-divider .bubble-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('[costco bubble] clicked:', btn.textContent.trim(), '→ opening PDF');
            closeActive();
            window.open(pdfPath, '_blank');
        });
    });

    document.querySelectorAll('.tutor-divider .bubble-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('[tutor bubble] clicked:', btn.textContent.trim(), '→ opening page');
            closeActive();
            window.open('https://furisuko.github.io/Solutions/', '_blank');
        });
    });

    // ── Photo card click ────────────────────────────────────────────
    const photoCard = document.querySelector('.photo-card');
    if (photoCard) {
        photoCard.addEventListener('click', () => {
            console.log('[photo-card] clicked → opening resume PDF');
            window.open('Customer Success 2026.pdf', '_blank');
        });
    }

    console.log('[init] port.js loaded — JS popup system active');

    // EduTechful bubbles — Bubble 1 has no link, bubbles 2-4 open Loom
    const edutechfulLoomLinks = [
        null,
        'https://www.loom.com/share/d4a95f22845f4198b3854c2641b6c096',
        'https://www.loom.com/share/dd0d3aaa7e1f417d90519ac53105b0b4',
        'https://www.loom.com/share/e0eac93ff95d4b0bb7e1a110eafbabf8'
    ];

    document.querySelectorAll('.edutechful-divider .bubble-btn').forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const link = edutechfulLoomLinks[i];
            if (link) {
                console.log('[edutechful bubble] clicked:', btn.textContent.trim(), '→ opening Loom');
                closeActive();
                window.open(link, '_blank');
            } else {
                console.log('[edutechful bubble] clicked:', btn.textContent.trim(), '→ no link');
            }
        });
    });

    // ── Photo card click ────────────────────────────────────────────
    });

