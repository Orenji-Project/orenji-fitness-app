const initialWorkouts = [
    {
        id: 1,
        name: 'Treino de pernas',
        category: 'Força',
        duration: 35,
        completed: true
    },
    {
        id: 2,
        name: 'Corrida leve',
        category: 'Cardio',
        duration: 25,
        completed: false
    },
    {
        id: 3,
        name: 'Alongamento matinal',
        category: 'Alongamento',
        duration: 20,
        completed: true
    }
];

const userProfile = {
    displayName: 'Camila'
};

const weeklySchedule = [
    { dayCode: 'Seg', dayName: 'Segunda', trainingType: 'Força' },
    { dayCode: 'Ter', dayName: 'Terça', trainingType: 'Cardio' },
    { dayCode: 'Qua', dayName: 'Quarta', trainingType: 'Mobilidade' },
    { dayCode: 'Qui', dayName: 'Quinta', trainingType: 'Força' },
    { dayCode: 'Sex', dayName: 'Sexta', trainingType: 'Treino HIIT' }
];

const weeklyComparison = {
    currentWeekCount: 5,
    previousWeekCount: 3,
    goalCount: 7
};
