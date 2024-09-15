/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

//Pages
const ProfilePage = lazy(() => import('@/pages/other-pages/Profile'))

//MeteoVizor

const LeafletMaps = lazy(() => import('@/pages/meteovizor/maps/LeafletMaps'))

export type RoutesProps = {
	path: RouteProps['path']
	name: string
	element: RouteProps['element']
}

const dashboardRoutes: RoutesProps[] = [
	{
		path: '/',
		name: 'Home Page',
		element: <Navigate to="home" />,
	},
	{
		path: 'home',
		name: 'Home',
		element: <LeafletMaps />,
	},
]

const pagesRoutes: RoutesProps[] = [
	{
		path: 'information',
		name: 'Profile',
		element: <ProfilePage />,
	},
]

const allAdminRoutes = [...dashboardRoutes, ...pagesRoutes]

export { allAdminRoutes }
