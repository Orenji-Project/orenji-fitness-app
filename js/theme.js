const THEME_DEFAULT_COLORS = {
    primary: '#5b96ff',
    primaryStrong: '#3b82f6',
    accent: '#22c55e',
    danger: '#f43f5e',
    warning: '#facc15'
};

const THEME_STORAGE_KEY = 'fitnessapp.colors';

function hexToRgbParts(hexColor) {
    const normalized = hexColor.replace('#', '').trim();
    const fullHex = normalized.length === 3
        ? normalized.split('').map(char => char + char).join('')
        : normalized;
    const value = Number.parseInt(fullHex, 16);

    if (Number.isNaN(value)) {
        return '91, 150, 255';
    }

    return [
        (value >> 16) & 255,
        (value >> 8) & 255,
        value & 255
    ].join(', ');
}

function loadThemeColors() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (!stored) {
        return { ...THEME_DEFAULT_COLORS };
    }

    try {
        return {
            ...THEME_DEFAULT_COLORS,
            ...JSON.parse(stored)
        };
    } catch (error) {
        return { ...THEME_DEFAULT_COLORS };
    }
}

function saveThemeColors(colors) {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({
        ...loadThemeColors(),
        ...colors
    }));
}

function resetThemeColors() {
    localStorage.removeItem(THEME_STORAGE_KEY);
    applyThemeColors(THEME_DEFAULT_COLORS);
}

function applyThemeColors(colors = loadThemeColors()) {
    const root = document.documentElement;
    const theme = {
        ...THEME_DEFAULT_COLORS,
        ...colors
    };

    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-strong', theme.primaryStrong);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--danger', theme.danger);
    root.style.setProperty('--warning', theme.warning);
    root.style.setProperty('--primary-rgb', hexToRgbParts(theme.primaryStrong));
    root.style.setProperty('--accent-rgb', hexToRgbParts(theme.accent));
    root.style.setProperty('--danger-rgb', hexToRgbParts(theme.danger));
    root.style.setProperty('--warning-rgb', hexToRgbParts(theme.warning));
}

applyThemeColors();
