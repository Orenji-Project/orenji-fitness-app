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

const exerciseMuscleGroups = {
    agachamento: ['pernas', 'core'],
    flexoes: ['peito', 'ombros', 'core'],
    remada: ['costas', 'ombros'],
    prancha: ['core'],
    'jumping-jacks': ['cardio', 'pernas', 'ombros'],
    'mountain-climbers': ['cardio', 'core', 'ombros'],
    'corrida-local': ['cardio', 'pernas'],
    skaters: ['cardio', 'pernas', 'core'],
    'cat-cow': ['mobilidade', 'costas', 'core'],
    'worlds-greatest-stretch': ['mobilidade', 'pernas', 'core'],
    'hip-circles': ['mobilidade', 'pernas'],
    'shoulder-pass': ['mobilidade', 'ombros'],
    'posterior-coxa': ['pernas', 'mobilidade'],
    quadricipete: ['pernas', 'mobilidade'],
    peitoral: ['peito', 'ombros', 'mobilidade'],
    respiracao: ['mobilidade', 'core'],
    burpees: ['cardio', 'peito', 'pernas', 'core'],
    'squat-jumps': ['cardio', 'pernas', 'core'],
    'high-knees': ['cardio', 'pernas', 'core'],
    'plank-jacks': ['cardio', 'core', 'ombros']
};

function exerciseMedia(exercise) {
    const encodedName = encodeURIComponent(exercise.name);
    const videoQuery = encodeURIComponent(`${exercise.name} exercício tutorial`);
    const isTimeBased = /segundo/i.test(exercise.target || '');

    return {
        ...exercise,
        muscleGroups: exercise.muscleGroups || exerciseMuscleGroups[exercise.id] || [],
        trackingMode: exercise.trackingMode || (isTimeBased ? 'time' : 'load'),
        videoUrl: `https://www.youtube.com/embed?listType=search&list=${videoQuery}`,
        thumbnailUrl: `https://placehold.co/640x360/fff3e0/f97316?text=${encodedName}`,
        instructions: [
            `Prepara a posição inicial para ${exercise.name} com controlo e postura estável.`,
            exercise.notes,
            'Termina cada repetição com calma, mantendo a respiração regular.'
        ],
        instructionImages: [
            `https://placehold.co/420x260/fff7ed/f97316?text=${encodedName}+1`,
            `https://placehold.co/420x260/ffedd5/f97316?text=${encodedName}+2`,
            `https://placehold.co/420x260/fed7aa/f97316?text=${encodedName}+3`
        ]
    };
}

