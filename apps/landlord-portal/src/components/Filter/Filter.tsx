/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useRef, useState } from 'react';
import { Plus } from '../Icons/CustomIcons';
import cancel from '../../assets/images/cancel-button.svg';
import dropdown from '../../assets/images/dropdown.svg';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import {
	TopBottom,
	AscendIcon,
	ReverseIcon,
} from '../../components/Icons/CustomIcons';

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

const ICONS: Record<string, any> = {
	TopBottom,
	AscendIcon,
	ReverseIcon,
};

export type DropdownOption = {
	label: string;
	Icon?: any;
	value: string | number;
	order?: string;
};

export type OptionsType = {
	id: string;
	title: string;
	options: DropdownOption[];
	multiSelect?: boolean;
}[];

type selectedFilters = Record<string, string | number>;

type FilterType = {
	filterList: OptionsType;
	getFilterResult: (result: selectedFilters) => void;
	disable?: boolean;
};

type ModalStyleType = {
	[key: string]: string | number;
};

const Filter: FC<FilterType> = ({ filterList, getFilterResult, disable }) => {
	const [selectedTitle, setSelectedTitle] = useState<selectedFilters>({});

	const [selectedId, setSelectedId] = useState<selectedFilters>({});

	const [currentTitle, setCurrentTitle] = useState<string>();

	const ArrayOfSelectedTitles = Object.keys(selectedTitle);

	const [modalStyle, setModalStyle] = useState<ModalStyleType>({});

	const divRef = useRef<Record<string, HTMLDivElement>>({});

	const modalRef = useRef<Record<string, HTMLDivElement>>({});

	const theme = useTheme();

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

		getFilterResult(selectedId);
	};

	const getValue = (options: DropdownOption[], value: string) => {
		const data = options.find((option) => option.label === value);
		return data as DropdownOption;
	};

	const handleRemoveFilter = (filterTitle: string, id: string) => {
		//clone the objects
		const updatedFilters = { ...selectedTitle };
		const updatedId = { ...selectedId };
		delete updatedFilters[filterTitle];
		delete updatedId[id];

		//check to see the keys in the object
		const updatedIdKeyArray = Object.keys(updatedId);
		if (
			updatedIdKeyArray.includes('order') &&
			!updatedIdKeyArray.includes('sortBy')
		) {
			delete updatedId['order'];
		}
		getFilterResult({ ...updatedId });

		// add selected id
		setSelectedId({ ...updatedId });

		setSelectedTitle({ ...updatedFilters });
		setCurrentTitle('');
	};

	const handleClearAllFilter = () => {
		getFilterResult({});
		setSelectedTitle({});
		setSelectedId({});
	};

	return (
		<Stack direction='column' rowGap={1}>
			<Stack
				direction='row'
				useFlexGap
				flexWrap='wrap'
				spacing={{ xs: 1, sm: 2 }}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				justifyContent={'flex-start'}
				sx={styles.filterContainer}
			>
				{filterList?.map((entry) => {
					const { title, options, id } = entry;

					return ArrayOfSelectedTitles.includes(title) ? (
						<Grid sx={styles.selectedState} key={title}>
							<div
								ref={(element) => {
									if (element) {
										divRef.current[title] = element;
									} else {
										delete divRef.current[title];
									}
								}}
								style={{
									...styles.selectedButtonStyle,
									background: `${theme.palette.primary.main}`,
								}}
							>
								<div style={styles.selectedButtonContainer}>
									<Typography sx={styles.text}>{title}</Typography>
									<div onClick={() => handleRemoveFilter(title, id)}>
										<img src={cancel} alt='filter button icon' />
									</div>
								</div>
							</div>

							<div
								style={{
									...styles.selectedButtonDropDown,
									background: `${theme.palette.primary.main}`,
								}}
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
								<Modal
									open={title === currentTitle}
									onClose={handleClearAllFilter}
								>
									<Box
										sx={{
											...styles.modalBackgroundStyle,
											...modalStyle,
										}}
									>
										<Typography
											variant='h4'
											sx={{
												marginBottom: 2,
												lineHeight: '28px',
											}}
										>
											{title}
										</Typography>
										<FormControl component='fieldset'>
											<RadioGroup
												value={selectedTitle[title]}
												onChange={(e) => {
													const option = getValue(options, e.target.value);
													setSelectedTitle({
														...selectedTitle,
														[title]: e.target.value,
													});

													if ('order' in option) {
														setSelectedId({
															...selectedId,
															order: option.order || 'ASC',
															[id]: option.value,
														});
													} else {
														setSelectedId({
															...selectedId,
															[id]: option.value,
														});
													}
												}}
											>
												{options.map((option) => {
													const { label, Icon } = option;

													const LabelIcon = ICONS[Icon];

													const labelWithIcon = (
														<span style={styles.labelWithIcon}>
															{Icon && <LabelIcon />}
															{label}
														</span>
													);

													return (
														<FormControlLabel
															key={label}
															value={label}
															control={<Radio />}
															label={Icon ? labelWithIcon : label}
														/>
													);
												})}
											</RadioGroup>
										</FormControl>
										<Divider sx={{ marginY: 2 }} />
										<Button
											variant='klubiqMainButton'
											onClick={handleCloseModal}
										>
											Apply
										</Button>
									</Box>
								</Modal>
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
										disabled={disable}
										variant='filterButton'
										// sx={{
										// 	...styles.buttonStyle,
										// 	outline: `1px dashed ${theme.palette.primary.main}`,
										// }}
										onClick={() => {
											handleButtonClick(title);
										}}
									>
										<Plus sx={{ height: '14px' }} />
										{title}
									</Button>
								</div>
							</Grid>
						</Grid>
					);
				})}
			</Stack>
			{ArrayOfSelectedTitles.length > 0 && (
				<Stack
					mb={2}
					direction={'row'}
					alignItems={'center'}
					sx={{ cursor: 'pointer', color: 'secondary.light' }}
					onClick={handleClearAllFilter}
				>
					<Button variant='borderlessFilterButton'>
						<ClearIcon />
						<Typography variant='h6'>Clear Filter</Typography>
					</Button>
				</Stack>
			)}
		</Stack>
	);
};

export default Filter;
