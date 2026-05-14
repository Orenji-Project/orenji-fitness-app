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
    const previousValue = document.getElementById('chart-previous-value');
    const currentValue = document.getElementById('chart-current-value');

    if (nameElement) {
        nameElement.textContent = userProfile.displayName || 'amiga';
    }

    if (loader) {
        loader.innerHTML = '';
        weeklySchedule.forEach(item => {
            const card = document.createElement('article');
            card.className = 'day-card';
            card.innerHTML = `
                <span>${item.dayCode}</span>
                <strong>${item.dayName}</strong>
                <p>${item.trainingType}</p>
            `;
            loader.appendChild(card);
        });
    }

    const currentCountElement = document.getElementById('meter-current-count');
    const goalCountElement = document.getElementById('meter-goal-count');
    const gaugeBarFill = document.getElementById('gauge-bar-fill');
    const gaugeBarThumb = document.getElementById('gauge-bar-thumb');

    if (currentCountElement) {
        currentCountElement.textContent = `${weeklyComparison.currentWeekCount}x`;
    }

    if (goalCountElement) {
        goalCountElement.textContent = `${weeklyComparison.goalCount}x`;
    }

    if (gaugeBarFill && gaugeBarThumb) {
        const ratio = Math.min(1, weeklyComparison.currentWeekCount / weeklyComparison.goalCount);
        const percentage = Math.round(ratio * 100);
        gaugeBarFill.style.width = `${percentage}%`;
        gaugeBarThumb.style.left = `${percentage}%`;
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
        item.innerHTML = `
            <div>
                <strong>${workout.name}</strong>
                <div class="workout-meta">
                    <span>Categoria: ${workout.category}</span>
                    <span>Duração: ${workout.duration} min</span>
                    <span>Status: ${workout.completed ? 'Concluído' : 'Pendente'}</span>
                </div>
            </div>
            <div class="workout-actions">
                <button class="small-button" type="button" onclick="toggleWorkoutStatus(${workout.id})">
                    ${workout.completed ? 'Marcar como pendente' : 'Marcar como concluído'}
                </button>
            </div>
        `;
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
