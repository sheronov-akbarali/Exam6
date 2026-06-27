import { Alert, Button, Snackbar } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {
	createProject,
	deleteProject,
	fetchProjects,
	updateProject,
} from '../lib/api'

const emptyForm = {
	title: '',
	description: '',
	category: '',
	tags: '',
	github: '',
	live: '',
}

export default function AdminPage() {
	const { t } = useTranslation()
	const queryClient = useQueryClient()
	const [form, setForm] = useState(emptyForm)
	const [activeId, setActiveId] = useState(null)
	const [message, setMessage] = useState(null)

	const {
		data: projects = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: fetchProjects,
	})

	const createMutation = useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			queryClient.invalidateQueries(['projects'])
			setForm(emptyForm)
			setMessage({ severity: 'success', text: t('admin.created') })
		},
		onError: () => setMessage({ severity: 'error', text: t('admin.error') }),
	})

	const updateMutation = useMutation({
		mutationFn: ({ id, payload }) => updateProject(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries(['projects'])
			setForm(emptyForm)
			setActiveId(null)
			setMessage({ severity: 'success', text: t('admin.updated') })
		},
		onError: () => setMessage({ severity: 'error', text: t('admin.error') }),
	})

	const deleteMutation = useMutation({
		mutationFn: deleteProject,
		onSuccess: () => {
			queryClient.invalidateQueries(['projects'])
			setMessage({ severity: 'success', text: t('admin.deleted') })
		},
		onError: () => setMessage({ severity: 'error', text: t('admin.error') }),
	})

	const selectedProject = useMemo(
		() => projects.find(project => project.id === activeId) || null,
		[activeId, projects],
	)

	const handleEdit = project => {
		setActiveId(project.id)
		setForm({
			title: project.title || '',
			description: project.description || '',
			category: project.category || '',
			tags: (project.tags || []).join(', '),
			github: project.github || '',
			live: project.live || '',
		})
	}

	const handleSubmit = event => {
		event.preventDefault()
		const payload = {
			title: form.title,
			description: form.description,
			category: form.category,
			tags: form.tags
				.split(',')
				.map(tag => tag.trim())
				.filter(Boolean),
			github: form.github,
			live: form.live,
		}

		if (activeId) {
			updateMutation.mutate({ id: activeId, payload })
		} else {
			createMutation.mutate(payload)
		}
	}

	const handleDelete = id => {
		if (window.confirm(t('admin.confirmDelete'))) {
			deleteMutation.mutate(id)
		}
	}

	return (
		<div className='relative bg-page min-h-screen text-white'>
			<Navbar />
			<main className='pt-24 px-6 pb-24 max-w-6xl mx-auto'>
				<div className='mb-10'>
					<p className='text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3'>
						{t('admin.panel')}
					</p>
					<h1 className='text-4xl font-bold'>{t('admin.title')}</h1>
					<p className='mt-3 text-sm text-white/35 max-w-2xl'>
						{t('admin.subtitle')}
					</p>
				</div>

				<section className='mb-12 border border-white/[0.08] bg-card p-6 rounded-sm'>
					<h2 className='text-xl font-semibold mb-4'>
						{activeId ? t('admin.editProject') : t('admin.addProject')}
					</h2>
					<form onSubmit={handleSubmit} className='grid gap-4'>
						<input
							value={form.title}
							onChange={event =>
								setForm(prev => ({ ...prev, title: event.target.value }))
							}
							placeholder={t('admin.fields.title')}
							className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none'
							required
						/>
						<textarea
							value={form.description}
							onChange={event =>
								setForm(prev => ({ ...prev, description: event.target.value }))
							}
							placeholder={t('admin.fields.description')}
							rows={4}
							className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none resize-none'
							required
						/>
						<div className='grid md:grid-cols-3 gap-4'>
							<input
								value={form.category}
								onChange={event =>
									setForm(prev => ({ ...prev, category: event.target.value }))
								}
								placeholder={t('admin.fields.category')}
								className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none'
							/>
							<input
								value={form.tags}
								onChange={event =>
									setForm(prev => ({ ...prev, tags: event.target.value }))
								}
								placeholder={t('admin.fields.tags')}
								className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none'
							/>
							<input
								value={form.github}
								onChange={event =>
									setForm(prev => ({ ...prev, github: event.target.value }))
								}
								placeholder={t('admin.fields.github')}
								className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none'
							/>
						</div>
						<div className='grid md:grid-cols-2 gap-4'>
							<input
								value={form.live}
								onChange={event =>
									setForm(prev => ({ ...prev, live: event.target.value }))
								}
								placeholder={t('admin.fields.live')}
								className='bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none'
							/>
							<div className='flex gap-3'>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									sx={{ textTransform: 'none' }}
								>
									{activeId ? t('admin.update') : t('admin.create')}
								</Button>
								{activeId && (
									<Button
										type='button'
										variant='outlined'
										color='inherit'
										sx={{ textTransform: 'none' }}
										onClick={() => {
											setActiveId(null)
											setForm(emptyForm)
										}}
									>
										{t('admin.cancel')}
									</Button>
								)}
							</div>
						</div>
					</form>
				</section>

				<section className='border border-white/[0.08] bg-card p-6 rounded-sm'>
					<div className='flex items-center justify-between gap-4 mb-4'>
						<h2 className='text-xl font-semibold'>{t('admin.projects')}</h2>
						<span className='text-sm text-white/40'>
							{projects.length} {t('admin.projectCount')}
						</span>
					</div>

					{isLoading && (
						<div className='text-white/40'>{t('common.loading')}</div>
					)}
					{isError && <div className='text-red-400'>{t('admin.error')}</div>}

					{!isLoading && !isError && (
						<div className='space-y-4'>
							{projects.map(project => (
								<div
									key={project.id}
									className='border border-white/[0.05] p-4 rounded-sm bg-dim'
								>
									<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
										<div>
											<p className='text-sm text-white/50'>
												{project.category || t('admin.fields.general')}
											</p>
											<h3 className='text-lg font-semibold'>{project.title}</h3>
										</div>
										<div className='flex gap-2 flex-wrap'>
											<Button
												variant='outlined'
												color='info'
												sx={{ textTransform: 'none' }}
												onClick={() => handleEdit(project)}
											>
												{t('admin.edit')}
											</Button>
											<Button
												variant='outlined'
												color='error'
												sx={{ textTransform: 'none' }}
												onClick={() => handleDelete(project.id)}
											>
												{t('admin.delete')}
											</Button>
										</div>
									</div>
									<p className='mt-3 text-sm text-white/40'>
										{project.description}
									</p>
								</div>
							))}
						</div>
					)}
				</section>
			</main>
			<Footer />

			<Snackbar
				open={Boolean(message)}
				autoHideDuration={4000}
				onClose={() => setMessage(null)}
			>
				<Alert
					onClose={() => setMessage(null)}
					severity={message?.severity || 'info'}
					sx={{ width: '100%' }}
				>
					{message?.text}
				</Alert>
			</Snackbar>
		</div>
	)
}
