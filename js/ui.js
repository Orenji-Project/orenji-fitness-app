function initWorkoutApp() {
    const workoutListElement = document.getElementById('workout-list');

    if (workoutListElement) {
        renderWorkoutList();
        const form = document.getElementById('workout-form');
        if (form) {
            form.addEventListener('submit', handleWorkoutSubmit);
        }
    }

    if (document.getElementById('summary-cards')) {
        renderSummary();
    }

    if (document.getElementById('schedule-roller')) {
        renderHomePage();
    }

    if (document.getElementById('training-selector-list')) {
        renderTrainingSelector();
    }
}

function renderHomePage() {
    const nameElement = document.getElementById('user-name');
    const loader = document.getElementById('schedule-roller');
    if (nameElement) {
        nameElement.textContent = typeof getFitnessUserName === 'function'
            ? getFitnessUserName()
            : userProfile.displayName || 'amiga';
    }

    if (loader) {
        loader.innerHTML = '';
        weeklySchedule.forEach(item => {
            const card = document.createElement('article');
            const iconType = getTrainingIconType(item.trainingType);
            const visual = document.createElement('span');
            const title = document.createElement('strong');
            const trainingType = document.createElement('p');

            card.className = 'day-card';
            visual.className = 'day-card-visual';
            visual.setAttribute('aria-label', item.trainingType);
            visual.setAttribute('role', 'img');
            visual.appendChild(createTrainingIcon(iconType));

            title.textContent = item.dayName;
            trainingType.textContent = item.trainingType;

            card.append(visual, title, trainingType);
            loader.appendChild(card);
        });
    }

    renderConditioningWeek();
}

function renderTrainingSelector() {
    const list = document.getElementById('training-selector-list');
    const todayCode = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][new Date().getDay()];
    const todayTraining = weeklySchedule.find(item => item.dayCode === todayCode)?.trainingType;
    const selectorSection = document.querySelector('.training-selector-section');
    const workoutView = document.getElementById('training-workout-view');
    const pageHeader = document.querySelector('.page-header');

    if (!list) {
        return;
    }

    if (selectorSection) {
        selectorSection.classList.remove('is-hidden');
    }
    if (pageHeader) {
        pageHeader.classList.remove('is-hidden');
    }
    if (workoutView) {
        workoutView.classList.remove('is-active');
        workoutView.setAttribute('aria-hidden', 'true');
    }

    list.innerHTML = '';

    trainingCatalog.forEach(item => {
        const isTodayTraining = item.name === todayTraining;
        const card = document.createElement('article');
        const visual = document.createElement('span');
        const content = document.createElement('div');
        const name = document.createElement('strong');
        const description = document.createElement('p');
        const details = document.createElement('div');
        const startButton = document.createElement('button');

        card.className = `training-selector-card${isTodayTraining ? ' has-today-badge' : ''}`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');
        card.addEventListener('click', event => {
            if (event.target.closest('.training-start-button')) {
                return;
            }
            selectTrainingCard(list, card);
        });
        card.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }
            event.preventDefault();
            selectTrainingCard(list, card);
        });

        startButton.type = 'button';
        startButton.className = 'button training-start-button';
        startButton.textContent = 'Iniciar';
        startButton.tabIndex = -1;
        startButton.addEventListener('click', () => {
            renderWorkoutDetail(item.id);
        });

        visual.className = 'day-card-visual training-selector-visual';
        visual.setAttribute('aria-label', item.name);
        visual.setAttribute('role', 'img');
        visual.appendChild(createTrainingIcon(getTrainingIconType(item.name)));

        name.textContent = item.name;
        description.textContent = item.description;
        details.className = 'training-selector-details';
        details.setAttribute('aria-hidden', 'true');
        details.appendChild(startButton);

        if (isTodayTraining) {
            const badge = document.createElement('span');
            badge.className = 'training-today-badge';
            badge.textContent = 'Treino de hoje';
            card.appendChild(badge);
        }

        content.append(name, description);
        card.append(visual, content, details);
        list.appendChild(card);
    });
}

function selectTrainingCard(list, card) {
    list.querySelectorAll('.training-selector-card').forEach(option => {
        const details = option.querySelector('.training-selector-details');
        option.classList.remove('is-selected');
        option.setAttribute('aria-pressed', 'false');
        if (details) {
            details.setAttribute('aria-hidden', 'true');
            details.querySelector('.training-start-button')?.setAttribute('tabindex', '-1');
        }
    });

    const selectedDetails = card.querySelector('.training-selector-details');
    card.classList.add('is-selected');
    card.setAttribute('aria-pressed', 'true');
    if (selectedDetails) {
        selectedDetails.setAttribute('aria-hidden', 'false');
        selectedDetails.querySelector('.training-start-button')?.removeAttribute('tabindex');
    }
}

