import { FC } from 'react';
import { CardMedia } from '@mui/material';

type StackedImagesProps = {
	image: string;
	topOffset: number;
	leftOffset: number;
	zIndex: number;
	onClick?: () => void;
};

export const Stackedimages: FC<StackedImagesProps> = ({
	image,
	topOffset,
	leftOffset,
	zIndex,	
	onClick,
}) => {
	return (
		<CardMedia
			onClick={onClick}
			component='img'
			image={image}
			alt='stacked Images'
			sx={{
				border: '7px solid white',
				borderRadius: '8px',
				position: 'absolute',
				top: `${topOffset}%`,
				left: `${leftOffset}%`,
				width: '90%',
				height: '90%',
				zIndex,
			}}
		/>
	);
};
