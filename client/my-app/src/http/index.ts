import axios from 'axios';
import { AuthResponse } from '../models/AuthResponse';

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const renewRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      renewRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refreah`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return api.request(renewRequest);
      } catch (error) {
        console.log(' notAuthorized user');
      }
    }

    throw error;
  }
);

export default api;
