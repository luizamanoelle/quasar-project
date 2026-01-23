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
  },

  layout: {
    home: 'Início',
    alerts: 'Avisos',
    report: 'Reportar',
    settings: 'Ajustes',
    logout: 'Sair',
    confirm: 'Deseja realmente sair do aplicativo?',
    success: 'Voce saiu da conta.',
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
    },

    ok: {
      label: 'Sim, cancelar',
    },

    notify: {
      message: 'Ocorrência cancelada',
    },
  },
};
