const isEnabled = (value: string | undefined) => value === "true";

export const isFeatureYouTubeEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_YOUTUBE);
export const isFeatureTikTokEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_TIKTOK);
export const isFeatureInstagramEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_INSTAGRAM);
export const isFeatureFacebookEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_FACEBOOK);
export const isFeatureXEnabled = () => isEnabled(import.meta.env.VITE_ENABLE_X);

export const isFeatureLocalProjectFileSourceEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_LOCAL_PROJECT_FILE_SOURCE);

export const isFeatureFiltersEnabled = () =>
  isEnabled(import.meta.env.VITE_ENABLE_FILTERS);
