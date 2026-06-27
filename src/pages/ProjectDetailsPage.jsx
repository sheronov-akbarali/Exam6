import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { fetchProjectById } from '../lib/api'

export default function ProjectDetailsPage() {
	const { t } = useTranslation()
	const { id } = useParams()
	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', id],
		queryFn: () => fetchProjectById(id),
		enabled: Boolean(id),
	})

	const project = useMemo(() => data ?? null, [data])

	return (
		<div className='relative bg-page min-h-screen text-white'>
			<Navbar />
			<main className='pt-24 px-6 pb-24 max-w-5xl mx-auto'>
				<Link
					to='/projects'
					className='text-sm text-white/35 hover:text-white transition-colors'
				>
					{t('projectDetails.back')}
				</Link>

				{isLoading && (
					<div className='mt-8 text-white/45'>
						{t('projectDetails.loading')}
					</div>
				)}

				{isError && (
					<div className='mt-8 text-red-400'>{t('projectDetails.error')}</div>
				)}

				{project && (
					<motion.article
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						className='mt-8 border border-white/[0.08] bg-card p-8'
					>
						<div className='flex flex-wrap items-center justify-between gap-4'>
							<div>
								<p className='text-[10px] tracking-[0.4em] uppercase text-white/25'>
									{t('projectDetails.heading')}
								</p>
								<h1 className='text-3xl font-bold mt-2'>{project.title}</h1>
							</div>
							<span className='px-3 py-1 border border-white/[0.08] text-xs uppercase tracking-[0.2em] text-white/35'>
								{project.category || t('projectDetails.featured')}
							</span>
						</div>

						<p className='mt-6 text-sm leading-relaxed text-white/45'>
							{project.description}
						</p>

						<div className='mt-6 flex flex-wrap gap-2'>
							{(project.tags || []).map(tag => (
								<span
									key={tag}
									className='px-3 py-1 text-sm border border-white/[0.08] text-white/40'
								>
									{tag}
								</span>
							))}
						</div>

						<div className='mt-8 flex flex-wrap gap-3'>
							{project.github && (
								<a
									href={project.github}
									target='_blank'
									rel='noreferrer'
									className='px-4 py-2 border border-white/[0.08] text-sm'
								>
									GitHub
								</a>
							)}
							{project.live && (
								<a
									href={project.live}
									target='_blank'
									rel='noreferrer'
									className='px-4 py-2 bg-white text-black text-sm'
								>
									{t('projectDetails.liveDemo')}
								</a>
							)}
						</div>
					</motion.article>
				)}
			</main>
			<Footer />
		</div>
	)
}
