import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Control from 'react-leaflet-custom-control'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import config from '@/config'
import { Variable } from '@/types'
import { HttpClient } from '../common/api'

interface IListVariablesControlProps {
	selectedVariables: string[]
	setSelectedVariables: React.Dispatch<React.SetStateAction<string[]>>
	singleSelection: boolean
}

const ListVariablesControl: React.FC<IListVariablesControlProps> = ({
	selectedVariables,
	setSelectedVariables,
	singleSelection,
}) => {
	const [variables, setVariables] = useState<Variable[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const storageKey = 'selectedVariables'
	const map = useMap()
	const [geoserverLayers, setGeoserverLayers] = useState<
		Record<string, L.TileLayer.WMS>
	>({})

	useEffect(() => {
		const fetchVariables = async () => {
			try {
				setLoading(true)
				const response = await HttpClient.get<Variable[]>(
					config.API_URL + '/api/variables'
				)
				setVariables(response.data)
				const storedSelectedVariables = localStorage.getItem(storageKey)
				let initialSelection: string[]
				if (storedSelectedVariables) {
					const parsedVariables = JSON.parse(storedSelectedVariables)
					initialSelection = singleSelection
						? [parsedVariables[0]].filter(Boolean)
						: parsedVariables
				} else {
					initialSelection = singleSelection
						? []
						: response.data.map((v) => v.id)
					localStorage.setItem(storageKey, JSON.stringify(initialSelection))
				}
				setSelectedVariables(initialSelection)

				// Cargar capas de GeoServer para variables preseleccionadas
				initialSelection.forEach((variableId) => {
					addGeoServerLayer(variableId)
				})
			} catch (err) {
				setError('Error fetching variables.')
				console.error('Error fetching variables: ', err)
			} finally {
				setLoading(false)
			}
		}
		fetchVariables()
	}, [setSelectedVariables, singleSelection, map])

	const toggleVariable = (variable: string) => {
		let updatedSelectedVariables: string[]
		if (singleSelection) {
			updatedSelectedVariables = selectedVariables.includes(variable)
				? []
				: [variable]

			// Remover todas las capas existentes
			Object.keys(geoserverLayers).forEach(removeGeoServerLayer)
		} else {
			if (selectedVariables.includes(variable)) {
				updatedSelectedVariables = selectedVariables.filter(
					(v) => v !== variable
				)
				removeGeoServerLayer(variable)
			} else {
				updatedSelectedVariables = [...selectedVariables, variable]
				addGeoServerLayer(variable)
			}
		}

		setSelectedVariables(updatedSelectedVariables)
		localStorage.setItem(storageKey, JSON.stringify(updatedSelectedVariables))

		// Agregar la nueva capa si es necesario
		if (singleSelection && updatedSelectedVariables.length > 0) {
			addGeoServerLayer(updatedSelectedVariables[0])
		}
	}

	const addGeoServerLayer = (variable: string) => {
		if (!geoserverLayers[variable]) {
			const newLayer = L.tileLayer.wms(
				'http://localhost:8080/geoserver/tfm/wms',
				{
					layers: `tfm:${variable}`,
					format: 'image/png',
					transparent: true,
					version: '1.1.1',
					tileSize: 256,
					detectRetina: true,
					updateWhenIdle: false,
					updateWhenZooming: false,
					keepBuffer: 2,
					crossOrigin: true,
					opacity: 0.2,
				}
			)

			newLayer.addTo(map)
			setGeoserverLayers((prev) => ({ ...prev, [variable]: newLayer }))
		}
	}

	const removeGeoServerLayer = (variable: string) => {
		if (geoserverLayers[variable]) {
			map.removeLayer(geoserverLayers[variable])
			setGeoserverLayers((prev) => {
				const newLayers = { ...prev }
				delete newLayers[variable]
				return newLayers
			})
		}
	}

	return (
		<Control position="topleft">
			{loading ? (
				<p>Loading variables...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<div className="d-flex flex-column list-variable-control">
					{variables.map((v: Variable) => (
						<Button
							key={v.id}
							variant={selectedVariables.includes(v.id) ? 'primary' : 'light'}
							onClick={() => toggleVariable(v.id)}
							style={{ opacity: 0.8 }}
							className="mb-1 pl-5 pr-5">
							{v.var_name}
						</Button>
					))}
				</div>
			)}
		</Control>
	)
}

export default ListVariablesControl
