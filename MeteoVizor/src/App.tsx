import { useEffect, useState } from 'react'
import AllRoutes from './routes/Routes'
import { Toaster } from 'sonner'
import { ThemeProvider } from './context'
import 'shepherd.js/dist/css/shepherd.css'

// default light mode
import '@/assets/scss/app.scss'
// default dark mode (uncomment below file, and comment the rest to use dark theme mode)
// import '@/assets/scss/app-dark.scss'
// material light mode (uncomment below 2 files, and comment the rest to use material theme mode)
// import '@/assets/scss/app-material.scss'
// import '@/assets/scss/bootstrap-material.scss'
// icons (keep the below icons file separate from the above ones)
import '@/assets/scss/icons.scss'
import { useTour } from './hooks'

function App() {
	const [isTourStarted, setIsTourStarted] = useState(true)
	const { startTour } = useTour()

	useEffect(() => {
		const isTourCompleted = localStorage.getItem('tourCompleted')

		if (!isTourCompleted) {
			const timeout = setTimeout(() => {
				setIsTourStarted(true)
				startTour() // Iniciar el tour
				localStorage.setItem('tourCompleted', 'true')
			}, 500)

			return () => clearTimeout(timeout)
		}
	}, [startTour])

	return (
		<ThemeProvider>
			<AllRoutes />
			<Toaster richColors />
		</ThemeProvider>
	)
}

export default App
