import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

export default function ProjectsPage() {
	return (
		<div className='relative bg-page min-h-screen text-white'>
			<Navbar />
			<main className='pt-16'>
				<Projects />
			</main>
			<Footer />
		</div>
	)
}
