import { color } from "@/utils/colors";

export const styles = {
	list: {
		backgroundColor: 'white',
		p: {
			md: '0px 36px',
		},
	},
	link: {
		color: color.primary,
		width: '100%',
		borderRadius: '8px',
		p: {
			md: '',
		},

		'&.active': {
			fontWeight: '700',
			backgroundColor: color['light-primary'],
		},

		'&:hover': {
			backgroundColor: color['light-primary'],
		},
	},
	'link-active': {
		color: color.primary,
		width: '100%',
		borderRadius: '8px',
		fontWeight: '700',
		backgroundColor: color['light-primary'],

		p: {
			md: '',
		},

		'&:hover': {
			backgroundColor: color['light-primary'],
		},
	},
	'link-icon': {
		color: color.primary,
	},
	header: {
		textTransform: 'capitalize',
		fontWeight: '500',
	},
	avatar: {
		backgroundColor: color.primary
	}
};