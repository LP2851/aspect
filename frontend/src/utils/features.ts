export const isFeatureYouTubeEnabled = () =>
  import.meta.env.VITE_ENABLE_YOUTUBE === "true";
export const isFeatureTikTokEnabled = () =>
  import.meta.env.VITE_ENABLE_TIKTOK === "true";
export const isFeatureInstagramEnabled = () =>
  import.meta.env.VITE_ENABLE_INSTAGRAM === "true";
export const isFeatureFacebookEnabled = () =>
  import.meta.env.VITE_ENABLE_FACEBOOK === "true";
export const isFeatureXEnabled = () => import.meta.env.VITE_ENABLE_X === "true";
