import { configureStore, createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
	if (typeof window === 'undefined') return 'dark'
	return window.localStorage.getItem('portfolio-theme') || 'dark'
}

const getInitialLanguage = () => {
	if (typeof window === 'undefined') return 'uz'
	return window.localStorage.getItem('portfolio-language') || 'uz'
}

const getInitialFavorites = () => {
	if (typeof window === 'undefined') return []
	try {
		return JSON.parse(
			window.localStorage.getItem('portfolio-favorites') || '[]',
		)
	} catch {
		return []
	}
}

const themeSlice = createSlice({
	name: 'theme',
	initialState: getInitialTheme(),
	reducers: {
		toggleTheme: state => (state === 'dark' ? 'light' : 'dark'),
		setTheme: (_, action) => action.payload,
	},
})

const languageSlice = createSlice({
	name: 'language',
	initialState: getInitialLanguage(),
	reducers: {
		setLanguage: (_, action) => action.payload,
	},
})

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: getInitialFavorites(),
	reducers: {
		toggleFavorite: (state, action) => {
			const exists = state.includes(action.payload)
			return exists
				? state.filter(value => value !== action.payload)
				: [...state, action.payload]
		},
		clearFavorites: () => [],
	},
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const { setLanguage } = languageSlice.actions
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		language: languageSlice.reducer,
		favorites: favoritesSlice.reducer,
	},
})

store.subscribe(() => {
	const state = store.getState()
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('portfolio-theme', state.theme)
		window.localStorage.setItem('portfolio-language', state.language)
		window.localStorage.setItem(
			'portfolio-favorites',
			JSON.stringify(state.favorites),
		)
	}
})

export default store
