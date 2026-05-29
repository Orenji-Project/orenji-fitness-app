# Resumo dos ficheiros - Orenji Fitness

Este projeto é uma app web estática de fitness feita com HTML, CSS e JavaScript vanilla. A app permite ver uma página inicial, gerir treinos, consultar um resumo de progresso e personalizar o tema visual. Os dados dos treinos e das cores ficam guardados no `localStorage` do navegador.

## Páginas HTML

### `index.html`
Página de entrada da aplicação. Mostra a apresentação principal do Orenji Fitness, com uma mensagem de boas-vindas, botões para ir para treinos e resumo, cartões de funcionalidades e o cabeçalho de navegação.

### `inicio.html`
Dashboard principal da app. Mostra uma saudação personalizada, a agenda semanal de treinos e uma área de condicionamento físico que indica quantos treinos da semana foram concluídos.

### `treinos.html`
Página de gestão de treinos. Mostra a lista de treinos registados, permite adicionar novos treinos através de um formulário e permite alternar o estado de cada treino entre pendente e concluído.

### `resumo.html`
Página de estatísticas. Mostra o total de treinos registados, o total de minutos treinados, a percentagem de conclusão e barras de progresso.

### `configuracoes.html`
Página de configurações da aplicação. Permite escolher presets de tema, alterar cores manualmente, ajustar textura, forma dos cartões, sombra e densidade da interface. Também mostra informações sobre a versão, atualização e desenvolvedor.

## JavaScript

### `js/app.js`
Script de arranque global. Quando a página carrega, marca no menu o link da página atual e chama `initWorkoutApp()` quando essa função existe.

### `js/data.js`
Contém dados iniciais da aplicação:
- treinos pré-definidos;
- nome do utilizador;
- agenda semanal;
- comparação semanal de progresso.

### `js/storage.js`
Controla a persistência dos treinos no `localStorage`. Tem funções para carregar, guardar, inicializar e adicionar treinos.

### `js/ui.js`
Contém a lógica principal da interface. Renderiza a página inicial, agenda semanal, ícones de treino, lista de treinos, formulário de novo treino, alternância de estado dos treinos e resumo de estatísticas.

### `js/theme.js`
Define o sistema de temas da app. Gere as cores padrão, converte cores, calcula contraste/luminância, aplica variáveis CSS no documento e guarda/restaura as preferências visuais no `localStorage`.

### `js/settings.js`
Controla a página de configurações. Define os presets de tema, liga os botões de modo básico/avançado, atualiza a pré-visualização das cores, aplica opções de aparência e guarda ou restaura o tema.

## CSS

### `css/style.css`
Folha de estilos principal. Define o layout global, cabeçalho, navegação, cartões, botões, páginas de início, treinos e resumo, barras de progresso, agenda semanal e regras responsivas.

### `css/settings.css`
Estilos específicos da página de configurações. Define a grelha de opções, cartões de tema, seletores de cor, presets, botões de aparência, pré-visualização e adaptação mobile.

## Assets

### `assets/logo.png`
Logo principal usado no cabeçalho e como ícone da aplicação nas páginas HTML.

### `assets/logo.jpeg`
Versão JPEG do logo, mantida como asset adicional.

### `assets/theme-orenji.jpeg`
Imagem usada como amostra visual do preset de tema Orenji na página de configurações.

### `favicon.svg`
Ícone SVG alternativo da aplicação.

## Documentação e configuração

### `README.md`
Documentação curta do projeto. Explica o nome da app, objetivo, desenvolvedor, versão e como abrir a app no navegador.

### `REPO_OVERVIEW.md`
Documento mais detalhado com visão geral do repositório, funcionalidades, estrutura, arquitetura e notas técnicas.

### `.gitignore`
Lista ficheiros e pastas que o Git deve ignorar, como `node_modules`, ambientes Python, builds, ficheiros de IDE e ficheiros do sistema operativo.

## Resumo rápido da arquitetura

A app não usa backend nem dependências externas. Cada página HTML carrega os scripts necessários diretamente. Os treinos são guardados no navegador através de `localStorage`, e o tema visual é aplicado com variáveis CSS definidas dinamicamente por JavaScript. A navegação entre páginas é feita por links HTML normais.
