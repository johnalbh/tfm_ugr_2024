import { Route, RouteProps, Routes } from 'react-router-dom'
import { allAdminRoutes } from './index'
import VerticalLayout from '@/layout/VerticalLayout'

const AllRoutes = (props: RouteProps) => {
	return (
		<Routes>
			<Route>
				{allAdminRoutes.map((route, idx) => (
					<Route
						path={route.path}
						element={
							<VerticalLayout {...props}>{route.element}</VerticalLayout>
						}
						key={idx}
					/>
				))}
			</Route>
		</Routes>
	)
}

export default AllRoutes
