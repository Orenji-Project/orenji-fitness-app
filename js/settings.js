const THEME_PRESETS = {
    orenji: {
        background: '#f7f4e9',
        header: '#fff8e8',
        primary: '#f7941d',
        primaryStrong: '#e56f13',
        accent: '#6fa24a',
        danger: '#d9483b',
        warning: '#d99a19',
        texture: 'solid',
        shape: 'soft',
        shadow: 'soft',
        density: 'comfortable'
    },
    orenjiDark: {
        background: '#15110c',
        header: '#20170f',
        primary: '#ff9f2f',
        primaryStrong: '#f97316',
        accent: '#8bbf5a',
        danger: '#f87171',
        warning: '#facc15',
        texture: 'soft',
        shape: 'rounded',
        shadow: 'deep',
        density: 'comfortable'
    },
    ocean: {
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
    },
    energy: {
        background: '#26120a',
        header: '#3b1d0c',
        primary: '#fb923c',
        primaryStrong: '#f97316',
        accent: '#facc15',
        danger: '#ef4444',
        warning: '#fde047',
        texture: 'soft',
        shape: 'rounded',
        shadow: 'deep',
        density: 'comfortable'
    },
    forest: {
        background: '#071a12',
        header: '#092216',
        primary: '#34d399',
        primaryStrong: '#059669',
        accent: '#a3e635',
        danger: '#fb7185',
        warning: '#fbbf24',
        texture: 'glass',
        shape: 'rounded',
        shadow: 'soft',
        density: 'spacious'
    },
    berry: {
        background: '#210824',
        header: '#320b38',
        primary: '#e879f9',
        primaryStrong: '#c026d3',
        accent: '#38bdf8',
        danger: '#fb7185',
        warning: '#facc15',
        texture: 'soft',
        shape: 'rounded',
        shadow: 'deep',
        density: 'comfortable'
    },
    sunrise: {
        background: '#fff7ed',
        header: '#ffe4e6',
        primary: '#fb7185',
        primaryStrong: '#f43f5e',
        accent: '#f97316',
        danger: '#dc2626',
        warning: '#ca8a04',
        texture: 'solid',
        shape: 'soft',
        shadow: 'soft',
        density: 'spacious'
    },
    mint: {
        background: '#ecfeff',
        header: '#ccfbf1',
        primary: '#14b8a6',
        primaryStrong: '#0f766e',
        accent: '#84cc16',
        danger: '#e11d48',
        warning: '#d97706',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
        density: 'comfortable'
    },
    graphite: {
        background: '#101214',
        header: '#181b1f',
        primary: '#f2f4f8',
        primaryStrong: '#cbd5e1',
        accent: '#f7941d',
        danger: '#ef4444',
        warning: '#f59e0b',
        texture: 'solid',
        shape: 'square',
        shadow: 'none',
        density: 'compact'
    },
    citrus: {
        background: '#14210f',
        header: '#203417',
        primary: '#d9f99d',
        primaryStrong: '#84cc16',
        accent: '#fb923c',
        danger: '#ef4444',
        warning: '#facc15',
        texture: 'glass',
        shape: 'rounded',
        shadow: 'deep',
        density: 'spacious'
    },
    rose: {
        background: '#fff1f2',
        header: '#ffe4e6',
        primary: '#fb7185',
        primaryStrong: '#e11d48',
        accent: '#f97316',
        danger: '#be123c',
        warning: '#d97706',
        texture: 'solid',
        shape: 'rounded',
        shadow: 'soft',
        density: 'comfortable'
    },
    slate: {
        background: '#e2e8f0',
        header: '#cbd5e1',
        primary: '#334155',
        primaryStrong: '#0f172a',
        accent: '#0f766e',
        danger: '#dc2626',
        warning: '#ca8a04',
        texture: 'soft',
        shape: 'soft',
        shadow: 'soft',
        density: 'compact'
    }
};

const APPEARANCE_FIELDS = ['texture', 'shape', 'shadow', 'density'];

const COLOR_FIELDS = [
    ['background', 'background-color', 'background-value'],
    ['header', 'header-color', 'header-value'],
    ['primary', 'primary-color', 'primary-value'],
    ['primaryStrong', 'primary-strong-color', 'primary-strong-value'],
    ['accent', 'accent-color', 'accent-value'],
    ['danger', 'danger-color', 'danger-value'],
    ['warning', 'warning-color', 'warning-value']
];

