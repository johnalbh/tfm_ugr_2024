import { Helmet } from 'react-helmet'

const PageMetaData = ({ title }: { title: string }) => {
	return (
		<Helmet>
			<title>{title}MeteoVizor</title>
		</Helmet>
	)
}

export default PageMetaData
