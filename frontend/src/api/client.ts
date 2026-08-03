import axios from 'axios'

/**
 * Dev: Vite proxy `/messages` → `http://localhost:8080`
 * Prod: same-origin or set VITE_API_BASE_URL
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})