function getTrainingSession() {
    try {
        return JSON.parse(localStorage.getItem('fitnessapp.trainingSession')) || {};
    } catch (error) {
        console.warn('Falha ao carregar sessão de treino', error);
        return {};
    }
}

function saveTrainingSession(session) {
    try {
        localStorage.setItem('fitnessapp.trainingSession', JSON.stringify(session));
    } catch (error) {
        console.warn('Falha ao guardar sessão de treino', error);
    }
}

function getExerciseProgress(trainingId, exerciseId) {
    const session = getTrainingSession();
    const progress = session[trainingId]?.[exerciseId];

    if (typeof progress === 'number') {
        return { sets: [] };
    }

    if (Array.isArray(progress?.sets)) {
        return {
            sets: progress.sets.map(item => ({
                reps: Math.max(0, Number(item?.reps) || 0),
                weightKg: Math.max(0, Number(item?.weightKg ?? item?.kg) || 0),
                durationSeconds: Math.max(0, Number(item?.durationSeconds ?? item?.seconds) || 0)
            }))
        };
    }

    const legacySetCount = Math.max(0, Number(progress?.sets) || 0);
    return {
        sets: Array.from({ length: legacySetCount }, () => ({
            reps: Math.max(0, Number(progress?.reps) || 0),
            weightKg: Math.max(0, Number(progress?.weightKg ?? progress?.kg) || 0),
            durationSeconds: Math.max(0, Number(progress?.durationSeconds ?? progress?.seconds) || 0)
        }))
    };
}

function saveExerciseProgress(trainingId, exerciseId, progress) {
    const session = getTrainingSession();
    const trainingSession = session[trainingId] || {};

    trainingSession[exerciseId] = progress;
    session[trainingId] = trainingSession;
    saveTrainingSession(session);
}

