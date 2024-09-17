import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { PlaceType } from '../../shared/type';
import { loadScript } from '../../helpers/loadScript';
import { debounce } from '@mui/material/utils';
import Autocomplete from '@mui/material/Autocomplete';

import ControlledTextField from '../ControlledComponents/ControlledTextField';
import { getIn } from 'formik';

const autocompleteService = { current: null };

export const AutoComplete: FC<{ formik: any; name: string; label: string }> = ({
	formik,
	name,
	label,
}) => {
	const [value, setValue] = useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<readonly PlaceType[]>([]);
	const loaded = useRef(false);

	if (typeof window !== 'undefined' && !loaded.current) {
		if (!document.querySelector('#google-maps')) {
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`,
				document.querySelector('head'),
				'google-maps',
			);
		}

		loaded.current = true;
	}

	const placesService = useRef<any>(null);

	// Function to get place details using placeId
	const getPlaceDetails = (placeId: string) => {
		// Initialize PlacesService if not already done
		if (!placesService.current && window.google) {
			placesService.current = new window.google.maps.places.PlacesService(
				document.createElement('div'),
			);
		}

		const request = {
			placeId,
			fields: ['name', 'formatted_address', 'address_component', 'geometry'],
		};

		placesService.current.getDetails(request, (place: any, status: any) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				console.log('Place details:', place);
				console.log(
					place.geometry.location.lat().toFixed(5),
					place.geometry.location.lng().toFixed(5),
				);
				// You can handle place details here, for example, update state
			} else {
				console.error('Error retrieving place details:', status);
			}
		});
	};

	const fetch = useMemo(
		() =>
			debounce(
				(
					request: { input: string },
					callback: (results?: readonly PlaceType[]) => void,
				) => {
					(autocompleteService.current as any).getPlacePredictions(
						request,
						callback,
					);
				},
				400,
			),
		[],
	);

	useEffect(() => {
		let active = true;

		if (!autocompleteService.current && (window as any).google) {
			autocompleteService.current = new (
				window as any
			).google.maps.places.AutocompleteService({
				types: ['geocode'],
				componentRestrictions: { country: 'Au' },
				strictBounds: false,

				//TODO: set dynamic country restriction
				// componentRestrictions: { country: ['us', 'ng'] },
				// componentRestrictions: 'country:us|country:ng',
			});

			//@ts-ignore
			// autocompleteService?.current?.setComponentRestrictions({
			// 	country: ['us', 'pr', 'vi', 'gu', 'mp'],
			// });
		}

		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		const removeCountryFromDescription = (description: string) => {
			const parts = description.split(',');
			return parts.slice(0, -1).join(',');
		};

		//TODO: Get Longitude and Latitude

		fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
			if (active) {
				let newOptions: readonly PlaceType[] = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [
						...newOptions,
						...results.map((option) => ({
							...option,
							description: removeCountryFromDescription(option.description),
						})),
					];
				}

				setOptions(newOptions);

				if (results && results.length > 0) {
					const placeId = results[0]?.place_id;
					getPlaceDetails(placeId!);
				}
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Autocomplete
			sx={{ width: '100%' }}
			freeSolo
			getOptionLabel={(option) =>
				typeof option === 'string' ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value || fieldValue || ''}
			noOptionsText='No locations'
			onChange={(event: any, value: any) => {
				// setOptions(value ? [value, ...options] : options);
				setValue(value);

				if (typeof value === 'string') {
					// Handle custom typed value
					formik.setFieldValue(name, value);
				} else if (value) {
					// Handle selected autocomplete suggestion
					formik.setFieldValue(name, value.description);
				}
			}}
			onInputChange={(_event, newInputValue) => {
				if (!newInputValue) {
					formik.setFieldValue(name, newInputValue);
				}
				setInputValue(newInputValue);
			}}
			renderOption={(props, option, index) => {
				if (!option.description) {
					return;
				}
				return (
					<li
						{...props}
						key={`${option?.description}-${option?.place_id}-${index?.index}`}
					>
						{option?.description || option}
					</li>
				);
			}}
			// getOptionDisabled={(option) =>
			// 	options.some((opt) => opt.place_id === option.place_id)
			// } // Optional: Disable duplicate options in the dropdown
			renderInput={(params) => (
				<ControlledTextField
					name={name}
					label={label}
					formik={formik}
					{...params}
				/>
			)}
		/>
	);
};
