import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema)

const seedProjects = [
	{
		id: "avto-test-plus-id",
		title: "Avto Test Plus",
		description: "Online platform for practicing Uzbekistan driving theory tests. Real questions, timer, and result tracking.",
		tags: ["React", "Vercel", "JavaScript", "Tailwind"],
		category: "Frontend",
		github: "https://github.com/sheronov-akbarali/avto-testplus01",
		live: "https://avto-testplus.vercel.app/"
	},
	{
		id: "exam-eight-id",
		title: "Online Exam Platform",
		description: "A secure and efficient web application for taking online examinations with user authentication and real-time grading.",
		tags: ["React", "Node.js", "Express", "MongoDB", "MUI"],
		category: "Full Stack",
		github: "https://github.com/sheronov-akbarali/exam-eight",
		live: "https://exam-eight-blond.vercel.app/login"
	},
	{
		id: "personal-portfolio-id",
		title: "Sheronov Akbarali Portfolio",
		description: "My personal developer portfolio website showcasing my professional skills, projects, and contact form, built with modern design principles.",
		tags: ["React", "Vite", "Tailwind CSS", "Three.js", "Framer Motion"],
		category: "Frontend",
		github: "https://github.com/sheronov-akbarali/Portfolio-web",
		live: "https://sheronovakbarali.uz/"
	}
]

async function seed() {
	// 1. Save to local JSON file
	const dataPath = path.join(__dirname, 'data/projects.json')
	fs.writeFileSync(dataPath, JSON.stringify(seedProjects, null, 2))
	console.log('Saved to local JSON store successfully.')

	// 2. Save to MongoDB
	if (!process.env.MONGODB_URI) {
		console.log('MONGODB_URI not found in env, skipping MongoDB seeding.')
		process.exit(0)
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log('Connected to MongoDB.')

		// Clear existing projects
		await ProjectModel.deleteMany({})
		console.log('Cleared existing projects in MongoDB.')

		// Insert seed projects
		await ProjectModel.insertMany(seedProjects)
		console.log('Inserted seed projects into MongoDB successfully.')
	} catch (error) {
		console.error('Error seeding MongoDB:', error.message)
	} finally {
		await mongoose.disconnect()
		process.exit(0)
	}
}

seed()