function initSettings() {
    const savedColors = loadThemeColors();

    setColorInputs(savedColors);
    updateThemePreview();
    markMatchingPreset(savedColors);
    setupModeToggle();
    setupPresetButtons();
    setupAdvancedInputs();
    setupAppearanceButtons();
    setActiveAppearance(savedColors);

    document.getElementById('save-colors').addEventListener('click', handleSaveColors);
    document.getElementById('reset-colors').addEventListener('click', handleResetColors);
}

function setupModeToggle() {
    document.querySelectorAll('.mode-button').forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;

            document.querySelectorAll('.mode-button').forEach(item => {
                item.classList.toggle('active', item === button);
            });

            document.querySelectorAll('.settings-panel').forEach(panel => {
                const isActive = panel.id === `${mode}-panel`;
                panel.classList.toggle('active', isActive);
                panel.hidden = !isActive;
            });

            document.getElementById('color-preview').hidden = mode === 'basic';
        });
    });
}

function setupPresetButtons() {
    document.querySelectorAll('.theme-preset').forEach(button => {
        button.addEventListener('click', () => {
            const preset = THEME_PRESETS[button.dataset.theme];

            if (!preset) {
                return;
            }

            setColorInputs(preset);
            setActiveAppearance(preset);
            updateThemePreview();
            markMatchingPreset(preset);
        });
    });
}

function setupAdvancedInputs() {
    COLOR_FIELDS.forEach(([, inputId]) => {
        document.getElementById(inputId).addEventListener('input', () => {
            updateThemePreview();
            markMatchingPreset(getSelectedTheme());
        });
    });
}

function setupAppearanceButtons() {
    document.querySelectorAll('.appearance-button').forEach(button => {
        button.addEventListener('click', () => {
            setActiveAppearance({
                ...getSelectedTheme(),
                [button.dataset.option]: button.dataset.value
            });
            updateThemePreview();
            markMatchingPreset(getSelectedTheme());
        });
    });
}

function setColorInputs(colors) {
    const theme = {
        ...THEME_DEFAULT_COLORS,
        ...colors
    };

    COLOR_FIELDS.forEach(([key, inputId]) => {
        document.getElementById(inputId).value = theme[key];
    });
}

function setActiveAppearance(theme = THEME_DEFAULT_COLORS) {
    APPEARANCE_FIELDS.forEach(field => {
        const value = theme[field] || THEME_DEFAULT_COLORS[field];
        document.querySelectorAll(`.appearance-button[data-option="${field}"]`).forEach(button => {
            button.classList.toggle('active', button.dataset.value === value);
        });
    });
}

function updateColorValues() {
    COLOR_FIELDS.forEach(([, inputId, valueId]) => {
        document.getElementById(valueId).textContent = document.getElementById(inputId).value;
    });
}

function updateThemePreview() {
    const colors = getSelectedTheme();

    updateColorValues();
    applyThemeColors(colors);
}

function handleSaveColors() {
    const colors = getSelectedTheme();

    saveThemeColors(colors);
    applyThemeColors(colors);

    const saveBtn = document.getElementById('save-colors');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Guardado com sucesso!';
    setTimeout(() => {
        saveBtn.textContent = originalText;
    }, 2000);
}

function handleResetColors() {
    setColorInputs(THEME_DEFAULT_COLORS);
    setActiveAppearance(THEME_DEFAULT_COLORS);
    resetThemeColors();
    updateThemePreview();
    markMatchingPreset(THEME_DEFAULT_COLORS);
}

function getSelectedTheme() {
    const appearance = APPEARANCE_FIELDS.reduce((theme, field) => {
        theme[field] = document.querySelector(`.appearance-button.active[data-option="${field}"]`)?.dataset.value || THEME_DEFAULT_COLORS[field];
        return theme;
    }, {});

    return {
        ...getSelectedColors(),
        ...appearance
    };
}

function getSelectedColors() {
    return COLOR_FIELDS.reduce((colors, [key, inputId]) => {
        colors[key] = document.getElementById(inputId).value;
        return colors;
    }, {});
}

function markMatchingPreset(colors) {
    const selectedTheme = Object.entries(THEME_PRESETS).find(([, preset]) => {
        const sameColors = COLOR_FIELDS.every(([key]) => {
            return preset[key].toLowerCase() === colors[key].toLowerCase();
        });

        const sameAppearance = APPEARANCE_FIELDS.every(field => {
            return preset[field] === colors[field];
        });

        return sameColors && sameAppearance;
    });

    document.querySelectorAll('.theme-preset').forEach(button => {
        button.classList.toggle('active', selectedTheme?.[0] === button.dataset.theme);
    });
}

window.addEventListener('DOMContentLoaded', initSettings);
