// api.js (or wherever you have your axios setup)
import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

// Add a request interceptor
Api.interceptors.request.use(
  (config) => {
    // Check if the request is for the login endpoint
    if (config.url && !config.url.includes('/login')) { // Adjust the path as necessary
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
