import { FormControlLabel, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/store'

export default function ThemeToggle() {
	const dispatch = useDispatch()
	const theme = useSelector(state => state.theme)
	const { t } = useTranslation()

	return (
		<FormControlLabel
			control={
				<Switch
					checked={theme === 'dark'}
					onChange={() => dispatch(toggleTheme())}
					color='default'
				/>
			}
			label={theme === 'dark' ? 'Dark' : 'Light'}
			sx={{
				ml: 0.5,
				mr: 0.5,
				color:
					theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(17,17,17,0.75)',
			}}
		/>
	)
}
