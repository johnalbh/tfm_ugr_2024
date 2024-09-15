import { useCallback, useState } from 'react'
import { Coordenate } from '../types/Coordenate'

export const useMapState = () => {
	const [selectedVariables, setSelectedVariables] = useState<string[]>([])
	const [selectedLocation, setSelectedLocation] = useState<Coordenate[]>([])
	// const [compareLocations, setCompareLocations] = useState<Coordenate[]>([])
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false)
	const [isCompareMode, setIsCompareMode] = useState<boolean>(false)

	const handleMapClick = useCallback(
		(location: Coordenate) => {
			if (isCompareMode) {
				setSelectedLocation((prev) => [...prev, location])
			} else {
				setSelectedLocation([location])
				setIsSidebarExpanded(true)
				// setCompareLocations([])
			}
		},
		[isCompareMode]
	)

	const toggleSidebar = useCallback(() => {
		setIsSidebarExpanded((prev) => !prev)
	}, [])

	const handleRemoveCompareLocation = useCallback((index: number) => {
		setSelectedLocation((prev) => prev.filter((_, i) => i !== index))
	}, [])

	return {
		selectedVariables,
		setSelectedVariables,
		selectedLocation,
		// compareLocations,
		isSidebarExpanded,
		isCompareMode,
		handleMapClick,
		toggleSidebar,
		handleRemoveCompareLocation,
		setIsCompareMode,
	}
}
