export default {
  index: {
    title: 'Welcome to',
    appName: 'Radar da Bagunça',
    description: 'Platform for urban infrastructure monitoring and citizen engagement.',
    btnStart: 'Get Started',
  },

  login: {
    title: 'Login',
    noAccount: "Don't have an account?",
    createAccount: 'Sign up',
    email: 'Email',
    password: 'Password',
    btnEnter: 'Sign In',
    requiredEmail: 'Email is required',
    requiredPassword: 'Password is required',
    success: 'Welcome',
    fail: 'Incorrect email or password.',
    error: 'Error connecting to the server.',
  },

  dashboard: {
    greeting: 'Hello',
    today: 'Today',
    location: 'You are in',
    noAddress: 'Address not available',
    types: {
      1: 'Infrastructure',
      2: 'Cleaning',
      3: 'Lighting',
      4: 'Sanitation',
      5: 'Traffic',
      general: 'General',
    },
    filter: {
      1: 'All Reports',
      2: 'My Reports',
    },
    nothing: 'No reports found.',
  },

  layout: {
    home: 'Home',
    alerts: 'Alerts',
    report: 'Report',
    settings: 'Settings',
    logout: 'Logout',
    confirm: 'Do you really want to leave the application?',
    success: 'You have logged out of your account.',
    open: 'Open exit option',
    refresh: 'Refresh page',
  },
  register: {
    create: 'Create Account',
    already: 'Already have an account?',
    enter: 'Sign in',
    name: 'Full Name',
    password: 'Password',
    register: 'Register',
    success: 'User created successfully!',
    error: 'Error creating user.',
    requiredName: 'Name is required',
    requiredEmail: 'Email is required',
    requiredPassword: 'Password is required',
  },

  report: {
    title: 'Report a Problem',
    choose: 'Choose a category:',
    help: 'I’m not sure which category my problem fits into!',
    types: {
      1: 'Roads',
      2: 'Cleaning',
      3: 'Lighting',
      4: 'Water',
      5: 'Traffic',
      general: 'General',
    },
    phototitle: 'Evidence (Max 3)',
    description: 'What happened?',
    placeholder: "e.g.: 'The pothole is hidden by a puddle of water'",
    requiredCategory: 'Select a category',
    send: 'Submit Report',
    success: 'Report submitted successfully!',
    fail: 'Error sending report',
    titleCancel: 'Confirm cancellation',
    message: 'Do you really want to cancel? All entered data and photos will be lost.',

    cancel: {
      label: 'No, continue',
      photo: 'Delete taken photo',
      description: 'Clear description',
    },

    ok: {
      label: 'Yes, cancel',
    },

    notify: {
      message: 'Report canceled',
    },

    back: 'Back to dashboard',
    close: 'Close Report',
    takeaphoto: 'Take evidence photo',
  },

  camera: {
    title: 'Take Photo',
    autoSaveHint: 'The image will be automatically saved to your report.',
    comp: {
      title: 'Position the issue in the center',
      message: 'Photo added!',
      load: 'Choose from Gallery',
    },
  },
  common: {
    close: 'Close',
    back: 'Back',
    confirm: 'Confirm',
  },

  admin: {
    news: 'New Today',
    critical: 'Critical (+3 days)',
    analysis: 'Under Review',
    total: 'Overall Total',
    view: 'View Report',
    status: {
      1: 'Pending',
      2: 'Under Review',
      3: 'Resolved',
    },
    columns: {
      date: 'Date',
      type: 'Type',
      status: 'Status',
    },
  },

  view: {
    date: 'Registered on',
    photos: 'Evidence',
    location: 'Location',
    description: 'Description',
    update: 'Update Report',
    status: {
      1: {
        label: 'Pending',
        description: 'Waiting for initial team screening.',
      },
      2: {
        label: 'Under Review',
        description: 'Technicians are evaluating the solution.',
      },
      3: {
        label: 'Resolved',
        description: 'The issue has been successfully resolved.',
      },
      confirm: 'Status updated!',
      confirmfail: 'Error while saving.',
    },
  },

  categoryHelp: {
    title: 'How to identify the category?',
    cover: 'What it includes',
    items: {
      infrastructure: {
        title: 'Urban Infrastructure',
        subtitle: 'Focuses on physical road maintenance.',
        description: 'Potholes, broken sidewalks, drains, and signage.',
      },
      cleaning: {
        title: 'Cleaning and Environment',
        subtitle: 'Public health and city appearance.',
        description: 'Illegal trash dumping, debris, tree pruning, and overgrown grass.',
      },
      lighting: {
        title: 'Public Lighting',
        subtitle: 'Essential for nighttime safety.',
        description: 'Burned-out lamps, fallen poles, or dark areas.',
      },
      sanitation: {
        title: 'Sanitation and Water',
        subtitle: 'Involves water and sewage systems.',
        description: 'Leaks, sewage backflow, or water supply outages.',
      },
      traffic: {
        title: 'Mobility and Traffic',
        subtitle: 'Vehicle and pedestrian flow.',
        description: 'Broken traffic lights, abandoned cars, or blocked bike lanes.',
      },
    },
  },
};
