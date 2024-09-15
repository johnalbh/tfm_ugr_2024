export type MenuItemTypes = {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
	loadComponent?: boolean
	parentUrl?: string
}

const TWO_COL_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'apps',
		icon: 'map-marker-alt',
		label: 'Apps',
		isTitle: false,
		loadComponent: true,
		parentUrl: '/home',
	},
	{
		key: 'profile',
		icon: 'newspaper',
		label: 'Apps',
		isTitle: false,
		loadComponent: true,
		parentUrl: '/information',
	},
]

export { TWO_COL_MENU_ITEMS }
