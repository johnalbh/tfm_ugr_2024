import * as echarts from 'echarts'
import FileSaver from 'file-saver'
import React, { useEffect, useRef } from 'react'

interface ChartProps {
	title: string
	legend: string[]
	yAxis: any[]
	series: any[]
	colors: string[]
}

const EChartComponent: React.FC<ChartProps> = ({
	title,
	legend,
	yAxis,
	series,
	colors,
}) => {
	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (chartRef.current) {
			const chartInstance = echarts.init(chartRef.current)

			const options = {
				title: {
					text: title,
					padding: [0, 0, 0, 10],
					textStyle: {
						color: 'grey',
						fontSize: 15,
					},
				},
				legend: {
					data: legend,
					top: 'bottom',
					padding: [0, 0, 0, 0],
				},
				color: colors,
				grid: {
					right: '5%',
					left: '90px',
					bottom: 103,
				},
				tooltip: {
					axisPointer: {
						type: 'shadow',
					},
					trigger: 'axis',
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: true,
							optionToContent: function (opt: any) {
								const series = opt.series

								let dates = []
								const ss = []
								for (let i = 0; i < series.length; i++) {
									const a: any = {}
									for (let j = 0; j < series[i].data.length; j++) {
										a[series[i].data[j][0]] = series[i].data[j][1]
										dates.push(series[i].data[j][0])
									}
									ss.push(a)
								}
								dates = dates
									.filter(
										(value, index, array) => array.indexOf(value) === index
									)
									.sort()

								let table = 'Time'
								for (let i = 0; i < series.length; i++) {
									table += ',' + series[i].name
								}
								table += '\n'

								for (let i = 0; i < dates.length; i++) {
									table += dates[i]
									for (let j = 0; j < ss.length; j++) {
										table += ','
										if (dates[i] in ss[j]) {
											table += ss[j][dates[i]]
										}
									}
									table += '\n'
								}

								const BOM = '\uFEFF'
								const csvContent = BOM + table
								const csvData = new Blob([csvContent], {
									type: 'text/csv;charset=utf-8;',
								})
								console.log(opt)
								FileSaver.saveAs(csvData, opt.title[0].text + '.csv')

								return null
							},
							title: 'Download CSV',
						},
						restore: { show: true },
						saveAsImage: {
							show: true,
							icon: 'path://M3 3v18h18 M18.7 8l-5.1 5.2-2.8-2.7L7 14.3',
						},
					},
				},
				xAxis: [
					{
						type: 'category',
						splitLine: {
							show: true,
						},
					},
					{
						type: 'category',
						position: 'bottom',
					},
				],
				dataZoom: [
					{
						type: 'inside',
						zoomOnMouseWheel: 'shift',
						xAxisIndex: [0, 1],
						zoomLock: true,
						minSpan: 3,
						start: 0,
						end: 100,
					},
					{
						show: true,
						type: 'slider',
						xAxisIndex: 0,
						minSpan: 5,
						bottom: 50,
					},
				],
				yAxis: yAxis,
				series: series,
			}

			chartInstance.setOption(options)

			return () => {
				chartInstance.dispose()
			}
		}
	}, [title, legend, yAxis, series, colors])

	return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default EChartComponent
