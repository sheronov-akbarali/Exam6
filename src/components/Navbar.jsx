import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
	const { t } = useTranslation()
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 30)
		window.addEventListener('scroll', fn, { passive: true })
		return () => window.removeEventListener('scroll', fn)
	}, [])

	const navLinks = [
		{ label: t('nav.home'), to: '/' },
		{ label: t('nav.about'), to: '/about' },
		{ label: t('nav.skills'), to: '/skills' },
		{ label: t('nav.projects'), to: '/projects' },
		{ label: t('nav.contact'), to: '/contact' },
		{ label: t('nav.admin'), to: '/admin' },
	]

	return (
		<motion.nav
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-page/95 backdrop-blur-md border-b border-white/[0.05]'
					: ''
			}`}
		>
			<div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
				<Link to='/' className='flex items-center gap-2.5 group'>
					<span className='text-sm font-bold text-white tracking-widest'>
						AS
					</span>
					<span className='w-px h-3.5 bg-white/15' />
					<span className='text-[10px] text-white/25 tracking-[0.3em] uppercase group-hover:text-white/40 transition-colors'>
						Portfolio
					</span>
				</Link>

				<ul className='hidden md:flex items-center gap-8'>
					{navLinks.map(link => (
						<li key={link.to}>
							<Link
								to={link.to}
								className='link-line text-[11px] tracking-[0.2em] uppercase'
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<div className='hidden md:flex items-center gap-3'>
					<ThemeToggle />
					<LanguageSwitcher />
					<Link
						to='/contact'
						className='inline-flex items-center gap-2 px-5 py-2 border border-white/15 text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white hover:border-white/40 transition-all duration-200'
					>
						{t('common.hire')}
					</Link>
				</div>

				<button
					className='md:hidden p-2 flex flex-col gap-[5px]'
					onClick={() => setMenuOpen(value => !value)}
					aria-label='Menu'
				>
					<span
						className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
					/>
					<span
						className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
					/>
					<span
						className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
					/>
				</button>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='md:hidden border-t border-white/[0.05] bg-page'
					>
						<ul className='px-6 py-5 flex flex-col gap-4'>
							{navLinks.map(link => (
								<li key={link.to}>
									<Link
										to={link.to}
										onClick={() => setMenuOpen(false)}
										className='text-[11px] tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
						<div className='px-6 pb-6 flex flex-wrap gap-3'>
							<ThemeToggle />
							<LanguageSwitcher />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	)
}
