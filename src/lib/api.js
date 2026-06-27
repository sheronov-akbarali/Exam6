import axios from 'axios'

let baseURL = import.meta.env.VITE_API_URL || '/api'
if (baseURL.startsWith('http') && !baseURL.endsWith('/api') && !baseURL.endsWith('/api/')) {
	baseURL = baseURL.replace(/\/$/, '') + '/api'
}

const api = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
})

export const fetchProjects = () => api.get('/projects').then(res => res.data)
export const fetchProjectById = id =>
	api.get(`/projects/${id}`).then(res => res.data)
export const createProject = project =>
	api.post('/projects', project).then(res => res.data)
export const updateProject = (id, project) =>
	api.put(`/projects/${id}`, project).then(res => res.data)
export const deleteProject = id =>
	api.delete(`/projects/${id}`).then(res => res.data)

export default api
