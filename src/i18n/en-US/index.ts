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
  },

  layout: {
    home: 'Home',
    alerts: 'Alerts',
    report: 'Report',
    settings: 'Settings',
    logout: 'Logout',
    confirm: 'Do you really want to leave the application?',
    success: 'You have logged out of your account.',
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
    },

    ok: {
      label: 'Yes, cancel',
    },

    notify: {
      message: 'Report canceled',
    },
  },
};
