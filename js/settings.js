const DEFAULT_COLORS = {
    primary: '#5b96ff',
    accent: '#22c55e',
    danger: '#f43f5e',
    warning: '#facc15'
};

const STORAGE_KEY = 'fitnessapp.colors';

function initSettings() {
    const primaryInput = document.getElementById('primary-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');
    const saveBtn = document.getElementById('save-colors');
    const resetBtn = document.getElementById('reset-colors');

    // Load saved colors or defaults
    const savedColors = loadColors();
    primaryInput.value = savedColors.primary;
    accentInput.value = savedColors.accent;
    dangerInput.value = savedColors.danger;
    warningInput.value = savedColors.warning;

    updateColorValues();
    applyColors(savedColors);

    // Event listeners for real-time preview
    primaryInput.addEventListener('input', () => {
        updateColorValues();
        updatePreview();
    });
    accentInput.addEventListener('input', () => {
        updateColorValues();
        updatePreview();
    });
    dangerInput.addEventListener('input', () => {
        updateColorValues();
        updatePreview();
    });
    warningInput.addEventListener('input', () => {
        updateColorValues();
        updatePreview();
    });

    saveBtn.addEventListener('click', handleSaveColors);
    resetBtn.addEventListener('click', handleResetColors);
}

function updateColorValues() {
    const primaryInput = document.getElementById('primary-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');

    document.getElementById('primary-value').textContent = primaryInput.value;
    document.getElementById('accent-value').textContent = accentInput.value;
    document.getElementById('danger-value').textContent = dangerInput.value;
    document.getElementById('warning-value').textContent = warningInput.value;
}

function updatePreview() {
    const primaryInput = document.getElementById('primary-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');

    const primaryPreview = document.querySelector('.primary-preview');
    const accentPreview = document.querySelector('.accent-preview');
    const dangerPreview = document.querySelector('.danger-preview');
    const warningPreview = document.querySelector('.warning-preview');

    if (primaryPreview) {
        primaryPreview.style.background = `linear-gradient(135deg, ${primaryInput.value}, ${primaryInput.value})`;
    }
    if (accentPreview) {
        accentPreview.style.background = accentInput.value;
    }
    if (dangerPreview) {
        dangerPreview.style.background = dangerInput.value;
    }
    if (warningPreview) {
        warningPreview.style.background = warningInput.value;
    }
}

function handleSaveColors() {
    const primaryInput = document.getElementById('primary-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');

    const colors = {
        primary: primaryInput.value,
        accent: accentInput.value,
        danger: dangerInput.value,
        warning: warningInput.value
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
    applyColors(colors);

    // Show success feedback
    const saveBtn = document.getElementById('save-colors');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Guardado com sucesso!';
    setTimeout(() => {
        saveBtn.textContent = originalText;
    }, 2000);
}

function handleResetColors() {
    document.getElementById('primary-color').value = DEFAULT_COLORS.primary;
    document.getElementById('accent-color').value = DEFAULT_COLORS.accent;
    document.getElementById('danger-color').value = DEFAULT_COLORS.danger;
    document.getElementById('warning-color').value = DEFAULT_COLORS.warning;

    localStorage.removeItem(STORAGE_KEY);
    updateColorValues();
    updatePreview();
    applyColors(DEFAULT_COLORS);
}

function loadColors() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return DEFAULT_COLORS;
        }
    }
    return DEFAULT_COLORS;
}

function applyColors(colors) {
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--accent', colors.accent);
}

window.addEventListener('DOMContentLoaded', initSettings);
