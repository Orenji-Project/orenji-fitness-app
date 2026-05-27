# Orenji Fitness - Repository Overview

**Versão:** 1.0.0  
**Desenvolvedor:** fallen_alex  
**Linguagem:** JavaScript (Vanilla)  
**Tipo:** Aplicação Web de Fitness Pessoal  
**Data de Criação:** 18 de Fevereiro de 2026  
**Última Atualização:** 26 de Maio de 2026  
**Visibilidade:** Privado  

---

## Descrição Executiva

**Orenji Fitness** é uma aplicação web simples e intuitiva desenvolvida em JavaScript vanilla para ajudar usuários a organizar treinos, acompanhar progresso e manter uma rotina saudável. É uma Single Page Application (SPA) sem dependências externas, pronta para uso em navegador.

---

## Estrutura do Projeto

```
fitnessapp/
├── index.html              # Página de login/landing
├── inicio.html             # Página inicial (dashboard)
├── treinos.html            # Página de gerenciamento de treinos
├── resumo.html             # Página de resumo/estatísticas
├── configuracoes.html      # Página de configurações de tema
├── favicon.svg             # Ícone da aplicação
├── .gitignore              # Configurações de git
├── css/                    # Diretório para arquivos de estilo (vazio)
├── js/                     # Diretório de scripts JavaScript
│   ├── app.js              # Inicialização e roteamento
│   ├── data.js             # Dados iniciais (workouts, perfil, horários)
│   ├── ui.js               # Renderização e manipulação do DOM
│   ├── storage.js          # Gerenciamento de localStorage
│   ├── theme.js            # Sistema de cores e temas
│   └── settings.js         # Configurações de tema e presets
└── README.md               # Documentação básica
```

---

## Funcionalidades Principais

### 1. **Dashboard (início.html)**
- Exibe saudação personalizada com nome do usuário
- Mostra calendário semanal com tipo de treino por dia
- Cards interativos para cada dia da semana
- Ícones dinâmicos para cada tipo de treino (força, cardio, mobilidade, alongamento, HIIT)

### 2. **Gerenciamento de Treinos (treinos.html)**
- Lista de treinos com informações: nome, categoria, duração, status
- Adicionar novos treinos via formulário
- Marcar treinos como completos/incompletos
- Persistência de dados em localStorage

### 3. **Resumo/Estatísticas (resumo.html)**
- Cards de resumo com dados de treino
- Comparação com semana anterior
- Progresso em relação a meta semanal

### 4. **Configurações de Tema (configuracoes.html)**
- Modo básico: seleção de presets de cores predefinidos
- Modo avançado: customização individual de cada cor
- 6 presets de temas: Ocean, Energy, Forest, Berry, Sunrise, Mint
- Seleção de texturas: glass, soft, solid
- Salvar/resetar cores

---

## Arquitetura de Dados

### Estrutura de Treino
```javascript
{
    id: number,                    // Identificador único
    name: string,                  // Nome do treino
    category: string,              // Categoria (Força, Cardio, etc)
    duration: number,              // Duração em minutos
    completed: boolean             // Status de conclusão
}
```

### Perfil de Usuário
```javascript
{
    displayName: string            // Nome exibido na aplicação
}
```

### Horário Semanal
```javascript
{
    dayCode: string,               // Abreviação (Seg, Ter, etc)
    dayName: string,               // Nome completo (Segunda, Terça)
    trainingType: string           // Tipo de treino
}
```

### Dados de Comparação Semanal
```javascript
{
    currentWeekCount: number,      // Treinos completados esta semana
    previousWeekCount: number,     // Treinos completados semana anterior
    goalCount: number              // Meta de treinos por semana
}
```

---

## Módulos JavaScript

### **app.js** - Inicialização Global
- Detecta página atual via URL
- Ativa classe 'active' no menu de navegação
- Chama `initWorkoutApp()` se disponível

### **data.js** - Dados Estáticos
- `initialWorkouts[]` - 3 treinos de exemplo
- `userProfile` - Dados do usuário
- `weeklySchedule[]` - 5 dias de treino
- `weeklyComparison` - Comparação semanal

### **ui.js** - Renderização e Interatividade
**Funções principais:**
- `initWorkoutApp()` - Inicializa UI conforme página
- `renderWorkoutList()` - Renderiza lista de treinos
- `renderSummary()` - Renderiza cards de resumo
- `renderHomePage()` - Renderiza dashboard
- `renderConditioningWeek()` - Renderiza progresso semanal
- `getTrainingIconType()` - Mapeia tipo de treino para ícone
- `createTrainingIcon()` - Cria SVG de ícone dinamicamente
- `handleWorkoutSubmit()` - Handler para submissão de treino

**Ícones SVG suportados:**
- strength (força)
- cardio (cardio)
- mobility (mobilidade)
- stretch (alongamento)
- hiit (HIIT)
- default (padrão)

### **storage.js** - Persistência em localStorage
**WorkoutStorage object:**
- `load()` - Carrega treinos do localStorage
- `save(items)` - Salva treinos
- `init()` - Inicializa com dados padrão se vazio
- `add(item)` - Adiciona novo treino

**Chave de armazenamento:** `fitnessapp.workouts`

### **theme.js** - Sistema de Cores
**Cores padrão (tema Ocean):**
```javascript
{
    background: '#020617',
    header: '#0f172a',
    primary: '#5b96ff',
    primaryStrong: '#3b82f6',
    accent: '#22c55e',
    danger: '#f43f5e',
    warning: '#facc15',
    texture: 'glass'
}
```

