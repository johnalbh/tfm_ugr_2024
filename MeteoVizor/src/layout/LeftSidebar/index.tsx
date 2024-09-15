import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { TabContainer } from 'react-bootstrap'

import { useThemeContext } from '@/context'

import IconMenu from './IconMenu'
import MainMenu from './MainMenu'
import { MenuItemTypes } from '../../common/menu-items'
import { getTwoColumnMenuItems } from '../../common/menu'

const LeftSidebar = () => {
	const [menuItems, setMenuItems] = useState<MenuItemTypes[]>([])
	const location = useLocation()
	const [activeTabKey, setActiveTabKey] = useState<number>(0)
	const { settings } = useThemeContext()

	useEffect(() => {
		const fetchMenuItems = async () => {
			const items = await getTwoColumnMenuItems()
			setMenuItems(items)
		}
		fetchMenuItems()
	}, [])

	useEffect(() => {
		const navLink = document.querySelectorAll('.side-nav-link-ref')
		const navArray = [...navLink]
		const matchingMenuItem = navArray.find((x: any) => {
			return x.pathname === location.pathname
		})

		const keyId: any = matchingMenuItem
			?.closest('.tab-pane')
			?.getAttribute('id')
		const activeKey = keyId?.split('-').slice(-1).toString()

		setActiveTabKey(activeKey)
	}, [location])

	useEffect(() => {
		if (settings.sideNavMode === 'sm') {
			document.body.classList.add('enlarge-menu')
		} else {
			document.body.classList.remove('enlarge-menu')
		}
	}, [settings.sideNavMode])

	const activeMenuItem = (e: number) => {
		setActiveTabKey(e)
	}

	return (
		<div className="leftbar-tab-menu">
			<TabContainer activeKey={activeTabKey} defaultActiveKey={0}>
				<IconMenu menuItems={menuItems} activeMenuItems={activeMenuItem} />
				<MainMenu menuItems={menuItems} />
			</TabContainer>
		</div>
	)
}

export default LeftSidebar
