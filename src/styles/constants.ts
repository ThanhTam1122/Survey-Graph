const sm = 600;
const md = 960;
const lg = 1280;

export const breakPoint = {
  sm,
  md,
  lg,
} as const;

const toast = 1400;

export const zIndex = {
  toast,
} as const;

const headerBgColor = '#b7b4b4';

const alertInfoBgColor = '#e5f6fd';
const alertInfoColor = '#03a9f4';
const alertErrorBgColor = '#fdeded';
const alertErrorColor = '#ef5350';

export const colors = {
  headerBgColor,
  alertInfoBgColor,
  alertInfoColor,
  alertErrorBgColor,
  alertErrorColor,
} as const;
