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
		id: { type: String, required: true, unique: true },
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
			const mappedProjects = allProjects.map(p => ({
				...p,
				id: p.id || p._id.toString(),
			}))
			return res.json(mappedProjects)
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
			const doc = created.toObject ? created.toObject() : created
			return res.status(201).json({
				...doc,
				id: doc.id || doc._id.toString(),
			})
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
			let project = await ProjectModel.findOne({ id: req.params.id }).lean()
			if (!project && mongoose.Types.ObjectId.isValid(req.params.id)) {
				project = await ProjectModel.findById(req.params.id).lean()
			}
			if (project) {
				return res.json({
					...project,
					id: project.id || project._id.toString(),
				})
			}
			return res.status(404).json({ message: 'Not found' })
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
			let updated = await ProjectModel.findOneAndUpdate(
				{ id: req.params.id },
				req.body,
				{ new: true, runValidators: true },
			).lean()
			if (!updated && mongoose.Types.ObjectId.isValid(req.params.id)) {
				updated = await ProjectModel.findByIdAndUpdate(
					req.params.id,
					req.body,
					{ new: true, runValidators: true },
				).lean()
			}
			if (updated) {
				return res.json({
					...updated,
					id: updated.id || updated._id.toString(),
				})
			}
			return res.status(404).json({ message: 'Not found' })
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
			let deleted = await ProjectModel.findOneAndDelete({ id: req.params.id })
			if (!deleted && mongoose.Types.ObjectId.isValid(req.params.id)) {
				deleted = await ProjectModel.findByIdAndDelete(req.params.id)
			}
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


// Connect to MongoDB immediately
connectMongo().then(connected => {
	usingMongo = connected
})

// Only listen if not running as a Vercel serverless function
if (!process.env.VERCEL) {
	app.listen(PORT, () => {
		console.log(`API server listening on http://localhost:${PORT}`)
	})
}

export default app
