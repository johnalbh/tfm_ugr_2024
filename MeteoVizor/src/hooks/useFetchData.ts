import { useCallback } from 'react'

import { HttpClient } from '../common'
import { Coordenate } from '../types/Coordenate'
import config from '@/config'

export const useFetchData = (selectedVariables: string[]) => {
	const fetchComparisonData = useCallback(
		async (location: Coordenate) => {
			try {
				const response = await HttpClient.get(`${config.API_URL}/api/data`, {
					params: {
						lat: location.lat,
						lon: location.lon,
						variables: selectedVariables.join(','),
					},
				})
				return response.data
			} catch (error) {
				console.error('Error fetching comparison data:', error)
				throw error
			}
		},
		[selectedVariables]
	)

	const fetchPointData = useCallback(
		async (location: Coordenate) => {
			try {
				const response = await HttpClient.get(`${config.API_URL}/api/point`, {
					params: {
						lat: location.lat,
						lon: location.lon,
						variables: selectedVariables,
					},
					paramsSerializer: (params) => {
						const searchParams = new URLSearchParams()
						Object.entries(params).forEach(([key, value]) => {
							if (Array.isArray(value)) {
								value.forEach((v) => searchParams.append(key, v))
							} else {
								searchParams.append(key, value as string)
							}
						})
						return searchParams.toString()
					},
				})
				return response.data
			} catch (error) {
				console.error('Error fetching point data:', error)
				throw error
			}
		},
		[selectedVariables]
	)

	return { fetchComparisonData, fetchPointData }
}