function renderWorkoutDetail(trainingId) {
    const training = trainingCatalog.find(item => item.id === trainingId);
    const selectorSection = document.querySelector('.training-selector-section');
    const workoutView = document.getElementById('training-workout-view');
    const pageHeader = document.querySelector('.page-header');

    if (!training || !workoutView) {
        return;
    }

    if (selectorSection) {
        selectorSection.classList.add('is-hidden');
    }
    if (pageHeader) {
        pageHeader.classList.add('is-hidden');
    }

    workoutView.innerHTML = '';
    workoutView.classList.add('is-active');
    workoutView.setAttribute('aria-hidden', 'false');

    const header = document.createElement('div');
    const visual = document.createElement('span');
    const copy = document.createElement('div');
    const eyebrow = document.createElement('span');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const actions = document.createElement('div');
    const backButton = document.createElement('button');
    const finishButton = document.createElement('button');
    const exerciseGrid = document.createElement('div');

    header.className = 'training-workout-header';
    visual.className = 'day-card-visual training-workout-visual';
    visual.setAttribute('aria-label', training.name);
    visual.setAttribute('role', 'img');
    visual.appendChild(createTrainingIcon(getTrainingIconType(training.name)));
    copy.className = 'training-workout-copy';
    eyebrow.className = 'meter-title';
    eyebrow.textContent = 'Treino selecionado';
    title.textContent = training.name;
    description.textContent = training.description;
    backButton.className = 'button button-secondary training-back-button';
    backButton.type = 'button';
    backButton.textContent = 'Voltar';
    backButton.addEventListener('click', returnToTrainingSelector);
    finishButton.className = 'button training-finish-button';
    finishButton.type = 'button';
    finishButton.textContent = 'Terminar treino';
    finishButton.addEventListener('click', () => renderWorkoutCompletion(training));
    actions.className = 'training-workout-actions';
    exerciseGrid.className = 'exercise-counter-grid';

    copy.append(eyebrow, title, description);
    actions.append(backButton, finishButton);
    header.append(visual, copy, actions);
    workoutView.append(header, exerciseGrid);

    renderExerciseCounters(training, exerciseGrid);
    workoutView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderExerciseCounters(training, targetElement) {
    targetElement.innerHTML = '';

    training.exercises.forEach(exercise => {
        const card = document.createElement('article');
        const media = createExerciseMedia(exercise);
        const info = document.createElement('div');
        const name = document.createElement('strong');
        const target = document.createElement('span');
        const notes = document.createElement('p');
        const summary = document.createElement('div');
        const setsLabel = document.createElement('span');
        const addSetButton = document.createElement('button');
        const helpButton = document.createElement('button');
        const extension = document.createElement('div');
        const progress = getExerciseProgress(training.id, exercise.id);

        card.className = 'exercise-counter-card';
        card.dataset.exerciseCard = `${training.id}:${exercise.id}`;
        info.className = 'exercise-counter-info';
        name.textContent = exercise.name;
        target.className = 'exercise-target';
        target.textContent = `${exercise.targetSets || 0} ${exercise.targetSets === 1 ? 'série' : 'séries'}`;
        notes.textContent = exercise.notes || '';
        notes.className = 'exercise-notes';
        summary.className = 'exercise-series-summary';
        setsLabel.className = 'exercise-series-count';
        setsLabel.dataset.seriesCount = `${training.id}:${exercise.id}`;
        setsLabel.textContent = `${progress.sets.length}/${exercise.targetSets || 0} séries`;
        addSetButton.className = 'button training-start-button add-set-button';
        addSetButton.type = 'button';
        addSetButton.textContent = 'Adicionar série';
        addSetButton.addEventListener('click', () => addExerciseSet(training, exercise));
        helpButton.className = 'exercise-help-button';
        helpButton.type = 'button';
        helpButton.textContent = '?';
        helpButton.setAttribute('aria-label', `Ver explicação de ${exercise.name}`);
        helpButton.addEventListener('click', () => renderExerciseExplanationView(training.id, exercise.id));
        extension.className = `exercise-set-extension${progress.sets.length ? ' is-open' : ''}`;
        extension.dataset.setExtension = `${training.id}:${exercise.id}`;

        info.append(name, target, notes);
        summary.append(helpButton, setsLabel, addSetButton);
        card.append(media, info, summary, extension);
        targetElement.appendChild(card);
        renderExerciseSetExtension(training, exercise, extension);
    });
}

function createExerciseMedia(exercise) {
    const media = document.createElement('div');
    const preview = document.createElement('button');
    const image = document.createElement('img');
    const play = document.createElement('span');

    media.className = 'exercise-media-box';
    preview.className = 'exercise-media-preview';
    preview.type = 'button';
    preview.setAttribute('aria-label', `Ver vídeo de ${exercise.name}`);
    image.src = exercise.thumbnailUrl;
    image.alt = `Preview de ${exercise.name}`;
    image.loading = 'lazy';
    play.className = 'exercise-media-play';
    play.textContent = 'Vídeo';

    preview.append(image, play);
    preview.addEventListener('click', () => activateExerciseMedia(media, exercise));
    media.appendChild(preview);

    return media;
}

function activateExerciseMedia(media, exercise) {
    const videoUrl = exercise.videoUrl || '';
    const embedUrl = getYoutubeEmbedUrl(videoUrl);

    media.innerHTML = '';

    if (isVideoFileUrl(videoUrl)) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.playsInline = true;
        video.poster = exercise.thumbnailUrl;
        media.appendChild(video);
        return;
    }

    if (embedUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.title = `Vídeo de ${exercise.name}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        media.appendChild(iframe);
        return;
    }

    const fallback = document.createElement('div');
    fallback.className = 'exercise-media-link';
    fallback.textContent = videoUrl ? 'Vídeo preparado para abrir aqui quando o link permitir incorporação.' : 'Vídeo ainda não configurado.';
    media.appendChild(fallback);
}

function isVideoFileUrl(url) {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function getYoutubeEmbedUrl(url) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace('www.', '');

        if (host === 'youtube.com' && parsed.searchParams.get('v')) {
            return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`;
        }

        if (host === 'youtu.be' && parsed.pathname.length > 1) {
            return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
        }

        if (host === 'youtube.com' && parsed.pathname.startsWith('/embed')) {
            return url;
        }
    } catch (error) {
        return '';
    }

    return '';
}

