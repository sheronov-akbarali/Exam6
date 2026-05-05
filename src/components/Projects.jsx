import ScrollReveal3D from './ScrollReveal3D'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Avto Test Plus',
    description: 'Online platform for practicing Uzbekistan driving theory tests. Real test questions, timer, and result tracking.',
    tags: ['React', 'Vercel', 'JavaScript', 'Tailwind'],
    icon: null,
    logo: '/avto-log.png',
    gradient: 'linear-gradient(135deg, #141414 0%, #1c1c1c 100%)',
    github: 'https://github.com/sheronov-akbarali/avto-testplus01',
    live: 'https://avto-testplus.vercel.app/',
  },
  {
    title: 'E-Commerce App',
    description: 'Full-stack online store with product catalog, cart, and payment integration. Built as a freelance project for a real client.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    icon: '🛒',
    gradient: 'linear-gradient(135deg, #141414 0%, #1c1c1c 100%)',
    github: 'https://github.com/sheronov-akbarali/E-Commerce-App',
    live: 'https://e-commerce-app-eta-rosy.vercel.app/',
  },
  {
    title: 'Task Manager',
    description: 'Productivity app with drag-and-drop boards, real-time updates, and user authentication. Inspired by Trello.',
    tags: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    icon: '◈',
    gradient: 'linear-gradient(135deg, #111 0%, #181818 100%)',
    github: 'https://github.com/sheronov-akbarali/task-manager',
    live: 'https://task-manager-phi-one-26.vercel.app/',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather app with 7-day forecast, interactive charts, and location-based data using OpenWeatherMap API.',
    tags: ['React', 'Tailwind', 'REST API', 'Chart.js'],
    icon: '◎',
    gradient: 'linear-gradient(135deg, #131313 0%, #1a1a1a 100%)',
    github: 'https://github.com/sheronov-akbarali/weather',
    live: 'https://weather-gules-one-31.vercel.app/',
  },
]

const dirs = ['up','left','right','flip','left','zoom']

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-[#0c0c0c] relative">
      <div className="absolute top-0 left-6 right-6 h-px bg-white/[0.05]" />

      <div className="max-w-6xl mx-auto px-6">

        <ScrollReveal3D direction="flip" className="mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3">What I've built</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Projects</h2>
            <p className="text-xs text-white/20 max-w-xs font-light">
              Selected work — each one a different problem solved.
            </p>
          </div>
        </ScrollReveal3D>

        <div className="grid md:grid-cols-2 gap-3">
          {projects.map((p, i) => (
            <ScrollReveal3D key={p.title} direction={dirs[i % dirs.length]} delay={i * 0.06}>
              <ProjectCard project={p} />
            </ScrollReveal3D>
          ))}
        </div>

        <ScrollReveal3D direction="zoom" delay={0.15} className="flex justify-center mt-12">
          <a href="#"
            className="inline-flex items-center gap-3 px-7 py-3 border border-white/[0.08] text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 hover:border-white/15 transition-all duration-200">
            All projects
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </ScrollReveal3D>

      </div>
    </section>
  )
}
