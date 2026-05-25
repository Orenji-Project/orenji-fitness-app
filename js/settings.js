function initSettings() {
    const primaryInput = document.getElementById('primary-color');
    const primaryStrongInput = document.getElementById('primary-strong-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');
    const saveBtn = document.getElementById('save-colors');
    const resetBtn = document.getElementById('reset-colors');

    // Load saved colors or defaults
    const savedColors = loadThemeColors();
    primaryInput.value = savedColors.primary;
    primaryStrongInput.value = savedColors.primaryStrong;
    accentInput.value = savedColors.accent;
    dangerInput.value = savedColors.danger;
    warningInput.value = savedColors.warning;

    updateColorValues();
    applyThemeColors(savedColors);

    // Event listeners for real-time preview
    primaryInput.addEventListener('input', () => {
        updateColorValues();
        updatePreview();
    });
    primaryStrongInput.addEventListener('input', () => {
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
    const primaryStrongInput = document.getElementById('primary-strong-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');

    document.getElementById('primary-value').textContent = primaryInput.value;
    document.getElementById('primary-strong-value').textContent = primaryStrongInput.value;
    document.getElementById('accent-value').textContent = accentInput.value;
    document.getElementById('danger-value').textContent = dangerInput.value;
    document.getElementById('warning-value').textContent = warningInput.value;
}

function updatePreview() {
    const primaryInput = document.getElementById('primary-color');
    const primaryStrongInput = document.getElementById('primary-strong-color');
    const accentInput = document.getElementById('accent-color');
    const dangerInput = document.getElementById('danger-color');
    const warningInput = document.getElementById('warning-color');

    const primaryPreview = document.querySelector('.primary-preview');
    const accentPreview = document.querySelector('.accent-preview');
    const dangerPreview = document.querySelector('.danger-preview');
    const warningPreview = document.querySelector('.warning-preview');

    if (primaryPreview) {
        primaryPreview.style.background = `linear-gradient(135deg, ${primaryInput.value}, ${primaryStrongInput.value})`;
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

    applyThemeColors(getSelectedColors());
}

function handleSaveColors() {
    const colors = getSelectedColors();

    saveThemeColors(colors);
    applyThemeColors(colors);

    // Show success feedback
    const saveBtn = document.getElementById('save-colors');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Guardado com sucesso!';
    setTimeout(() => {
        saveBtn.textContent = originalText;
    }, 2000);
}

function handleResetColors() {
    document.getElementById('primary-color').value = THEME_DEFAULT_COLORS.primary;
    document.getElementById('primary-strong-color').value = THEME_DEFAULT_COLORS.primaryStrong;
    document.getElementById('accent-color').value = THEME_DEFAULT_COLORS.accent;
    document.getElementById('danger-color').value = THEME_DEFAULT_COLORS.danger;
    document.getElementById('warning-color').value = THEME_DEFAULT_COLORS.warning;

    resetThemeColors();
    updateColorValues();
    updatePreview();
}

function getSelectedColors() {
    return {
        primary: document.getElementById('primary-color').value,
        primaryStrong: document.getElementById('primary-strong-color').value,
        accent: document.getElementById('accent-color').value,
        danger: document.getElementById('danger-color').value,
        warning: document.getElementById('warning-color').value
    };
}

window.addEventListener('DOMContentLoaded', initSettings);
