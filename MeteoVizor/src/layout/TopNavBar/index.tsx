import { useThemeContext } from '@/context'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
	const { settings, updateShowRightSideBar, updateSideNavMode } =
		useThemeContext()

	const handleLeftMenuCallBack = () => {
		if (settings.sideNavMode == 'default') {
			updateSideNavMode('sm')
		} else {
			updateSideNavMode('sm')
		}
	}
	const handleRightSideBar = () => {
		updateShowRightSideBar(false)
	}

	return (
		<div className="topbar">
			<nav className="navbar-custom" id="navbar-custom">
				<ul className="list-unstyled topbar-nav float-end mb-0">
					<li className="notification-list">
						<Link
							className="nav-link arrow-none nav-icon offcanvas-btn"
							to=""
							onClick={handleRightSideBar}>
							<i className="ti ti-settings ti-spin" />
						</Link>
					</li>
				</ul>
				<ul className="list-unstyled topbar-nav mb-0">
					<li>
						<button
							className="nav-link button-menu-mobile nav-icon"
							id="togglemenu"
							onClick={handleLeftMenuCallBack}>
							<i className="ti ti-menu-2" />
						</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default TopNavbar
