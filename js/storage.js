const WorkoutStorage = {
    key: 'fitnessapp.workouts',

    load() {
        try {
            const json = localStorage.getItem(this.key);
            return json ? JSON.parse(json) : [];
        } catch (error) {
            console.warn('Falha ao carregar dados de treino', error);
            return [];
        }
    },

    save(items) {
        try {
            localStorage.setItem(this.key, JSON.stringify(items));
        } catch (error) {
            console.warn('Falha ao salvar dados de treino', error);
        }
    },

    init() {
        const stored = this.load();
        if (!stored || stored.length === 0) {
            this.save(initialWorkouts);
            return [...initialWorkouts];
        }
        return stored;
    },

    add(item) {
        const workouts = this.load();
        workouts.push(item);
        this.save(workouts);
        return workouts;
    }
};

const TrainingHistoryStorage = {
    key: 'fitnessapp.trainingHistory',

    load() {
        try {
            const json = localStorage.getItem(this.key);
            const history = json ? JSON.parse(json) : [];
            return Array.isArray(history) ? history : [];
        } catch (error) {
            console.warn('Falha ao carregar histórico de treino', error);
            return [];
        }
    },

    save(items) {
        try {
            localStorage.setItem(this.key, JSON.stringify(items));
        } catch (error) {
            console.warn('Falha ao guardar histórico de treino', error);
        }
    },

    add(item) {
        const history = this.load();
        const nextHistory = [...history, item];
        this.save(nextHistory);
        return nextHistory;
    }
};
