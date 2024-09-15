export type VariableApiResponse = {
	id_variable: string
	id_model: string
	aggregations: {
		[key: string]: {
			[key: string]: number
		}
	}
}[]
