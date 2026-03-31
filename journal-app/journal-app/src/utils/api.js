import axios from 'axios'

const api = axios.create({
  baseURL: "https://endearing-art-production-2419.up.railway.app",
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Is the backend running? 🤔')
    }
    if (!error.response) {
      throw new Error('Cannot reach server. Start your Spring Boot app on :8080 🚀')
    }
    const msg = error.response?.data?.message || error.response?.statusText || 'Something went wrong'
    throw new Error(msg)
  }
)

export const journalApi = {
  getAll: () => api.get(''),
  getById: (id) => api.get(`/id/${id}`),
  create: (data) => api.post('', data),
  update: (id, data) => api.put(`/id/${id}`, data),
  delete: (id) => api.delete(`/id/${id}`),
}