import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { syncLanguage } from './i18n/i18n'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'

function AppRoutes() {
	const theme = useSelector(state => state.theme)
	const language = useSelector(state => state.language)

	useEffect(() => {
		document.body.dataset.theme = theme
		document.documentElement.style.colorScheme = theme
	}, [theme])

	useEffect(() => {
		syncLanguage(language)
	}, [language])

	return (
		<div
			className={
				theme === 'dark'
					? 'min-h-screen bg-page text-white'
					: 'min-h-screen bg-page text-[#111111]'
			}
		>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<HomePage />} />
				<Route path='/skills' element={<SkillsPage />} />
				<Route path='/projects' element={<ProjectsPage />} />
				<Route path='/projects/:id' element={<ProjectDetailsPage />} />
				<Route path='/contact' element={<HomePage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	)
}

export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}
