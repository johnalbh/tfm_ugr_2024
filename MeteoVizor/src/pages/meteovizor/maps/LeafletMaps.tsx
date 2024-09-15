import React, { useCallback, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { Button, Row, Col, Container } from 'react-bootstrap'
import config from '../../../config'
import VariablePage from '../variables'
import { MapViewer } from './MapViewer'
import { Coordenate } from '../../../types/Coordenate'
import { useMapState } from '../../../hooks/useMapState'
import { useFetchData } from '../../../hooks/useFetchData'

import clickMapSvg from '../../../assets/images/click-map.svg' // Import the SVG
const LeafletMaps: React.FC = () => {
	const {
		selectedVariables,
		setSelectedVariables,
		selectedLocation,
		isCompareMode,
		handleMapClick,
		handleRemoveCompareLocation,
		setIsCompareMode,
	} = useMapState()

	const { fetchComparisonData } = useFetchData(selectedVariables)
	const [isSidebarVisible, setIsSidebarVisible] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarVisible((prev) => !prev)
	}

	const handleLocationClick = useCallback(
		async (location: Coordenate) => {
			if (isCompareMode) {
				if (selectedLocation.length < config.MAX_COMPARE_LOCATIONS) {
					await handleMapClick(location)
					await fetchComparisonData(location)
				} else {
					Swal.fire({
						icon: 'warning',
						title: 'Limit reached!',
						text: `Maximum of ${config.MAX_COMPARE_LOCATIONS} locations reached.`,
						toast: true,
						position: 'bottom',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						showCloseButton: true,
					})
				}
			} else {
				await handleMapClick(location)
			}
			setIsSidebarVisible(true)
		},
		[
			isCompareMode,
			selectedLocation.length,
			handleMapClick,
			fetchComparisonData,
		]
	)

	const mapViewerProps = useMemo(
		() => ({
			onMapClick: handleLocationClick,
			selectedVariables,
			setSelectedVariables,
			toggleSidebar,
			selectedLocation,
			isCompareMode,
			onRemoveCompareLocation: handleRemoveCompareLocation,
			isSidebarVisible,
		}),
		[
			handleLocationClick,
			selectedVariables,
			setSelectedVariables,
			toggleSidebar,
			selectedLocation,
			isCompareMode,
			handleRemoveCompareLocation,
			isSidebarVisible,
		]
	)

	return (
		<div style={{ height: 'calc(100vh - 50px)' }}>
			<MapViewer
				handleMapClick={function (location: Coordenate): Promise<void> {
					throw new Error('Function not implemented.')
				}}
				fetchComparisonData={function (location: Coordenate): Promise<void> {
					throw new Error('Function not implemented.')
				}}
				{...mapViewerProps}
			/>

			<Button
				variant="primary"
				onClick={toggleSidebar}
				className="sidebar"
				style={{
					position: 'absolute',
					top: '50%',
					right: isSidebarVisible ? '50%' : '0',
					transform: 'translateY(-50%)',
					zIndex: 1001,
					height: '100px',
					width: '20px',
					borderTopLeftRadius: '10px',
					borderBottomLeftRadius: '10px',
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
					display: 'flex',
					fontSize: '20px',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
					transition: 'right 0.5s ease',
				}}>
				<i
					className={`mdi ${isSidebarVisible ? 'mdi-chevron-right' : 'mdi-chevron-left'}`}
				/>
			</Button>

			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					width: '50%',
					height: '100%',
					backgroundColor: 'rgba(248, 249, 250, 0.8)',
					overflowY: 'auto',
					zIndex: 1000,
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
					transition: 'transform 0.5s ease',
					transform: isSidebarVisible ? 'translateX(0)' : 'translateX(100%)',
				}}>
				<Container fluid>
					<Row>
						<Col>
							{selectedLocation.length > 0 && selectedVariables.length > 0 ? (
								<VariablePage
									selectedLocation={selectedLocation}
									selectedVariables={selectedVariables}
									setIsCompareMode={setIsCompareMode}
									onRemoveCompareLocation={handleRemoveCompareLocation}
								/>
							) : (
								<div
									style={{
										width: '100%',
										height: 'calc(100vh - 50px)',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: 'rgba(255, 255, 255, 0.9)',
									}}>
									<img
										src={clickMapSvg}
										alt="Click on map"
										style={{ maxWidth: '200px', marginBottom: '20px' }}
									/>
									<h1
										style={{
											textAlign: 'center',
											fontSize: '24px',
											color: '#333',
										}}>
										Click on the map to select a location
									</h1>
								</div>
							)}
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default React.memo(LeafletMaps)
