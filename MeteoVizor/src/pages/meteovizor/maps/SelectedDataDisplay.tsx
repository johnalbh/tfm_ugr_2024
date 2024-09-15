import React from 'react'

interface SelectedDataDisplayProps {
	data: {
		[key: string]: number | string | Array<number | string> | null | undefined
	}
	selectedVariables: string[]
	singleSelection?: boolean
}

export const SelectedDataDisplay: React.FC<SelectedDataDisplayProps> = ({
	data,
	selectedVariables,
}) => {
	if (!data || selectedVariables.length === 0) return null

	const formatValue = (value: any): string => {
		if (typeof value === 'number') {
			return value.toFixed(2)
		} else if (typeof value === 'string') {
			return value
		} else if (value === null || value === undefined) {
			return 'N/A'
		} else {
			return JSON.stringify(value)
		}
	}

	return (
		<div>
			<h3>Selected Data</h3>
			{selectedVariables.map((variable) => {
				const variableData = data[variable]

				if (!variableData) return null

				return (
					<div key={variable} style={{ marginBottom: '10px' }}>
						<strong>{variable}:</strong>
						<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
							{Array.isArray(variableData) ? (
								variableData.map((value, index) => (
									<li key={index}>{formatValue(value)}</li>
								))
							) : (
								<li>{formatValue(variableData)}</li>
							)}
						</ul>
					</div>
				)
			})}
		</div>
	)
}