**Funções de conversão de cor:**
- `hexToRgb(hexColor, fallback)` - Hex para RGB
- `hexToRgba(hexColor, alpha)` - Hex para RGBA
- `hexToRgbParts(hexColor)` - Hex para string RGB
- `rgbToHex(rgb)` - RGB para Hex
- `mixHexColors(firstHex, secondHex, amount)` - Mistura cores

**Funções de tema:**
- `loadThemeColors()` - Carrega cores do localStorage
- `saveThemeColors(colors)` - Salva cores
- `resetThemeColors()` - Reseta para padrão
- `applyThemeColors(colors)` - Aplica cores ao DOM
- `getRelativeLuminance(hexColor)` - Calcula luminância (WCAG)

**Chave de armazenamento:** `fitnessapp.colors`

### **settings.js** - Gerenciamento de Configurações
**6 Presets de tema:**
1. **Ocean** - Azul/Verde (dark mode)
2. **Energy** - Laranja/Amarelo (dark mode)
3. **Forest** - Verde esmeralda (dark mode)
4. **Berry** - Roxo/Ciano (dark mode)
5. **Sunrise** - Rosa/Laranja (light mode)
6. **Mint** - Turquesa/Verde (light mode)

**Campos de cor editáveis:**
- background
- header
- primary
- primaryStrong
- accent
- danger
- warning

**Funções:**
- `initSettings()` - Inicializa página de configurações
- `setupModeToggle()` - Alterna entre modo básico/avançado
- `setupPresetButtons()` - Ativa botões de presets
- `setupAdvancedInputs()` - Configura inputs de cor
- `setupTextureButtons()` - Ativa seleção de textura
- `handleSaveColors()` - Salva configurações
- `handleResetColors()` - Reseta para padrão
- `setColorInputs()` - Popula inputs com cores atuais
- `updateThemePreview()` - Atualiza preview em tempo real

---

## Fluxo de Dados

```
localStorage (fitnessapp.workouts)
    ↓
storage.js (WorkoutStorage)
    ↓
data.js (initialWorkouts)
    ↓
ui.js (renderWorkoutList)
    ↓
index.html / treinos.html (DOM)
```

```
localStorage (fitnessapp.colors)
    ↓
theme.js (loadThemeColors)
    ↓
CSS Variables (--background, --primary, etc)
    ↓
HTML/CSS Styling
```

---

## Fluxo de Navegação

1. **index.html** (login) → app.js marca como ativo
2. **inicio.html** (dashboard) → initWorkoutApp() → renderHomePage()
3. **treinos.html** (gerenciar) → initWorkoutApp() → renderWorkoutList()
4. **resumo.html** (estatísticas) → initWorkoutApp() → renderSummary()
5. **configuracoes.html** (tema) → initSettings()

---

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **JavaScript ES6+** - Lógica da aplicação (sem frameworks)
- **CSS3** - Estilização (presumivelmente em arquivos não rastreados)
- **localStorage API** - Persistência local
- **SVG** - Ícones dinâmicos

---

## Dados de Inicialização

### Treinos Padrão
```javascript
[
    { id: 1, name: 'Treino de pernas', category: 'Força', duration: 35, completed: true },
    { id: 2, name: 'Corrida leve', category: 'Cardio', duration: 25, completed: false },
    { id: 3, name: 'Alongamento matinal', category: 'Alongamento', duration: 20, completed: true }
]
```

### Horário Semanal Padrão
```javascript
Seg: Força
Ter: Cardio
Qua: Mobilidade
Qui: Força
Sex: Treino HIIT
```

### Metas
- **Treinos desta semana:** 5
- **Treinos semana anterior:** 3
- **Meta semanal:** 7

---

## Pontos de Integração para IA

### Para Análise de Código
1. Verificar função `handleWorkoutSubmit()` em ui.js
2. Verificar sincronização de cores entre theme.js e DOM
3. Verificar consistência de IDs de elementos HTML

### Para Melhorias
1. Sistema de usuários múltiplos
2. Backend de sincronização
3. Gráficos de progresso mais detalhados
4. Notificações/lembretes
5. Exportação de dados (CSV/PDF)

### Para Debugging
1. **localStorage** - Chaves: `fitnessapp.workouts`, `fitnessapp.colors`
2. **Console** - Avisos aparecem em caso de erro de armazenamento
3. **Seletores DOM** - Procurar por `id=` nos arquivos HTML

---

## Notas de Desenvolvimento

- Aplicação funciona offline (dados em localStorage)
- Sem dependências externas ou build process
- Pronto para abrir diretamente em navegador (file://)
- Responsive design presumido mas não confirmado
- Sistema de cores usa CSS custom properties (--variável)
- Nenhum framework de UI, DOM manipulation puro

---

## Sugestões para IA

Ao analisar ou melhorar este repositório:

1. **Valide** se todos os seletores HTML correspondem ao DOM real
2. **Teste** localStorage em localStorage vazio
3. **Verifique** compatibilidade de cores em diferentes navegadores
4. **Implemente** validação de entrada em formulários
5. **Adicione** testes unitários para funções de conversão de cor
6. **Documente** eventos customizados se houver
7. **Otimize** renderização de SVG para muitos ícones

---

**Documento gerado para facilitar compreensão por sistemas de IA.**
