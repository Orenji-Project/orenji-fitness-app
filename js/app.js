const FITNESS_PREFERENCES_KEY = 'fitnessapp.preferences';

function loadFitnessPreferences() {
    const defaultName = typeof userProfile !== 'undefined' ? userProfile.displayName : 'Camila';

    try {
        return {
            displayName: defaultName,
            preferredHome: 'treinos.html',
            reduceMotion: false,
            ...JSON.parse(localStorage.getItem(FITNESS_PREFERENCES_KEY) || '{}')
        };
    } catch (error) {
        return {
            displayName: defaultName,
            preferredHome: 'treinos.html',
            reduceMotion: false
        };
    }
}

function saveFitnessPreferences(preferences) {
    localStorage.setItem(FITNESS_PREFERENCES_KEY, JSON.stringify({
        ...loadFitnessPreferences(),
        ...preferences
    }));
}

function getFitnessUserName() {
    const defaultName = typeof userProfile !== 'undefined' ? userProfile.displayName : 'amiga';

    return loadFitnessPreferences().displayName || defaultName || 'amiga';
}

function applyFitnessPreferences() {
    const preferences = loadFitnessPreferences();
    const preferredPages = {
        'inicio.html': 'Ir para início',
        'treinos.html': 'Ver treinos',
        'resumo.html': 'Ver resumo'
    };
    const preferredLink = document.querySelector('[data-preferred-home-link]');

    document.documentElement.classList.toggle('reduce-motion', Boolean(preferences.reduceMotion));

    if (preferredLink && preferredPages[preferences.preferredHome]) {
        preferredLink.href = preferences.preferredHome;
        preferredLink.textContent = preferredPages[preferences.preferredHome];
    }
}

window.addEventListener('DOMContentLoaded', () => {
    applyFitnessPreferences();

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
