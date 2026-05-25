const THEME_PRESETS = {
    ocean: {
        background: '#020617',
        header: '#0f172a',
        primary: '#5b96ff',
        primaryStrong: '#3b82f6',
        accent: '#22c55e',
        danger: '#f43f5e',
        warning: '#facc15',
        texture: 'glass'
    },
    energy: {
        background: '#26120a',
        header: '#3b1d0c',
        primary: '#fb923c',
        primaryStrong: '#f97316',
        accent: '#facc15',
        danger: '#ef4444',
        warning: '#fde047',
        texture: 'soft'
    },
    forest: {
        background: '#071a12',
        header: '#092216',
        primary: '#34d399',
        primaryStrong: '#059669',
        accent: '#a3e635',
        danger: '#fb7185',
        warning: '#fbbf24',
        texture: 'glass'
    },
    berry: {
        background: '#210824',
        header: '#320b38',
        primary: '#e879f9',
        primaryStrong: '#c026d3',
        accent: '#38bdf8',
        danger: '#fb7185',
        warning: '#facc15',
        texture: 'soft'
    },
    sunrise: {
        background: '#fff7ed',
        header: '#ffe4e6',
        primary: '#fb7185',
        primaryStrong: '#f43f5e',
        accent: '#f97316',
        danger: '#dc2626',
        warning: '#ca8a04',
        texture: 'solid'
    },
    mint: {
        background: '#ecfeff',
        header: '#ccfbf1',
        primary: '#14b8a6',
        primaryStrong: '#0f766e',
        accent: '#84cc16',
        danger: '#e11d48',
        warning: '#d97706',
        texture: 'solid'
    }
};

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
    setupTextureButtons();
    setActiveTexture(savedColors.texture);

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
            setActiveTexture(preset.texture);
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

function setupTextureButtons() {
    document.querySelectorAll('.texture-button').forEach(button => {
        button.addEventListener('click', () => {
            setActiveTexture(button.dataset.texture);
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

function setActiveTexture(texture = THEME_DEFAULT_COLORS.texture) {
    document.querySelectorAll('.texture-button').forEach(button => {
        button.classList.toggle('active', button.dataset.texture === texture);
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
    setActiveTexture(THEME_DEFAULT_COLORS.texture);
    resetThemeColors();
    updateThemePreview();
    markMatchingPreset(THEME_DEFAULT_COLORS);
}

function getSelectedTheme() {
    return {
        ...getSelectedColors(),
        texture: document.querySelector('.texture-button.active')?.dataset.texture || THEME_DEFAULT_COLORS.texture
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

        return sameColors && preset.texture === colors.texture;
    });

    document.querySelectorAll('.theme-preset').forEach(button => {
        button.classList.toggle('active', selectedTheme?.[0] === button.dataset.theme);
    });
}

window.addEventListener('DOMContentLoaded', initSettings);
