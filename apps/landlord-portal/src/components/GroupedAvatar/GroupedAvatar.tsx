import { Avatar, AvatarGroup } from '@mui/material';
import { FC } from 'react';

type TenantType = {
	tenants: {
		firstName?: string;
		lastName?: string;
		profilePicture?: string;
	}[];
	maximumImage?: number;
};

export const GroupedAvatar: FC<TenantType> = ({
	tenants,
	maximumImage = 2,
}) => {
	return (
		<AvatarGroup max={maximumImage}>
			{tenants.map((tenant) => {
				if (tenant.profilePicture) {
					return (
						<Avatar
							alt={`${tenant.firstName} ${tenant.lastName}`}
							src={tenant.profilePicture}
						/>
					);
				} else {
					return (
						<Avatar>
							{tenant.firstName?.charAt(0)} {tenant.lastName?.charAt(0)}
						</Avatar>
					);
				}
			})}
		</AvatarGroup>
	);
};
