import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollReveal3D from './ScrollReveal3D'

const EMAILJS_SERVICE_ID = 'service_5ovqio3'
const EMAILJS_TEMPLATE_ID = 'template_08fpmcf'
const EMAILJS_PUBLIC_KEY = 'OotV0tmsGAxhOPohq'

const socials = [
	{
		name: 'GitHub',
		href: 'https://github.com/sheronov-akbarali',
		icon: (
			<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
				<path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z' />
			</svg>
		),
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/sheronovakbarali/',
		icon: (
			<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
				<path d='M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z' />
			</svg>
		),
	},
	{
		name: 'Twitter',
		href: 'https://x.com/AkbaraliSh87815',
		icon: (
			<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
				<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
			</svg>
		),
	},
	{
		name: 'Telegram',
		href: 'https://t.me/sheronovakbarali',
		icon: (
			<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
				<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
			</svg>
		),
	},
]

export default function Contact() {
	const { t } = useTranslation()
	const [form, setForm] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState(null)

	const handleChange = e =>
		setForm(p => ({ ...p, [e.target.name]: e.target.value }))

	const handleSubmit = async e => {
		e.preventDefault()
		setStatus('sending')
		try {
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				{
					name: form.name,
					email: form.email,
					message: form.message,
				},
				EMAILJS_PUBLIC_KEY,
			)
			setStatus('sent')
			setForm({ name: '', email: '', message: '' })
			setTimeout(() => setStatus(null), 4000)
		} catch (err) {
			console.error('EmailJS error:', JSON.stringify(err))
			alert('Error: ' + (err?.text || err?.message || JSON.stringify(err)))
			setStatus('error')
			setTimeout(() => setStatus(null), 4000)
		}
	}

	const inputClass =
		'w-full bg-transparent border border-white/[0.07] px-4 py-3 text-white/70 text-sm placeholder-white/15 focus:outline-none focus:border-accent/40 focus:text-white transition-all duration-300'

	return (
		<section id='contact' className='py-32 bg-page relative'>
			<div className='absolute top-0 left-6 right-6 h-px bg-white/[0.05]' />

			<div className='max-w-6xl mx-auto px-6'>
				{/* Header */}
				<ScrollReveal3D direction='flip' delay={0} className='mb-16'>
					<p className='text-accent text-[10px] tracking-[0.4em] uppercase mb-4'>
						{t('contact.eyebrow')}
					</p>
					<h2 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
						{t('contact.title')}
					</h2>
				</ScrollReveal3D>

				<div className='grid md:grid-cols-2 gap-20 items-start'>
					{/* Left */}
					<ScrollReveal3D direction='left' delay={0.1}>
						<div className='flex flex-col gap-10'>
							<p className='text-white/35 text-base leading-relaxed font-light'>
								{t('contact.subtitle')}
							</p>

							<div className='flex flex-col gap-5'>
								{[
									{
										label: t('contact.details.email'),
										value: 'sheronovakbarali@gmail.com',
									},
									{
										label: t('contact.details.location'),
										value: 'Tashkent, Uzbekistan',
									},
									{
										label: t('contact.details.status'),
										value: t('contact.status.openToWork'),
									},
								].map(item => (
									<div key={item.label} className='flex flex-col gap-1'>
										<p className='text-[10px] text-white/20 tracking-[0.35em] uppercase'>
											{item.label}
										</p>
										<p className='text-white/60 text-sm'>{item.value}</p>
									</div>
								))}
							</div>

							<div>
								<p className='text-[10px] text-white/20 tracking-[0.35em] uppercase mb-4'>
									{t('contact.findMe')}
								</p>
								<div className='flex gap-2'>
									{socials.map(social => (
										<a
											key={social.name}
											href={social.href}
											target='_blank'
											rel='noopener noreferrer'
											aria-label={social.name}
											className='w-10 h-10 flex items-center justify-center border border-white/[0.07] text-white/25 hover:text-white hover:border-accent/30 transition-all duration-300'
										>
											{social.icon}
										</a>
									))}
								</div>
							</div>
						</div>
					</ScrollReveal3D>

					{/* Right — form */}
					<ScrollReveal3D direction='right' delay={0.15}>
						<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-2'>
									<label className='text-[10px] text-white/20 tracking-[0.35em] uppercase'>
										{t('contact.labels.name')}
									</label>
									<input
										type='text'
										name='name'
										value={form.name}
										onChange={handleChange}
										placeholder={t('contact.labels.placeholderName')}
										required
										className={inputClass}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-[10px] text-white/20 tracking-[0.35em] uppercase'>
										{t('contact.labels.email')}
									</label>
									<input
										type='email'
										name='email'
										value={form.email}
										onChange={handleChange}
										placeholder={t('contact.labels.placeholderEmail')}
										required
										className={inputClass}
									/>
								</div>
							</div>

							<div className='flex flex-col gap-2'>
								<label className='text-[10px] text-white/20 tracking-[0.35em] uppercase'>
									{t('contact.labels.message')}
								</label>
								<textarea
									name='message'
									value={form.message}
									onChange={handleChange}
									placeholder={t('contact.labels.placeholderMessage')}
									required
									rows={6}
									className={`${inputClass} resize-none`}
								/>
							</div>

							<motion.button
								type='submit'
								disabled={status === 'sending' || status === 'sent'}
								whileTap={{ scale: 0.98 }}
								className={`w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
									status === 'sent'
										? 'bg-transparent border border-accent/30 text-accent'
										: 'bg-accent text-black hover:bg-accent/90'
								} disabled:opacity-50 disabled:cursor-not-allowed`}
							>
								{status === 'sending' ? (
									<span className='flex items-center justify-center gap-2'>
										<svg
											className='w-3.5 h-3.5 animate-spin'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											/>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z'
											/>
										</svg>
										{t('contact.buttons.sending')}
									</span>
								) : status === 'sent' ? (
									t('contact.buttons.sent')
								) : status === 'error' ? (
									t('contact.buttons.error')
								) : (
									t('contact.buttons.send')
								)}
							</motion.button>
						</form>
					</ScrollReveal3D>
				</div>
			</div>
		</section>
	)
}