function renderExerciseExplanationView(trainingId, exerciseId) {
    const training = trainingCatalog.find(item => item.id === trainingId);
    const exercise = training?.exercises.find(item => item.id === exerciseId);
    const workoutView = document.getElementById('training-workout-view');

    if (!training || !exercise || !workoutView) {
        return;
    }

    workoutView.innerHTML = '';
    workoutView.classList.add('is-active');
    workoutView.setAttribute('aria-hidden', 'false');

    const header = document.createElement('div');
    const copy = document.createElement('div');
    const eyebrow = document.createElement('span');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const backButton = document.createElement('button');
    const detail = document.createElement('article');
    const media = createExerciseMedia(exercise);
    const notes = document.createElement('div');
    const notesTitle = document.createElement('strong');
    const notesText = document.createElement('p');
    const steps = document.createElement('ol');
    const gallery = document.createElement('div');

    header.className = 'training-workout-header exercise-explanation-header';
    copy.className = 'training-workout-copy';
    eyebrow.className = 'meter-title';
    eyebrow.textContent = training.name;
    title.textContent = exercise.name;
    description.textContent = 'Explicação do exercício, vídeo e imagens de apoio.';
    backButton.className = 'button button-secondary training-back-button';
    backButton.type = 'button';
    backButton.textContent = 'Voltar ao treino';
    backButton.addEventListener('click', () => renderWorkoutDetail(training.id));

    detail.className = 'exercise-explanation-page';
    notes.className = 'exercise-notes-panel';
    notesTitle.textContent = 'Notas';
    notesText.textContent = exercise.notes || 'Sem notas adicionais.';
    notes.append(notesTitle, notesText);

    (exercise.instructions || []).forEach(step => {
        const item = document.createElement('li');
        item.textContent = step;
        steps.appendChild(item);
    });

    gallery.className = 'exercise-instruction-gallery';
    (exercise.instructionImages || []).forEach((src, index) => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = `${exercise.name} passo ${index + 1}`;
        image.loading = 'lazy';
        gallery.appendChild(image);
    });

    copy.append(eyebrow, title, description);
    header.append(copy, backButton);
    detail.append(media, notes, steps, gallery);
    workoutView.append(header, detail);
    workoutView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addExerciseSet(training, exercise) {
    const progress = getExerciseProgress(training.id, exercise.id);
    const isTimeBased = exercise.trackingMode === 'time';
    const nextProgress = {
        sets: [...progress.sets, {
            reps: isTimeBased ? 0 : exercise.targetReps || 0,
            weightKg: 0,
            durationSeconds: isTimeBased ? exercise.targetReps || 0 : 0
        }]
    };

    saveExerciseProgress(training.id, exercise.id, nextProgress);
    refreshExerciseSetUI(training, exercise);
}

function updateSetReps(training, exercise, setIndex, value) {
    const progress = getExerciseProgress(training.id, exercise.id);
    const nextReps = Math.max(0, Number(value) || 0);

    progress.sets[setIndex] = { ...progress.sets[setIndex], reps: nextReps };
    saveExerciseProgress(training.id, exercise.id, progress);
}

function updateSetWeight(training, exercise, setIndex, value) {
    const progress = getExerciseProgress(training.id, exercise.id);
    const nextWeight = Math.max(0, Number(value) || 0);

    progress.sets[setIndex] = { ...progress.sets[setIndex], weightKg: nextWeight };
    saveExerciseProgress(training.id, exercise.id, progress);
}

function updateSetDuration(training, exercise, setIndex, value) {
    const progress = getExerciseProgress(training.id, exercise.id);
    const nextDuration = Math.max(0, Number(value) || 0);

    progress.sets[setIndex] = { ...progress.sets[setIndex], durationSeconds: nextDuration };
    saveExerciseProgress(training.id, exercise.id, progress);
}

function removeExerciseSet(training, exercise, setIndex) {
    const progress = getExerciseProgress(training.id, exercise.id);

    progress.sets.splice(setIndex, 1);
    saveExerciseProgress(training.id, exercise.id, progress);
    refreshExerciseSetUI(training, exercise);
}

function refreshExerciseSetUI(training, exercise) {
    const progress = getExerciseProgress(training.id, exercise.id);
    const count = document.querySelector(`[data-series-count="${training.id}:${exercise.id}"]`);
    const extension = document.querySelector(`[data-set-extension="${training.id}:${exercise.id}"]`);

    if (count) {
        count.textContent = `${progress.sets.length}/${exercise.targetSets || 0} séries`;
    }

    if (extension) {
        extension.classList.toggle('is-open', progress.sets.length > 0);
        renderExerciseSetExtension(training, exercise, extension);
    }
}

