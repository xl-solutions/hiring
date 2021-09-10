const uiColors = {
  'success-default': '#2BAF1F',
  'success-lighter': '#F2FCF0',

  'info-default': '#0497F9',
  'info-lighter': '#F2FAFC',

  'warning-default': '#FFBF00',
  'warning-lighter': '#FFFAF2',

  'danger-default': '#F53636',
  'danger-lighter': '#FFF5F7',

  'white-default': 'rgba(255, 255, 255, 1)',
  'back-default': 'rgba(0, 0, 0, 1)',
};

const neutralColors = {
  dark: {
    'dark-darker': '#1E1E26',
    'dark-dark': '#2C2C36',
    'dark-default': '#3D3D4A',

    'dark-light': '#565666',
    'dark-lighter': 'rgba(114, 114, 133, 1)',
    'dark-disable': 'rgba(230, 230, 235, 1)',
  },
  light: {
    'light-darker': '#B2B2BD',
    'light-disabled': '#CECED6',
    'light-default': '#E6E6EB',

    'light-light': '#F0F0F5',
    'light-lighter': '#FAFAFC',
  },
};

const gridScale = {
  xxxs: 8,
  xxs: 12,
  xs: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 36,
  full: 100,
  display: 40,
  '1/3': 33.33,
};

const componentScale = {
  total: 100,
  '1/4': 33.33,

  'card-width-default': 100,
  'card-width-small-x': 60,
  'card-width-small': 80,
  'card-width-medium': 136,
  'card-width-large': 247,

  'card-height-default': 100,
  'card-height-small-x': 72,
  'card-height-small': 80,
  'card-height-medium': 120,
  'card-height-large': 184,
  'card-border-color': 'rgba(240, 240, 245, 1)',

  'card-status-height': 184,
  'card-store-height': 256,

  'card-banner-width': 247,
  'card-banner-height': 120,

  'button-width-small': 88,
  'button-width': 160,
  'button-height': 48,
  'button-padding-vertical': 8,
  'button-padding-horizontal': 16,

  'radius-small': 6,
  'radius-medium': 12,
  'radius-large': 500,
};

const fonts = {
  Regular: 'IBMPlexSans_400Regular',
  Medium: 'IBMPlexSans_500Medium',
  SemiBold: 'IBMPlexSans_600SemiBold',
  Bold: 'IBMPlexSans_700Bold',
};

const fontScale = {
  tagline: 10,
  caption: 11,
  xxxs: 12,
  xxs: 14,
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 36,
  display: 40,
};

export const theme = {
  card: {
    paddingDefault: gridScale.md,
    paddingSmall: gridScale.xxs,
    paddingLarge: gridScale.xxl,

    borderRadius: componentScale['radius-medium'],
    borderRadiusSmall: componentScale['radius-small'],
    borderRadiusLarge: componentScale['radius-large'],

    backgroundDefault: uiColors['white-default'],
    backgroundDanger: uiColors['danger-default'],
    backgroundDangerLighter: uiColors['danger-lighter'],

    backgroundSuccess: uiColors['success-default'],
    backgroundSuccessLighter: uiColors['success-lighter'],

    backgroundLighter: neutralColors.light['light-light'],
    backgroundDart: neutralColors.dark['dark-dark'],
  },
  screen: {
    background: uiColors['white-default'],

    paddingSmall: gridScale.xs,
    paddingDefault: gridScale.md,
    paddingLarge: gridScale.lg,
  },
  statusBar: {
    backgroundDefault: uiColors['white-default'],
    backgroundBack: uiColors['back-default'],
  },

  uiColors,
  neutralColors,
  fontScale,
  fonts,
};
