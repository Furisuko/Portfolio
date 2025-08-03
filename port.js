document.addEventListener('DOMContentLoaded', function () {
    // Image fallback
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        img.onerror = function () {
            this.onerror = null;
            this.src = 'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="#eee"/><text x="60" y="65" font-size="14" text-anchor="middle" fill="#888">Not Found</text></svg>';
            this.style.objectFit = 'contain';
            this.style.background = '#eee';
        };
    });

    const costcoCard = document.querySelector('.costco-card');
    const tutorCard = document.querySelector('.tutor-card');
    const costcoDivider = document.querySelector('.costco-divider');
    const tutorDivider = document.querySelector('.tutor-divider');

    // Toggle visibility between Costco and Tutor dividers
    costcoCard.addEventListener('click', () => {
        costcoDivider.style.display = 'flex';
        tutorDivider.style.display = 'none';
    });

    tutorCard.addEventListener('click', () => {
        costcoDivider.style.display = 'none';
        tutorDivider.style.display = 'flex';
    });

    // Costco bubbles → Open PDF
    const pdfPath = 'Costco Concept Summary Report.pdf';
    document.querySelectorAll('.costco-divider .bubble-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open(pdfPath, '_blank');
        });
    });

    // Tutor bubbles → Open website
    document.querySelectorAll('.tutor-divider .bubble-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://furisuko.github.io/Solutions/', '_blank');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const photoCard = document.querySelector('.photo-card');
    
    if (photoCard) {
        photoCard.addEventListener('click', function () {
            window.open('Client_Success.pdf', '_blank');
        });
    }
});


