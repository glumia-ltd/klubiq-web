import { Box, Stack } from '@mui/system';
import { FC } from 'react';

type HighlightsType = {
	highLights: string[];
};
export const Highlights: FC<HighlightsType> = ({ highLights }) => {
	return (
		<Stack direction='row' spacing={2}>
			{highLights.map((highLight, index) => {
				return <Box key={index}>{highLight}</Box>;
			})}
		</Stack>
	);
};
