import React from 'react';
import {
	MenuList,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@mui/material';

export interface menuItem {
	label: string;
	onClick: () => void;
	hasDivider?: boolean;
	sx?: Record<string, unknown>;
	icon?: React.ReactNode;
}
interface Props {
	id: string;
	// eslint-disable-next-line no-unused-vars
	handleKeyDown: (event: React.KeyboardEvent) => void;
	menuItems: menuItem[];
}
const KlbMenuList: React.FC<Props> = ({ id, handleKeyDown, menuItems }) => {
	return (
		<MenuList id={id} onKeyDown={handleKeyDown}>
			{menuItems.map((item, index) => (
				<div key={index}>
					<MenuItem
						key={index}
						onClick={item.onClick}
						sx={item.sx}
						disableRipple
					>
						{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
						<ListItemText
							primary={item.label}
							primaryTypographyProps={{
								color: 'primary',
								variant: 'body2',
							}}
						/>
					</MenuItem>
					{item.hasDivider && <Divider />}
				</div>
			))}
		</MenuList>
	);
};
export default KlbMenuList;
