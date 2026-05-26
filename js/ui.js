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
}

function renderHomePage() {
    const nameElement = document.getElementById('user-name');
    const loader = document.getElementById('schedule-roller');
    if (nameElement) {
        nameElement.textContent = userProfile.displayName || 'amiga';
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
            ['path', { d: 'M6 19h5l3-8 5 15 3-7h8' }],
            ['path', { d: 'M18 8c2.4-3.4 8-1.4 8 3 0 4.8-8 9-8 9s-8-4.2-8-9c0-4.4 5.6-6.4 8-3z' }]
        ],
        mobility: [
            ['path', { d: 'M10 22a10 10 0 0 1 15-12' }],
            ['path', { d: 'M25 10h-6V4' }],
            ['path', { d: 'M26 14a10 10 0 0 1-15 12' }],
            ['path', { d: 'M11 26h6v6' }]
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
    const summaryCards = document.querySelectorAll('#summary-cards .stat-card');
    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, item) => sum + item.duration, 0);
    const completedCount = workouts.filter(item => item.completed).length;
    const completionRate = totalWorkouts ? Math.round((completedCount / totalWorkouts) * 100) : 0;

    if (summaryCards.length >= 3) {
        summaryCards[0].querySelector('h3').textContent = `${totalWorkouts}`;
        summaryCards[1].querySelector('h3').textContent = `${totalMinutes} min`;
        summaryCards[2].querySelector('h3').textContent = `${completionRate}%`;
    }

    const progressBars = document.querySelectorAll('.progress-bar span');
    if (progressBars.length >= 2) {
        progressBars[0].style.width = `${Math.min(100, completionRate)}%`;
        progressBars[1].style.width = `${Math.min(100, Math.round(totalMinutes / 200 * 100))}%`;
    }
}
