import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function NotFoundPage() {
	return (
		<div className='relative bg-[#080810] min-h-screen text-white'>
			<Navbar />
			<main className='pt-24 px-6 pb-24 max-w-4xl mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center'>
				<p className='text-[10px] tracking-[0.4em] uppercase text-white/25'>
					404
				</p>
				<h1 className='mt-3 text-4xl font-bold'>Page not found</h1>
				<p className='mt-3 max-w-xl text-sm text-white/35'>
					The page you were looking for is missing or moved. Return to the
					homepage and continue exploring.
				</p>
				<Link
					to='/'
					className='mt-8 px-6 py-3 border border-white/[0.08] hover:border-white/20 transition-colors'
				>
					Go home
				</Link>
			</main>
			<Footer />
		</div>
	)
}