const trainingCatalog = [
    {
        id: 'forca',
        name: 'Força',
        description: 'Construção muscular e resistência.',
        exercises: [
            exerciseMedia({ id: 'agachamento', name: 'Agachamento', target: '3 séries de 12 reps', targetSets: 3, targetReps: 12, notes: 'Mantém o peito aberto e desce com controlo.' }),
            exerciseMedia({ id: 'flexoes', name: 'Flexões', target: '3 séries de 10 reps', targetSets: 3, targetReps: 10, notes: 'Apoia os joelhos se precisares de adaptar.' }),
            exerciseMedia({ id: 'remada', name: 'Remada com halteres', target: '3 séries de 12 reps', targetSets: 3, targetReps: 12, notes: 'Puxa os cotovelos para trás sem encolher os ombros.' }),
            exerciseMedia({ id: 'prancha', name: 'Prancha', target: '3 séries de 30 segundos', targetSets: 3, targetReps: 30, notes: 'Conta cada segundo como repetição no contador.' })
        ]
    },
    {
        id: 'cardio',
        name: 'Cardio',
        description: 'Energia, ritmo e capacidade pulmonar.',
        exercises: [
            exerciseMedia({ id: 'jumping-jacks', name: 'Jumping jacks', target: '4 séries de 30 reps', targetSets: 4, targetReps: 30, notes: 'Mantém um ritmo constante.' }),
            exerciseMedia({ id: 'mountain-climbers', name: 'Mountain climbers', target: '4 séries de 24 reps', targetSets: 4, targetReps: 24, notes: 'Alterna as pernas sem levantar demasiado a anca.' }),
            exerciseMedia({ id: 'corrida-local', name: 'Corrida no lugar', target: '4 séries de 40 reps', targetSets: 4, targetReps: 40, notes: 'Eleva os joelhos e mantém a respiração regular.' }),
            exerciseMedia({ id: 'skaters', name: 'Skaters', target: '3 séries de 20 reps', targetSets: 3, targetReps: 20, notes: 'Controla a aterragem de cada lado.' })
        ]
    },
    {
        id: 'mobilidade',
        name: 'Mobilidade',
        description: 'Controlo, amplitude e postura.',
        exercises: [
            exerciseMedia({ id: 'cat-cow', name: 'Cat-cow', target: '2 séries de 12 reps', targetSets: 2, targetReps: 12, notes: 'Move a coluna devagar, vértebra a vértebra.' }),
            exerciseMedia({ id: 'worlds-greatest-stretch', name: 'Alongamento dinâmico', target: '2 séries de 8 reps por lado', targetSets: 2, targetReps: 8, notes: 'Roda o tronco sem forçar o ombro.' }),
            exerciseMedia({ id: 'hip-circles', name: 'Círculos de anca', target: '2 séries de 10 reps por lado', targetSets: 2, targetReps: 10, notes: 'Mantém o movimento amplo e controlado.' }),
            exerciseMedia({ id: 'shoulder-pass', name: 'Passagem de ombros', target: '2 séries de 12 reps', targetSets: 2, targetReps: 12, notes: 'Usa uma toalha ou elástico com pega larga.' })
        ]
    },
    {
        id: 'alongamento',
        name: 'Alongamento',
        description: 'Recuperação e flexibilidade.',
        exercises: [
            exerciseMedia({ id: 'posterior-coxa', name: 'Posterior da coxa', target: '3 séries de 30 segundos', targetSets: 3, targetReps: 30, notes: 'Conta cada segundo como repetição no contador.' }),
            exerciseMedia({ id: 'quadricipete', name: 'Quadricípete', target: '3 séries de 30 segundos por lado', targetSets: 3, targetReps: 30, notes: 'Mantém os joelhos alinhados.' }),
            exerciseMedia({ id: 'peitoral', name: 'Peitoral na parede', target: '2 séries de 30 segundos por lado', targetSets: 2, targetReps: 30, notes: 'Roda o corpo suavemente para abrir o peito.' }),
            exerciseMedia({ id: 'respiracao', name: 'Respiração profunda', target: '1 série de 10 respirações', targetSets: 1, targetReps: 10, notes: 'Inspira pelo nariz e expira devagar.' })
        ]
    },
    {
        id: 'hiit',
        name: 'Treino HIIT',
        description: 'Intensidade alta em blocos curtos.',
        exercises: [
            exerciseMedia({ id: 'burpees', name: 'Burpees', target: '4 séries de 8 reps', targetSets: 4, targetReps: 8, notes: 'Escolhe uma variação sustentável.' }),
            exerciseMedia({ id: 'squat-jumps', name: 'Squat jumps', target: '4 séries de 12 reps', targetSets: 4, targetReps: 12, notes: 'Aterra de forma leve e controlada.' }),
            exerciseMedia({ id: 'high-knees', name: 'High knees', target: '4 séries de 30 reps', targetSets: 4, targetReps: 30, notes: 'Mantém o tronco firme.' }),
            exerciseMedia({ id: 'plank-jacks', name: 'Plank jacks', target: '3 séries de 20 reps', targetSets: 3, targetReps: 20, notes: 'Evita deixar a lombar cair.' })
        ]
    }
];

const weeklyComparison = {
    currentWeekCount: 5,
    previousWeekCount: 3,
    goalCount: 7
};
