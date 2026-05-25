const THEME_DEFAULT_COLORS = {
    background: '#020617',
    header: '#0f172a',
    primary: '#5b96ff',
    primaryStrong: '#3b82f6',
    accent: '#22c55e',
    danger: '#f43f5e',
    warning: '#facc15',
    texture: 'glass'
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
    const isLightBackground = getRelativeLuminance(theme.background) > 0.46;
    const isLightHeader = getRelativeLuminance(theme.header) > 0.46;
    const backgroundEnd = mixHexColors(theme.background, isLightBackground ? '#ffffff' : '#000000', 0.18);
    const text = isLightBackground ? '#111827' : '#e2e8f0';
    const textMuted = isLightBackground ? '#475569' : '#94a3b8';
    const texture = ['glass', 'soft', 'solid'].includes(theme.texture) ? theme.texture : 'glass';
    const panelBg = getPanelColor(theme.background, isLightBackground, texture, 'base');
    const panelAltBg = getPanelColor(theme.background, isLightBackground, texture, 'alt');
    const secondaryBg = getPanelColor(theme.background, isLightBackground, texture, 'secondary');
    const border = isLightBackground ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.08)';
    const borderStrong = isLightBackground ? 'rgba(15,23,42,0.18)' : 'rgba(255,255,255,0.12)';
    const headerBg = texture === 'solid' ? theme.header : hexToRgba(theme.header, texture === 'soft' ? 0.88 : 0.72);
    const headerText = isLightHeader ? '#111827' : '#f8fafc';
    const headerTextMuted = isLightHeader ? '#475569' : '#cbd5e1';
    const shadow = isLightBackground ? '0 20px 45px rgba(15,23,42,0.12)' : '0 20px 45px rgba(0,0,0,0.16)';

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
