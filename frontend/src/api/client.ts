import axios from 'axios'
import { getAccessToken } from '../utils/authToken'

/**
 * Dev: Vite proxy `/messages`, `/auth` → `http://localhost:8080`
 * Prod: same-origin or set VITE_API_BASE_URL
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
