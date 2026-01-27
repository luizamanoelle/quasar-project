export default {
  index: {
    title: 'Bem-vindo ao',
    appName: 'Radar da Bagunça',
    description: 'Plataforma para monitoramento de infraestrutura urbana e engajamento cidadão.',
    btnStart: 'Começar',
  },

  login: {
    title: 'Entrar',
    noAccount: 'Não tem uma conta?',
    createAccount: 'Criar conta',
    email: 'E-mail',
    password: 'Senha',
    btnEnter: 'Entrar',
    requiredEmail: 'E-mail é obrigatório',
    requiredPassword: 'Senha é obrigatória',
    success: 'Bem-vinda',
    fail: 'E-mail ou senha incorretos.',
    error: 'Erro ao conectar com o servidor.',
  },

  dashboard: {
    greeting: 'Olá',
    today: 'Hoje',
    location: 'Você está em',
    noAddress: 'Endereço não disponível',
    types: {
      1: 'Infraestrutura',
      2: 'Limpeza',
      3: 'Iluminação',
      4: 'Saneamento',
      5: 'Trânsito',
      general: 'Geral',
    },
    filter: {
      1: 'Todos os Relatos',
      2: 'Meus Relatos',
    },
    nothing: 'Nenhum relato encontrado.',
  },

  layout: {
    home: 'Início',
    alerts: 'Avisos',
    report: 'Reportar',
    settings: 'Ajustes',
    logout: 'Sair',
    confirm: 'Deseja realmente sair do aplicativo?',
    success: 'Voce saiu da conta.',
    open: 'Abrir opção de sair',
    refresh: 'Atualizar a página',
  },

  register: {
    create: 'Criar Conta',
    already: 'Já tem uma conta?',
    enter: 'Entrar',
    name: 'Nome Completo',
    password: 'Senha',
    register: 'Cadastrar',
    success: 'Usuário criado com sucesso!',
    error: 'Erro ao criar usuário.',
    requiredName: 'Nome é obrigatório',
    requiredEmail: 'E-mail é obrigatório',
    requiredPassword: 'Senha é obrigatória',
  },

  report: {
    title: 'Reportar Problema',
    choose: 'Escolha a categoria:',
    help: ' Não sei em qual categoria se encaixa meu problema!',
    types: {
      1: 'Vias',
      2: 'Limpeza',
      3: 'Luz',
      4: 'Agua',
      5: 'Trânsito',
      general: 'Geral',
    },
    phototitle: 'Evidências (Máx 3)',
    description: 'O que aconteceu?',
    placeholder: "Ex: 'O buraco está escondido por uma poça dágua'",
    requiredCategory: 'Selecione uma categoria',
    send: 'Enviar Relato',
    success: 'Relato enviado com sucesso!',
    fail: 'Erro ao enviar',
    titleCancel: 'Confirmar cancelamento',
    message: 'Deseja realmente cancelar? Todos os dados preenchidos e fotos serão perdidos.',

    cancel: {
      label: 'Não, continuar',
      photo: 'Excluir foto tirada',
      description: 'Apagar descrição',
    },

    ok: {
      label: 'Sim, cancelar',
    },

    notify: {
      message: 'Ocorrência cancelada',
    },

    back: 'Voltar para o dashboard',
    close: 'Fechar Relato',
    takeaphoto: 'Tirar foto da evidência',
  },

  camera: {
    title: 'Tirar Foto',
    autoSaveHint: 'A imagem será salva automaticamente no seu relato.',
    comp: {
      title: ' Posicione o problema no centro',
      message: 'Foto adicionada!',
      load: 'Escolher da Galeria',
    },
  },
  common: {
    close: 'Fechar',
    back: 'Voltar',
    confirm: 'Confirmar',
  },

  admin: {
    news: 'Novos Hoje',
    critical: 'Críticos (+3 dias)',
    analysis: 'Em Análise',
    total: 'Total Geral',
    view: 'Visualizar Ocorrência',
    status: {
      1: 'Pendentes',
      2: 'Em Análise',
      3: 'Resolvidos',
    },
    columns: {
      date: 'Data',
      type: 'Tipo',
      status: 'Status',
    },
  },

  view: {
    date: 'Registrado em',
    photos: 'Evidências',
    location: 'Localização',
    description: 'Descrição',
    update: 'Atualizar Ocorrência',
    status: {
      1: {
        label: 'Pendente',
        description: 'Aguardando triagem inicial da equipe.',
      },
      2: {
        label: 'Em Análise',
        description: 'Técnicos avaliando a solução.',
      },
      3: {
        label: 'Resolvido',
        description: 'O problema foi solucionado com sucesso.',
      },

      confirm: 'Status atualizado!',
      confirmfail: 'Erro ao salvar.',
    },
  },

  categoryHelp: {
    title: 'Como saber a categoria?',
    cover: 'O que abrange',
    items: {
      infrastructure: {
        title: 'Infraestrutura Urbana',
        subtitle: 'Foca na manutenção física das vias.',
        description: 'Buracos no asfalto, calçadas quebradas, bueiros e sinalização.',
      },
      cleaning: {
        title: 'Limpeza e Meio Ambiente',
        subtitle: 'Saúde pública e estética da cidade.',
        description: 'Lixo irregular, entulho, poda de árvores e mato alto.',
      },
      lighting: {
        title: 'Iluminação Pública',
        subtitle: 'Essencial para a segurança à noite.',
        description: 'Lâmpadas queimadas, postes caídos ou trechos às escuras.',
      },
      sanitation: {
        title: 'Saneamento e Água',
        subtitle: 'Envolve a rede de águas e esgoto.',
        description: 'Vazamentos, refluxo de esgoto ou falta de abastecimento.',
      },
      traffic: {
        title: 'Mobilidade e Trânsito',
        subtitle: 'Fluxo de veículos e pedestres.',
        description: 'Semáforos estragados, carros abandonados ou ciclovias obstruídas.',
      },
    },
  },
};