function renderExerciseSetExtension(training, exercise, extension) {
    const progress = getExerciseProgress(training.id, exercise.id);

    extension.innerHTML = '';

    if (!progress.sets.length) {
        return;
    }

    progress.sets.forEach((set, index) => {
        const isTimeBased = exercise.trackingMode === 'time';
        const row = document.createElement('div');
        const text = document.createElement('span');
        const fields = document.createElement('div');
        const removeButton = document.createElement('button');

        row.className = 'exercise-set-row';
        text.textContent = `Série ${index + 1}`;
        fields.className = 'exercise-set-fields';

        if (isTimeBased) {
            const durationInput = document.createElement('input');

            fields.classList.add('is-time-based');
            durationInput.type = 'number';
            durationInput.min = '0';
            durationInput.inputMode = 'numeric';
            durationInput.value = set.durationSeconds ? set.durationSeconds.toString() : '';
            durationInput.placeholder = `${exercise.targetReps || 0} seg`;
            durationInput.setAttribute('aria-label', `Tempo em segundos da série ${index + 1} de ${exercise.name}`);
            durationInput.addEventListener('input', () => updateSetDuration(training, exercise, index, durationInput.value));
            fields.append(durationInput);
        } else {
            const repsInput = document.createElement('input');
            const weightInput = document.createElement('input');

            repsInput.type = 'number';
            repsInput.min = '0';
            repsInput.inputMode = 'numeric';
            repsInput.value = set.reps.toString();
            repsInput.placeholder = `${exercise.targetReps || 0} reps`;
            repsInput.setAttribute('aria-label', `Repetições da série ${index + 1} de ${exercise.name}`);
            repsInput.addEventListener('input', () => updateSetReps(training, exercise, index, repsInput.value));

            weightInput.type = 'number';
            weightInput.min = '0';
            weightInput.step = '0.5';
            weightInput.inputMode = 'decimal';
            weightInput.value = set.weightKg ? set.weightKg.toString() : '';
            weightInput.placeholder = 'kg';
            weightInput.setAttribute('aria-label', `Peso em kg da série ${index + 1} de ${exercise.name}`);
            weightInput.addEventListener('input', () => updateSetWeight(training, exercise, index, weightInput.value));
            fields.append(repsInput, weightInput);
        }

        removeButton.className = 'small-button remove-set-button';
        removeButton.type = 'button';
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => removeExerciseSet(training, exercise, index));

        row.append(text, fields, removeButton);
        extension.appendChild(row);
    });
}

function buildTrainingHistoryEntry(training) {
    const exercises = training.exercises.map(exercise => {
        const progress = getExerciseProgress(training.id, exercise.id);
        const sets = progress.sets.map((set, index) => ({
            setNumber: index + 1,
            reps: Math.max(0, Number(set.reps) || 0),
            weightKg: Math.max(0, Number(set.weightKg) || 0),
            durationSeconds: Math.max(0, Number(set.durationSeconds) || 0)
        }));

        return {
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            trackingMode: exercise.trackingMode || 'load',
            muscleGroups: exercise.muscleGroups || [],
            sets
        };
    }).filter(exercise => exercise.sets.length > 0);

    return {
        id: `${training.id}-${Date.now()}`,
        date: new Date().toISOString(),
        trainingId: training.id,
        trainingName: training.name,
        exercises
    };
}

function recordTrainingCompletion(training) {
    const entry = buildTrainingHistoryEntry(training);

    if (typeof TrainingHistoryStorage !== 'undefined') {
        TrainingHistoryStorage.add(entry);
    }

    return entry;
}

