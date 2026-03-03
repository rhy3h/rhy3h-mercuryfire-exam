import axios from 'axios'
import type { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    interviewerName: import.meta.env.VITE_INTERVIEWER_NAME,
  },
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 'Network Error'
    const message = error.response?.data?.message ?? error.message
    return Promise.reject(new Error(`[${status}] ${message}`))
  },
)

export const httpClient = {
  get: <T>(path: string, params?: Record<string, string | undefined>) =>
    instance.get<T>(path, { params }).then((res) => res.data),

  post: <T>(path: string, body: unknown) => instance.post<T>(path, body).then((res) => res.data),

  patch: <T>(path: string, body: unknown) => instance.patch<T>(path, body).then((res) => res.data),

  delete: <T>(path: string) => instance.delete<T>(path).then((res) => res.data),
}

export { instance as axiosInstance }
