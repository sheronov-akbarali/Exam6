import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { fetchProjects } from '../lib/api'
import ProjectCard from './ProjectCard'
import ScrollReveal3D from './ScrollReveal3D'

const dirs = ['up', 'left', 'right', 'flip', 'left', 'zoom']

export default function Projects() {
	const { t } = useTranslation()
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState('All')

	const {
		data: projects = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: fetchProjects,
	})

	const filteredProjects = useMemo(() => {
		return projects.filter(project => {
			const matchesSearch = `${project.title} ${project.description}`
				.toLowerCase()
				.includes(search.toLowerCase())
			const matchesCategory =
				category === 'All' || project.category === category
			return matchesSearch && matchesCategory
		})
	}, [category, projects, search])

	return (
		<section id='projects' className='py-28 bg-dim relative'>
			<div className='absolute top-0 left-6 right-6 h-px bg-white/[0.05]' />

			<div className='max-w-6xl mx-auto px-6'>
				<ScrollReveal3D direction='flip' className='mb-14'>
					<p className='text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3'>
						{t('projects.eyebrow')}
					</p>
					<div className='flex flex-col md:flex-row md:items-end md:justify-between gap-3'>
						<div>
							<h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
								{t('projects.title')}
							</h2>
							<p className='text-xs text-white/20 max-w-xs font-light mt-2'>
								{t('projects.subtitle')}
							</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-3'>
							<input
								value={search}
								onChange={event => setSearch(event.target.value)}
								placeholder={t('common.search')}
								className='bg-transparent border border-white/[0.08] px-3 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none'
							/>
							<select
								value={category}
								onChange={event => setCategory(event.target.value)}
								className='bg-transparent border border-white/[0.08] px-3 py-2 text-sm text-white/60 focus:outline-none'
							>
								<option value='All' className='bg-[#0c0c0c]'>
									All
								</option>
								<option value='Frontend' className='bg-[#0c0c0c]'>
									Frontend
								</option>
								<option value='Full Stack' className='bg-[#0c0c0c]'>
									Full Stack
								</option>
								<option value='Productivity' className='bg-[#0c0c0c]'>
									Productivity
								</option>
								<option value='General' className='bg-[#0c0c0c]'>
									General
								</option>
							</select>
						</div>
					</div>
				</ScrollReveal3D>

				{isLoading && (
					<div className='grid md:grid-cols-2 gap-3'>
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className='h-56 border border-white/[0.08] bg-[#111] animate-pulse'
							/>
						))}
					</div>
				)}

				{isError && (
					<div className='text-sm text-red-400'>{t('projects.error')}</div>
				)}

				{!isLoading && !isError && (
					<div className='grid md:grid-cols-2 gap-3'>
						{filteredProjects.map((project, index) => (
							<ScrollReveal3D
								key={project.id}
								direction={dirs[index % dirs.length]}
								delay={index * 0.06}
							>
								<ProjectCard project={project} />
							</ScrollReveal3D>
						))}
					</div>
				)}

				<ScrollReveal3D
					direction='zoom'
					delay={0.15}
					className='flex justify-center mt-12'
				>
					<Link
						to='/projects'
						className='inline-flex items-center gap-3 px-7 py-3 border border-white/[0.08] text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 hover:border-white/15 transition-all duration-200'
					>
						{t('projects.viewAll')}
						<svg
							className='w-3 h-3'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M17 8l4 4m0 0l-4 4m4-4H3'
							/>
						</svg>
					</Link>
				</ScrollReveal3D>
			</div>
		</section>
	)
}
