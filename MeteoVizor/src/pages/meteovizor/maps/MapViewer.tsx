import React, { useState, useCallback } from 'react'
import {
	MapContainer,
	TileLayer,
	Marker,
	ZoomControl,
	useMapEvents,
} from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import Swal from 'sweetalert2'
import L from 'leaflet'

import { Button } from 'react-bootstrap'
import ListVariablesControl from '../../../components/ListVariablesControl'
import { useFetchData } from '../../../hooks/useFetchData'
import { useTour } from '../../../hooks'
import { Coordenate } from '../../../types/Coordenate'

import config from '../../../config'
import { SelectedDataDisplay } from './SelectedDataDisplay'

interface MapViewerProps {
	onMapClick: (location: Coordenate) => void
	selectedVariables: string[]
	setSelectedVariables: React.Dispatch<React.SetStateAction<string[]>>
	selectedLocation: Coordenate[]
}

// Definir los límites del mapa
const MAX_BOUNDS: L.LatLngBoundsExpression = [
	[-90, -180], // Esquina suroeste
	[90, 180], // Esquina noreste
]

// Definir el zoom mínimo
const MIN_ZOOM = 2

export const MapViewer: React.FC<MapViewerProps> = ({
	onMapClick,
	selectedVariables,
	setSelectedVariables,
	selectedLocation,
}) => {
	const [popupContent, setPopupContent] = useState<React.ReactNode | null>(null)
	const { fetchPointData } = useFetchData(selectedVariables)
	const [isControlVisible, setIsControlVisible] = useState(true)
	const { startTour } = useTour()
	const [layers, setLayers] = useState<string[]>([])

	const addLayer = (layerUrl: string) => {
		setLayers((prevLayers) => [...prevLayers, layerUrl])
	}

	const position: [number, number] = [52, 5]
	const zoom = 2

	const MapEvents = () => {
		useMapEvents({
			async click(e) {
				if (selectedVariables.length === 0) {
					Swal.fire({
						icon: 'warning',
						title: 'No variable selected',
						text: 'Please select at least one variable before clicking on the map.',
						toast: true,
						position: 'bottom',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						showCloseButton: true,
					})
					return
				}

				const location = { lat: e.latlng.lat, lon: e.latlng.lng }
				onMapClick(location)
				try {
					const data = await fetchPointData(location)
					setPopupContent(
						<SelectedDataDisplay
							data={data}
							selectedVariables={selectedVariables}
							singleSelection={true}
						/>
					)
				} catch (error) {
					console.error('Error fetching point data:', error)
					setPopupContent(
						<div>
							Error obteniendo los datos de este punto. Intenta nuevamente.
						</div>
					)
				}
			},
		})
		return null
	}

	const getMarkerIcon = useCallback((color: string) => {
		return L.divIcon({
			className: 'custom-div-icon',
			html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white;"></div>`,
			iconSize: [25, 25],
			iconAnchor: [12, 12],
			popupAnchor: [1, -34],
		})
	}, [])

	return (
		<MapContainer
			center={position}
			maxZoom={18}
			minZoom={MIN_ZOOM}
			zoom={zoom}
			zoomControl={false}
			scrollWheelZoom={true}
			style={{ height: '100%', cursor: 'pointer' }}
			maxBounds={MAX_BOUNDS}
			maxBoundsViscosity={1.0}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				noWrap={true}
			/>

			{layers.map((layerUrl, index) => (
				<TileLayer key={index} url={layerUrl} noWrap={true} />
			))}

			<ZoomControl position="bottomleft" />

			<Control position="bottomleft">
				{isControlVisible ? (
					<div
						className="map-click-control"
						style={{
							position: 'relative',
							backgroundColor: 'white',
							padding: '20px',
							fontSize: '18px',
							borderRadius: '5px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
							width: '300px',
						}}>
						<button
							onClick={() => setIsControlVisible(false)}
							style={{
								position: 'absolute',
								top: '10px',
								right: '10px',
								backgroundColor: 'transparent',
								border: 'none',
								fontSize: '20px',
								cursor: 'pointer',
								color: '#888',
								fontWeight: 'bold',
							}}>
							&times;
						</button>

						<p style={{ textAlign: 'center', margin: '10px 0 0' }}>
							Select a comparison point by clicking inside the permitted map
							area
						</p>

						<Button
							variant="light"
							onClick={startTour}
							style={{
								color: '#047993',
								fontWeight: 500,
								margin: '5px 0 ',
							}}>
							Start Tour Guide
						</Button>
					</div>
				) : (
					<button
						onClick={() => setIsControlVisible(true)}
						style={{
							backgroundColor: '#047993',
							color: 'white',
							border: 'none',
							padding: '10px',
							borderRadius: '50%',
							cursor: 'pointer',
							fontSize: '18px',
							width: '40px',
							height: '40px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
						}}>
						<i
							className="mdi mdi-information-outline"
							style={{ fontSize: '24px' }}></i>
					</button>
				)}
			</Control>

			<ListVariablesControl
				selectedVariables={selectedVariables}
				setSelectedVariables={setSelectedVariables}
				singleSelection={true}
				onLayerAdd={addLayer}
			/>

			<MapEvents />
			{selectedLocation.map((location, index) => (
				<Marker
					key={index}
					position={[location.lat, location.lon]}
					icon={getMarkerIcon(config.MARKER_COLORS[index] || 'gray')}
				/>
			))}
		</MapContainer>
	)
}

export default MapViewer
