import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

export default function HomePage() {
	return (
		<div className='relative bg-page min-h-screen'>
			<Navbar />
			<main>
				<Hero />
				<About />
				<Projects />
				<Contact />
			</main>
			<Footer />
		</div>
	)
}
