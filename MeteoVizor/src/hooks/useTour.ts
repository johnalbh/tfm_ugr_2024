import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'

const useTour = () => {
	const createTour = () => {
		const tour = new Shepherd.Tour({
			defaultStepOptions: {
				cancelIcon: { enabled: true },
				scrollTo: { behavior: 'smooth', block: 'center' },
			},
			useModalOverlay: true,
		})

		tour.addStep({
			id: 'step1',
			text: 'Select a variable to start.',
			attachTo: { element: '.list-variable-control', on: 'bottom' },
			buttons: [
				{
					text: 'Next',
					action: () => {
						const firstButton = document.querySelector(
							'.list-variable-control button'
						) as HTMLButtonElement | null
						if (firstButton) firstButton.click()
						tour.next()
					},
				},
			],
		})

		tour.addStep({
			id: 'step2',
			text: 'Click on the map to select a comparison point.',
			attachTo: { element: '.map-click-control', on: 'bottom' },
			buttons: [
				{
					text: 'Next',
					action: () => {
						const mapElement = document.querySelector(
							'.map-click-control'
						) as HTMLElement | null
						if (mapElement) mapElement.click()
						tour.next()
					},
				},
			],
		})

		tour.addStep({
			id: 'step3',
			text: 'This is the sidebar with the graphs.',
			attachTo: { element: '.sidebar', on: 'right' },
			buttons: [{ text: 'Finish', action: tour.complete }],
		})

		return tour
	}

	const startTour = () => {
		const tour = createTour()
		tour.start()
	}

	return { startTour }
}

export default useTour
