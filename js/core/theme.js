const THEME_DEFAULT_COLORS = {
    background: '#020617',
    header: '#0f172a',
    primary: '#5b96ff',
    primaryStrong: '#3b82f6',
    accent: '#22c55e',
    danger: '#f43f5e',
    warning: '#facc15',
    texture: 'glass',
    shape: 'rounded',
    shadow: 'soft',
    density: 'comfortable'
};

const THEME_STORAGE_KEY = 'orenji.theme';
const THEME_SYNC_STORAGE_KEY = 'orenji.theme.sync';
const THEME_APP_STORAGE_PREFIX = 'orenji.theme.app.';
const THEME_LEGACY_STORAGE_KEYS = ['fitnessapp.colors'];

function getThemeAppId() {
    if (window.ORENJI_APP_ID) {
        return window.ORENJI_APP_ID;
    }

    const pathParts = window.location.pathname
        .split('/')
        .filter(Boolean)
        .map(part => decodeURIComponent(part));
    const fileName = pathParts[pathParts.length - 1] || '';
    const appName = fileName.includes('.') ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];

    return (appName || 'orenji-app')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function isThemeSyncEnabled() {
    return localStorage.getItem(THEME_SYNC_STORAGE_KEY) === 'true';
}

function getThemeStorageKey(appId = getThemeAppId()) {
    return isThemeSyncEnabled()
        ? THEME_STORAGE_KEY
        : `${THEME_APP_STORAGE_PREFIX}${appId}`;
}

function readThemeStorage(key) {
    const stored = localStorage.getItem(key);

    if (!stored) {
        return null;
    }

    try {
        return JSON.parse(stored);
    } catch (error) {
        return null;
    }
}

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

function hexToRgba(hexColor, alpha) {
    return `rgba(${hexToRgb(hexColor).join(',')},${alpha})`;
}

function hexToRgb(hexColor, fallback = [2, 6, 23]) {
    const normalized = hexColor.replace('#', '').trim();
    const fullHex = normalized.length === 3
        ? normalized.split('').map(char => char + char).join('')
        : normalized;
    const value = Number.parseInt(fullHex, 16);

    if (Number.isNaN(value)) {
        return fallback;
    }

    return [
        (value >> 16) & 255,
        (value >> 8) & 255,
        value & 255
    ];
}

function rgbToHex(rgb) {
    return `#${rgb.map(value => {
        const channel = Math.max(0, Math.min(255, Math.round(value)));
        return channel.toString(16).padStart(2, '0');
    }).join('')}`;
}

function mixHexColors(firstHex, secondHex, amount) {
    const first = hexToRgb(firstHex);
    const second = hexToRgb(secondHex);

    return rgbToHex(first.map((channel, index) => {
        return channel + (second[index] - channel) * amount;
    }));
}

function getRelativeLuminance(hexColor) {
    const channels = hexToRgb(hexColor).map(channel => {
        const value = channel / 255;
        return value <= 0.03928
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
    });

    return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
}

function loadThemeColors(appId = getThemeAppId()) {
    const theme = readThemeStorage(getThemeStorageKey(appId))
        || readThemeStorage(THEME_STORAGE_KEY)
        || THEME_LEGACY_STORAGE_KEYS.map(key => readThemeStorage(key)).find(Boolean);

    return {
        ...THEME_DEFAULT_COLORS,
        ...(theme || {})
    };
}

function saveThemeColors(colors, appId = getThemeAppId()) {
    localStorage.setItem(getThemeStorageKey(appId), JSON.stringify({
        ...loadThemeColors(appId),
        ...colors
    }));
}

function resetThemeColors(appId = getThemeAppId()) {
    localStorage.removeItem(getThemeStorageKey(appId));
    THEME_LEGACY_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    applyThemeColors(loadThemeColors(appId));
}

function setThemeSyncEnabled(enabled, appId = getThemeAppId()) {
    const currentTheme = loadThemeColors(appId);
    localStorage.setItem(THEME_SYNC_STORAGE_KEY, enabled ? 'true' : 'false');

    if (enabled) {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(currentTheme));
    } else {
        localStorage.setItem(`${THEME_APP_STORAGE_PREFIX}${appId}`, JSON.stringify(currentTheme));
    }

    applyThemeColors(currentTheme);
}

function toggleThemeSync(appId = getThemeAppId()) {
    setThemeSyncEnabled(!isThemeSyncEnabled(), appId);
}

