import { FC, useRef, useState } from 'react';

import plus from '../../assets/images/plus.svg';
import cancel from '../../assets/images/cancel-button.svg';
import dropdown from '../../assets/images/dropdown.svg';

import {
	Grid,
	Button,
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
import { Stack } from '@mui/system';

type OptionsType = {
	title: string;
	options: { label: string; icon?: string }[];
	multiSelect?: boolean;
}[];

type selectedFilters = Record<string, string | string[]>;

type FilterType = {
	filterList: OptionsType;
	getFilterResult: (result: selectedFilters) => void;
};

type ModalStyleType = {
	[key: string]: string | number;
};

const Filter: FC<FilterType> = ({ filterList, getFilterResult }) => {
	const [selectedTitle, setSelectedTitle] = useState<selectedFilters>({});

	const [currentTitle, setCurrentTitle] = useState<string>();

	const ArrayOfSelectedTitles = Object.keys(selectedTitle);

	const [modalStyle, setModalStyle] = useState<ModalStyleType>({});

	const divRef = useRef<Record<string, HTMLDivElement>>({});

	const modalRef = useRef<Record<string, HTMLDivElement>>({});

	const handleButtonClick = (title: string) => {
		const buttonPosition = divRef?.current[title]?.getBoundingClientRect();
		const modalPosition = modalRef?.current[title]?.getBoundingClientRect();

		const buttonLeft = buttonPosition?.left || 0;
		const buttonTop = buttonPosition?.top || 0;
		const buttonHeight = buttonPosition?.height || 0;
		const modalWidth = modalPosition?.width || 0;
		const center = buttonLeft - modalWidth / 2;

		const position = {
			left: `${center}px`,
			top: `${buttonTop ? buttonTop + (buttonHeight + 10) : 10}px`,
		};

		setCurrentTitle(title);
		setModalStyle(position);

		if (Object.keys(selectedTitle).includes(title)) return;

		setSelectedTitle((prev) => ({ ...prev, [title]: '' }));
	};

	const handleCloseModal = () => {
		setCurrentTitle('');

		getFilterResult(selectedTitle);
	};

	const handleRemoveFilter = (filterTitle: string) => {
		const updatedFilters = selectedTitle;
		delete updatedFilters[filterTitle];

		getFilterResult({ ...updatedFilters });

		setSelectedTitle({ ...updatedFilters });
		setCurrentTitle('');
	};

	return (
		<Grid
			container
			spacing={1}
			// direction='row'
			// spacing={2}
			alignItems='center'
			sx={styles.filterContainer}
		>
			{filterList.map((entry) => {
				const { title, options } = entry;

				return ArrayOfSelectedTitles.includes(title) ? (
					<Grid
						item
						xs={4}
						sm={3}
						md={2.4}
						style={styles.selectedState}
						key={title}
					>
						<div
							ref={(element) => {
								if (element) {
									divRef.current[title] = element;
								} else {
									delete divRef.current[title];
								}
							}}
							style={styles.selectedButtonStyle}
						>
							<div style={styles.selectedButtonContainer}>
								<Typography sx={styles.text}>{title}</Typography>
								<div onClick={() => handleRemoveFilter(title)}>
									<img src={cancel} alt='filter button icon' />
								</div>
							</div>
						</div>

						<div
							style={styles.selectedButtonDropDown}
							onClick={() => handleButtonClick(title)}
						>
							<Typography>{selectedTitle[title]}</Typography>

							<div>
								<img
									src={dropdown}
									alt='filter button icon'
									style={styles.dropdownIcon}
								/>
							</div>
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
										...styles.modalBackgroundStyle,
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
										sx={styles.applyButtonStyle}
										onClick={handleCloseModal}
									>
										Apply
									</Button>
								</Box>
							</Modal>
						</div>
					</Grid>
				) : (
					<Stack direction='row' spacing={2} key={title} ml={'5px'}>
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
					</Stack>
				);
			})}
		</Grid>
	);
};

export default Filter;