function renderWorkoutCompletion(training) {
    const workoutView = document.getElementById('training-workout-view');

    if (!workoutView) {
        return;
    }

    const historyEntry = recordTrainingCompletion(training);

    workoutView.innerHTML = '';
    workoutView.classList.add('is-active');
    workoutView.setAttribute('aria-hidden', 'false');

    const card = document.createElement('article');
    const visual = document.createElement('span');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const actions = document.createElement('div');
    const homeLink = document.createElement('a');
    const summaryLink = document.createElement('a');

    card.className = 'training-complete-card';
    visual.className = 'training-complete-visual';
    visual.setAttribute('aria-label', training.name);
    visual.setAttribute('role', 'img');
    visual.appendChild(createTrainingIcon(getTrainingIconType(training.name)));

    title.textContent = 'Treino concluído';
    description.textContent = `${training.name} ficou registado com ${historyEntry.exercises.length} exercícios. Podes voltar ao início ou ver o resumo do teu progresso.`;

    actions.className = 'training-complete-actions';
    homeLink.className = 'button button-secondary';
    homeLink.href = 'inicio.html';
    homeLink.textContent = 'Voltar ao início';
    summaryLink.className = 'button';
    summaryLink.href = 'resumo.html';
    summaryLink.textContent = 'Ir para o resumo';

    actions.append(homeLink, summaryLink);
    card.append(visual, title, description, actions);
    workoutView.appendChild(card);
    workoutView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function returnToTrainingSelector() {
    const selectorSection = document.querySelector('.training-selector-section');
    const workoutView = document.getElementById('training-workout-view');
    const pageHeader = document.querySelector('.page-header');

    if (workoutView) {
        workoutView.classList.remove('is-active');
        workoutView.setAttribute('aria-hidden', 'true');
    }

    if (selectorSection) {
        selectorSection.classList.remove('is-hidden');
        selectorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (pageHeader) {
        pageHeader.classList.remove('is-hidden');
    }
}

function getTrainingIconType(trainingType) {
    const normalizedType = String(trainingType || '').toLowerCase();

    if (normalizedType.includes('força')) {
        return 'strength';
    }

    if (normalizedType.includes('cardio')) {
        return 'cardio';
    }

    if (normalizedType.includes('mobilidade')) {
        return 'mobility';
    }

    if (normalizedType.includes('alongamento')) {
        return 'stretch';
    }

    if (normalizedType.includes('hiit')) {
        return 'hiit';
    }

    return 'default';
}

function createTrainingIcon(iconType) {
    const icons = {
        strength: [
            ['line', { x1: 5, y1: 18, x2: 31, y2: 18 }],
            ['line', { x1: 9, y1: 13, x2: 9, y2: 23 }],
            ['line', { x1: 13, y1: 11, x2: 13, y2: 25 }],
            ['line', { x1: 23, y1: 11, x2: 23, y2: 25 }],
            ['line', { x1: 27, y1: 13, x2: 27, y2: 23 }]
        ],
        cardio: [
            ['path', { d: 'M18 29s-11-6.4-11-14c0-4 3.1-7 7-7 2.2 0 3.6 1 4 2.1C18.4 9 19.8 8 22 8c3.9 0 7 3 7 7 0 7.6-11 14-11 14z' }],
            ['path', { d: 'M8 18h5l2-4 3 8 2-4h8' }]
        ],
        mobility: [
            ['circle', { cx: 15, cy: 8, r: 3 }],
            ['path', { d: 'M15 11l5 7' }],
            ['path', { d: 'M19 17l8 1' }],
            ['path', { d: 'M20 18l-8 9' }],
            ['path', { d: 'M20 18l5 10' }],
            ['path', { d: 'M10 27h18' }]
        ],
        stretch: [
            ['circle', { cx: 21, cy: 8, r: 3 }],
            ['path', { d: 'M19 12l-5 7' }],
            ['path', { d: 'M16 16l8 4' }],
            ['path', { d: 'M14 19H7' }],
            ['path', { d: 'M24 20l5 6' }]
        ],
        hiit: [
            ['path', { d: 'M19 4c4 5-1 7 3 11 1.1-2.4 3.9-3.6 3.9-3.6S31 18 26 25c-3.8 5.3-12.1 5.2-15.7-.3C6.4 18.7 12 14 12 14c.2 3.1 2.2 4.7 2.2 4.7C13.3 11.7 19 4 19 4z' }]
        ],
        default: [
            ['circle', { cx: 18, cy: 18, r: 11 }],
            ['path', { d: 'M18 11v7l5 3' }]
        ]
    };
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const shapes = icons[iconType] || icons.default;

    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('training-svg');

    shapes.forEach(([shapeName, attributes]) => {
        const shape = document.createElementNS('http://www.w3.org/2000/svg', shapeName);
        Object.entries(attributes).forEach(([key, value]) => {
            shape.setAttribute(key, value);
        });
        svg.appendChild(shape);
    });

    return svg;
}

function renderConditioningWeek() {
    const grid = document.getElementById('conditioning-grid');
    const score = document.getElementById('conditioning-score');
    const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

    if (!grid) {
        return;
    }

    const goalCount = Math.max(1, Number(weeklyComparison.goalCount) || 7);
    const completedCount = Math.max(0, Math.min(goalCount, Number(weeklyComparison.currentWeekCount) || 0));

    grid.innerHTML = '';

    if (score) {
        score.textContent = `${completedCount}/${goalCount}`;
    }

    for (let index = 0; index < goalCount; index += 1) {
        const isCompleted = index < completedCount;
        const item = document.createElement('div');
        const day = document.createElement('span');
        const cell = document.createElement('span');

        item.className = 'conditioning-day';
        day.className = 'conditioning-day-label';
        day.textContent = weekDays[index % weekDays.length];

        cell.className = `conditioning-cell ${isCompleted ? 'completed' : 'missed'}`;
        cell.textContent = isCompleted ? '✓' : '×';
        cell.setAttribute('aria-label', `${day.textContent}: ${isCompleted ? 'treino concluído' : 'treino por concluir'}`);
        cell.setAttribute('role', 'img');

        item.append(day, cell);
        grid.appendChild(item);
    }
}

function renderWorkoutList() {
    const workouts = WorkoutStorage.init();
    const list = document.getElementById('workout-list');
    const count = document.getElementById('workout-count');

    if (!list) return;

    list.innerHTML = '';
    workouts.forEach(workout => {
        const item = document.createElement('article');
        item.className = 'workout-item';

        const content = document.createElement('div');
        const name = document.createElement('strong');
        name.textContent = workout.name;

        const meta = document.createElement('div');
        meta.className = 'workout-meta';

        const category = document.createElement('span');
        category.textContent = `Categoria: ${workout.category}`;

        const duration = document.createElement('span');
        duration.textContent = `Duração: ${workout.duration} min`;

        const status = document.createElement('span');
        status.textContent = `Status: ${workout.completed ? 'Concluído' : 'Pendente'}`;

        meta.append(category, duration, status);
        content.append(name, meta);

        const actions = document.createElement('div');
        actions.className = 'workout-actions';

        const toggleButton = document.createElement('button');
        toggleButton.className = 'small-button';
        toggleButton.type = 'button';
        toggleButton.textContent = workout.completed ? 'Marcar como pendente' : 'Marcar como concluído';
        toggleButton.addEventListener('click', () => toggleWorkoutStatus(workout.id));

        actions.appendChild(toggleButton);
        item.append(content, actions);
        list.appendChild(item);
    });

    if (count) {
        count.textContent = workouts.length.toString();
    }
}

function handleWorkoutSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('workout-name');
    const categoryInput = document.getElementById('workout-category');
    const durationInput = document.getElementById('workout-duration');

    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const duration = Number(durationInput.value);

    if (!name || duration <= 0) {
        return;
    }

    const workouts = WorkoutStorage.load();
    const nextId = workouts.length ? Math.max(...workouts.map(w => w.id)) + 1 : 1;

    WorkoutStorage.add({
        id: nextId,
        name,
        category,
        duration,
        completed: false
    });

    nameInput.value = '';
    durationInput.value = '30';
    renderWorkoutList();
    renderSummary();
}

function toggleWorkoutStatus(id) {
    const workouts = WorkoutStorage.load();
    const updated = workouts.map(workout => {
        if (workout.id === id) {
            return { ...workout, completed: !workout.completed };
        }
        return workout;
    });
    WorkoutStorage.save(updated);
    renderWorkoutList();
    renderSummary();
}

function renderSummary() {
    const workouts = WorkoutStorage.init();
    const history = typeof TrainingHistoryStorage !== 'undefined' ? TrainingHistoryStorage.load() : [];
    const summaryCards = document.querySelectorAll('#summary-cards .stat-card');
    const currentYear = new Date().getFullYear();
    const completedHistory = history.filter(item => item?.date);
    const yearlyWorkouts = completedHistory.filter(item => new Date(item.date).getFullYear() === currentYear).length;
    const weeklyHistory = getHistoryFromLastDays(completedHistory, 7);
    const weeklyCompletionRate = Math.min(100, Math.round((weeklyHistory.length / (weeklyComparison.goalCount || 7)) * 100));
    const fallbackCompletedCount = workouts.filter(item => item.completed).length;
    const totalCompleted = completedHistory.length || fallbackCompletedCount;

    if (summaryCards.length >= 3) {
        summaryCards[0].querySelector('h3').textContent = `${totalCompleted}`;
        summaryCards[1].querySelector('h3').textContent = `${yearlyWorkouts}`;
        summaryCards[2].querySelector('h3').textContent = `${weeklyCompletionRate}%`;
    }

    const progressBars = document.querySelectorAll('.progress-bar span');
    if (progressBars.length >= 1) {
        progressBars[0].style.width = `${weeklyCompletionRate}%`;
    }

    renderMuscleFocus(weeklyHistory);
    renderCapacityProgress(completedHistory);
}

function getHistoryFromLastDays(history, days) {
    const now = Date.now();
    const windowMs = days * 24 * 60 * 60 * 1000;

    return history.filter(item => {
        const itemTime = new Date(item.date).getTime();
        return Number.isFinite(itemTime) && now - itemTime <= windowMs;
    });
}

function getMuscleLabel(group) {
    const labels = {
        pernas: 'Pernas',
        peito: 'Peito',
        costas: 'Costas',
        core: 'Core',
        ombros: 'Ombros',
        cardio: 'Cardio',
        mobilidade: 'Mobilidade'
    };

    return labels[group] || 'Sem foco';
}

function getMuscleFocus(history) {
    const scores = {};

    history.forEach(entry => {
        (entry.exercises || []).forEach(exercise => {
            const setCount = (exercise.sets || []).length;
            (exercise.muscleGroups || []).forEach(group => {
                scores[group] = (scores[group] || 0) + setCount;
            });
        });
    });

    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0] || null;
}

