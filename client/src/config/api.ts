// API configuration for different environments
const getApiUrl = () => {
  // Development environment
  if (import.meta.env.DEV) {
    return '';
  }
  
  // Netlify deployment
  if (window.location.hostname.includes('netlify')) {
    return '';
  }
  
  // Custom domain
  return '';
};

export const API_BASE_URL = getApiUrl();