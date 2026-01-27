export default {
  index: {
    title: 'Bienvenido a',
    appName: 'Radar da Bagunça',
    description:
      'Plataforma para el seguimiento de la infraestructura urbana e implicación ciudadana.',
    btnStart: 'Empezar',
  },

  login: {
    title: 'Iniciar Sesión',
    noAccount: '¿No tienes una cuenta?',
    createAccount: 'Crear cuenta',
    email: 'Correo electrónico',
    password: 'Contraseña',
    btnEnter: 'Entrar',
    requiredEmail: 'El correo es obligatorio',
    requiredPassword: 'La contraseña es obligatória',
    success: '¡Bienvenida',
    fail: 'Correo o contraseña incorrectos.',
    error: 'Error al conectar con el servidor.',
  },

  dashboard: {
    greeting: 'Hola',
    today: 'Hoy',
    location: 'Usted está en',
    noAddress: 'Dirección no disponible',
    types: {
      1: 'Infraestructura',
      2: 'Limpieza',
      3: 'Iluminación',
      4: 'Saneamiento',
      5: 'Tránsito',
      general: 'General',
    },
    filter: {
      1: 'Todos los Reportes',
      2: 'Mis Reportes',
    },
    nothing: 'No se encontraron reportes.',
  },

  layout: {
    home: 'Inicio',
    alerts: 'Avisos',
    report: 'Reportar',
    settings: 'Ajustes',
    logout: 'Salir',
    confirm: '¿Realmente deseas salir de la aplicación?',
    success: 'Has cerrado sesión.',
    open: 'Abrir opción de salida',
    refresh: 'Actualizar la página',
  },
  register: {
    create: 'Crear cuenta',
    already: '¿Ya tienes una cuenta?',
    enter: 'Iniciar sesión',
    name: 'Nombre completo',
    password: 'Contraseña',
    register: 'Registrarse',
    success: '¡Usuario creado con éxito!',
    error: 'Error al crear el usuario.',
    requiredName: 'El nombre es obligatorio',
    requiredEmail: 'El correo electrónico es obligatorio',
    requiredPassword: 'La contraseña es obligatoria',
  },

  report: {
    title: 'Reportar un problema',
    choose: 'Elige una categoría:',
    help: '¡No sé en qué categoría encaja mi problema!',
    types: {
      1: 'Vías',
      2: 'Limpieza',
      3: 'Iluminación',
      4: 'Agua',
      5: 'Tránsito',
      general: 'General',
    },
    phototitle: 'Evidencias (Máx. 3)',
    description: '¿Qué ocurrió?',
    placeholder: "Ej.: 'El bache está oculto por un charco de agua'",
    requiredCategory: 'Seleccione una categoría',
    send: 'Enviar reporte',
    success: '¡Reporte enviado con éxito!',
    fail: 'Error al enviar el reporte',
    titleCancel: 'Confirmar cancelación',
    message: '¿Realmente deseas cancelar? Todos los datos ingresados y las fotos se perderán.',

    cancel: {
      label: 'No, continuar',
      photo: 'Eliminar foto tomada',
      description: 'Borrar descripción',
    },

    ok: {
      label: 'Sí, cancelar',
    },

    notify: {
      message: 'Reporte cancelado',
    },
    back: 'Volver al panel',
    close: 'Cerrar Reporte',
    takeaphoto: 'Tomar foto de la evidencia',
  },

  camera: {
    title: 'Tomar Foto',
    autoSaveHint: 'La imagen se guardará automáticamente en su reporte.',
    comp: {
      title: 'Coloque el problema en el centro',
      message: '¡Foto añadida!',
      load: 'Elegir de la Galería',
    },
  },
  common: {
    close: 'Cerrar',
    back: 'Volver',
    confirm: 'Confirmar',
  },

  admin: {
    news: 'Nuevos Hoy',
    critical: 'Críticos (+3 días)',
    analysis: 'En Análisis',
    total: 'Total General',
    view: 'Ver Incidencia',
    status: {
      1: 'Pendientes',
      2: 'En Análisis',
      3: 'Resueltos',
    },
    columns: {
      date: 'Fecha',
      type: 'Tipo',
      status: 'Estado',
    },
  },

  view: {
    date: 'Registrado el',
    photos: 'Evidencias',
    location: 'Ubicación',
    description: 'Descripción',
    update: 'Actualizar Incidencia',
    status: {
      1: {
        label: 'Pendiente',
        description: 'En espera de la revisión inicial del equipo.',
      },
      2: {
        label: 'En Análisis',
        description: 'Los técnicos están evaluando la solución.',
      },
      3: {
        label: 'Resuelto',
        description: 'El problema fue solucionado con éxito.',
      },
      confirm: '¡Estado actualizado!',
      confirmfail: 'Error al guardar.',
    },
  },
  categoryHelp: {
    title: '¿Cómo identificar la categoría?',
    cover: 'Qué abarca',
    items: {
      infrastructure: {
        title: 'Infraestructura Urbana',
        subtitle: 'Se centra en el mantenimiento físico de las vías.',
        description: 'Baches, aceras rotas, desagües y señalización.',
      },
      cleaning: {
        title: 'Limpieza y Medio Ambiente',
        subtitle: 'Salud pública y estética de la ciudad.',
        description: 'Basura irregular, escombros, poda de árboles y maleza alta.',
      },
      lighting: {
        title: 'Iluminación Pública',
        subtitle: 'Esencial para la seguridad nocturna.',
        description: 'Lámparas quemadas, postes caídos o zonas oscuras.',
      },
      sanitation: {
        title: 'Saneamiento y Agua',
        subtitle: 'Involucra la red de agua y alcantarillado.',
        description: 'Fugas, reflujo de alcantarillado o falta de suministro.',
      },
      traffic: {
        title: 'Movilidad y Tránsito',
        subtitle: 'Flujo de vehículos y peatones.',
        description: 'Semáforos dañados, autos abandonados o ciclovías obstruidas.',
      },
    },
  },
};
