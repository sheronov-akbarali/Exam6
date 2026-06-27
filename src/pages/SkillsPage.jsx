import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const skillGroups = [
	{
		title: 'Frontend',
		items: [
			'React',
			'TypeScript',
			'Redux Toolkit',
			'TanStack Query',
			'React Router',
			'Tailwind',
		],
	},
	{
		title: 'Backend',
		items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT', 'Validation'],
	},
	{
		title: 'Product',
		items: [
			'UI/UX',
			'Animation',
			'Responsive Design',
			'SEO Basics',
			'Accessibility',
		],
	},
]

export default function SkillsPage() {
	const { t } = useTranslation()

	return (
		<div className='relative bg-page min-h-screen text-white'>
			<Navbar />
			<main className='pt-24 px-6 pb-24 max-w-6xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-10'
				>
					<p className='text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3'>
						{t('projects.title')}
					</p>
					<h1 className='text-3xl md:text-4xl font-bold'>
						{t('skills.title')}
					</h1>
					<p className='mt-3 max-w-2xl text-sm text-white/35'>
						{t('skills.subtitle')}
					</p>
				</motion.div>

				<div className='grid md:grid-cols-3 gap-4'>
					{skillGroups.map(group => (
						<motion.div
							key={group.title}
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							className='border border-white/[0.08] bg-card p-6 rounded-sm'
						>
							<h2 className='text-lg font-semibold mb-4'>{group.title}</h2>
							<div className='flex flex-wrap gap-2'>
								{group.items.map(item => (
									<span
										key={item}
										className='px-3 py-1 text-sm text-white/55 border border-white/[0.08]'
									>
										{item}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	)
}
