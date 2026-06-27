import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../store/store'

export default function LanguageSwitcher() {
	const dispatch = useDispatch()
	const language = useSelector(state => state.language)
	const theme = useSelector(state => state.theme)

	const isDark = theme === 'dark'

	return (
		<ToggleButtonGroup
			value={language}
			exclusive
			onChange={(_, value) => value && dispatch(setLanguage(value))}
			size='small'
			sx={{
				borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(17,17,17,0.12)',
				'& .MuiToggleButton-root': { 
					color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(17,17,17,0.75)', 
					px: 1.2,
					borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(17,17,17,0.12)',
				},
				'& .MuiToggleButton-root.Mui-selected': {
					color: isDark ? '#ffffff' : '#111111',
					backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(17,17,17,0.08)',
				}
			}}
		>
			<ToggleButton value='uz'>UZ</ToggleButton>
			<ToggleButton value='en'>EN</ToggleButton>
			<ToggleButton value='ru'>RU</ToggleButton>
		</ToggleButtonGroup>
	)
}