function applyThemeColors(colors = loadThemeColors()) {
    const root = document.documentElement;
    const theme = {
        ...THEME_DEFAULT_COLORS,
        ...colors
    };
    const isLightBackground = getRelativeLuminance(theme.background) > 0.46;
    const isLightHeader = getRelativeLuminance(theme.header) > 0.46;
    const backgroundEnd = mixHexColors(theme.background, isLightBackground ? '#ffffff' : '#000000', 0.18);
    const text = isLightBackground ? '#111827' : '#e2e8f0';
    const textMuted = isLightBackground ? '#475569' : '#94a3b8';
    const texture = ['glass', 'soft', 'solid'].includes(theme.texture) ? theme.texture : 'glass';
    const shape = ['rounded', 'soft', 'square'].includes(theme.shape) ? theme.shape : 'rounded';
    const shadowLevel = ['none', 'soft', 'deep'].includes(theme.shadow) ? theme.shadow : 'soft';
    const density = ['compact', 'comfortable', 'spacious'].includes(theme.density) ? theme.density : 'comfortable';
    const panelBg = getPanelColor(theme.background, isLightBackground, texture, 'base');
    const panelAltBg = getPanelColor(theme.background, isLightBackground, texture, 'alt');
    const secondaryBg = getPanelColor(theme.background, isLightBackground, texture, 'secondary');
    const border = isLightBackground ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.08)';
    const borderStrong = isLightBackground ? 'rgba(15,23,42,0.18)' : 'rgba(255,255,255,0.12)';
    const headerBg = texture === 'solid' ? theme.header : hexToRgba(theme.header, texture === 'soft' ? 0.88 : 0.72);
    const headerText = isLightHeader ? '#111827' : '#f8fafc';
    const headerTextMuted = isLightHeader ? '#475569' : '#cbd5e1';
    const radius = getThemeRadius(shape);
    const shadow = getThemeShadow(shadowLevel, isLightBackground);
    const spacing = getThemeSpacing(density);

    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--background-end', backgroundEnd);
    root.style.setProperty('--text', text);
    root.style.setProperty('--text-muted', textMuted);
    root.style.setProperty('--panel-bg', panelBg);
    root.style.setProperty('--panel-alt-bg', panelAltBg);
    root.style.setProperty('--secondary-bg', secondaryBg);
    root.style.setProperty('--border', border);
    root.style.setProperty('--border-strong', borderStrong);
    root.style.setProperty('--header-bg', headerBg);
    root.style.setProperty('--header-text', headerText);
    root.style.setProperty('--header-text-muted', headerTextMuted);
    root.style.setProperty('--card-shadow', shadow);
    root.style.setProperty('--radius', radius);
    root.style.setProperty('--section-padding', spacing.sectionPadding);
    root.style.setProperty('--card-padding', spacing.cardPadding);
    root.style.setProperty('--grid-gap', spacing.gridGap);
    root.style.setProperty('--button-padding', spacing.buttonPadding);
    root.style.setProperty('--control-padding', spacing.controlPadding);
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

function getThemeRadius(shape) {
    return {
        rounded: '24px',
        soft: '14px',
        square: '6px'
    }[shape];
}

function getThemeShadow(shadowLevel, isLightBackground) {
    if (shadowLevel === 'none') {
        return 'none';
    }

    if (shadowLevel === 'deep') {
        return isLightBackground
            ? '0 28px 60px rgba(15,23,42,0.2)'
            : '0 30px 70px rgba(0,0,0,0.32)';
    }

    return isLightBackground
        ? '0 20px 45px rgba(15,23,42,0.12)'
        : '0 20px 45px rgba(0,0,0,0.16)';
}

function getThemeSpacing(density) {
    return {
        compact: {
            sectionPadding: '2rem 0 1.4rem',
            cardPadding: '1.25rem',
            gridGap: '0.85rem',
            buttonPadding: '0.75rem 1.2rem',
            controlPadding: '0.75rem 0.85rem'
        },
        comfortable: {
            sectionPadding: '3rem 0 2rem',
            cardPadding: '1.75rem',
            gridGap: '1.25rem',
            buttonPadding: '0.95rem 1.6rem',
            controlPadding: '0.95rem 1rem'
        },
        spacious: {
            sectionPadding: '4rem 0 2.75rem',
            cardPadding: '2.25rem',
            gridGap: '1.6rem',
            buttonPadding: '1.1rem 1.9rem',
            controlPadding: '1.1rem 1.15rem'
        }
    }[density];
}

function getPanelColor(background, isLightBackground, texture, role) {
    if (texture === 'solid') {
        const mixAmount = {
            base: isLightBackground ? 0.72 : 0.1,
            alt: isLightBackground ? 0.58 : 0.14,
            secondary: isLightBackground ? 0.42 : 0.18
        }[role];

        return mixHexColors(background, '#ffffff', mixAmount);
    }

    if (texture === 'soft') {
        return {
            base: isLightBackground ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.1)',
            alt: isLightBackground ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.13)',
            secondary: isLightBackground ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.13)'
        }[role];
    }

    return {
        base: isLightBackground ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.05)',
        alt: isLightBackground ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.06)',
        secondary: isLightBackground ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'
    }[role];
}

applyThemeColors();
