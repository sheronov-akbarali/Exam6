import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './i18n/i18n.js'
import './index.css'
import { store } from './store/store.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</StrictMode>,
)
