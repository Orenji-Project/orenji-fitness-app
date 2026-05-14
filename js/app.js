window.addEventListener('DOMContentLoaded', () => {
    // Apply saved colors
    applyUserColors();

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (typeof initWorkoutApp === 'function') {
        initWorkoutApp();
    }
});

function applyUserColors() {
    const STORAGE_KEY = 'fitnessapp.colors';
    const DEFAULT_COLORS = {
        primary: '#5b96ff',
        accent: '#22c55e'
    };

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const colors = stored ? JSON.parse(stored) : DEFAULT_COLORS;
        
        document.documentElement.style.setProperty('--primary', colors.primary || DEFAULT_COLORS.primary);
        document.documentElement.style.setProperty('--accent', colors.accent || DEFAULT_COLORS.accent);
    } catch (e) {
        document.documentElement.style.setProperty('--primary', DEFAULT_COLORS.primary);
        document.documentElement.style.setProperty('--accent', DEFAULT_COLORS.accent);
    }
}
