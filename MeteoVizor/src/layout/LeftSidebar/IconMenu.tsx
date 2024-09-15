import SimpleBar from 'simplebar-react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, NavItem, NavLink, OverlayTrigger, Tooltip } from 'react-bootstrap'

import logoSm from '@/assets/images/logo-sm.png'

import 'simplebar-react/dist/simplebar.min.css'

type Item = {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	parentKey?: string
	target?: string
	children?: Item[]
	loadComponent?: boolean
	parentUrl?: string
}

type AppMenuProps = {
	menuItems: Item[]
	activeMenuItems: (index: number) => void
}

const IconMenu = ({ menuItems, activeMenuItems }: AppMenuProps) => {
	const navigate = useNavigate()

	const handleMenuItemClick = (item: Item, idx: number) => {
		if (item.loadComponent && item.parentUrl) {
			navigate(item.parentUrl)
		} else if (!item.loadComponent) {
			activeMenuItems(idx)
		}
	}

	return (
		<div className="main-icon-menu">
			<Link to="/" className="logo logo-MeteoVizor d-block text-center">
				<span>
					<img src={logoSm} alt="logo-small" className="logo-sm" />
				</span>
			</Link>
			<div className="main-icon-menu-body">
				<SimpleBar
					className="position-relative h-100"
					data-simplebar
					style={{ overflowX: 'hidden' }}>
					<Nav className="nav nav-tabs" role="tablist" id="tab-menu">
						{(menuItems || []).map((item, idx) => (
							<NavItem key={idx}>
								<NavLink
									eventKey={idx}
									id="dashboard-tab"
									onClick={() => handleMenuItemClick(item, idx)}>
									<OverlayTrigger
										placement="right"
										trigger="focus"
										overlay={<Tooltip>{item.label}</Tooltip>}>
										<i className={`fas fa-${item.icon} menu-icon`} />
									</OverlayTrigger>
								</NavLink>
							</NavItem>
						))}
					</Nav>
				</SimpleBar>
			</div>
		</div>
	)
}

export default IconMenu
