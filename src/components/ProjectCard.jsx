import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleFavorite } from '../store/store'

export default function ProjectCard({ project }) {
	const ref = useRef(null)
	const [hovered, setHovered] = useState(false)
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const favorites = useSelector(state => state.favorites)

	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const cfg = { stiffness: 160, damping: 22 }
	const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), cfg)
	const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), cfg)
	const scale = useSpring(hovered ? 1.015 : 1, cfg)

	const onMove = event => {
		const rect = ref.current?.getBoundingClientRect()
		if (!rect) return
		x.set((event.clientX - rect.left) / rect.width - 0.5)
		y.set((event.clientY - rect.top) / rect.height - 0.5)
	}
	const onLeave = () => {
		x.set(0)
		y.set(0)
		setHovered(false)
	}

	const isFavorite = favorites.includes(project.id)

	return (
		<motion.div
			ref={ref}
			style={{
				rotateX,
				rotateY,
				scale,
				transformStyle: 'preserve-3d',
				perspective: 900,
			}}
			onMouseMove={onMove}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={onLeave}
			className='cursor-pointer'
		>
			<div
				className={`border transition-colors duration-300 bg-card ${hovered ? 'border-white/15' : 'border-white/[0.06]'}`}
			>
				<div className='relative h-52 overflow-hidden bg-dim'>
					<div
						className='absolute inset-0 transition-transform duration-500 project-card-thumb'
						style={{
							background: 'linear-gradient(135deg, #141414 0%, #1c1c1c 100%)',
							transform: hovered ? 'scale(1.04)' : 'scale(1)',
						}}
					/>
					<div className='absolute inset-0 flex items-center justify-center'>
						<span className='text-3xl opacity-50'>◈</span>
					</div>
					<div
						className={`absolute bottom-0 left-0 h-px bg-white/30 transition-all duration-400 ${hovered ? 'w-full' : 'w-0'}`}
					/>
				</div>

				<div className='p-6 flex flex-col gap-3'>
					<div className='flex items-start justify-between gap-3'>
						<h3 className='text-base font-semibold text-white/80 leading-snug'>
							{project.title}
						</h3>
						<div className='flex gap-1 shrink-0 mt-0.5'>
							<button
								type='button'
								onClick={event => {
									event.stopPropagation()
									dispatch(toggleFavorite(project.id))
								}}
								className='p-1 text-white/20 hover:text-white/60 transition-colors'
								aria-label={t('projects.card.favorite')}
							>
								{isFavorite ? '★' : '☆'}
							</button>
							{project.github && (
								<a
									href={project.github}
									target='_blank'
									rel='noopener noreferrer'
									onClick={event => event.stopPropagation()}
									aria-label='GitHub'
									className='p-1 text-white/20 hover:text-white/60 transition-colors'
								>
									<svg
										className='w-3.5 h-3.5'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z' />
									</svg>
								</a>
							)}
							{project.live && (
								<a
									href={project.live}
									target='_blank'
									rel='noopener noreferrer'
									onClick={event => event.stopPropagation()}
									aria-label={t('projects.card.live')}
									className='p-1 text-white/20 hover:text-white/60 transition-colors'
								>
									<svg
										className='w-3.5 h-3.5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
										/>
									</svg>
								</a>
							)}
						</div>
					</div>

					<p className='text-xs text-white/25 leading-relaxed font-light'>
						{project.description}
					</p>

					<div className='flex flex-wrap gap-1.5 pt-0.5'>
						{(project.tags || []).map(tag => (
							<span
								key={tag}
								className='px-2 py-0.5 text-[11px] text-white/20 border border-white/[0.06] tracking-wide'
							>
								{tag}
							</span>
						))}
					</div>

					<Link
						to={`/projects/${project.id}`}
						className='text-[11px] uppercase tracking-[0.2em] text-white/35 hover:text-white transition-colors'
					>
						{t('common.details')} →
					</Link>
				</div>
			</div>
		</motion.div>
	)
}
