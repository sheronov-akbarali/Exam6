import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Footer() {
	const { t } = useTranslation()
	return (
		<footer className='border-t border-white/[0.05] py-8 bg-dim'>
			<div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3'>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className='flex items-center gap-2.5'
				>
					<span className='text-sm font-bold text-white'>AS</span>
					<span className='w-px h-3 bg-white/10' />
					<span className='text-[10px] tracking-[0.3em] uppercase text-white/20'>
						Akbarali Sheronov
					</span>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className='text-[10px] text-white/15 tracking-wide'
				>
					© {new Date().getFullYear()} Akbarali Sheronov
				</motion.p>

				<motion.a
					href='#hero'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className='w-8 h-8 border border-white/[0.07] flex items-center justify-center text-white/15 hover:text-white/50 hover:border-white/15 transition-all duration-200'
					aria-label={t('footer.backToTop')}
				>
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
							d='M5 15l7-7 7 7'
						/>
					</svg>
				</motion.a>
			</div>
		</footer>
	)
}
