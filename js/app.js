window.addEventListener('DOMContentLoaded', () => {
    const currentPage = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (typeof initWorkoutApp === 'function') {
        initWorkoutApp();
    }
});
