import React, { useEffect, useState } from 'react'

import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import httpClient from '@/common/api/httpClient'
import config from '@/config'
import { Coordenate, VariableApiResponse, VariableInfo } from '@/types'

import { ComponentContainerCard } from '../../../components'
import EChartComponent from '../../../components/EChartComponent'

interface VariablePageProps {
	selectedLocation: Coordenate[]
	// compareLocations?: Coordenate[]
	selectedVariables: string[]
	setIsCompareMode: React.Dispatch<React.SetStateAction<boolean>>
	onRemoveCompareLocation: (index: number) => void
}

const VariablePage: React.FC<VariablePageProps> = ({
	selectedLocation = [],
	// compareLocations = [],
	selectedVariables,
	setIsCompareMode,
	onRemoveCompareLocation,
}) => {
	const [variableData, setVariableData] = useState<{
		[key: string]: VariableApiResponse | null
	}>({})
	const [variableInfo, setVariableInfo] = useState<{
		[key: string]: VariableInfo | null
	}>({})
	const [selectedModels, setSelectedModels] = useState<{
		[key: string]: string[]
	}>({})
	const [selectedAggregations, setSelectedAggregations] = useState<{
		[key: string]: string[]
	}>({})
	const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
	const [error, setError] = useState<{ [key: string]: string | null }>({})
	const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

	useEffect(() => {
		const fetchVariableInfo = async () => {
			try {
				const variablesResponse = await httpClient.get<VariableInfo[]>(
					config.API_URL + '/api/variables'
				)

				const info: { [key: string]: VariableInfo | null } = {}
				selectedVariables.forEach((variable) => {
					const selectedVariable = variablesResponse.data.find(
						(v: VariableInfo) => v.id === variable
					)
					info[variable] = selectedVariable || null
				})

				setVariableInfo(info)
			} catch (err) {
				setError((prev) => ({
					...prev,
					global: 'Error fetching variable info',
				}))
			}
		}

		fetchVariableInfo()
	}, [selectedVariables])

	const fetchData = async (
		variable: string,
		location: Coordenate,
		locationIndex: number
	) => {
		if (
			!selectedModels[variable]?.length ||
			!selectedAggregations[variable]?.length
		) {
			return
		}

		setLoading((prev) => ({
			...prev,
			[`${variable}_${locationIndex}`]: true,
		}))
		setError((prev) => ({ ...prev, [`${variable}_${locationIndex}`]: null }))

		try {
			const queryParams = new URLSearchParams({
				lat: location.lat.toString(),
				lon: location.lon.toString(),
				variables: variable,
			})

			selectedModels[variable].forEach((model) => {
				queryParams.append('model', model)
			})

			selectedAggregations[variable].forEach((aggregation) => {
				queryParams.append('aggregation', aggregation)
			})

			const dataResponse = await httpClient.get<VariableApiResponse>(
				`${config.API_URL}/api/data?${queryParams.toString()}`
			)

			setVariableData((prev) => ({
				...prev,
				[`${variable}_${locationIndex}`]: dataResponse.data,
			}))
		} catch (err) {
			setError((prev) => ({
				...prev,
				[`${variable}_${locationIndex}`]: 'Error fetching data',
			}))
		} finally {
			setLoading((prev) => ({
				...prev,
				[`${variable}_${locationIndex}`]: false,
			}))
		}
	}

	useEffect(() => {
		const fetchAllData = () => {
			selectedVariables.forEach((variable) => {
				if (
					selectedModels[variable]?.length &&
					selectedAggregations[variable]?.length
				) {
					// Fetch data for the main selected location
					// fetchData(variable, selectedLocation, 0)

					// Fetch data for all comparison locations
					selectedLocation.forEach((location, index) => {
						fetchData(variable, location, index)
					})
				}
			})
		}

		fetchAllData()
	}, [
		selectedModels,
		selectedAggregations,
		selectedLocation,
		// compareLocations,
		selectedVariables,
	])

	const toggleSelection = (
		variable: string,
		item: string,
		setSelectedItems: React.Dispatch<
			React.SetStateAction<{ [key: string]: string[] }>
		>
	) => {
		setSelectedItems((prev) => ({
			...prev,
			[variable]: prev[variable]?.includes(item)
				? prev[variable].filter((i) => i !== item)
				: [...(prev[variable] || []), item],
		}))
	}

	const handleAggregationSelect = (variable: string, aggregation: string) => {
		toggleSelection(variable, aggregation, setSelectedAggregations)
	}

	const handleCompareClick = () => {
		setIsCompareMode(true)
	}

	const renderChart = (
		aggregation: string,
		legend: string[],
		yAxis: any[],
		series: any[],
		colors: string[]
	) => {
		return (
			<Col lg={12} xl={12}>
				<EChartComponent
					title={aggregation}
					legend={legend}
					yAxis={yAxis}
					series={series}
					colors={colors}
				/>
			</Col>
		)
	}

	useEffect(() => {
		const loadDefaultData = () => {
			if (
				Object.keys(variableInfo).length > 0 &&
				selectedVariables[0] in variableInfo
			) {
				if (!selectedModels[selectedVariables[0]]) {
					selectedModels[selectedVariables[0]] = []
					variableInfo[selectedVariables[0]]?.models?.forEach((model) => {
						selectedModels[selectedVariables[0]].push(model)
					})
				}

				if (
					!selectedAggregations[selectedVariables[0]] &&
					variableInfo[selectedVariables[0]]?.aggregations
				) {
					selectedAggregations[selectedVariables[0]] = [
						// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
						variableInfo[selectedVariables[0]]?.aggregations[1]!,
					]
					selectedLocation.forEach((location, index) => {
						fetchData(selectedVariables[0], location, index)
					})
				}
			}
		}

		loadDefaultData()
		setIsCompareMode(true) // Llama a setIsCompareMode dentro de useEffect para evitar la advertencia
	}, [
		variableInfo,
		selectedModels,
		selectedAggregations,
		selectedVariables,
		selectedLocation,
		setIsCompareMode,
	])

	return (
		<ComponentContainerCard
			bodyClassName="background-opacity"
			title={`${variableInfo[selectedVariables[0]]?.var_name || 'Unknown Variable'} (${variableInfo[selectedVariables[0]]?.units || 'Unknown Units'})`}>
			<h5>Locations</h5>
			<Row style={{ color: 'white' }}>
				{selectedLocation.map((loc, index) => (
					<Col key={`${loc.lat}-${loc.lon}`} lg={6} xl={3}>
						<div
							style={{
								position: 'relative',
								backgroundColor: config.MARKER_COLORS[index],
								padding: '10px',
								borderRadius: '6px',
							}}>
							<div>
								Latitude: {loc?.lat.toFixed(3) ?? 'N/A'}
								<br />
								Longitude: {loc?.lon.toFixed(3) ?? 'N/A'}
							</div>
							<div
								style={{
									cursor: 'pointer',
									fontSize: '1.5rem',
									position: 'absolute',
									top: '0',
									right: '0',
									paddingRight: '15px',
									color: 'inherit',
								}}
								onClick={() => {
									onRemoveCompareLocation(index)
								}}>
								&times;
							</div>
						</div>
					</Col>
				))}
			</Row>
			<hr />

			{selectedVariables.map((variable, idx) => (
				<div key={`${variable}-${idx}`}>
					<Row className="mb-4">
						<Col lg={12} xl={4}>
							<h5>Select Models</h5>
							<div className="button-items">
								{variableInfo[variable]?.models?.map((model, modelIndex) => (
									<Button
										key={`${model}-${modelIndex}`}
										variant={
											selectedModels[variable]?.includes(model)
												? 'primary'
												: 'outline-primary'
										}
										onClick={() =>
											toggleSelection(variable, model, setSelectedModels)
										}>
										{model}
									</Button>
								)) || <p>No models available</p>}
							</div>
						</Col>
						<Col lg={12} xl={8}>
							<h5>Select Aggregations</h5>
							<div className="button-items">
								{variableInfo[variable]?.aggregations?.map(
									(aggregation, index) => (
										<OverlayTrigger
											key={`${aggregation}-${index}`}
											placement="top"
											overlay={
												<Tooltip>
													{variableInfo[variable]?.aggregations_tooltip[
														index
													] || 'Tooltip info not available'}
												</Tooltip>
											}>
											<Button
												variant={
													selectedAggregations[variable]?.includes(aggregation)
														? 'success'
														: 'outline-success'
												}
												onClick={() =>
													handleAggregationSelect(variable, aggregation)
												}>
												{aggregation}
											</Button>
										</OverlayTrigger>
									)
								) || <p>No aggregations available</p>}
							</div>
						</Col>
					</Row>

					{loading[`${variable}_0`] && <div>Loading...</div>}
					{error[`${variable}_0`] && <div>{error[`${variable}_0`]}</div>}

					{!loading[`${variable}_0`] &&
						!error[`${variable}_0`] &&
						variableData[`${variable}_0`] &&
						selectedAggregations[variable]?.map((aggregation) => {
							const allSeries: any[] = []
							const yAxis = []
							const legend: string[] = []

							selectedLocation.forEach((location, locationIndex) => {
								const locationData =
									variableData[`${variable}_${locationIndex}`]
								if (!locationData) return

								locationData.forEach((dataItem) => {
									// const varname = `${dataItem.id_model} ${variableInfo[variable]?.var_name || 'Unknown'} (${locationIndex + 1})`
									const varname = `Location ${locationIndex + 1} [${dataItem.id_model}]`
									legend.push(varname)
									const data = []
									const aggregationData = dataItem.aggregations[aggregation]
									if (!aggregationData) return

									const xData = Object.keys(aggregationData)
									for (const key of xData) {
										if (aggregationData[key] !== -999) {
											data.push([key, aggregationData[key]])
										}
									}

									allSeries.push({
										type:
											variableInfo[variable]?.chart_properties?.type || 'line',
										smooth: true,
										showSymbol: false,
										name: varname,
										data: data,
									})
								})
							})

							yAxis.push({
								name:
									variableInfo[variable]?.chart_properties?.units ||
									'Unknown Units',
								nameTextStyle: {
									align: 'right',
									padding: [0, 3, 6, 3],
								},
								axisLabel: {
									formatter: '{value}',
								},
								boundaryGap: ['0%', '20%'],
								axisPointer: {
									label: {
										show: true,
									},
								},
							})

							let colors = config.MARKER_COLORS

							if (selectedModels[variable].length > 1) {
								colors = [
									config.MARKER_COLORS[0],
									config.MARKER_COLORS_LIGHT[0],
									config.MARKER_COLORS[1],
									config.MARKER_COLORS_LIGHT[1],
									config.MARKER_COLORS[2],
									config.MARKER_COLORS_LIGHT[2],
									config.MARKER_COLORS[3],
									config.MARKER_COLORS_LIGHT[3],
								]
							}

							return (
								<div key={`chart-${variable}-${aggregation}`}>
									<hr />
									<Row
										className="pt-4"
										key={`${variableData[`${variable}_0`]?.[0]?.id_variable || 'unknown'}-${aggregation}`}>
										<Col lg={12} xl={12}>
											{renderChart(
												aggregation,
												legend,
												yAxis,
												allSeries,
												colors
											)}
										</Col>
									</Row>
								</div>
							)
						})}
				</div>
			))}
		</ComponentContainerCard>
	)
}

export default VariablePage
