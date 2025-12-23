let currentLang = 'en';
let currentPage = 1;
const pages = { en: 2, es: 2 };
const baseCdn = 'https://cdn.jsdelivr.net/gh/aruizdlt/cv@main/output';

function updateViewer() {
    const img = document.getElementById('cv-image');
    const indicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    img.src = `${baseCdn}/${currentLang}/cv_${currentLang}_${currentPage}.png`;
    indicator.textContent = `${currentPage} / ${pages[currentLang]}`;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= pages[currentLang];
}

function loadCV(lang, btn) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    currentLang = lang;
    currentPage = 1;
    updateViewer();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateViewer();
    }
}

function nextPage() {
    if (currentPage < pages[currentLang]) {
        currentPage++;
        updateViewer();
    }
}

// Inicializa el visor al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Attach click listeners to language tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang || 'en';
            loadCV(lang, btn);
        });
    });

    // Attach click listeners to prev/next controls
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) prevBtn.addEventListener('click', prevPage);
    if (nextBtn) nextBtn.addEventListener('click', nextPage);

    // Initialize viewer with active tab or default to English
    const activeBtn = document.querySelector('.tab-btn.active');
    const lang = activeBtn?.dataset?.lang || 'en';
    loadCV(lang, activeBtn || document.querySelector('.tab-btn'));

    console.log('Portfolio website loaded successfully!');
});