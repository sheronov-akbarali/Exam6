import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || '/api',
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
