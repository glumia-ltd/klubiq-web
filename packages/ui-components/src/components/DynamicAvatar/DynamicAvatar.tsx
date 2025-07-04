import React from 'react';
import { Avatar, AvatarGroup, Stack, Tooltip, Typography } from '@mui/material';
import { DynamicAvatarProps, AvatarItem } from './types';

const getAvatarSize = (size?: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return { width: 24, height: 24 };
		case 'large':
			return { width: 56, height: 56 };
		default:
			return { width: 40, height: 40 };
	}
};

const getInitials = (name: string) => {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};

const SingleAvatar: React.FC<{
	item: AvatarItem;
	size?: 'small' | 'medium' | 'large';
	showName?: boolean;
}> = ({ item, size, showName }) => {
	const displayText = item.name || item.label || '';
	const avatarSize = getAvatarSize(size);

	return (
		<Stack alignItems='center' spacing={1}>
			<Tooltip title={displayText}>
				<Avatar
					src={item.image || undefined}
					sx={{
						...avatarSize,
						bgcolor: item.image
							? undefined
							: item.background === 'dark'
								? 'primary.main'
								: 'secondary.light',
						borderRadius: item.variant === 'square' ? '4px' : '50%',
						color:
							item.background === 'dark'
								? 'secondary.contrastText'
								: 'primary.contrastText',
					}}
				>
					{!item.image && getInitials(displayText)}
				</Avatar>
			</Tooltip>
			{showName && (
				<Typography
					variant='caption'
					noWrap
					sx={{
						mt: 0.5,
						textAlign: 'center',
						maxWidth: 80,
						wordBreak: 'break-word',
					}}
				>
					{displayText}
				</Typography>
			)}
		</Stack>
	);
};

export const DynamicAvatar: React.FC<DynamicAvatarProps> = ({
	items,
	maxDisplayed = 3,
	spacing = 'medium',
	size = 'medium',
	showTotal = true,
	showName = true,
}) => {
	if (!items || items.length === 0) {
		return null;
	}

	// Single avatar with name/label below
	if (items.length === 1) {
		return <SingleAvatar item={items[0]} size={size} showName={showName} />;
	}

	// Group of avatars
	const avatarSize = getAvatarSize(size);
	const total = showTotal ? items.length : undefined;

	return (
		<AvatarGroup
			max={maxDisplayed}
			total={total}
			spacing={spacing}
			sx={{
				'& .MuiAvatar-root': avatarSize,
			}}
		>
			{items.map((item, index) => {
				const displayText = item.name || item.label || '';

				return (
					<Tooltip key={`${item.id}-${index}`} title={displayText}>
						<Avatar
							src={item.image || undefined}
							sx={{
								bgcolor: item.image
									? undefined
									: item.background === 'dark'
										? 'primary.main'
										: 'secondary.light',
								borderRadius: item.variant === 'square' ? '4px' : '50%',
								color:
									item.background === 'dark'
										? 'secondary.contrastText'
										: 'primary.contrastText',
							}}
						>
							{!item.image && getInitials(displayText)}
						</Avatar>
					</Tooltip>
				);
			})}
		</AvatarGroup>
	);
};
