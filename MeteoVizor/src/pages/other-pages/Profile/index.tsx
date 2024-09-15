import { Col, Row } from 'react-bootstrap'

import Article from './components/Article'

const Profile = () => {
	return (
		<>
			<Row>
				<Col lg={9}>
					<Article />
				</Col>
				<Col lg={3}></Col>
			</Row>
		</>
	)
}

export default Profile
