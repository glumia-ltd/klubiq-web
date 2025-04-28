import { Avatar, AvatarGroup } from '@mui/material';
import { FC } from 'react';

type TenantType = {
	tenants: {
		id: string;
		profile: {
			firstName?: string;
			lastName?: string;
			profilePicUrl?: string;
		},
		isPrimaryTenant: boolean;
	}[];
	maximumImage?: number;
};

export const GroupedAvatar: FC<TenantType> = ({
	tenants,
	maximumImage = 2,
}) => {
	return (
		<AvatarGroup spacing={'small'} max={maximumImage} total={tenants.length} renderSurplus={(surplus) => <Avatar>+{surplus}</Avatar>}>
			{tenants.map((tenant) => {
				if (tenant.profile.profilePicUrl) {
					return (
						<Avatar
							key={tenant.id}
							alt={`${tenant.profile.firstName} ${tenant.profile.lastName}`}
							src={tenant.profile.profilePicUrl} 
							sx={{width: '40px', height: '40px'}}
						/>
					);
				} else {
					return (
						<Avatar key={tenant.id} sx={{width: '40px', height: '40px'}}>
							{tenant.profile.firstName?.charAt(0)}{tenant.profile.lastName?.charAt(0)}
						</Avatar>
					);
				}
			})}
		</AvatarGroup>
	);
};
