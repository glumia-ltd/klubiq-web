import { useRef, useState } from 'react';

import reverse from '../../assets/images/reverse.svg';
import ascend from '../../assets/images/alpha-asc.svg';
import topBottom from '../../assets/images/top-bottom.svg';
import plus from '../../assets/images/plus.svg';
import cancel from '../../assets/images/cancel-button.svg';

import {
	Grid,
	Button,
	Stack,
	Typography,
	Modal,
	Box,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Divider,
} from '@mui/material';

import { styles } from './style';

type OptionsType = {
	title: string;
	options: { label: string; icon?: string }[];
	multiSelect?: boolean;
}[];

const displayOptions: OptionsType = [
	{ title: 'Display', options: [{ label: 'All' }, { label: 'Archived' }] },
	{
		title: 'Purpose',
		options: [{ label: 'All' }, { label: 'Lease' }, { label: 'Sell' }],
	},
	{
		title: 'Unit type',
		options: [{ label: 'Single Unit' }, { label: 'Multi Unit' }],
	},
	{
		title: 'Sorting options',
		options: [
			{ label: 'Recently updated', icon: topBottom },
			{ label: 'Newest', icon: reverse },
			{ label: 'Oldest', icon: reverse },
			{ label: 'Property name (A -> Z)', icon: ascend },
			{ label: 'Property name (Z -> A)', icon: ascend },
		],
	},
	{
		title: 'Property Type',
		options: [
			{ label: 'Apartment' },
			{ label: 'Duplex' },
			{ label: 'Bungalow' },
			{ label: 'Land' },
			{ label: 'Terrace' },
		],
		multiSelect: true,
	},
];

const Filter = () => {
	const [selectedTitle, setSelectedTitle] = useState<
		Record<string, string | string[]>
	>({});

	const [currentTitle, setCurrentTitle] = useState<string>();

	const ArrayOfSelectedTitles = Object.keys(selectedTitle);

	const [modalStyle, setModalStyle] = useState<{
		[key: string]: string | number;
	}>({});

	const divRef = useRef<Record<string, HTMLDivElement>>({});

	const modalRef = useRef<Record<string, HTMLDivElement>>({});

	const handleButtonClick = (title: string) => {
		const buttonPosition = divRef?.current[title]?.getBoundingClientRect();
		const modalPosition = modalRef?.current[title]?.getBoundingClientRect();

		const buttonLeft = buttonPosition?.left || 0;
		const buttonHeight = buttonPosition?.height || 0;
		const modalWidth = modalPosition?.width || 0;
		const center = buttonLeft - modalWidth / 2;

		const position = {
			left: `${center}px`,
			top: `${buttonHeight ? buttonHeight + 20 : 10}px`,
		};

		setCurrentTitle(title);
		setModalStyle(position);

		if (Object.keys(selectedTitle).includes(title)) return;

		setSelectedTitle((prev) => ({ ...prev, [title]: '' }));
	};

	const handleCloseModal = () => {
		setCurrentTitle('');
	};

	const handleRemoveFilter = (filterTitle: string) => {
		const updatedFilters = selectedTitle;
		delete updatedFilters[filterTitle];

		setCurrentTitle('');
		setSelectedTitle({ ...updatedFilters });
	};

	return (
		<Stack direction='row' spacing={2} alignItems='center'>
			{displayOptions.map((entry) => {
				const { title, options } = entry;
				console.log(ArrayOfSelectedTitles.includes(title));

				return ArrayOfSelectedTitles.includes(title) ? (
					<Grid style={styles.selectedButtonStyle}>
						<div style={styles.selectedButtonContainer}>
							<Typography sx={styles.text}>{title}</Typography>
							<div onClick={() => handleRemoveFilter(title)}>
								<img src={cancel} alt='filter button icon' />
							</div>
						</div>
					</Grid>
				) : (
					<Grid key={title} sx={{ position: 'relative' }}>
						<Grid>
							<div
								ref={(element) => {
									if (element) {
										divRef.current[title] = element;
									} else {
										delete divRef.current[title];
									}
								}}
							>
								<Button
									sx={styles.buttonStyle}
									onClick={() => handleButtonClick(title)}
								>
									<img src={plus} alt='filter button icon' /> {title}
								</Button>
							</div>

							<div
								ref={(element) => {
									if (element) {
										modalRef.current[title] = element;
									} else {
										delete modalRef.current[title];
									}
								}}
							>
								<Modal open={title === currentTitle}>
									<Box
										sx={{
											position: 'absolute',
											padding: 2,
											minWidth: 300,
											border: '1px solid #001F4B',
											borderRadius: 2,
											backgroundColor: '#fff',
											display: 'flex',
											flexDirection: 'column',
											...modalStyle,
										}}
									>
										<Typography
											variant='h4'
											sx={{
												color: '#001F4B',
												marginBottom: 2,
												lineHeight: '28px',
											}}
										>
											{title}
										</Typography>
										<FormControl component='fieldset'>
											<RadioGroup
												value={selectedTitle[title]}
												onChange={(e) =>
													setSelectedTitle({
														...selectedTitle,
														[title]: e.target.value,
													})
												}
											>
												{options.map((option) => {
													const { label, icon } = option;

													const labelWithIcon = (
														<span style={styles.labelWithIcon}>
															<img src={icon} alt='label icon' /> {label}
														</span>
													);

													return (
														<FormControlLabel
															key={label}
															value={label}
															control={<Radio />}
															label={icon ? labelWithIcon : label}
														/>
													);
												})}
											</RadioGroup>
										</FormControl>
										<Divider sx={{ marginY: 2 }} />
										<Button
											variant='contained'
											sx={{
												bgcolor: '#001F4B',
												color: '#fff',
												width: '70%',
												margin: '0 auto',
												borderRadius: '10px',
												padding: '8px 14px',
											}}
											onClick={handleCloseModal}
										>
											Apply
										</Button>
									</Box>
								</Modal>
							</div>
						</Grid>
					</Grid>
				);
			})}
		</Stack>
	);
};

export default Filter;
