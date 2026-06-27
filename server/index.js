import cors from 'cors'
import { config } from 'dotenv'
/* global process */

import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 5000
const dataPath = path.join(__dirname, 'data/projects.json')

app.use(cors())
app.use(express.json())

let projects = loadProjects()

function loadProjects() {
	if (!fs.existsSync(dataPath)) {
		return []
	}
	try {
		return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
	} catch (error) {
		console.warn('Using empty project store due to parse error:', error.message)
		return []
	}
}

function saveProjects(nextProjects) {
	fs.writeFileSync(dataPath, JSON.stringify(nextProjects, null, 2))
	projects = nextProjects
}

function buildProject(payload) {
	return {
		id: crypto.randomUUID(),
		title: payload.title,
		description: payload.description,
		tags: payload.tags || [],
		category: payload.category || 'General',
		github: payload.github || '',
		live: payload.live || '',
	}
}

const projectSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		tags: [String],
		category: String,
		github: String,
		live: String,
	},
	{ timestamps: true },
)

const ProjectModel =
	mongoose.models.Project || mongoose.model('Project', projectSchema)

async function connectMongo() {
	if (!process.env.MONGODB_URI) {
		return false
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log('MongoDB connected')
		return true
	} catch (error) {
		console.warn('MongoDB unavailable, using local JSON store:', error.message)
		return false
	}
}

let usingMongo = false

// Serve static assets from frontend build directory
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/api/projects', async (_req, res) => {
	try {
		if (usingMongo) {
			const allProjects = await ProjectModel.find().lean()
			return res.json(allProjects)
		}
	} catch (error) {
		console.error('Failed to fetch from MongoDB, falling back to local JSON:', error.message)
	}
	res.json(projects)
})

app.post('/api/projects', async (req, res) => {
	const payload = req.body || {}
	const project = buildProject(payload)

	try {
		if (usingMongo) {
			const created = await ProjectModel.create(project)
			return res.status(201).json(created)
		}
	} catch (error) {
		console.error('Failed to create in MongoDB, falling back to local JSON:', error.message)
	}

	const nextProjects = [project, ...projects]
	saveProjects(nextProjects)
	res.status(201).json(project)
})

app.get('/api/projects/:id', async (req, res) => {
	try {
		if (usingMongo) {
			const project = await ProjectModel.findById(req.params.id).lean()
			return project
				? res.json(project)
				: res.status(404).json({ message: 'Not found' })
		}
	} catch (error) {
		console.error('Failed to get from MongoDB, falling back to local JSON:', error.message)
	}

	const project = projects.find(item => item.id === req.params.id)
	return project
		? res.json(project)
		: res.status(404).json({ message: 'Not found' })
})

app.put('/api/projects/:id', async (req, res) => {
	try {
		if (usingMongo) {
			const updated = await ProjectModel.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true, runValidators: true },
			)
			return updated
				? res.json(updated)
				: res.status(404).json({ message: 'Not found' })
		}
	} catch (error) {
		console.error('Failed to update in MongoDB, falling back to local JSON:', error.message)
	}

	const index = projects.findIndex(item => item.id === req.params.id)
	if (index === -1) return res.status(404).json({ message: 'Not found' })
	const updatedProject = { ...projects[index], ...req.body }
	const nextProjects = [...projects]
	nextProjects[index] = updatedProject
	saveProjects(nextProjects)
	res.json(updatedProject)
})

app.delete('/api/projects/:id', async (req, res) => {
	try {
		if (usingMongo) {
			const deleted = await ProjectModel.findByIdAndDelete(req.params.id)
			return deleted
				? res.json({ deleted: true })
				: res.status(404).json({ message: 'Not found' })
		}
	} catch (error) {
		console.error('Failed to delete in MongoDB, falling back to local JSON:', error.message)
	}

	const nextProjects = projects.filter(item => item.id !== req.params.id)
	if (nextProjects.length === projects.length)
		return res.status(404).json({ message: 'Not found' })
	saveProjects(nextProjects)
	res.json({ deleted: true })
})

// Handle client-side routing, return index.html for all non-API paths
app.get(/.*/, (req, res, next) => {
	if (req.path.startsWith('/api')) {
		return next()
	}
	const indexFile = path.join(distPath, 'index.html')
	if (fs.existsSync(indexFile)) {
		res.sendFile(indexFile)
	} else {
		res.status(404).send('Frontend build not found. Run npm run build first.')
	}
})


app.listen(PORT, async () => {
	usingMongo = await connectMongo()
	console.log(`API server listening on http://localhost:${PORT}`)
})
