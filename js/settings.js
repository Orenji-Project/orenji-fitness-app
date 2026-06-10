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
    orenjiSolid: {
        background: '#f7f4e9',
        header: '#f7941d',
        primary: '#f7941d',
        primaryStrong: '#d9680f',
        accent: '#6fa24a',
        danger: '#d9483b',
        warning: '#d99a19',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
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
    oceanSolid: {
        background: '#eaf2ff',
        header: '#2563eb',
        primary: '#2563eb',
        primaryStrong: '#1d4ed8',
        accent: '#0f766e',
        danger: '#dc2626',
        warning: '#ca8a04',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
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
    energySolid: {
        background: '#fff4e6',
        header: '#f97316',
        primary: '#f97316',
        primaryStrong: '#ea580c',
        accent: '#ca8a04',
        danger: '#dc2626',
        warning: '#f59e0b',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
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
    forestSolid: {
        background: '#eefcf4',
        header: '#059669',
        primary: '#059669',
        primaryStrong: '#047857',
        accent: '#65a30d',
        danger: '#dc2626',
        warning: '#ca8a04',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
        density: 'comfortable'
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
    berrySolid: {
        background: '#fdf2ff',
        header: '#c026d3',
        primary: '#c026d3',
        primaryStrong: '#a21caf',
        accent: '#0284c7',
        danger: '#e11d48',
        warning: '#ca8a04',
        texture: 'solid',
        shape: 'soft',
        shadow: 'none',
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

const THEME_OPTIONS = [
    { id: 'orenji', label: 'Orenji', color: '#f7941d', style: 'glow' },
    { id: 'orenjiSolid', label: 'Orenji sólido', color: '#f7941d', style: 'solid' },
    { id: 'orenjiDark', label: 'Orenji Dark', color: '#15110c', style: 'glow' },
    { id: 'ocean', label: 'Oceano', color: '#2563eb', style: 'glow' },
    { id: 'oceanSolid', label: 'Oceano sólido', color: '#2563eb', style: 'solid' },
    { id: 'energy', label: 'Energia', color: '#fb923c', style: 'glow' },
    { id: 'energySolid', label: 'Energia sólida', color: '#f97316', style: 'solid' },
    { id: 'forest', label: 'Floresta', color: '#059669', style: 'glow' },
    { id: 'forestSolid', label: 'Floresta sólida', color: '#22c55e', style: 'solid' },
    { id: 'berry', label: 'Berry', color: '#c026d3', style: 'glow' },
    { id: 'berrySolid', label: 'Berry sólido', color: '#e879f9', style: 'solid' },
    { id: 'sunrise', label: 'Amanhecer', color: '#fb7185', style: 'solid' },
    { id: 'mint', label: 'Menta', color: '#14b8a6', style: 'solid' },
    { id: 'graphite', label: 'Graphite', color: '#101214', style: 'solid' },
    { id: 'citrus', label: 'Citrus', color: '#84cc16', style: 'glow' },
    { id: 'rose', label: 'Rose', color: '#e11d48', style: 'solid' },
    { id: 'slate', label: 'Slate', color: '#64748b', style: 'solid' }
];

const COLOR_FIELDS = [
    ['background', 'background-color', 'background-value'],
    ['header', 'header-color', 'header-value'],
    ['primary', 'primary-color', 'primary-value'],
    ['primaryStrong', 'primary-strong-color', 'primary-strong-value'],
    ['accent', 'accent-color', 'accent-value'],
    ['danger', 'danger-color', 'danger-value'],
    ['warning', 'warning-color', 'warning-value']
];

const SETTINGS_PREFERENCES_KEY = 'fitnessapp.preferences';
const SETTINGS_JSON_STORAGE_KEYS = [
    'fitnessapp.workouts',
    'fitnessapp.trainingHistory',
    'fitnessapp.trainingSession',
    'fitnessapp.colors',
    'fitnessapp.preferences',
    'orenji.theme'
];
const SETTINGS_TEXT_STORAGE_KEYS = ['orenji.theme.sync'];

function initSettings() {
    const savedColors = loadThemeColors();

    setColorInputs(savedColors);
    setupModeToggle();
    setupPresetButtons();
    setupAdvancedInputs();
    setupAppearanceButtons();
    setupThemeSync();
    setupPreferences();
    setupDataActions();
    setActiveAppearance(savedColors);
    updateThemePreview();
    markMatchingPreset(savedColors);
    updateStorageStatus();

    document.getElementById('save-colors').addEventListener('click', handleSaveColors);
    document.getElementById('reset-colors').addEventListener('click', handleResetColors);
}

function renderThemeOptions() {
    const grid = document.querySelector('.color-option-grid');

    if (!grid || grid.children.length) {
        return;
    }

    const groups = [
        ['glow', 'Brilhante'],
        ['solid', 'Sólida']
    ];

    groups.forEach(([style, label]) => {
        const group = document.createElement('div');
        group.className = 'color-option-group';

        const heading = document.createElement('span');
        heading.className = 'color-option-group__label';
        heading.textContent = label;

        const optionsRow = document.createElement('div');
        optionsRow.className = 'color-option-row';

        THEME_OPTIONS
            .filter(option => option.style === style)
            .forEach(option => {
                if (!THEME_PRESETS[option.id]) {
                    return;
                }

                const button = document.createElement('button');
                button.type = 'button';
                button.className = `color-option color-option--${option.style}`;
                button.dataset.theme = option.id;
                button.style.setProperty('--option-color', option.color);
                button.setAttribute('aria-label', `Tema ${option.label}`);
                button.setAttribute('aria-pressed', 'false');
                button.title = option.label;

                const logo = document.createElement('img');
                logo.className = 'color-option__logo color-option__logo--outline';
                logo.src = 'assets/logo_outline.png';
                logo.alt = '';

                button.appendChild(logo);
                optionsRow.appendChild(button);
            });

        group.append(heading, optionsRow);
        grid.appendChild(group);
    });
}

function setupThemeSync() {
    const syncInput = document.getElementById('theme-sync');

    if (!syncInput) {
        return;
    }

    syncInput.checked = isThemeSyncEnabled();
    syncInput.addEventListener('change', () => {
        setThemeSyncEnabled(syncInput.checked);
        const savedColors = loadThemeColors();
        setColorInputs(savedColors);
        setActiveAppearance(savedColors);
        updateThemePreview();
        markMatchingPreset(savedColors);
    });
}

function setupPreferences() {
    const nameInput = document.getElementById('profile-name');
    const preferredHomeSelect = document.getElementById('preferred-home');
    const reduceMotionInput = document.getElementById('reduce-motion');
    const saveButton = document.getElementById('save-preferences');
    const preferences = getSettingsPreferences();

    if (nameInput) {
        nameInput.value = preferences.displayName || '';
    }

    if (preferredHomeSelect) {
        preferredHomeSelect.value = preferences.preferredHome || 'treinos.html';
    }

    if (reduceMotionInput) {
        reduceMotionInput.checked = Boolean(preferences.reduceMotion);
        reduceMotionInput.addEventListener('change', () => {
            document.documentElement.classList.toggle('reduce-motion', reduceMotionInput.checked);
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', handleSavePreferences);
    }
}

function setupDataActions() {
    document.getElementById('export-data')?.addEventListener('click', handleExportData);
    document.getElementById('import-data-file')?.addEventListener('change', handleImportData);
    document.getElementById('clear-app-data')?.addEventListener('click', handleClearAppData);
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
        });
    });
}

function setupPresetButtons() {
    // Os seletores de cor são gerados aqui para manter HTML/CSS reutilizáveis sem alterar a lógica de presets.
    renderThemeOptions();

    document.querySelectorAll('.color-option').forEach(button => {
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
    updateStorageStatus();

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
    updateStorageStatus();
}

function handleSavePreferences() {
    const nameInput = document.getElementById('profile-name');
    const preferredHomeSelect = document.getElementById('preferred-home');
    const reduceMotionInput = document.getElementById('reduce-motion');
    const displayName = nameInput?.value.trim() || 'Camila';
    const preferredHome = preferredHomeSelect?.value || 'treinos.html';
    const reduceMotion = Boolean(reduceMotionInput?.checked);
    const preferences = { displayName, preferredHome, reduceMotion };
    const saveButton = document.getElementById('save-preferences');
    const originalText = saveButton?.textContent;

    if (typeof saveFitnessPreferences === 'function') {
        saveFitnessPreferences(preferences);
    } else {
        localStorage.setItem(SETTINGS_PREFERENCES_KEY, JSON.stringify({
            ...getSettingsPreferences(),
            ...preferences
        }));
    }

    if (typeof applyFitnessPreferences === 'function') {
        applyFitnessPreferences();
    }

    updateStorageStatus();
    showDataMessage('Preferências guardadas.', 'success');

    if (saveButton && originalText) {
        saveButton.textContent = 'Preferências guardadas!';
        setTimeout(() => {
            saveButton.textContent = originalText;
        }, 1800);
    }
}

function handleExportData() {
    const exportData = {
        app: 'Orenji Fitness',
        version: 1,
        exportedAt: new Date().toISOString(),
        data: getExportableStorageData()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `orenji-fitness-dados-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showDataMessage('Dados exportados.', 'success');
}

function handleImportData(event) {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
        try {
            const parsed = JSON.parse(String(reader.result || ''));
            const storageData = validateImportedStorage(parsed);

            Object.entries(storageData).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });

            refreshSettingsFromStorage();
            showDataMessage('Dados importados com sucesso.', 'success');
        } catch (error) {
            showDataMessage(error.message || 'Não foi possível importar este ficheiro.', 'error');
        } finally {
            input.value = '';
        }
    });

    reader.addEventListener('error', () => {
        input.value = '';
        showDataMessage('Não foi possível ler o ficheiro.', 'error');
    });

    reader.readAsText(file);
}

function handleClearAppData() {
    const confirmed = window.confirm('Queres mesmo limpar os dados locais do Orenji Fitness neste navegador?');

    if (!confirmed) {
        return;
    }

    getManagedStorageKeys().forEach(key => localStorage.removeItem(key));
    resetThemeColors();
    refreshSettingsFromStorage();
    showDataMessage('Dados locais limpos.', 'success');
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

    document.querySelectorAll('.color-option').forEach(button => {
        const isActive = selectedTheme?.[0] === button.dataset.theme;

        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function getSettingsPreferences() {
    if (typeof loadFitnessPreferences === 'function') {
        return loadFitnessPreferences();
    }

    try {
        return {
            displayName: 'Camila',
            preferredHome: 'treinos.html',
            reduceMotion: false,
            ...JSON.parse(localStorage.getItem(SETTINGS_PREFERENCES_KEY) || '{}')
        };
    } catch (error) {
        return {
            displayName: 'Camila',
            preferredHome: 'treinos.html',
            reduceMotion: false
        };
    }
}

function getManagedStorageKeys() {
    const keys = new Set([
        ...SETTINGS_JSON_STORAGE_KEYS,
        ...SETTINGS_TEXT_STORAGE_KEYS
    ]);

    if (typeof getThemeStorageKey === 'function') {
        keys.add(getThemeStorageKey());
    }

    if (typeof getThemeAppId === 'function') {
        keys.add(`orenji.theme.app.${getThemeAppId()}`);
    }

    return [...keys];
}

function getExportableStorageData() {
    return getManagedStorageKeys().reduce((data, key) => {
        const value = localStorage.getItem(key);

        if (value !== null) {
            data[key] = value;
        }

        return data;
    }, {});
}

function validateImportedStorage(parsed) {
    if (!parsed || parsed.app !== 'Orenji Fitness' || parsed.version !== 1 || !parsed.data || typeof parsed.data !== 'object') {
        throw new Error('Este ficheiro não parece ser uma exportação válida do Orenji Fitness.');
    }

    const allowedKeys = new Set(getManagedStorageKeys());
    const validated = {};

    Object.entries(parsed.data).forEach(([key, value]) => {
        if (!allowedKeys.has(key)) {
            return;
        }

        if (typeof value !== 'string') {
            throw new Error(`O valor de ${key} não é válido.`);
        }

        if (SETTINGS_JSON_STORAGE_KEYS.includes(key) || key.startsWith('orenji.theme.app.')) {
            JSON.parse(value);
        }

        if (SETTINGS_TEXT_STORAGE_KEYS.includes(key) && !['true', 'false'].includes(value)) {
            throw new Error(`O valor de ${key} não é válido.`);
        }

        validated[key] = value;
    });

    if (!Object.keys(validated).length) {
        throw new Error('O ficheiro não contém dados reconhecidos para importar.');
    }

    return validated;
}

function refreshSettingsFromStorage() {
    const savedColors = loadThemeColors();
    const preferences = getSettingsPreferences();
    const nameInput = document.getElementById('profile-name');
    const preferredHomeSelect = document.getElementById('preferred-home');
    const reduceMotionInput = document.getElementById('reduce-motion');
    const syncInput = document.getElementById('theme-sync');

    setColorInputs(savedColors);
    setActiveAppearance(savedColors);
    updateThemePreview();
    markMatchingPreset(savedColors);

    if (nameInput) {
        nameInput.value = preferences.displayName || '';
    }

    if (preferredHomeSelect) {
        preferredHomeSelect.value = preferences.preferredHome || 'treinos.html';
    }

    if (reduceMotionInput) {
        reduceMotionInput.checked = Boolean(preferences.reduceMotion);
    }

    if (syncInput && typeof isThemeSyncEnabled === 'function') {
        syncInput.checked = isThemeSyncEnabled();
    }

    if (typeof applyFitnessPreferences === 'function') {
        applyFitnessPreferences();
    }

    updateStorageStatus();
}

function updateStorageStatus() {
    const status = document.getElementById('storage-status');

    if (!status) {
        return;
    }

    const storedItems = getManagedStorageKeys()
        .map(key => [key, localStorage.getItem(key)])
        .filter(([, value]) => value !== null);
    const byteSize = storedItems.reduce((size, [key, value]) => {
        return size + new Blob([key, value]).size;
    }, 0);
    const itemLabel = storedItems.length === 1 ? 'bloco' : 'blocos';

    status.textContent = storedItems.length
        ? `${storedItems.length} ${itemLabel} · ${formatBytes(byteSize)}`
        : 'Sem dados locais';
}

function showDataMessage(message, type) {
    const messageElement = document.getElementById('data-message');

    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.classList.toggle('is-success', type === 'success');
    messageElement.classList.toggle('is-error', type === 'error');
}

function formatBytes(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    return `${(bytes / 1024).toFixed(1)} KB`;
}

window.addEventListener('DOMContentLoaded', initSettings);