function renderMuscleFocus(weeklyHistory) {
    const anatomyMap = document.getElementById('anatomy-map');
    const copy = document.getElementById('muscle-focus-copy');
    const focus = getMuscleFocus(weeklyHistory);

    if (!anatomyMap || !copy) {
        return;
    }

    anatomyMap.dataset.activeMuscle = focus ? focus[0] : '';

    if (!focus) {
        copy.textContent = 'Termina treinos para veres o foco muscular dos últimos 7 dias.';
        return;
    }

    copy.textContent = `${getMuscleLabel(focus[0])} foi o grupo mais trabalhado, com ${focus[1]} séries registadas nos últimos 7 dias.`;
}

function getExerciseVolume(exercise) {
    return (exercise.sets || []).reduce((sum, set) => {
        const reps = Math.max(0, Number(set.reps) || 0);
        const weight = Math.max(0, Number(set.weightKg ?? set.kg) || 0);
        return sum + reps * weight;
    }, 0);
}

function getCapacityComparison(history) {
    const byExercise = {};

    history.forEach(entry => {
        (entry.exercises || []).forEach(exercise => {
            const volume = getExerciseVolume(exercise);

            if (volume <= 0) {
                return;
            }

            const key = exercise.exerciseId || exercise.exerciseName;
            byExercise[key] = byExercise[key] || [];
            byExercise[key].push({
                date: entry.date,
                name: exercise.exerciseName,
                volume
            });
        });
    });

    return Object.values(byExercise).reduce((best, entries) => {
        const ordered = entries
            .filter(item => item.date)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (ordered.length < 2) {
            return best;
        }

        const previous = ordered[ordered.length - 2];
        const current = ordered[ordered.length - 1];
        const change = current.volume - previous.volume;
        const percent = previous.volume ? Math.round((change / previous.volume) * 100) : 0;
        const comparison = {
            exerciseName: current.name,
            previousVolume: previous.volume,
            currentVolume: current.volume,
            change,
            percent
        };

        if (!best || Math.abs(comparison.change) > Math.abs(best.change)) {
            return comparison;
        }

        return best;
    }, null);
}

function renderCapacityProgress(history) {
    const copy = document.getElementById('capacity-copy');
    const value = document.getElementById('capacity-value');
    const detail = document.getElementById('capacity-detail');
    const comparison = getCapacityComparison(history);

    if (!copy || !value || !detail) {
        return;
    }

    if (!comparison) {
        copy.textContent = 'Regista pesos em pelo menos duas sessões do mesmo exercício para comparar evolução.';
        value.textContent = 'Sem comparação';
        detail.textContent = 'Volume calculado por kg x reps.';
        return;
    }

    const trend = comparison.change >= 0 ? '+' : '';

    copy.textContent = `${comparison.exerciseName} é o exercício com comparação mais relevante entre as duas sessões mais recentes.`;
    value.textContent = `${trend}${comparison.percent}%`;
    detail.textContent = `${Math.round(comparison.previousVolume)} kg x reps para ${Math.round(comparison.currentVolume)} kg x reps.`;
}
