import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import ScrollReveal3D from './ScrollReveal3D'

function Bar({ name, level, index }) {
	const [ref, inView] = useInView({ threshold: 0.4 })
	return (
		<div ref={ref} className='flex flex-col gap-2'>
			<div className='flex justify-between'>
				<span className='text-xs text-white/50'>{name}</span>
				<span className='text-[10px] text-white/20 font-mono'>{level}</span>
			</div>
			<div className='h-px bg-white/[0.07]'>
				<motion.div
					className='h-full bg-white/60'
					initial={{ width: 0 }}
					animate={inView ? { width: `${level}%` } : { width: 0 }}
					transition={{
						duration: 1.2,
						delay: index * 0.07,
						ease: [0.22, 1, 0.36, 1],
					}}
				/>
			</div>
		</div>
	)
}

export default function About() {
	const { t } = useTranslation()

	const skills = [
		{ name: t('about.skillsList.javascript'), level: 80 },
		{ name: t('about.skillsList.react'), level: 78 },
		{ name: t('about.skillsList.node'), level: 72 },
		{ name: t('about.skillsList.postgres'), level: 65 },
		{ name: t('about.skillsList.python'), level: 60 },
		{ name: t('about.skillsList.docker'), level: 55 },
	]

	const timeline = [
		{
			year: 'Oct 2026',
			role: t('about.timeline.freelanceRole'),
			company: 'Freelance',
			desc: t('about.timeline.freelanceDesc'),
		},
		{
			year: 'Oct 2025',
			role: t('about.timeline.selfTaughtRole'),
			company: 'Self-taught',
			desc: t('about.timeline.selfTaughtDesc'),
		},
	]

	return (
		<section id='about' className='py-28 bg-dim relative'>
			<div className='absolute top-0 left-6 right-6 h-px bg-white/[0.05]' />

			<div className='max-w-6xl mx-auto px-6'>
				<ScrollReveal3D direction='flip' className='mb-16'>
					<p className='text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3'>
						{t('about.eyebrow')}
					</p>
					<h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
						{t('about.title')}
					</h2>
				</ScrollReveal3D>

				<div className='grid md:grid-cols-2 gap-16'>
					{/* Left */}
					<div className='flex flex-col gap-10'>
						<ScrollReveal3D direction='left' delay={0.05}>
							<p className='text-white/35 text-sm leading-relaxed font-light'>
								{t('about.intro')}
							</p>
						</ScrollReveal3D>

						<div className='flex flex-col'>
							{timeline.map((t, i) => (
								<ScrollReveal3D key={i} direction='left' delay={0.08 + i * 0.1}>
									<div className='relative pl-5 pb-9 last:pb-0 border-l border-white/[0.06]'>
										<div className='absolute -left-[3px] top-1.5 w-1.5 h-1.5 bg-white/40' />
										<p className='text-[10px] font-mono text-white/25 tracking-widest mb-1'>
											{t.year}
										</p>
										<p className='text-sm font-semibold text-white/80 mb-0.5'>
											{t.role}
										</p>
										<p className='text-[11px] text-white/25 mb-1.5 tracking-wide'>
											{t.company}
										</p>
										<p className='text-xs text-white/30 leading-relaxed font-light'>
											{t.desc}
										</p>
									</div>
								</ScrollReveal3D>
							))}
						</div>
					</div>

					{/* Right */}
					<div className='flex flex-col gap-10'>
						<ScrollReveal3D direction='right' delay={0.1}>
							<div>
								<p className='text-[10px] tracking-[0.4em] uppercase text-white/20 mb-7'>
									{t('about.skills')}
								</p>
								<div className='flex flex-col gap-5'>
									{skills.map((s, i) => (
										<Bar key={s.name} {...s} index={i} />
									))}
								</div>
							</div>
						</ScrollReveal3D>

						<ScrollReveal3D direction='zoom' delay={0.18}>
							<div>
								<p className='text-[10px] tracking-[0.4em] uppercase text-white/20 mb-4'>
									{t('about.alsoFamiliar')}
								</p>
								<div className='flex flex-wrap gap-2'>
									{[
										'CSS3',
										'GitHub',
										'Figma',
										'Firebase',
										'Vercel',
										'Tailwind',
										'Git',
										'REST API',
										'Linux',
									].map(tag => (
										<span
											key={tag}
											className='px-3 py-1 text-[11px] text-white/25 border border-white/[0.07] hover:border-white/20 hover:text-white/50 transition-all duration-200 cursor-default'
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</ScrollReveal3D>
					</div>
				</div>
			</div>
		</section>
	)
}
