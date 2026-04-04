import axios from 'axios'

const api = axios.create({
baseURL: 'https://journal-app-backend-kp5d.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out.')
    }
    if (!error.response) {
      throw new Error('Cannot reach server.')
    }
    const msg = error.response?.data?.message || error.response?.statusText || 'Something went wrong'
    throw new Error(msg)
  }
)

export const journalApi = {
  getAll: () => api.get('/journal'),
  getById: (id) => api.get(`/journal/id/${id}`),
  create: (data) => api.post('/journal', data),
  update: (id, data) => api.put(`/journal/id/${id}`, data),
  delete: (id) => api.delete(`/journal/id/${id}`),
}