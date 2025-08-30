import {
	TextField,
	Autocomplete,
	FormLabel,
	Typography,
	Stack,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GooglePlacesAutocompleteProps {
	apiKey: string;
	value: any;
	onChange: (value: any) => void;
	onBlur: () => void;
	error?: boolean;
	helperText?: string;
	country?: string;
	types?: string[];
	label?: string;
	isInFieldLabel?: boolean;
	required?: boolean;
}

export const GooglePlacesAutocomplete: React.FC<
	GooglePlacesAutocompleteProps
> = ({
	apiKey,
	value,
	onChange,
	onBlur,
	error,
	helperText,
	country,
	types = ['address'],
	label = 'Address',
	isInFieldLabel = false,
	required = false,
	...props
}) => {
	const [predictions, setPredictions] = useState<
		google.maps.places.AutocompletePrediction[]
	>([]);
	const [inputValue, setInputValue] = useState('');
	const autocompleteService =
		useRef<google.maps.places.AutocompleteService | null>(null);
	const placesService = useRef<google.maps.places.PlacesService | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const renderLabel = () =>
		!isInFieldLabel && label ? (
			<Typography variant='subtitle1' component='label' gutterBottom>
				{label}
				{required && (
					<Typography variant='subtitle2' component='span' sx={{ ml: 0.5 }}>
						<i>(required)</i>
					</Typography>
				)}
			</Typography>
		) : null;

	useEffect(() => {
		const loader = new Loader({
			apiKey,
			version: 'weekly',
			libraries: ['places'],
		});

		loader.importLibrary('places').then(() => {
			autocompleteService.current =
				new google.maps.places.AutocompleteService();
			if (inputRef.current) {
				placesService.current = new google.maps.places.PlacesService(
					inputRef.current,
				);
			}
		});
	}, [apiKey]);

	useEffect(() => {
		// If value is a string, use it directly; if it's an object, use a field like addressLine1
		if (typeof value === 'string') {
			setInputValue(value);
		} else if (value && value.addressLine1) {
			setInputValue(value.addressLine1);
		}
	}, [value]);

	const handleInputChange = async (newValue: string) => {
		setInputValue(newValue);

		if (!newValue || !autocompleteService.current) {
			return;
		}

		try {
			const request: google.maps.places.AutocompletionRequest = {
				input: newValue,
				types,
				componentRestrictions: country ? { country } : undefined,
			};

			const response =
				await autocompleteService.current.getPlacePredictions(request);
			if (response.predictions.length > 0) {
				setPredictions(response.predictions);
			} else {
				onChange({
					addressLine1: newValue,
					addressLine2: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
					latitude: 0,
					longitude: 0,
					isManualAddress: true
				});
			}
		} catch (error) {
			console.error('Error fetching predictions:', error);
			setPredictions([]);
		}
	};

	const handlePlaceSelect = async (placeId: string) => {
		if (!placesService.current) {
			return;
		}

		try {
			const place = await new Promise<google.maps.places.PlaceResult>(
				(resolve, reject) => {
					placesService.current?.getDetails(
						{
							placeId,
							fields: ['formatted_address', 'geometry', 'address_components'],
						},
						(result, status) => {
							if (
								status === google.maps.places.PlacesServiceStatus.OK &&
								result
							) {
								resolve(result);
							} else {
								reject(new Error('Place details not found'));
							}
						},
					);
				},
			);

			const addressComponents = place.address_components || [];
			const streetNumber =
				addressComponents.find((comp) => comp.types.includes('street_number'))
					?.long_name || '';
			const route =
				addressComponents.find((comp) => comp.types.includes('route'))
					?.long_name || '';
			const address = {
				addressLine1: `${streetNumber} ${route}`,
				addressLine2: '',
				city:
					addressComponents.find((comp) => comp.types.includes('locality'))
						?.long_name || '',
				state:
					addressComponents.find((comp) =>
						comp.types.includes('administrative_area_level_1'),
					)?.long_name || '',
				postalCode:
					addressComponents.find((comp) => comp.types.includes('postal_code'))
						?.long_name || '',
				country:
					addressComponents.find((comp) => comp.types.includes('country'))
						?.long_name || '',
				latitude: place.geometry?.location?.lat() || 0,
				longitude: place.geometry?.location?.lng() || 0,
				isManualAddress: false,
			};

			onChange(address);
			setInputValue(`${streetNumber} ${route}`);
			setPredictions([]);
		} catch (error) {
			console.error('Error fetching place details:', error);
		}
	};

	return (
		<Stack spacing={1}>
			{renderLabel()}
			<Autocomplete
				freeSolo
				options={predictions}
				getOptionLabel={(option) =>
					typeof option === 'string' ? option : option.description
				}
				inputValue={inputValue}
				onInputChange={(_, newValue) => handleInputChange(newValue)}
				onChange={(_, newValue) => {
					if (typeof newValue === 'string') {
						// Handle manual address input
						onChange({
							addressLine1: newValue,
							addressLine2: '',
							city: '',
							state: '',
							postalCode: '',
							country: '',
							latitude: 0,
							longitude: 0,
							isManualAddress: true
						});
					} else if (newValue) {
						handlePlaceSelect(newValue.place_id);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label={isInFieldLabel ? label : undefined}
						fullWidth
						error={error}
						// helperText={helperText}
						onBlur={onBlur}
						inputRef={inputRef}
						{...props}
					/>
				)}
			/>
		</Stack>
	);
};
